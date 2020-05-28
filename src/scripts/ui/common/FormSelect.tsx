import React from 'react';

type OnChange = (value: string) => void;

interface FormSelectOption {
    readonly label: string;
    readonly value: string;
}

interface Props {
    readonly id: string;
    readonly value: string;
    readonly options: FormSelectOption[];
    readonly onChange: OnChange;
}

const change = (cb: OnChange) => (e: React.SyntheticEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    cb(value);
};

type OptionCreationFn<T> = (item: T) => FormSelectOption;

export const createSelectOptions = <T extends any>(arr: T[], cb: OptionCreationFn<T>): FormSelectOption[] => {
    return arr.map(item => cb(item));
};

export const FormSelect: React.SFC<Props> = ({ id, value, options, onChange }) => (
    <select
        id={id}
        className="FormSelect"
        name={id}
        value={value}
        disabled={options.length < 2}
        onChange={change(onChange)}
    >
        {options.map(option => (
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);
