import React from 'react';
import cn from 'classnames';

interface Props {
    readonly id: string;
    readonly label: string;
    readonly wide?: boolean;
}

export const FormField: React.SFC<Props> = ({ id, label, wide = false, children }) => (
    <div
        className={cn('FormField', {
            'FormField--wide': wide
        })}
    >
        <label className="FormField-label" htmlFor={id}>
            {label}
        </label>

        <div className="FormField-field">
            {children}
        </div>
    </div>
);
