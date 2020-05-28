import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const SettingsItemListUI: React.SFC<Props> = ({ children }) => {
    children = (Array.isArray(children) ? children : [children]);
    return (
        <ul className="SettingsItemList">
            {children.map((item, i) => (
                <li className="SettingsItemList-item" key={i}>
                    {item}
                </li>
            ))}
        </ul>
    );
};
