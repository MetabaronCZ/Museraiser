import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'modules/store';
import { OverlayID } from 'modules/overlay';
import { ProjectDataState } from 'modules/project';

import { IntroUI } from 'ui/components/Intro';
import { ProjectUI } from 'ui/components/Project';
import { SettingsUI } from 'ui/components/Settings';
import { ProjectEditUI } from 'ui/components/ProjectEdit';
import { ProjectCreateUI } from 'ui/components/ProjectCreate';

export const RouterUI: React.SFC = () => {
    const overlay = useSelector<AppState, OverlayID>(state => state.overlay);
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    switch (overlay) {
        case 'CREATE':
            return <ProjectCreateUI />;
        case 'PROJECT':
            return <ProjectEditUI />;
        case 'SETTINGS':
            return <SettingsUI />;
        default:
            // pass
    }
    if (project) {
        return <ProjectUI />;
    }
    return <IntroUI />;
};
