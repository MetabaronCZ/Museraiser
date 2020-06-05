import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';
import { TRACK } from 'data/config';

import { AppDispatch, AppState } from 'modules/store';
import { getDefaultTrackName } from 'modules/project/track';
import { ProjectDataState, setTrackName } from 'modules/project';

import { Form } from 'ui/common/Form';
import { Heading } from 'ui/common/Heading';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { Paragraph } from 'ui/common/Paragraph';
import { SampleUI } from 'ui/components/Project/Sample';
import { PatternsUI } from 'ui/components/Project/Patterns';

const { NAME } = TRACK;

export const TrackUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const project = useSelector<AppState, ProjectDataState>(state => state.project);
    const id = project ? project.track : null;

    if (!project || !id) {
        return (
            <>
                <Heading size="small" text={TXT.track.title} />
                <Paragraph>{TXT.track.notSelected}</Paragraph>
            </>
        );
    }
    const { name, sample, patterns } = project.file.tracks[id];
    const defaultName = getDefaultTrackName(id);
    return (
        <Form>
            <Heading size="small" text={TXT.track.title} />
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

            <Heading size="small" text={TXT.track.sample} />
            <SampleUI sample={sample} />

            <Heading size="small" text={TXT.track.patterns} />
            <PatternsUI patterns={patterns} />
        </Form>
    );
};
