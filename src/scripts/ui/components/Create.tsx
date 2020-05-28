import React from 'react';

import { TXT } from 'data/texts';

import { Paragraph } from 'ui/common/Paragraph';
import { OverlayUI } from 'ui/components/Overlay';

export const CreateUI: React.SFC = () => {
    return (
        <OverlayUI title={TXT.create.title}>
            <Paragraph>...</Paragraph>
        </OverlayUI>
    );
};
