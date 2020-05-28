import React from 'react';
import cn from 'classnames';

interface Props {
    readonly title?: string;
    readonly limited?: boolean;
    readonly onClick: Function;
}

const click = (cb: Function) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

export const LinkButton: React.SFC<Props> = ({ title, limited = false, onClick, children }) => (
    <button
        className={cn('LinkButton', {
            'LinkButton--limited': limited
        })}
        type="button"
        title={title}
        onClick={click(onClick)}
    >
        {children}
    </button>
);
