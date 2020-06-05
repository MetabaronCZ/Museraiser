import React from 'react';

type OnChange = (value: string) => void;

interface Props {
    readonly id: string;
    readonly value: string;
    readonly min?: number;
    readonly max?: number;
    readonly onBlur?: OnChange;
    readonly onChange?: OnChange;
}

const change = (cb?: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (cb) {
        const { value } = e.currentTarget;
        cb(value);
    }
};

export const FormInput: React.SFC<Props> = ({ id, value, min, max, onChange, onBlur }) => (
    <input
        id={id}
        className="FormInput"
        type="text"
        name={id}
        value={value}
        minLength={min}
        maxLength={max}
        onBlur={change(onBlur)}
        onChange={change(onChange)}
    />
);
