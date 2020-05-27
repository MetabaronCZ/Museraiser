import React from 'react';

import { TXT } from 'data/texts';
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
    readonly onClick: OnMouseClick;
}

export const menuItems: MenuItem[] = [
    {
        id: 'NEW',
        text: create.text,
        title: create.title,
        onClick: click(() => Logger.log('NEW'))
    },
    {
        id: 'OPEN',
        text: open.text,
        title: open.title,
        onClick: click(() => Logger.log('OPEN'))
    },
    {
        id: 'SAVE',
        text: save.text,
        title: save.title,
        onClick: click(() => Logger.log('SAVE'))
    },
    {
        id: 'UNDO',
        text: undo.text,
        title: undo.title,
        onClick: click(() => Logger.log('UNDO'))
    },
    {
        id: 'REDO',
        text: redo.text,
        title: redo.title,
        onClick: click(() => Logger.log('REDO'))
    }
];
