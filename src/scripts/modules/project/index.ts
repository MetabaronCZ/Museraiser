import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { Dialog } from 'modules/dialog';
import { Logger } from 'modules/logger';
import { getDirame, setAuthor } from 'modules/app';
import { readFile, saveFile } from 'modules/file';
import { AppThunk, AppDispatch } from 'modules/store';
import { editMasterVolume } from 'modules/project/master';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { setRecentFilesDirectory, addRecentProject } from 'modules/recent-projects';
import { TrackID, muteTrack, soloTrack, editTrackVolume } from 'modules/project/track';
import {
    ProjectFile, parseProject, serializeProject,
    isValidProjectName, isValidProjectTempo,
    isValidProjectAuthor, isValidProjectDescription
} from 'modules/project/file';

export interface ProjectData {
    readonly file: ProjectFile;
    readonly path: string | null;
    readonly maxUndo: number;
    readonly maxRedo: number;
    undo: ProjectFile[];
    redo: ProjectFile[];
    saved: boolean;
}
const createProjectData = (data: ProjectSettings): ProjectData => ({
    file: data.file,
    path: data.path,
    saved: !!data.path,
    maxUndo: data.undo,
    maxRedo: data.redo,
    undo: [],
    redo: []
});

export type ProjectDataState = ProjectData | null;

interface ProjectSettings {
    readonly file: ProjectFile;
    readonly path: string | null;
    readonly undo: number;
    readonly redo: number;
}

interface TrackVolumeSettings {
    readonly track: TrackID;
    readonly volume: number;
}

type ProjectReducers = {
    readonly set: CaseReducer<ProjectDataState, PayloadAction<ProjectSettings | null>>;
    readonly save: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly undo: CaseReducer<ProjectDataState, PayloadAction>;
    readonly redo: CaseReducer<ProjectDataState, PayloadAction>;
    readonly setName: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setTempo: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setAuthor: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setDescription: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly soloTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly muteTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly setMasterVolume: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setTrackVolume: CaseReducer<ProjectDataState, PayloadAction<TrackVolumeSettings>>;
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
            return createProjectData(data);
        },
        save: (state, action) => produce(state, draft => {
            if (draft) {
                draft.path = action.payload;
                draft.saved = true;
            }
            return draft;
        }),
        undo: state => produce(state, draft => {
            if (draft) {
                const prev = draft.undo.shift();

                if (prev) {
                    draft.file = prev;
                    draft.saved = false;

                    if (state) {
                        draft.redo.unshift(state.file);
                        draft.redo = draft.redo.slice(0, draft.maxRedo);
                    }
                }
            }
            return draft;
        }),
        redo: state => produce(state, draft => {
            if (draft) {
                const next = draft.redo.shift();

                if (next) {
                    draft.file = next;
                    draft.saved = false;

                    if (state) {
                        draft.undo.unshift(state.file);
                        draft.undo = draft.undo.slice(0, draft.maxUndo);
                    }
                }
            }
            return draft;
        }),
        setName: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.name = action.payload;
            }
            return edit(state, draft);
        }),
        setTempo: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.tempo = action.payload;
            }
            return edit(state, draft);
        }),
        setAuthor: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.author = action.payload;
            }
            return edit(state, draft);
        }),
        setDescription: (state, action) => produce(state, draft => {
            if (draft) {
                draft.file.description = action.payload;
            }
            return edit(state, draft);
        }),
        soloTrack: (state, action) => produce(state, draft => {
            if (draft) {
                soloTrack(draft.file.tracks, action.payload);
            }
            return edit(state, draft);
        }),
        muteTrack: (state, action) => produce(state, draft => {
            if (draft) {
                muteTrack(draft.file.tracks, action.payload);
            }
            return edit(state, draft);
        }),
        setMasterVolume: (state, action) => produce(state, draft => {
            if (draft) {
                editMasterVolume(draft.file.master, action.payload);
            }
            return edit(state, draft);
        }),
        setTrackVolume: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, volume } = action.payload;
                editTrackVolume(draft.file.tracks, track, volume);
            }
            return edit(state, draft);
        })
    }
});

const edit = (state: ProjectDataState, draft: ProjectDataState): ProjectDataState => {
    if (!draft) {
        return draft;
    }
    draft.saved = false;
    draft.file.modified = Date.now();

    // handle project history
    draft.redo = [];

    if (state) {
        draft.undo.unshift(state.file);
        draft.undo = draft.undo.slice(0, draft.maxUndo);
    }
    return draft;
};

const checkProjectSaved = (project: ProjectDataState, cb: () => void): void => {
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

export const setProject = (data: ProjectFile, path: string | null): AppThunk => (dispatch, getState) => {
    const { undo, redo } = getState().app;
    dispatch(Project.actions.set({ file: data, path, undo, redo }));
    dispatch(closeOverlay());
};

export const createProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkProjectSaved(project, () => {
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

        dispatch(setAuthor(file.author));
        dispatch(addRecentProject(userPath));

        const dir = getDirame(userPath);
        dispatch(setRecentFilesDirectory(dir));
    });
};

export const selectProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();
    const lastDir = recentProjects.dir;

    checkProjectSaved(project, () => {
        Dialog.openFile(lastDir, 'PROJECT').then(file => {
            dispatch(openProject(file));
        });
    });
};

export const undoProject = (): AppThunk => dispatch => {
    dispatch(Project.actions.undo());
};

export const redoProject = (): AppThunk => dispatch => {
    dispatch(Project.actions.redo());
};

export const closeProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkProjectSaved(project, () => {
        dispatch(closeOverlay());
        dispatch(Project.actions.set(null));
    });
};

export const setProjectName = (name: string): AppThunk => dispatch => {
    if (!isValidProjectName(name)) {
        Dialog.showError(
            TXT.project.setNameError.title,
            TXT.project.setNameError.message
        );
    } else {
        dispatch(Project.actions.setName(name));
    }
};

export const setProjectTempo = (tempo: number): AppThunk => dispatch => {
    if (!isValidProjectTempo(tempo)) {
        Dialog.showError(
            TXT.project.setTempoError.title,
            TXT.project.setTempoError.message
        );
    } else {
        dispatch(Project.actions.setTempo(tempo));
    }
};

export const setProjectAuthor = (author: string): AppThunk => dispatch => {
    if (!isValidProjectAuthor(author)) {
        Dialog.showError(
            TXT.project.setAuthorError.title,
            TXT.project.setAuthorError.message
        );
    } else {
        dispatch(Project.actions.setAuthor(author));
    }
};

export const setProjectDescription = (desc: string): AppThunk => dispatch => {
    if (!isValidProjectDescription(desc)) {
        Dialog.showError(
            TXT.project.setDescriptionError.title,
            TXT.project.setDescriptionError.message
        );
    } else {
        dispatch(Project.actions.setDescription(desc));
    }
};

export const soloProjectTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.soloTrack(id));
};

export const muteProjectTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.muteTrack(id));
};

export const setMasterVolume = (volume: number): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterVolume(volume));
};

export const setTrackVolume = (track: TrackID, volume: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackVolume({ track, volume }));
};
