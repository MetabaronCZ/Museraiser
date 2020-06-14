import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch, AppState } from 'modules/store';
import { ProjectFileData } from 'modules/project/file';
import {
    setProjectName, setProjectTempo, setProjectAuthor, setProjectDescription
} from 'modules/project/actions';

import { OverlayUI } from 'ui/components/Overlay';
import { ProjectFormUI } from 'ui/components/ProjectForm';

export const ProjectEditUI: React.SFC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const project = useSelector<AppState, ProjectFileData | null>(state => {
        return state.project ? state.project.file : null;
    });

    if (!project) {
        return null;
    }
    const { name, author, tempo, description } = project;
    return (
        <OverlayUI title={TXT.project.title}>
            <ProjectFormUI
                name={name}
                tempo={tempo}
                author={author}
                description={description}
                onName={value => dispatch(setProjectName(value))}
                onTempo={value => dispatch(setProjectTempo(value))}
                onAuthor={value => dispatch(setProjectAuthor(value))}
                onDescription={value => dispatch(setProjectDescription(value))}
            />
        </OverlayUI>
    );
};
