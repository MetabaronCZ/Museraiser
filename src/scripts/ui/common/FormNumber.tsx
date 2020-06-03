import React from 'react';

type OnChange = (value: number) => void;

interface Props {
    readonly id: string;
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly value: number;
    readonly onChange: OnChange;
}

const change = (cb: OnChange) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const nr = parseInt(value, 10);
    cb(nr);
};

const wheel = () => (e: React.WheelEvent<HTMLInputElement>) => {
    const tgt = e.currentTarget;
    const value = parseInt(tgt.value, 10);
    const diff = (e.deltaY > 0 ? -1 : 1);
    tgt.value = `${value + diff}`;
};

export const FormNumber: React.SFC<Props> = ({ id, min, max, step = 1, value, onChange }) => (
    <input
        id={id}
        className="FormInput"
        type="number"
        name={id}
        value={value}
        min={min}
        max={max}
        step={step}
        onWheel={wheel}
        onChange={change(onChange)}
    />
);