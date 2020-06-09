import React from 'react';

type OnChange = (value: boolean) => void;

interface Props {
    readonly id: string;
    readonly checked: boolean;
    readonly onChange: OnChange;
}

const change = (cb: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    cb(checked);
};

export const FormCheckbox: React.SFC<Props> = ({ id, checked, onChange }) => (
    <input
        id={id}
        className="FormCheckbox"
        type="checkbox"
        name={id}
        value={id}
        checked={checked}
        onChange={change(onChange)}
    />
);
