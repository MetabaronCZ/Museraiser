import React from 'react';
import cn from 'classnames';

import { changeOnly, OnChange } from 'modules/events';
import { FormSelectOption } from 'ui/common/FormSelect/options';

interface Props {
    readonly id: string;
    readonly value: string;
    readonly options: FormSelectOption[];
    readonly mini?: boolean;
    readonly onChange: OnChange;
}

export const FormSelect: React.SFC<Props> = ({ id, value, options, mini = false, onChange }) => (
    <select
        id={id}
        className={cn('FormSelect', {
            'FormSelect--mini': mini
        })}
        name={id}
        value={value}
        disabled={options.length < 2}
        onChange={changeOnly(onChange)}
    >
        {options.map(option => (
            <option value={option.value} key={option.value}>
                {option.label}
            </option>
        ))}
    </select>
);
