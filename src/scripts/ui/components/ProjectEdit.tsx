import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { ProjectFile } from 'modules/project/file';
import { AppDispatch, AppState } from 'modules/store';
import { setProjectName, setProjectTempo } from 'modules/project';

import { OverlayUI } from 'ui/components/Overlay';
import { ProjectFormUI } from 'ui/components/ProjectForm';

export const ProjectEditUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectFile | null>(state => {
        return state.project ? state.project.file : null;
    });

    if (!project) {
        throw new Error();
    }
    const { name, tempo } = project;
    const dispatch = useDispatch<AppDispatch>();

    return (
        <OverlayUI title={TXT.project.title}>
            <ProjectFormUI
                name={name}
                tempo={tempo}
                onName={value => dispatch(setProjectName(value))}
                onTempo={value => dispatch(setProjectTempo(value))}
            />
        </OverlayUI>
    );
};
