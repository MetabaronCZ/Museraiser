import React from 'react';

import { AppButton } from 'ui/components/AppButton';
import { AppButtonList } from 'ui/components/AppButtonList';
import { settingsButtons } from 'ui/components/SettingsActions/buttons';

export const SettingsActions: React.SFC = () => (
    <AppButtonList>
        {settingsButtons.map(({ id, title, ico, onClick }) => (
            <AppButton title={title} ico={ico} onClick={onClick} key={id} />
        ))}
    </AppButtonList>
);
