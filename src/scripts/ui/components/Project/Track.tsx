import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';
import { TRACK } from 'data/config';

import { TrackID } from 'modules/project/track';
import { AppDispatch, AppState } from 'modules/store';
import { ProjectDataState, setTrackName } from 'modules/project';

import { Form } from 'ui/common/Form';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { Paragraph } from 'ui/common/Paragraph';

const { NAME } = TRACK;

export const TrackUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);
    const dispatch = useDispatch<AppDispatch>();

    if (!project) {
        return (
            <Paragraph>
                {TXT.track.notSelected}
            </Paragraph>
        );
    }
    const id: TrackID = 'T01';
    const { name, sample, patterns } = project.file.tracks[id];
    return (
        <Form>
            <FormField id="track-name" label={TXT.track.name} wide>
                <FormInput
                    id="track-name"
                    value={name}
                    min={NAME.MIN}
                    max={NAME.MAX}
                    onChange={value => dispatch(setTrackName(id, value))}
                />
            </FormField>

            <FormField id="track-sample" label={TXT.track.sample} wide>
                {sample ? sample.name : 'none'}
            </FormField>

            <FormField id="track-patterns" label={TXT.track.patterns} wide>
                [{patterns.map(ptn => ptn.name).join(', ')}]
            </FormField>
        </Form>
    );
};
