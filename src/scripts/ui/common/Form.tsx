import React from 'react';

interface Props {
    readonly children: React.ReactElement | React.ReactNode[];
}

export const Form: React.SFC<Props> = ({ children }) => {
    children = (Array.isArray(children) ? children : [children]);
    return (
        <form className="Form">
            {children.map((item, i) => (
                <fieldset className="Form-item" key={i}>
                    {item}
                </fieldset>
            ))}
        </form>
    );
};
