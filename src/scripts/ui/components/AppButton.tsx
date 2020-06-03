import React from 'react';

type OnClick = () => void;

const click = (cb: OnClick) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

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
        onClick={click(onClick)}
    >
        {ico}
    </button>
);
