import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { Audio } from 'modules/audio';
import { AppDispatch } from 'modules/store';
import { TrackData } from 'modules/project/track';
import { selectTrackSample, setTrackSampleLoop } from 'modules/project/actions';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { Paragraph } from 'ui/common/Paragraph';
import { FormField } from 'ui/common/FormField';
import { FormCheckbox } from 'ui/common/FormCheckbox';

interface Props {
    readonly track: TrackData | null;
}

export const SampleUI: React.SFC<Props> = ({ track }) => {
    const dispatch = useDispatch<AppDispatch>();

    if (!track) {
        return (
            <>
                <Heading text={TXT.track.sample} />
                <Paragraph>{TXT.track.notSelected}</Paragraph>
            </>
        );
    }
    const { id, sample } = track;
    return (
        <>
            <Heading
                text={TXT.track.sample}
                extra={
                    <Button
                        text={TXT.sample.select}
                        onClick={() => dispatch(selectTrackSample(id))}
                    />
                }
            />
            {sample
                ? (
                    <>
                        <FormField id="sample-loop" label={TXT.sample.name}>
                            {sample.name}
                        </FormField>

                        <FormField id="sample-loop" label={TXT.sample.loop}>
                            <FormCheckbox
                                id="sample-loop"
                                checked={sample.loop}
                                onChange={value => dispatch(setTrackSampleLoop(id, value))}
                            />
                        </FormField>

                        <Button
                            text="Play"
                            onClick={() => Audio.audit(sample, 0.5)}
                        />
                    </>
                )
                : <Paragraph>{TXT.sample.notSelected}</Paragraph>
            }
        </>
    );
};
