import { configureStore } from '@reduxjs/toolkit';

import { SettingsData, Settings } from 'modules/settings';
import { ProjectDataState, Project } from 'modules/project';
import { RecentProjectData, RecentProjects } from 'modules/recent-projects';

export interface State {
    readonly project: ProjectDataState;
    readonly settings: SettingsData;
    readonly recentProjects: RecentProjectData;
}

export const store = configureStore<State>({
    reducer: {
        project: Project.reducer,
        settings: Settings.reducer,
        recentProjects: RecentProjects.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
