import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'modules/store';
import { ProjectData } from 'modules/project';

import { IntroUI } from 'ui/components/Intro';
import { ProjectUI } from 'ui/components/Project';

export const ContentUI: React.SFC = () => {
    const project = useSelector<State, ProjectData | null>(state => state.project);

    if (!project) {
        return <IntroUI />;
    }
    return <ProjectUI data={project} />;
};
