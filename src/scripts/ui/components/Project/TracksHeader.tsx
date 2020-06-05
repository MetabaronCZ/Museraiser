import React from 'react';

interface Props {
    readonly items: string[];
}

export const TracksHeaderUI: React.SFC<Props> = ({ items }) => {
    return (
        <ul className="TracksHeader">
            {items.map((item, i) => (
                <li className="TracksHeader-item" key={i}>
                    {item}
                </li>
            ))}
        </ul>
    );
};
