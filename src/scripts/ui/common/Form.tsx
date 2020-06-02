import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const Form: React.SFC<Props> = ({ children }) => {
    children = (Array.isArray(children) ? children : [children]);
    return (
        <ul className="Form">
            {children.map((item, i) => (
                <li className="Form-item" key={i}>
                    {item}
                </li>
            ))}
        </ul>
    );
};
