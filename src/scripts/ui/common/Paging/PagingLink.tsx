import React from 'react';

type OnClick = () => void;

const click = (cb: OnClick) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cb();
};

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
        onClick={click(onClick)}
    >
        {text}
    </button>
);
