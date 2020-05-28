import React from 'react';

import { AppButton } from 'ui/components/AppButton';
import { AppButtonList } from 'ui/components/AppButtonList';
import { windowButtons } from 'ui/components/WindowActions/buttons';

export const WindowActions: React.SFC = () => (
    <AppButtonList>
        {windowButtons.map(({ id, title, ico, onClick }) => (
            <AppButton title={title} ico={ico} onClick={onClick} key={id} />
        ))}
    </AppButtonList>
);
