import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'modules/store';
import { ProjectData } from 'modules/project';

import { IntroUI } from 'ui/components/Intro';
import { ProjectUI } from 'ui/components/Project';
import { SettingsUI } from 'ui/components/Settings';

export const RouterUI: React.SFC = () => {
    const project = useSelector<State, ProjectData | null>(state => state.project);
    const settings = useSelector<State, ProjectData | null>(state => state.settings.active);

    if (settings) {
        return <SettingsUI />;
    }
    if (project) {
        return <ProjectUI data={project} />;
    }
    return <IntroUI />;
};
