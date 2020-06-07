import React from 'react';
import { clickOnly, OnClick } from 'modules/events';

interface Props {
    readonly title: string;
    readonly ico: string;
    readonly disabled?: boolean;
    readonly onClick: OnClick;
}

export const AppButton: React.SFC<Props> = ({ title, ico, disabled = false, onClick }) => (
    <button
        className="AppButton"
        type="button"
        title={title}
        disabled={disabled}
        onClick={clickOnly(onClick)}
    >
        {ico}
    </button>
);
