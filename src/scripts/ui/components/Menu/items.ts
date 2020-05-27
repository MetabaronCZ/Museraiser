import React from 'react';

import { TXT } from 'data/texts';
import { State } from 'modules/store';
import { Logger } from 'modules/logger';

const { new: create, open, save, undo, redo } = TXT.menu;

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

export const getMenuItems = (state: State): MenuItem[] => [
    {
        id: 'NEW',
        text: create.text,
        title: create.title,
        disabled: false,
        onClick: click(() => Logger.log('NEW'))
    },
    {
        id: 'OPEN',
        text: open.text,
        title: open.title,
        disabled: false,
        onClick: click(() => Logger.log('OPEN'))
    },
    {
        id: 'SAVE',
        text: save.text,
        title: save.title,
        disabled: true,
        onClick: click(() => Logger.log('SAVE'))
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: undo.title,
        disabled: true,
        onClick: click(() => Logger.log('UNDO'))
    },
    {
        id: 'REDO',
        text: redo.text,
        title: redo.title,
        disabled: true,
        onClick: click(() => Logger.log('REDO'))
    }
];
