import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { openOverlay } from 'modules/overlay';

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
        onClick: () => dispatch(openOverlay('SETTINGS'))
    }
]);
