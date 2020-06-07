import React from 'react';
import cn from 'classnames';

import { clickOnly, OnClick } from 'modules/events';

interface Props {
    readonly title?: string;
    readonly limited?: boolean;
    readonly onClick: OnClick;
}

export const LinkButton: React.SFC<Props> = ({ title, limited = false, onClick, children }) => (
    <button
        className={cn('LinkButton', {
            'LinkButton--limited': limited
        })}
        type="button"
        title={title}
        onClick={clickOnly(onClick)}
    >
        {children}
    </button>
);
