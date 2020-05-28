import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { getFileStats } from 'modules/file';
import { loadFromStorage, saveToStorage } from 'modules/storage';

const STORAGE_KEY = 'RECENT_PROJECTS';

export type RecentProjectData = string[];

type RecentProjectReducers = {
    readonly add: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly remove: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly clear: CaseReducer<RecentProjectData, PayloadAction>;
};

const projectExists = (path: string): boolean => {
    return !!getFileStats(path);
};

const load = (): RecentProjectData => {
    const projects = loadFromStorage<RecentProjectData>(STORAGE_KEY, []);
    return projects.filter(path => projectExists(path));
};

const save = (state: RecentProjectData): void => {
    saveToStorage<RecentProjectData>(STORAGE_KEY, state);
};

export const RecentProjects = createSlice<RecentProjectData, RecentProjectReducers>({
    name: 'recent-projects',
    initialState: load(),
    reducers: {
        add: (state, action) => produce(state, draft => {
            const path = action.payload;

            if (projectExists(path)) {
                draft = draft.filter(p => p !== path); // remove existing
                save(draft);
                return [path, ...draft];
            }
            return draft;
        }),
        remove: (state, action) => produce(state, draft => {
            draft = draft.filter(path => path !== action.payload);
            save(draft);
            return draft;
        }),
        clear: () => {
            const projects: RecentProjectData = [];
            save(projects);
            return projects;
        }
    }
});
