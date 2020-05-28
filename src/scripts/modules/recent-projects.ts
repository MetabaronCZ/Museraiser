import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import {
    MAX_RECENT_PROJECTS,
    RECENT_PROJECTS_BOTTOM_LIMIT,
    RECENT_PROJECTS_TOP_LIMIT
} from 'data/config';

import { getFileStats } from 'modules/file';
import { loadFromStorage, saveToStorage } from 'modules/storage';

const STORAGE_KEY = 'RECENT_PROJECTS';

export interface RecentProjectData {
    max: number;
    files: string[]
}
const createRecentProjectData = (): RecentProjectData => ({
    max: MAX_RECENT_PROJECTS,
    files: []
});

type RecentProjectReducers = {
    readonly add: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly remove: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly clear: CaseReducer<RecentProjectData, PayloadAction>;
    readonly setMax: CaseReducer<RecentProjectData, PayloadAction<number>>;
};

const projectExists = (path: string): boolean => {
    return !!getFileStats(path);
};

const load = (): RecentProjectData => {
    const defaults = createRecentProjectData();

    const data = loadFromStorage<RecentProjectData>(STORAGE_KEY, defaults);
    data.files = data.files.filter(path => projectExists(path));
    data.files = data.files.slice(0, data.max);

    return data;
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
            let { files } = draft;

            if (projectExists(path)) {
                files = files.filter(p => p !== path); // remove duplicite
                files.unshift(path); // add new recent file
                draft.files = files.slice(0, draft.max); // limit file count
                save(draft);
            }
            return draft;
        }),
        remove: (state, action) => produce(state, draft => {
            draft.files = draft.files.filter(path => path !== action.payload);
            save(draft);
            return draft;
        }),
        clear: state => produce(state, draft => {
            draft.files = [];
            save(draft);
            return draft;
        }),
        setMax: (state, action) => produce(state, draft => {
            const max = action.payload;

            if (max >= RECENT_PROJECTS_BOTTOM_LIMIT && max <= RECENT_PROJECTS_TOP_LIMIT) {
                draft.max = max;
            }
            return draft;
        })
    }
});
