import React from 'react';

interface Props {
    readonly id: string;
    readonly label: string;
}

export const FormField: React.SFC<Props> = ({ id, label, children }) => (
    <div className="FormField">
        <label className="FormField-label" htmlFor={id}>
            {label}
        </label>

        <div className="FormField-field">
            {children}
        </div>
    </div>
);
