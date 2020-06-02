import p from 'path';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { readFile } from 'modules/file';
import { AppThunk } from 'modules/store';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { ask, selectFile, showError } from 'modules/dialog';
import { ProjectFile, createProjectFrom } from 'modules/project/file';
import { setRecentFilesDirectory } from 'modules/recent-projects';

export interface ProjectData {
    readonly file: ProjectFile;
    readonly undo: ProjectFile[];
    readonly redo: ProjectFile[];
    saved: boolean;
}
export const createProjectData = (file: ProjectFile): ProjectData => ({
    file,
    saved: false,
    undo: [],
    redo: []
});

export type ProjectDataState = ProjectData | null;

type ProjectReducers = {
    readonly set: CaseReducer<ProjectDataState, PayloadAction<ProjectFile | null>>;
};

export const Project = createSlice<ProjectDataState, ProjectReducers>({
    name: 'project',
    initialState: null,
    reducers: {
        set: (state, action) => {
            const file = action.payload;

            if (!file) {
                return null;
            }
            return createProjectData(file);
        }
    }
});

const checkCurrentProject = (project: ProjectDataState, cb: () => void): void => {
    if (!project || project.saved) {
        cb();
        return;
    }
    ask(TXT.project.closeAsk).then(result => {
        if (result) {
            cb();
        }
    });
};

export const setProject = (data: ProjectFile): AppThunk => dispatch => {
    dispatch(Project.actions.set(data));
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

        const project = createProjectFrom(data);
        dispatch(setProject(project));

        const dir = p.dirname(path);
        dispatch(setRecentFilesDirectory(dir));

    } catch (err) {
        Logger.log(err);

        const { title, message } = TXT.project.selectError;
        showError(title, message);
    }
};

export const selectProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();
    const lastDir = recentProjects.dir;

    checkCurrentProject(project, () => {
        selectFile(lastDir, 'PROJECT').then(file => {
            dispatch(openProject(file));
        });
    });
};

export const saveProject = (): AppThunk => () => {
    Logger.log('SAVE PROJECT');
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
