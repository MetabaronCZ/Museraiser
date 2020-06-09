import React from 'react';

import { TXT } from 'data/texts';

import { TrackData } from 'modules/project/track';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly track: TrackData | null;
}

export const PatternsUI: React.SFC<Props> = ({ track }) => (
    <Paragraph>
        {track
            ? `[${track.patterns.map(ptn => ptn.name).join(', ')}]`
            : TXT.track.notSelected
        }
    </Paragraph>
);
