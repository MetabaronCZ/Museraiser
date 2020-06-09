import React from 'react';

import { TXT } from 'data/texts';

import { TrackData } from 'modules/project/track';
import { Paragraph } from 'ui/common/Paragraph';

interface Props {
    readonly track: TrackData | null;
}

export const SampleUI: React.SFC<Props> = ({ track }) => {
    if (!track) {
        return <Paragraph>{TXT.track.notSelected}</Paragraph>;
    }
    const { sample } = track;

    if (!sample) {
        return <Paragraph>{TXT.sample.notSelected}</Paragraph>;
    }
    return (
        <Paragraph>
            {JSON.stringify(sample, null, '\t')}
        </Paragraph>
    );
};
