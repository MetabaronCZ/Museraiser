import React from 'react';

import { TXT } from 'data/texts';
import { TrackData } from 'modules/project/track';

import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { SampleUI } from 'ui/components/Project/Sample';
import { PatternsUI } from 'ui/components/Project/Patterns';

interface Props {
    readonly track: TrackData | null;
}

export const TrackUI: React.SFC<Props> = ({ track }) => {
    if (!track) {
        return (
            <>
                <Heading text={TXT.track.title} />
                <Paragraph>{TXT.track.notSelected}</Paragraph>
            </>
        );
    }
    return (
        <>
            <Heading text={TXT.track.patterns} />
            <PatternsUI patterns={track.patterns} />

            <Heading text={TXT.track.sample} />
            <SampleUI sample={track.sample} />
        </>
    );
};
