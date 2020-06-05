import React from 'react';

import { PatternData } from 'modules/project/pattern';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly patterns: PatternData[];
}

export const PatternsUI: React.SFC<Props> = ({ patterns }) => (
    <Paragraph>
        [{patterns.map(ptn => ptn.name).join(', ')}]
    </Paragraph>
);
