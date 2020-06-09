import p from 'path';
import { remote } from 'electron';

import { APP } from 'data/config';
import { TXT } from 'data/texts';

import { App } from 'modules/app';
import { AppThunk } from 'modules/store';
import { Dialog } from 'modules/dialog';

export const getDefaultProjectPath = (): string => {
    return remote.app.getPath('documents');
};

export const getDirame = (path: string): string => {
    return p.dirname(path);
};

export const getFilename = (path: string): string => {
    return p.basename(path);
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
