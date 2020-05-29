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
        onClick: click(() => createProject(dispatch, project))
    },
    {
        id: 'OPEN',
        text: open.text,
        title: open.title,
        disabled: false,
        onClick: click(() => selectProject(dispatch, project))
    },
    {
        id: 'SAVE',
        text: save.text,
        title: save.title,
        disabled: (!project || project.saved),
        onClick: click(() => saveProject(dispatch))
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: undo.title,
        disabled: (!project || !project.undo.length),
        onClick: click(() => undoProject(dispatch))
    },
    {
        id: 'REDO',
        text: redo.text,
        title: redo.title,
        disabled: (!project || !project.redo.length),
        onClick: click(() => redoProject(dispatch))
    },
    {
        id: 'CLOSE',
        text: close.text,
        title: close.title,
        disabled: !project,
        onClick: click(() => closeProject(dispatch, project))
    }
];
