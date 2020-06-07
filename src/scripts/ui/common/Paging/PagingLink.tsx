import React from 'react';
import { clickOnly, OnClick } from 'modules/events';

interface Props {
    readonly text: string | number;
    readonly title?: string;
    readonly active?: boolean;
    readonly onClick: OnClick;
}

export const PagingLink: React.SFC<Props> = ({ text, title, active = true, onClick }) => (
    <button
        className="Paging-link"
        type="button"
        title={title}
        disabled={!active}
        onClick={clickOnly(onClick)}
    >
        {text}
    </button>
);
