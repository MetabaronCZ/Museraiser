import p from 'path';
import { remote } from 'electron';

import { TXT } from 'data/texts';
import { Dialog } from 'modules/dialog';

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
