import React, { useState, useEffect } from 'react';
import { changeOnly, OnChange } from 'modules/events';

type OnReset = () => void;

interface Props {
    readonly id: string;
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly unit?: string;
    readonly value: number;
    readonly defaultValue: number;
    readonly onChange: OnChange<number>;
}

const reset = (cb: OnReset) => (e: React.MouseEvent<HTMLInputElement>) => {
    if (1 === e.button) { // MMB
        cb();
    }
};

export const FormSlider: React.SFC<Props> = ({ id, min = 0, max = 1, step = 1, unit = '', defaultValue, value, onChange }) => {
    const [val, setValue] = useState<number>(value);

    // reset value when input props changes
    useEffect(() => setValue(value), [value]);

    return (
        <input
            id={id}
            className="FormSlider"
            type="range"
            name={id}
            title={`${val}${unit}`}
            value={val}
            min={min}
            max={max}
            step={step}
            onMouseDown={reset(() => onChange(defaultValue || 0))}
            onChange={changeOnly(v => setValue(parseInt(v, 10)))}
            onBlur={() => onChange(val)}
        />
    );
};
