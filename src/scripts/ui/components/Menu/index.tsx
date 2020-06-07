import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clickOnly } from 'modules/events';
import { ProjectDataState } from 'modules/project';
import { AppState, AppDispatch } from 'modules/store';

import { getMenuItems } from 'ui/components/Menu/items';

export const Menu: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(s => s.project);
    const dispatch = useDispatch<AppDispatch>();
    const items = getMenuItems(dispatch, project);
    return (
        <ul className="Menu">
            {items.map(({ id, text, title, disabled, onClick }) => (
                <li className="Menu-item" key={id}>
                    <button
                        className="Menu-button"
                        type="button"
                        title={title}
                        disabled={disabled}
                        onClick={clickOnly(onClick)}
                    >
                        {text}
                    </button>
                </li>
            ))}
        </ul>
    );
};
