import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Key } from 'data/keys';

import { bindKey } from 'modules/keymap';
import { closeWindow } from 'modules/app';
import { AppDispatch } from 'modules/store';
import {
    selectProject, createProject,
    saveProject, undoProject, redoProject,
    closeProject
} from 'modules/project';

export const Keybindings: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const bind = (e: KeyboardEvent): void => {
            bindKey(e, 'CTRL', '-', Key.N, () => dispatch(createProject()));
            bindKey(e, 'CTRL', '-', Key.O, () => dispatch(selectProject()));
            bindKey(e, 'CTRL', '-', Key.S, () => dispatch(saveProject()));
            bindKey(e, 'CTRL', '-', Key.Z, () => dispatch(undoProject()));
            bindKey(e, 'CTRL', 'SHIFT', Key.Z, () => dispatch(redoProject()));
            bindKey(e, 'CTRL', '-', Key.W, () => dispatch(closeProject()));
            bindKey(e, 'CTRL', '-', Key.Q, () => closeWindow());
        };
        document.addEventListener('keydown', bind);

        return () => {
            document.removeEventListener('keydown', bind);
        };
    });

    return null;
};
