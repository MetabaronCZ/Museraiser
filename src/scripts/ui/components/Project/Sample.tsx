import React from 'react';

import { SampleData } from 'modules/project/sample';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly sample: SampleData | null;
}

export const SampleUI: React.SFC<Props> = ({ sample }) => (
    <Paragraph>
        {sample ? sample.name : 'none'}
    </Paragraph>
);
