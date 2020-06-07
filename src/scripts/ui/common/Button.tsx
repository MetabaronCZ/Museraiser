import React from 'react';
import { clickOnly, OnClick } from 'modules/events';

interface Props {
    readonly text: string;
    readonly onClick: OnClick;
}

export const Button: React.SFC<Props> = ({ text, onClick }) => (
    <button
        className="Button"
        type="button"
        onClick={clickOnly(onClick)}
    >
        {text}
    </button>
);
