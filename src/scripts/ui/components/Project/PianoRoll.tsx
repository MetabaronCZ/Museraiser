import React from 'react';

import { TXT } from 'data/texts';
import { PatternData } from 'modules/project/pattern';

import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly pattern: PatternData | null;
}

export const PianoRollUI: React.SFC<Props> = ({ pattern }) => {
    if (!pattern) {
        return <Paragraph>{TXT.pattern.empty}</Paragraph>;
    }
    return (
        <pre className="Paragraph">
            {JSON.stringify(pattern, null, '/t')}
        </pre>
    );
};
