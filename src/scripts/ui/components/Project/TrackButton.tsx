import React from 'react';
import cn from 'classnames';

type OnClick = () => void;

interface Props {
    readonly text: string;
    readonly title?: string;
    readonly category?: boolean;
    readonly highlighted?: boolean;
    readonly onClick: OnClick;
}

const click = (cb: OnClick) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

export const TrackButton: React.SFC<Props> = ({ text, title, category = false, highlighted = false, onClick }) => (
    <button
        className={cn('TrackButton', {
            'TrackButton--category': category,
            'is-highlighted': highlighted
        })}
        type="button"
        title={title}
        onClick={click(onClick)}
    >
        {text}
    </button>
);
