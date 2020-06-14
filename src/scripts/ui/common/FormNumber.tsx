import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { limitNumber } from 'core/number';
import { changeOnly, OnChange } from 'modules/events';

interface Props {
    readonly id: string;
    readonly min?: number;
    readonly max?: number;
    readonly step?: number;
    readonly mini?: boolean;
    readonly unit?: string;
    readonly value: number;
    readonly onChange: OnChange<number>;
}

const getInt = (value: string, defaultValue: number): number => {
    const int = parseInt(value, 10);
    return !isNaN(int) ? int : defaultValue;
};

const validate = (min: number, max: number, onChange: OnChange<number>) => (e: React.SyntheticEvent<HTMLInputElement>) => {
    let value = getInt(e.currentTarget.value, min);
    value = limitNumber(value, min, max);
    onChange(value);
};

export const FormNumber: React.SFC<Props> = ({ id, min = 0, max = 1, step = 1, mini = false, unit, value, onChange }) => {
    const [val, setValue] = useState<number>(value);

    // reset value when input props changes
    useEffect(() => setValue(value), [value]);

    return (
        <>
            <input
                id={id}
                className={cn('FormInput', {
                    'FormInput--mini': mini
                })}
                type="number"
                name={id}
                value={val}
                min={min}
                max={max}
                step={step}
                onChange={changeOnly(v => setValue(getInt(v, value)))}
                onWheel={validate(min, max, setValue)}
                onBlur={validate(min, max, onChange)}
            />
            {unit ? `\u00A0${unit}` : ''}
        </>
    );
};
