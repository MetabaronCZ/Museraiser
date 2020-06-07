import React from 'react';
import cn from 'classnames';

import { clickOnly, OnClick } from 'modules/events';

interface Props {
    readonly text: string;
    readonly title?: string;
    readonly highlighted?: boolean;
    readonly onClick: OnClick;
}

export const TrackButton: React.SFC<Props> = ({ text, title, highlighted = false, onClick }) => (
    <button
        className={cn('TrackButton', {
            'is-highlighted': highlighted
        })}
        type="button"
        title={title}
        onClick={clickOnly(onClick)}
    >
        {text}
    </button>
);
