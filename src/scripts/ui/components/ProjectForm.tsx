import React from 'react';

import { TXT } from 'data/texts';
import { PROJECT } from 'data/config';

import { Form } from 'ui/common/Form';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { FormNumber } from 'ui/common/FormNumber';

interface Props {
    readonly name: string;
    readonly tempo: number;
    readonly onName: (name: string) => void;
    readonly onTempo: (tempo: number) => void;
}

export const ProjectFormUI: React.SFC<Props> = ({ name, tempo, onName, onTempo }) => (
    <Form>
        <FormField id="name" label={TXT.project.fields.name}>
            <FormInput
                id="name"
                value={name}
                min={PROJECT.NAME.MIN}
                max={PROJECT.NAME.MAX}
                onChange={onName}
            />
        </FormField>

        <FormField id="tempo" label={TXT.project.fields.tempo}>
            <FormNumber
                id="tempo"
                value={tempo}
                min={PROJECT.TEMPO.MIN}
                max={PROJECT.TEMPO.MAX}
                step={1}
                onChange={onTempo}
            />
        </FormField>

        <FormField id="sample-rate" label={TXT.project.fields.sampleRate}>
            {PROJECT.SAMPLE.RATE} Hz
        </FormField>
    </Form>
);
