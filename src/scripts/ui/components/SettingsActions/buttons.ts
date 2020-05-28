import { TXT } from 'data/texts';

import { Settings } from 'modules/settings';
import { AppDispatch } from 'modules/store';

interface ButtonItem {
    readonly id: string;
    readonly title: string;
    readonly ico: string;
    readonly onClick: () => void;
}

export const getSettingsButtons = (dispatch: AppDispatch): ButtonItem[] => ([
    {
        id: 'SETTINGS',
        title: TXT.settings.title,
        ico: TXT.settings.ico,
        onClick: () => dispatch(Settings.actions.toggle())
    }
]);
