import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';
import { PROJECT } from 'data/config';

import { setProject } from 'modules/project';
import { AppDispatch, AppState } from 'modules/store';
import { createProjectFile } from 'modules/project/file';

import { Button } from 'ui/common/Button';
import { OverlayUI } from 'ui/components/Overlay';
import { ProjectFormUI } from 'ui/components/ProjectForm';

const create = (dispatch: AppDispatch, name: string, author: string, desc: string, tempo: number) => (): void => {
    const project = createProjectFile(name, author, desc, tempo);
    dispatch(setProject(project, null));
};

export const ProjectCreateUI: React.SFC = () => {
    const defaultAuthor = useSelector<AppState, string>(state => state.app.author);
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>(PROJECT.NAME.DEFAULT);
    const [author, setAuthor] = useState<string>(defaultAuthor);
    const [tempo, setTempo] = useState<number>(PROJECT.TEMPO.DEFAULT);
    const [desc, setDescription] = useState<string>(PROJECT.FILE.DESCRIPTION);
    const createProject = create(dispatch, name, author, desc, tempo);

    const createButton = (
        <Button text={TXT.create.new} onClick={createProject} />
    );
    return (
        <OverlayUI title={TXT.create.title} buttons={[createButton]}>
            <ProjectFormUI
                name={name}
                tempo={tempo}
                author={author}
                description={desc}
                onName={setName}
                onTempo={setTempo}
                onAuthor={setAuthor}
                onDescription={setDescription}
            />
        </OverlayUI>
    );
};
