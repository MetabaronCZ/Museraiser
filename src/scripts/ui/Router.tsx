import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'modules/store';
import { OverlayData } from 'modules/overlay';
import { ProjectDataState } from 'modules/project';

import { IntroUI } from 'ui/components/Intro';
import { CreateUI } from 'ui/components/Create';
import { ProjectUI } from 'ui/components/Project';
import { SettingsUI } from 'ui/components/Settings';

export const RouterUI: React.SFC = () => {
    const overlay = useSelector<AppState, OverlayData>(state => state.overlay);
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    switch (overlay) {
        case 'CREATE':
            return <CreateUI />;
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
