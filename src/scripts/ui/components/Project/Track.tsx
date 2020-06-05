import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { TRACK } from 'data/config';

import { AppDispatch } from 'modules/store';
import { setTrackName } from 'modules/project/actions';
import { getDefaultTrackName, TrackData } from 'modules/project/track';

import { Heading } from 'ui/common/Heading';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { Paragraph } from 'ui/common/Paragraph';
import { SampleUI } from 'ui/components/Project/Sample';
import { PatternsUI } from 'ui/components/Project/Patterns';

const { NAME } = TRACK;

interface Props {
    readonly track: TrackData | null;
}

export const TrackUI: React.SFC<Props> = ({ track }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (!track) {
        return (
            <>
                <Heading text={TXT.track.title} />
                <Paragraph>{TXT.track.notSelected}</Paragraph>
            </>
        );
    }
    const { id, name, sample, patterns } = track;
    const defaultName = getDefaultTrackName(id);
    return (
        <>
            <Heading text={TXT.track.title} />
            <FormField id="track-name" label={TXT.track.name} wide>
                <FormInput
                    id="track-name"
                    value={name}
                    min={NAME.MIN}
                    max={NAME.MAX}
                    defaultValue={defaultName}
                    onChange={value => dispatch(setTrackName(id, value))}
                />
            </FormField>

            <Heading text={TXT.track.sample} />
            <SampleUI sample={sample} />

            <Heading text={TXT.track.patterns} />
            <PatternsUI patterns={patterns} />
        </>
    );
};
