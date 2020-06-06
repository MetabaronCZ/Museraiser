import React from 'react';

import { TXT } from 'data/texts';

import { OverlayUI } from 'ui/components/Overlay';
import { Paragraph } from 'ui/common/Paragraph';

export const AboutUI: React.SFC = () => (
    <OverlayUI title={TXT.about.title}>
        <Paragraph>
            {TXT.about.text}
        </Paragraph>
    </OverlayUI>
);
