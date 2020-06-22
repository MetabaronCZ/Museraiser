import React from 'react';

import { TXT } from 'data/texts';

import { Paragraph } from 'ui/common/Paragraph';
import { TrackData } from 'modules/project/tracks/track';

interface Props {
    readonly track: TrackData | null;
}

export const PatternsUI: React.SFC<Props> = ({ track }) => {
    if (!track) {
        return <Paragraph>{TXT.track.notSelected}</Paragraph>;
    }
    const { patterns } = track;

    if (!patterns.length) {
        return <Paragraph>{TXT.pattern.noPatterns}</Paragraph>;
    }
    return (
        <Paragraph>
            {`[${track.patterns.map(ptn => ptn.name).join(', ')}]`}
        </Paragraph>
    );
};
