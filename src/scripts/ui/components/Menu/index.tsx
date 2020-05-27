import React from 'react';
import { menuItems } from 'ui/components/Menu/item';

export const Menu: React.SFC = () => (
    <ul className="Menu">
        {menuItems.map(({ id, text, title, onClick }) => (
            <li className="Menu-item" key={id}>
                <button
                    className="Menu-button"
                    type="button"
                    title={title}
                    onClick={onClick}
                >
                    {text}
                </button>
            </li>
        ))}
    </ul>
);
