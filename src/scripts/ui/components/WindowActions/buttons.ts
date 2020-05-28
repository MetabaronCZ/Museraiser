import { remote } from 'electron';

import { TXT } from 'data/texts';
import { ask } from 'modules/dialogue';

interface ButtonItem {
    readonly id: string;
    readonly title: string;
    readonly ico: string;
    readonly onClick: () => void;
}

const minimize = (): void => {
    return remote.getCurrentWindow().minimize();
};

const maximize = (): void => {
    const win = remote.getCurrentWindow();

    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
};

const close = (): void => {
    ask(TXT.app.close.question).then(result => {
        if (result) {
            remote.getCurrentWindow().close();
        }
    });
};

export const windowButtons: ButtonItem[] = [
    { id: 'MINIMIZE', title: TXT.app.minimize.title, ico: TXT.app.minimize.ico, onClick: minimize },
    { id: 'MAXIMIZE', title: TXT.app.maximize.title, ico: TXT.app.maximize.ico, onClick: maximize },
    { id: 'CLOSE', title: TXT.app.close.title, ico: TXT.app.close.ico, onClick: close }
];
