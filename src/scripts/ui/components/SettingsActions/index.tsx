import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'modules/store';

import { AppButton } from 'ui/components/AppButton';
import { AppButtonList } from 'ui/components/AppButtonList';
import { getSettingsButtons } from 'ui/components/SettingsActions/buttons';

export const SettingsActions: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <AppButtonList>
            {getSettingsButtons(dispatch).map(({ id, title, ico, onClick }) => (
                <AppButton title={title} ico={ico} onClick={onClick} key={id} />
            ))}
        </AppButtonList>
    );
};
