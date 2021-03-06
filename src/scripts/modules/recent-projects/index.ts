import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { RECENT_PROJECTS } from 'data/config';

import { fileExists } from 'modules/file';
import { getDefaultProjectPath } from 'modules/app/actions';
import { loadFromStorage, saveToStorage } from 'modules/storage';

const STORAGE_KEY = 'RECENT_PROJECTS';
const PROJECT_PATH = getDefaultProjectPath();

export type RecentProjectMaxValue = typeof RECENT_PROJECTS.VALUES[number];

export interface RecentProjectData {
    dir: string;
    max: number;
    files: string[];
}
const createRecentProjectData = (): RecentProjectData => ({
    dir: PROJECT_PATH,
    max: RECENT_PROJECTS.MAX,
    files: []
});

type RecentProjectReducers = {
    readonly add: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly remove: CaseReducer<RecentProjectData, PayloadAction<string>>;
    readonly clear: CaseReducer<RecentProjectData, PayloadAction>;
    readonly setMax: CaseReducer<RecentProjectData, PayloadAction<RecentProjectMaxValue>>;
    readonly setDir: CaseReducer<RecentProjectData, PayloadAction<string>>;
};

const load = (): RecentProjectData => {
    const defaults = createRecentProjectData();

    const data = loadFromStorage<RecentProjectData>(STORAGE_KEY, defaults);
    data.files = data.files.filter(path => fileExists(path));
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

            if (fileExists(path)) {
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

            if (RECENT_PROJECTS.VALUES.includes(max)) {
                draft.max = max;
                save(draft);
            }
            return draft;
        }),
        setDir: (state, action) => produce(state, draft => {
            draft.dir = action.payload;
            save(draft);
            return draft;
        })
    }
});
