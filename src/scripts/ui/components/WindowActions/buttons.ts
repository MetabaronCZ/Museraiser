import { TXT } from 'data/texts';
import { minimizeWindow, maximizeWindow, closeWindow } from 'modules/app/actions';

interface ButtonItem {
    readonly id: string;
    readonly title: string;
    readonly ico: string;
    readonly onClick: () => void;
}

export const windowButtons: ButtonItem[] = [
    {
        id: 'MINIMIZE',
        title: TXT.app.minimize.title,
        ico: TXT.app.minimize.ico,
        onClick: minimizeWindow
    },
    {
        id: 'MAXIMIZE',
        title: TXT.app.maximize.title,
        ico: TXT.app.maximize.ico,
        onClick: maximizeWindow
    },
    {
        id: 'CLOSE',
        title: TXT.app.close.title,
        ico: TXT.app.close.ico,
        onClick: closeWindow
    }
];
