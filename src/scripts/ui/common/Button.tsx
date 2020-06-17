import React from 'react';
import { clickOnly, OnClick } from 'modules/events';

const noFn = (): void => undefined;

interface Props {
    readonly text: string;
    readonly onClick?: OnClick;
    readonly onMouseUp?: OnClick;
    readonly onMouseDown?: OnClick;
}

const click = (cb: OnClick) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const focused = document.activeElement as HTMLElement;

    if (focused) {
        focused.blur();
    }
    e.currentTarget.focus();
    cb();
};

export const Button: React.SFC<Props> = ({ text, onClick = noFn, onMouseUp = noFn, onMouseDown = noFn }) => (
    <button
        className="Button"
        type="button"
        onClick={click(onClick)}
        onMouseUp={clickOnly(onMouseUp)}
        onMouseDown={clickOnly(onMouseDown)}
    >
        {text}
    </button>
);
