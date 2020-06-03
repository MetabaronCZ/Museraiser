import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { PROJECT_FILE_NAME, PROJECT_TEMPO } from 'data/config';

import { AppDispatch } from 'modules/store';
import { setProject } from 'modules/project';
import { createProjectFile } from 'modules/project/file';

import { Button } from 'ui/common/Button';
import { OverlayUI } from 'ui/components/Overlay';
import { ProjectFormUI } from 'ui/components/ProjectForm';

const getCreateButton = (dispatch: AppDispatch, name: string, tempo: number): React.ReactNode => (
    <Button
        text={TXT.create.new}
        onClick={() => {
            const project = createProjectFile(name, tempo);
            dispatch(setProject(project, null));
        }}
    />
);

export const ProjectCreateUI: React.SFC = () => {
    const [name, setName] = useState<string>(PROJECT_FILE_NAME);
    const [tempo, setTempo] = useState<number>(PROJECT_TEMPO);

    const dispatch = useDispatch<AppDispatch>();
    const createButton = getCreateButton(dispatch, name, tempo);

    return (
        <OverlayUI title={TXT.create.title} buttons={[createButton]}>
            <ProjectFormUI
                name={name}
                tempo={tempo}
                onName={setName}
                onTempo={setTempo}
            />
        </OverlayUI>
    );
};
