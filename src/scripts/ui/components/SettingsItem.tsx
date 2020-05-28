import React from 'react';

interface Props {
    readonly id: string;
    readonly label: string;
}

export const SettingsItemUI: React.SFC<Props> = ({ id, label, children }) => (
    <div className="SettingsItem">
        <label className="SettingsItem-label" htmlFor={id}>
            {label}
        </label>

        <div className="SettingsItem-field">
            {children}
        </div>
    </div>
);
