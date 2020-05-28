import React from 'react';

import { TXT } from 'data/texts';

import { openOverlay } from 'modules/overlay';
import { AppState, AppDispatch } from 'modules/store';
import {
    closeProject, saveProject, selectProject, undoProject, redoProject
} from 'modules/project';

const { create, open, save, undo, redo, close } = TXT.menu;

type OnClick = () => void;
type OnMouseClick = (e: React.MouseEvent) => void;

const click = (cb: OnClick): OnMouseClick => e => {
    e.preventDefault();
    cb();
};

interface MenuItem {
    readonly id: string;
    readonly text: string;
    readonly title: string;
    readonly disabled: boolean;
    readonly onClick: OnMouseClick;
}

export const getMenuItems = (state: AppState, dispatch: AppDispatch): MenuItem[] => [
    {
        id: 'CREATE',
        text: create.text,
        title: create.title,
        disabled: false,
        onClick: click(() => openOverlay(dispatch, 'CREATE'))
    },
    {
        id: 'OPEN',
        text: open.text,
        title: open.title,
        disabled: false,
        onClick: click(() => selectProject(dispatch))
    },
    {
        id: 'SAVE',
        text: save.text,
        title: save.title,
        disabled: true,
        onClick: click(() => saveProject(dispatch))
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: undo.title,
        disabled: true,
        onClick: click(() => undoProject(dispatch))
    },
    {
        id: 'REDO',
        text: redo.text,
        title: redo.title,
        disabled: true,
        onClick: click(() => redoProject(dispatch))
    },
    {
        id: 'CLOSE',
        text: close.text,
        title: close.title,
        disabled: !state.project,
        onClick: click(() => closeProject(dispatch))
    }
];
