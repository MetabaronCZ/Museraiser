import React from 'react';

import { TXT } from 'data/texts';
import { PROJECT } from 'data/config';

import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { FormNumber } from 'ui/common/FormNumber';
import { FormTextarea } from 'ui/common/FormTextarea';

const { NAME, AUTHOR, DESCRIPTION, TEMPO, SAMPLE } = PROJECT;

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
        <>
            <FormField id="name" label={TXT.project.fields.name}>
                <FormInput
                    id="name"
                    value={name}
                    min={NAME.MIN}
                    max={NAME.MAX}
                    defaultValue={NAME.DEFAULT}
                    onChange={onName}
                />
            </FormField>

            <FormField id="author" label={TXT.project.fields.author}>
                <FormInput
                    id="author"
                    value={author}
                    min={AUTHOR.MIN}
                    max={AUTHOR.MAX}
                    onChange={onAuthor}
                />
            </FormField>

            <FormField id="tempo" label={TXT.project.fields.tempo}>
                <FormNumber
                    id="tempo"
                    value={tempo}
                    min={TEMPO.MIN}
                    max={TEMPO.MAX}
                    onChange={onTempo}
                />
            </FormField>

            <FormField id="sample-rate" label={TXT.project.fields.sampleRate}>
                {SAMPLE.RATE} Hz
            </FormField>

            <FormField id="description" label={TXT.project.fields.description} wide>
                <FormTextarea
                    id="description"
                    value={description}
                    min={DESCRIPTION.MIN}
                    max={DESCRIPTION.MAX}
                    onChange={onDescription}
                />
            </FormField>
        </>
    );
};
