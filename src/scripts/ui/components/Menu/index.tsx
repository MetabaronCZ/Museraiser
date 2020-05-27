import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'modules/store';
import { getMenuItems } from 'ui/components/Menu/items';

export const Menu: React.SFC = () => {
    const state = useSelector<State, State>(s => s);
    const items = getMenuItems(state);
    return (
        <ul className="Menu">
            {items.map(({ id, text, title, disabled, onClick }) => (
                <li className="Menu-item" key={id}>
                    <button
                        className="Menu-button"
                        type="button"
                        title={title}
                        disabled={disabled}
                        onClick={onClick}
                    >
                        {text}
                    </button>
                </li>
            ))}
        </ul>
    );
};
