import { TXT } from 'data/texts';
import { Logger } from 'modules/logger';

interface ButtonItem {
    readonly id: string;
    readonly title: string;
    readonly ico: string;
    readonly onClick: () => void;
}

const showSettings = (): void => Logger.log('SETTINGS');

export const settingsButtons: ButtonItem[] = [
    { id: 'SETTINGS', title: TXT.settings.title, ico: TXT.settings.ico, onClick: showSettings }
];
