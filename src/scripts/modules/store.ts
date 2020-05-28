import { configureStore } from '@reduxjs/toolkit';

import { ProjectDataState, Project } from 'modules/project';
import { RecentProjectData, RecentProjects } from 'modules/recent-projects';

export interface State {
    readonly project: ProjectDataState;
    readonly recentProjects: RecentProjectData;
}

export const store = configureStore<State>({
    reducer: {
        project: Project.reducer,
        recentProjects: RecentProjects.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
