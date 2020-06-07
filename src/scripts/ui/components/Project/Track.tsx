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

export const TrackUI: React.SFC<Props> = ({ track }) => (
    <>
        <Heading text={TXT.track.patterns} />
        {track
            ? <PatternsUI patterns={track.patterns} />
            : <Paragraph>{TXT.track.notSelected}</Paragraph>
        }
        {!!track && (
            <>
                <Heading text={TXT.track.sample} />
                <SampleUI sample={track.sample} />
            </>
        )}
    </>
);
