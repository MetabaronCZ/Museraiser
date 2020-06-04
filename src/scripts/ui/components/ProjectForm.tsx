import React from 'react';

import { TXT } from 'data/texts';
import { PROJECT } from 'data/config';

import { Form } from 'ui/common/Form';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { FormNumber } from 'ui/common/FormNumber';
import { FormTextarea } from 'ui/common/FormTextarea';

interface Props {
    readonly name: string;
    readonly tempo: number;
    readonly author: string;
    readonly description: string;
    readonly onName: (name: string) => void;
    readonly onTempo: (tempo: number) => void;
    readonly onAuthor: (author: string) => void;
    readonly onDescription: (desc: string) => void;
}

export const ProjectFormUI: React.SFC<Props> = props => {
    const { name, author, tempo, description } = props;
    const { onName, onAuthor, onTempo, onDescription } = props;
    return (
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

            <FormField id="author" label={TXT.project.fields.author}>
                <FormInput
                    id="author"
                    value={author}
                    min={PROJECT.AUTHOR.MIN}
                    max={PROJECT.AUTHOR.MAX}
                    onChange={onAuthor}
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

            <FormField id="description" label={TXT.project.fields.description} wide>
                <FormTextarea
                    id="description"
                    value={description}
                    min={PROJECT.DESCRIPTION.MIN}
                    max={PROJECT.DESCRIPTION.MAX}
                    onChange={onDescription}
                />
            </FormField>
        </Form>
    );
};
