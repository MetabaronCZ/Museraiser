import React from 'react';

import { TXT } from 'data/texts';

import { Paragraph } from 'ui/common/Paragraph';
import { TrackData } from 'modules/project/tracks/track';

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
