import React from 'react';
import cn from 'classnames';

type ButtonListType = 'default' | 'stretched';

interface Props {
    readonly type?: ButtonListType;
    readonly children: React.ReactElement | React.ReactNode[];
}

export const ButtonList: React.SFC<Props> = ({ type = 'default', children }) => {
    children = Array.isArray(children) ? children : [children];
    return (
        <ul
            className={cn('ButtonList', {
                'ButtonList--stretched': ('stretched' === type)
            })}
        >
            {children.map((button, i) => (
                <li className="ButtonList-item" key={i}>
                    {button}
                </li>
            ))}
        </ul>
    );
};
