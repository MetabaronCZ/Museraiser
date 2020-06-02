import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { PROJECT_FILE_NAME, PROJECT_SAMPLE_RATE } from 'data/config';

import { AppDispatch } from 'modules/store';
import { setProject } from 'modules/project';
import { createProjectFile } from 'modules/project/file';

import { Form } from 'ui/common/Form';
import { Button } from 'ui/common/Button';
import { FormField } from 'ui/common/FormField';
import { FormInput } from 'ui/common/FormInput';
import { OverlayUI } from 'ui/components/Overlay';

type OnClick = () => void;

const getCreateButton = (onClick: OnClick): React.ReactNode => (
    <Button text={TXT.create.new} onClick={onClick} />
);

export const CreateUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState<string>(PROJECT_FILE_NAME);

    const createButton = getCreateButton(() => {
        const project = createProjectFile(name);
        dispatch(setProject(project));
    });

    return (
        <OverlayUI title={TXT.create.title} buttons={[createButton]}>
            <Form>
                <FormField id="name" label={TXT.create.name}>
                    <FormInput
                        id="name"
                        value={name}
                        onChange={setName}
                    />
                </FormField>

                <FormField id="sample-rate" label={TXT.create.sampleRate}>
                    {PROJECT_SAMPLE_RATE} Hz
                </FormField>
            </Form>
        </OverlayUI>
    );
};
