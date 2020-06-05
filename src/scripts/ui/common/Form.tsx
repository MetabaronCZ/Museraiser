import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const Form: React.SFC<Props> = ({ children }) => {
    children = (Array.isArray(children) ? children : [children]);
    return (
        <div className="Form">
            {children.map((item, i) => (
                <div className="Form-item" key={i}>
                    {item}
                </div>
            ))}
        </div>
    );
};
