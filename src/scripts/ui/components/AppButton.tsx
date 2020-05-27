import React from 'react';

const click = (cb: Function) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

interface Props {
    readonly title: string;
    readonly ico: string;
    readonly onClick: Function;
}

export const AppButton: React.SFC<Props> = ({ title, ico, onClick }) => (
    <button
        className="AppButton"
        type="button"
        title={title}
        onClick={click(onClick)}
    >
        {ico}
    </button>
);
