import React from 'react';
import { changeOnly, OnChange } from 'modules/events';

interface Props {
    readonly id: string;
    readonly value: string;
    readonly min?: number;
    readonly max?: number;
    readonly onChange: OnChange;
}

export const FormTextarea: React.SFC<Props> = ({ id, value, min, max, onChange }) => (
    <textarea
        id={id}
        className="FormTextarea"
        name={id}
        value={value}
        minLength={min}
        maxLength={max}
        onChange={changeOnly(onChange)}
    />
);
