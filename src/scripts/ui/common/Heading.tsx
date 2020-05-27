import React from 'react';

interface Props {
    readonly text: string;
    readonly size?: 'default' | 'small' | 'large';
}

export const Heading: React.SFC<Props> = ({ text, size = 'default' }) => {
    switch (size) {
        case 'small':
            return <h3 className="Heading Heading--small">{text}</h3>;
        case 'large':
            return <h1 className="Heading Heading--large">{text}</h1>;
        default:
            return <h2 className="Heading">{text}</h2>;
    }
};
