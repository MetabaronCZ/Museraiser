import React from 'react';
import { remote } from 'electron';

import { TXT } from 'data/texts';
import { ask } from 'modules/dialogue';
import { AppButton } from 'ui/components/AppButton';

const minimize = (): void => {
    return remote.getCurrentWindow().minimize();
};

const maximize = (): void => {
    const win = remote.getCurrentWindow();

    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
};

const close = (): void => {
    ask(TXT.app.close.question, TXT.app.close.positive, TXT.app.close.negative)
        .then(result => {
            if (result) {
                remote.getCurrentWindow().close();
            }
        });
};

export const AppActions: React.SFC = () => (
    <ul className="AppActions">
        <li className="AppActions-item">
            <AppButton
                title={TXT.app.minimize.title}
                ico={TXT.app.minimize.ico}
                onClick={minimize}
            />
        </li>

        <li className="AppActions-item">
            <AppButton
                title={TXT.app.maximize.title}
                ico={TXT.app.maximize.ico}
                onClick={maximize}
            />
        </li>

        <li className="AppActions-item">
            <AppButton
                title={TXT.app.close.title}
                ico={TXT.app.close.ico}
                onClick={close}
            />
        </li>
    </ul>
);
