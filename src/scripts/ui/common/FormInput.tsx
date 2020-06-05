import React, { useState, useEffect } from 'react';

type OnChange = (value: string) => void;

interface Props {
    readonly id: string;
    readonly value: string;
    readonly min?: number;
    readonly max?: number;
    readonly defaultValue?: string;
    readonly onChange: OnChange;
}

const change = (cb: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    cb(value);
};

const validate = (setValue: OnChange, cb: OnChange, min = 0, max = 100, defaultValue = '-') => (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { value } = e.currentTarget;

    if (value.length < min) {
        value = defaultValue;
    }
    if (value.length > max) {
        value = value.substring(0, max);
    }
    setValue(value);
    cb(value);
};

export const FormInput: React.SFC<Props> = ({ id, value, min, max, defaultValue, onChange }) => {
    const [val, setValue] = useState<string>(value);

    // reset value when input props changes
    useEffect(() => setValue(value), [value]);

    return (
        <input
            id={id}
            className="FormInput"
            type="text"
            name={id}
            value={val}
            minLength={min}
            maxLength={max}
            onChange={change(setValue)}
            onBlur={validate(setValue, onChange, min, max, defaultValue)}
        />
    );
};
