import p from 'path';
import produce from 'immer';
import { remote } from 'electron';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { TXT } from 'data/texts';
import { APP, PROJECT } from 'data/config';

import { Dialog } from 'modules/dialog';
import { AppThunk } from 'modules/store';
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

export const setUndo = (undo: number): AppThunk => dispatch => {
    undo = Math.floor(undo);
    undo = Math.max(undo, APP.UNDO.MIN);
    undo = Math.min(undo, APP.UNDO.MAX);
    dispatch(App.actions.setUndo(undo));
};

export const setRedo = (redo: number): AppThunk => dispatch => {
    redo = Math.floor(redo);
    redo = Math.max(redo, APP.REDO.MIN);
    redo = Math.min(redo, APP.REDO.MAX);
    dispatch(App.actions.setRedo(redo));
};

export const setAuthor = (author: string): AppThunk => dispatch => {
    dispatch(App.actions.setAuthor(author));
};

export const getDefaultProjectPath = (): string => {
    return remote.app.getPath('documents');
};

export const getDirame = (path: string): string => {
    return p.dirname(path);
};

export const minimizeWindow = (): void => {
    return remote.getCurrentWindow().minimize();
};

export const maximizeWindow = (): void => {
    const win = remote.getCurrentWindow();

    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
};

export const closeWindow = (): void => {
    Dialog.ask(TXT.app.close.question).then(result => {
        if (result) {
            remote.getCurrentWindow().close();
        }
    });
};
