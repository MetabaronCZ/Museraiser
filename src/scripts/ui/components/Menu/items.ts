import { TXT } from 'data/texts';

import { OnClick } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { ProjectDataState } from 'modules/project';
import {
    closeProject, saveProject, selectProject,
    undoProject, redoProject, createProject
} from 'modules/project/actions';

const { create, open, save, undo, redo, close } = TXT.menu;

interface MenuItem {
    readonly id: string;
    readonly text: string;
    readonly title: string;
    readonly disabled: boolean;
    readonly onClick: OnClick;
}

export const getMenuItems = (dispatch: AppDispatch, project: ProjectDataState): MenuItem[] => [
    {
        id: 'CREATE',
        text: create.text,
        title: `${create.title} (${create.shortcut})`,
        disabled: false,
        onClick: () => dispatch(createProject())
    },
    {
        id: 'OPEN',
        text: open.text,
        title: `${open.title} (${open.shortcut})`,
        disabled: false,
        onClick: () => dispatch(selectProject())
    },
    {
        id: 'SAVE',
        text: save.text,
        title: `${save.title} (${save.shortcut})`,
        disabled: (!project || project.saved),
        onClick: () => dispatch(saveProject())
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: `${undo.title} (${undo.shortcut})`,
        disabled: (!project || !project.undo.length),
        onClick: () => dispatch(undoProject())
    },
    {
        id: 'REDO',
        text: redo.text,
        title: `${redo.title} (${redo.shortcut})`,
        disabled: (!project || !project.redo.length),
        onClick: () => dispatch(redoProject())
    },
    {
        id: 'CLOSE',
        text: close.text,
        title: `${close.title} (${close.shortcut})`,
        disabled: !project,
        onClick: () => dispatch(closeProject())
    }
];
