import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { ask } from 'modules/dialogue';
import { Logger } from 'modules/logger';
import type { AppDispatch } from 'modules/store';

export interface ProjectData {
    /* */
}
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

export const createProject = (dispatch: AppDispatch, data: ProjectData): void => {
    Logger.log('CREATE PROJECT', data);
};

export const openProject = (dispatch: AppDispatch, path: string): void => {
    Logger.log('OPEN PROJECT', path);
};

export const selectProject = (dispatch: AppDispatch): void => {
    Logger.log('SELECT PROJECT');
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

export const closeProject = (dispatch: AppDispatch): void => {
    ask(TXT.project.close.ask).then(result => {
        if (result) {
            dispatch(Project.actions.set(null));
        }
    });
};
