import React from 'react';

import { AppButton } from 'ui/components/AppButton';
import { appButtons } from 'ui/components/AppActions/buttons';

export const AppActions: React.SFC = () => (
    <ul className="AppActions">
        {appButtons.map(({ id, title, ico, onClick }) => (
            <li className="AppActions-item" key={id}>
                <AppButton title={title} ico={ico} onClick={onClick} />
            </li>
        ))}
    </ul>
);
