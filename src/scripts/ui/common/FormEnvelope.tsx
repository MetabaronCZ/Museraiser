import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const FormEnvelope: React.SFC<Props> = ({ children }) => {
    children = Array.isArray(children) ? children : [children];
    return (
        <ul className="FormEnvelope">
            {children.map((button, i) => (
                <li className="FormEnvelope-item" key={i}>
                    {button}
                </li>
            ))}
        </ul>
    );
};
