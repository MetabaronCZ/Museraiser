import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const List: React.SFC<Props> = ({ children }) => {
    children = (Array.isArray(children) ? children : [children]);
    return (
        <ul className="List">
            {children.map((child, i) => (
                <li className="List-item" key={i}>
                    {child}
                </li>
            ))}
        </ul>
    );
};
