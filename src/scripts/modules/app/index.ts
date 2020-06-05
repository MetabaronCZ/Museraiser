import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { APP, PROJECT } from 'data/config';
import { saveToStorage, loadFromStorage } from 'modules/storage';

const STORAGE_KEY = 'APP';

export interface AppData{
    readonly undo: number;
    readonly redo: number;
    readonly author: string;
}

const createAppData = (): AppData => ({
    undo: APP.UNDO.DEFAULT,
    redo: APP.REDO.DEFAULT,
    author: PROJECT.FILE.AUTHOR
});

const load = (): AppData => {
    const defaults = createAppData();
    return loadFromStorage<AppData>(STORAGE_KEY, defaults);
};

const save = (state: AppData): void => {
    saveToStorage<AppData>(STORAGE_KEY, state);
};

type AppReducers = {
    readonly setUndo: CaseReducer<AppData, PayloadAction<number>>;
    readonly setRedo: CaseReducer<AppData, PayloadAction<number>>;
    readonly setAuthor: CaseReducer<AppData, PayloadAction<string>>;
};

export const App = createSlice<AppData, AppReducers>({
    name: 'app',
    initialState: load(),
    reducers: {
        setUndo: (state, action) => produce(state, draft => {
            draft.undo = action.payload;
            save(draft);
            return draft;
        }),
        setRedo: (state, action) => produce(state, draft => {
            draft.redo = action.payload;
            save(draft);
            return draft;
        }),
        setAuthor: (state, action) => produce(state, draft => {
            draft.author = action.payload;
            save(draft);
            return draft;
        })
    }
});
