import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { openOverlay } from 'modules/overlay';
import { ProjectDataState } from 'modules/project';

interface ButtonItem {
    readonly id: string;
    readonly title: string;
    readonly ico: string;
    readonly disabled: boolean;
    readonly onClick: () => void;
}

export const getSettingsButtons = (dispatch: AppDispatch, project: ProjectDataState): ButtonItem[] => ([
    {
        id: 'PROJECT',
        title: TXT.project.title,
        ico: TXT.project.ico,
        disabled: !project,
        onClick: () => dispatch(openOverlay('PROJECT'))
    },
    {
        id: 'SETTINGS',
        title: TXT.settings.title,
        ico: TXT.settings.ico,
        disabled: false,
        onClick: () => dispatch(openOverlay('SETTINGS'))
    }
]);
