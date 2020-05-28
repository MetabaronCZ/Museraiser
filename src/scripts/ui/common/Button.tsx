import React from 'react';

type OnClick = () => void;

interface Props {
    readonly text: string;
    readonly onClick: OnClick;
}

const click = (cb: OnClick) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

export const Button: React.SFC<Props> = ({ text, onClick }) => (
    <button
        className="Button"
        type="button"
        onClick={click(onClick)}
    >
        {text}
    </button>
);
