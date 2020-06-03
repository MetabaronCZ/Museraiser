import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectDataState } from 'modules/project';
import { AppDispatch, AppState } from 'modules/store';

import { AppButton } from 'ui/components/AppButton';
import { OverlayID, closeOverlay } from 'modules/overlay';
import { AppButtonList } from 'ui/components/AppButtonList';
import { getSettingsButtons } from 'ui/components/SettingsActions/buttons';

export const SettingsActions: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(s => s.project);
    const overlay = useSelector<AppState, OverlayID>(s => s.overlay);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <AppButtonList>
            {getSettingsButtons(dispatch, project).map(({ id, title, ico, disabled, onClick }) => {
                if (id === overlay) {
                    onClick = () => dispatch(closeOverlay());
                }
                return (
                    <AppButton
                        title={title}
                        ico={ico}
                        disabled={disabled}
                        onClick={onClick} key={id}
                    />
                );
            })}
        </AppButtonList>
    );
};
