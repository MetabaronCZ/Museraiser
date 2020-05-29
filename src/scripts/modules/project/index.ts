import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { AppThunk } from 'modules/store';
import { ask, selectFile } from 'modules/dialog';
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

export const setProject = (data: ProjectData): AppThunk => dispatch => {
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
    // TODO: fs.readFile >> dispatch(setProject(data))
    Logger.log('OPEN PROJECT', path);
};

export const selectProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkCurrentProject(project, () => {
        selectFile('PROJECT').then(file => {
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
