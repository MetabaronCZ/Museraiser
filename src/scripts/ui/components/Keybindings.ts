import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Key } from 'data/keys';
import { IS_DEV } from 'data/config';

import { AppDispatch } from 'modules/store';
import { closeWindow } from 'modules/app/actions';
import { bindKey, unbindKey } from 'modules/keymap';
import {
    selectProject, createProject,
    saveProject, undoProject, redoProject, closeProject
} from 'modules/project/actions';

export const Keybindings: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const bind = (e: KeyboardEvent): void => {
            // global key bindings
            bindKey(e, 'CTRL', '-', Key.N, () => dispatch(createProject()));
            bindKey(e, 'CTRL', '-', Key.O, () => dispatch(selectProject()));
            bindKey(e, 'CTRL', '-', Key.S, () => dispatch(saveProject()));
            bindKey(e, 'CTRL', '-', Key.Z, () => dispatch(undoProject()));
            bindKey(e, 'CTRL', 'SHIFT', Key.Z, () => dispatch(redoProject()));
            bindKey(e, 'CTRL', '-', Key.W, () => dispatch(closeProject()));
            bindKey(e, 'CTRL', '-', Key.Q, () => closeWindow());

            if (!IS_DEV) {
                // unbind events in prod mode
                unbindKey(e, 'CTRL', '-', Key.R);
                unbindKey(e, 'CTRL', 'SHIFT', Key.I);
            }
        };
        document.addEventListener('keydown', bind);

        return () => {
            document.removeEventListener('keydown', bind);
        };
    });

    return null;
};
