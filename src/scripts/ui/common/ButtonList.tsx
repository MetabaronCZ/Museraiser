import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const ButtonList: React.SFC<Props> = ({ children }) => {
    children = Array.isArray(children) ? children : [children];
    return (
        <ul className="ButtonList">
            {children.map((button, i) => (
                <li className="ButtonList-item" key={i}>
                    {button}
                </li>
            ))}
        </ul>
    );
};
