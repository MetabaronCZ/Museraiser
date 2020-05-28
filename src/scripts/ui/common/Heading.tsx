import React from 'react';

interface Props {
    readonly text: string;
    readonly size?: 'default' | 'small' | 'large';
    readonly extra?: React.ReactNode;
}

export const Heading: React.SFC<Props> = ({ text, size = 'default', extra }) => {
    let content: React.ReactNode = text;

    if (extra) {
        content = (
            <>
                <div className="Heading-text">{text}</div>
                <div className="Heading-extra">{extra}</div>
            </>
        );
    }
    switch (size) {
        case 'small':
            return <h3 className="Heading Heading--small">{content}</h3>;
        case 'large':
            return <h1 className="Heading Heading--large">{content}</h1>;
        default:
            return <h2 className="Heading">{content}</h2>;
    }
};
