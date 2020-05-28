import { remote } from 'electron';

import { TXT } from 'data/texts';
import { ask } from 'modules/dialogue';

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
    ask(TXT.app.close.question).then(result => {
        if (result) {
            remote.getCurrentWindow().close();
        }
    });
};
