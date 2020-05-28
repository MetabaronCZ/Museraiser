import { configureStore } from '@reduxjs/toolkit';

import { OverlayData, Overlay } from 'modules/overlay';
import { ProjectDataState, Project } from 'modules/project';
import { RecentProjectData, RecentProjects } from 'modules/recent-projects';

export interface State {
    readonly overlay: OverlayData;
    readonly project: ProjectDataState;
    readonly recentProjects: RecentProjectData;
}

export const store = configureStore<State>({
    reducer: {
        overlay: Overlay.reducer,
        project: Project.reducer,
        recentProjects: RecentProjects.reducer
    }
});

export type AppDispatch = typeof store.dispatch;
