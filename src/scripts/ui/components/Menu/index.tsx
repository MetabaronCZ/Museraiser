import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState, AppDispatch } from 'modules/store';
import { getMenuItems } from 'ui/components/Menu/items';

export const Menu: React.SFC = () => {
    const state = useSelector<AppState, AppState>(s => s);
    const dispatch = useDispatch<AppDispatch>();
    const items = getMenuItems(state, dispatch);
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
