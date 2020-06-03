import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
            e.preventDefault();

            const key = e.keyCode || e.which;
            const isShift = e.shiftKey;
            const isCtrl = e.ctrlKey;

            switch (key) {
                case 78: // CTRL+N
                    if (isCtrl) dispatch(createProject());
                    return;
                case 79: // CTRL+O
                    if (isCtrl) dispatch(selectProject());
                    return;
                case 83: // CTRL+S
                    if (isCtrl) dispatch(saveProject());
                    return;
                case 90:
                    if (isCtrl) {
                        if (!isShift) {
                            // CTRL+Z
                            dispatch(undoProject());
                        } else {
                            // CTRL+SHIFT+Z
                            dispatch(redoProject());
                        }
                    }
                    return;
                case 87: // CTRL+W
                    if (isCtrl) dispatch(closeProject());
                    return;
                case 81: // CTRL+Q
                    if (isCtrl) closeWindow();
                    return;
                default:
                    // pass
            }
        };
        document.addEventListener('keydown', bind);

        return () => {
            document.removeEventListener('keydown', bind);
        };
    });

    return null;
};
