import { TXT } from 'data/texts';

import { Dialog } from 'modules/dialog';
import { AppThunk } from 'modules/store';
import { RecentProjects, RecentProjectMaxValue } from 'modules/recent-projects';

export const addRecentProject = (path: string): AppThunk => dispatch => {
    dispatch(RecentProjects.actions.add(path));
};

export const removeRecentProject = (path: string): AppThunk => dispatch => {
    Dialog.ask(TXT.recentProjects.remove.ask).then(result => {
        if (result) {
            dispatch(RecentProjects.actions.remove(path));
        }
    });
};

export const clearRecentProjects = (): AppThunk => dispatch => {
    Dialog.ask(TXT.recentProjects.clear.ask).then(result => {
        if (result) {
            dispatch(RecentProjects.actions.clear());
        }
    });
};

export const setMaxRecentFiles = (value: string): AppThunk => dispatch => {
    const max = parseInt(value, 10) as RecentProjectMaxValue;
    dispatch(RecentProjects.actions.setMax(max));
};

export const setRecentFilesDirectory = (dir: string): AppThunk => dispatch => {
    dispatch(RecentProjects.actions.setDir(dir));
};
