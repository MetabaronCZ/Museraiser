import React from 'react';
import cn from 'classnames';

type OnClick = () => void;

interface Props {
    readonly text: string;
    readonly title?: string;
    readonly highlighted?: boolean;
    readonly onClick: OnClick;
}

const click = (cb: OnClick) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

export const TrackButton: React.SFC<Props> = ({ text, title, highlighted = false, onClick }) => (
    <button
        className={cn('TrackButton', {
            'is-highlighted': highlighted
        })}
        type="button"
        title={title}
        onClick={click(onClick)}
    >
        {text}
    </button>
);
