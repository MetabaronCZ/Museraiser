import React from 'react';

import { TXT } from 'data/texts';
import { PatternData } from 'modules/project/pattern';

import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly pattern?: PatternData;
}

export const PianoRollUI: React.SFC<Props> = ({ pattern }) => (
    <>
        <Heading text={TXT.pattern.title} />
        <Paragraph>
            {TXT.pattern.empty}
        </Paragraph>
    </>
);
