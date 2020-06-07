import React, { useState, useEffect } from 'react';

type OnBlur = () => void;
type OnChange = (value: string) => void;

interface Props {
    readonly id: string;
    readonly value: string;
    readonly min?: number;
    readonly max?: number;
    readonly autofocus?: boolean;
    readonly defaultValue?: string;
    readonly onBlur?: OnBlur;
    readonly onChange: OnChange;
}

const change = (cb: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    cb(value);
};

const validate = (min = 0, max = 100, defaultValue = '-', setValue: OnChange, cb: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
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

export const FormInput: React.SFC<Props> = ({ id, value, min, max, defaultValue, autofocus = false, onChange, onBlur }) => {
    const [val, setValue] = useState<string>(value);

    // reset value when input props changes
    useEffect(() => setValue(value), [value]);

    const blur: OnChange = value => {
        onChange(value);

        if (onBlur) {
            onBlur();
        }
    };
    return (
        <input
            id={id}
            className="FormInput"
            type="text"
            name={id}
            value={val}
            minLength={min}
            maxLength={max}
            autoFocus={autofocus}
            onChange={change(setValue)}
            onBlur={validate(min, max, defaultValue, setValue, blur)}
        />
    );
};
