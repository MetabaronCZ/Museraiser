import React from 'react';

import { TXT } from 'data/texts';

import { PatternData } from 'modules/project/pattern';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly pattern?: PatternData;
}

export const PianoRollUI: React.SFC<Props> = ({ pattern }) => (
    <Paragraph>
        {pattern
            ? JSON.stringify(pattern, null, '/t')
            : TXT.pattern.empty
        }
    </Paragraph>
);
