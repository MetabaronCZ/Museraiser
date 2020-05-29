import thunk, { ThunkAction } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';

import { OverlayID, Overlay } from 'modules/overlay';
import { ProjectDataState, Project } from 'modules/project';
import { RecentProjectData, RecentProjects } from 'modules/recent-projects';

export interface AppState {
    readonly overlay: OverlayID;
    readonly project: ProjectDataState;
    readonly recentProjects: RecentProjectData;
}

export const store = configureStore<AppState>({
    reducer: {
        overlay: Overlay.reducer,
        project: Project.reducer,
        recentProjects: RecentProjects.reducer
    },
    middleware: [
        thunk
    ]
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>
