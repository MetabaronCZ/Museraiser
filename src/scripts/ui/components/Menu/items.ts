import React from 'react';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import {
    ProjectDataState,
    closeProject, saveProject, selectProject, undoProject, redoProject, createProject
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

export const getMenuItems = (dispatch: AppDispatch, project: ProjectDataState): MenuItem[] => [
    {
        id: 'CREATE',
        text: create.text,
        title: create.title,
        disabled: false,
        onClick: click(() => dispatch(createProject()))
    },
    {
        id: 'OPEN',
        text: open.text,
        title: open.title,
        disabled: false,
        onClick: click(() => dispatch(selectProject()))
    },
    {
        id: 'SAVE',
        text: save.text,
        title: save.title,
        disabled: (!project || project.saved),
        onClick: click(() => dispatch(saveProject()))
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: undo.title,
        disabled: (!project || !project.undo.length),
        onClick: click(() => dispatch(undoProject()))
    },
    {
        id: 'REDO',
        text: redo.text,
        title: redo.title,
        disabled: (!project || !project.redo.length),
        onClick: click(() => dispatch(redoProject()))
    },
    {
        id: 'CLOSE',
        text: close.text,
        title: close.title,
        disabled: !project,
        onClick: click(() => dispatch(closeProject()))
    }
];
