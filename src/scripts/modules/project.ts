import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

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
