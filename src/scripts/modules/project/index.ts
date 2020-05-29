import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { ask, selectFile } from 'modules/dialog';
import type { AppDispatch } from 'modules/store';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { ProjectFile, createProjectFile } from 'modules/project/file';

export interface ProjectData {
    readonly file: ProjectFile;
    readonly undo: ProjectFile[];
    readonly redo: ProjectFile[];
    saved: boolean;
}
export const createProjectData = (): ProjectData => ({
    file: createProjectFile(),
    saved: false,
    undo: [],
    redo: []
});

export type ProjectDataState = ProjectData | null;

type ProjectReducers = {
    readonly set: CaseReducer<ProjectDataState, PayloadAction<ProjectDataState>>;
};

export const Project = createSlice<ProjectDataState, ProjectReducers>({
    name: 'project',
    initialState: null,
    reducers: {
        set: (state, action) => {
            return action.payload;
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

export const setProject = (dispatch: AppDispatch, data: ProjectData): void => {
    dispatch(Project.actions.set(data));
    closeOverlay(dispatch);
};

export const createProject = (dispatch: AppDispatch, project: ProjectDataState): void => {
    checkCurrentProject(project, () => {
        openOverlay(dispatch, 'CREATE');
    });
};

export const openProject = (dispatch: AppDispatch, path: string): void => {
    if (!path) {
        return;
    }
    // TODO: fs.readFile >> setProject(dispatch, data)
    Logger.log('OPEN PROJECT', path);
};

export const selectProject = (dispatch: AppDispatch, project: ProjectDataState): void => {
    checkCurrentProject(project, () => {
        selectFile('PROJECT').then(file => {
            openProject(dispatch, file);
        });
    });
};

export const saveProject = (dispatch: AppDispatch): void => {
    Logger.log('SAVE PROJECT');
};

export const undoProject = (dispatch: AppDispatch): void => {
    Logger.log('UNDO PROJECT');
};

export const redoProject = (dispatch: AppDispatch): void => {
    Logger.log('REDO PROJECT');
};

export const closeProject = (dispatch: AppDispatch, project: ProjectDataState): void => {
    checkCurrentProject(project, () => {
        dispatch(Project.actions.set(null));
    });
};
