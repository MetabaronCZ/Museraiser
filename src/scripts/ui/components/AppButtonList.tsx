import React from 'react';

interface Props {
    readonly children: React.ReactNode[];
}

export const AppButtonList: React.SFC<Props> = ({ children }) => (
    <ul className="AppButtonList">
        {children.map((button, i) => (
            <li className="AppButtonList-item" key={i}>
                {button}
            </li>
        ))}
    </ul>
);
