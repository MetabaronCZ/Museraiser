import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { Dialog } from 'modules/dialog';
import { Logger } from 'modules/logger';
import { getDirame } from 'modules/app';
import { TrackID } from 'modules/project/track';
import { readFile, saveFile } from 'modules/file';
import { AppThunk, AppDispatch } from 'modules/store';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { setRecentFilesDirectory, addRecentProject } from 'modules/recent-projects';
import {
    ProjectFile,
    isValidProjectName, isValidProjectTempo,
    parseProject, serializeProject
} from 'modules/project/file';

export interface ProjectData {
    readonly file: ProjectFile;
    readonly path: string | null;
    readonly undo: ProjectFile[];
    readonly redo: ProjectFile[];
    saved: boolean;
}
export const createProjectData = (file: ProjectFile, path: string | null): ProjectData => ({
    file,
    path,
    saved: !!path,
    undo: [],
    redo: []
});

export type ProjectDataState = ProjectData | null;

interface ProjectSettings {
    readonly file: ProjectFile;
    readonly path: string | null;
}

type ProjectReducers = {
    readonly set: CaseReducer<ProjectDataState, PayloadAction<ProjectSettings | null>>;
    readonly save: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setName: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setTempo: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly soloTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly muteTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
};

export const Project = createSlice<ProjectDataState, ProjectReducers>({
    name: 'project',
    initialState: null,
    reducers: {
        set: (state, action) => {
            const data = action.payload;

            if (!data) {
                return null;
            }
            const { file, path } = data;
            return createProjectData(file, path);
        },
        save: (state, action) => produce(state, draft => {
            if (draft) {
                draft.path = action.payload;
                draft.saved = true;
            }
            return draft;
        }),
        setName: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.name = action.payload;
            }
            return edit(draft);
        }),
        setTempo: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.tempo = action.payload;
            }
            return edit(draft);
        }),
        soloTrack: (state, action) => produce(state, draft => {
            if (draft) {
                const track = draft.file.tracks[action.payload];
                const solo = track.solo;

                for (const track of Object.values(draft.file.tracks)) {
                    track.solo = false;
                }
                track.solo = !solo;
                track.mute = false;
            }
            return edit(draft);
        }),
        muteTrack: (state, action) => produce(state, draft => {
            if (draft) {
                const track = draft.file.tracks[action.payload];
                track.mute = !track.mute;
                track.solo = false;
            }
            return edit(draft);
        })
    }
});

const edit = (draft: ProjectDataState): ProjectDataState => {
    if (!draft) {
        return draft;
    }
    draft.saved = false;
    draft.file.modified = Date.now();
    return draft;
};

const checkCurrentProject = (project: ProjectDataState, cb: () => void): void => {
    if (!project || project.saved) {
        cb();
        return;
    }
    Dialog.ask(TXT.project.closeAsk).then(result => {
        if (result) {
            cb();
        }
    });
};

export const setProject = (data: ProjectFile, path: string | null): AppThunk => dispatch => {
    dispatch(Project.actions.set({
        file: data,
        path
    }));
    dispatch(closeOverlay());
};

export const createProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkCurrentProject(project, () => {
        dispatch(openOverlay('CREATE'));
    });
};

export const openProject = (path: string): AppThunk => dispatch => {
    if (!path) {
        return;
    }
    try {
        const file = readFile(path);
        const data = JSON.parse(file);

        const project = parseProject(data);
        dispatch(setProject(project, path));

        dispatch(addRecentProject(path));

        const dir = getDirame(path);
        dispatch(setRecentFilesDirectory(dir));

    } catch (err) {
        Logger.log(err);

        const { title, message } = TXT.project.selectError;
        Dialog.showError(title, message);
    }
};

const save = (dispatch: AppDispatch, file: ProjectFile, path: string): void => {
    const data = serializeProject(file);

    try {
        const save = JSON.stringify(data);
        saveFile(path, save);

        dispatch(Project.actions.save(path));

    } catch (err) {
        Logger.log(err);

        const { title, message } = TXT.project.saveError;
        Dialog.showError(title, message);
    }
};

export const saveProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();

    if (!project) {
        return;
    }
    const { file, path } = project;

    // save project to its location
    if (path) {
        save(dispatch, file, path);
        return;
    }
    const lastDir = recentProjects.dir;

    // user selects save destination for created project
    Dialog.saveFile(lastDir, 'PROJECT', file.name).then(userPath => {
        if (!userPath) {
            return;
        }
        save(dispatch, file, userPath);

        dispatch(addRecentProject(userPath));

        const dir = getDirame(userPath);
        dispatch(setRecentFilesDirectory(dir));
    });
};

export const selectProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();
    const lastDir = recentProjects.dir;

    checkCurrentProject(project, () => {
        Dialog.openFile(lastDir, 'PROJECT').then(file => {
            dispatch(openProject(file));
        });
    });
};

export const undoProject = (): AppThunk => () => {
    Logger.log('UNDO PROJECT');
};

export const redoProject = (): AppThunk => () => {
    Logger.log('REDO PROJECT');
};

export const closeProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkCurrentProject(project, () => {
        dispatch(Project.actions.set(null));
    });
};

export const setProjectName = (name: string): AppThunk => dispatch => {
    if (!isValidProjectName(name)) {
        Dialog.showError(TXT.project.setNameError.title, TXT.project.setNameError.message);
    } else {
        dispatch(Project.actions.setName(name));
    }
};

export const setProjectTempo = (tempo: number): AppThunk => dispatch => {
    if (!isValidProjectTempo(tempo)) {
        Dialog.showError(TXT.project.setTempoError.title, TXT.project.setTempoError.message);
    } else {
        dispatch(Project.actions.setTempo(tempo));
    }
};

export const soloTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.soloTrack(id));
};

export const muteTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.muteTrack(id));
};
