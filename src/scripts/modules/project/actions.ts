import { TXT } from 'data/texts';

import { Dialog } from 'modules/dialog';
import { Logger } from 'modules/logger';
import { TrackID } from 'modules/project/track';
import { readFile, saveFile } from 'modules/file';
import { ReverbID } from 'modules/project/reverb';
import { AppThunk, AppDispatch } from 'modules/store';
import { getDirame, setAuthor } from 'modules/app/actions';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { ProjectDataState, Project } from 'modules/project';
import { ProjectFile, parseProject, serializeProject} from 'modules/project/file';
import {
    setRecentFilesDirectory, addRecentProject
} from 'modules/recent-projects/actions';

const checkProjectSaved = (project: ProjectDataState, cb: () => void): void => {
    if (!project || project.saved) {
        cb();
        return;
    }
    Dialog.ask(TXT.project.closeAsk).then(result => {
        if (result) {
            cb();
        }
    });
};

export const setProject = (data: ProjectFile, path: string | null): AppThunk => (dispatch, getState) => {
    const { undo, redo } = getState().app;
    dispatch(Project.actions.set({ file: data, path, undo, redo }));
    dispatch(closeOverlay());
};

export const createProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkProjectSaved(project, () => {
        dispatch(openOverlay('CREATE'));
    });
};

export const openProject = (path: string): AppThunk => dispatch => {
    if (!path) {
        return;
    }
    try {
        const file = readFile(path);
        const data = JSON.parse(file);

        const project = parseProject(data);
        dispatch(setProject(project, path));

        dispatch(addRecentProject(path));

        const dir = getDirame(path);
        dispatch(setRecentFilesDirectory(dir));

    } catch (err) {
        Logger.log(err);

        const { title, message } = TXT.project.selectError;
        Dialog.showError(title, message);
    }
};

const save = (dispatch: AppDispatch, file: ProjectFile, path: string): void => {
    const data = serializeProject(file);

    try {
        const save = JSON.stringify(data);
        saveFile(path, save);

        dispatch(Project.actions.save(path));

    } catch (err) {
        Logger.log(err);

        const { title, message } = TXT.project.saveError;
        Dialog.showError(title, message);
    }
};

export const saveProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();

    if (!project) {
        return;
    }
    const { file, path } = project;

    // save project to its location
    if (path) {
        save(dispatch, file, path);
        return;
    }
    const lastDir = recentProjects.dir;

    // user selects save destination for created project
    Dialog.saveFile(lastDir, 'PROJECT', file.name).then(userPath => {
        if (!userPath) {
            return;
        }
        save(dispatch, file, userPath);

        dispatch(setAuthor(file.author));
        dispatch(addRecentProject(userPath));

        const dir = getDirame(userPath);
        dispatch(setRecentFilesDirectory(dir));
    });
};

export const selectProject = (): AppThunk => (dispatch, getState) => {
    const { project, recentProjects } = getState();
    const lastDir = recentProjects.dir;

    checkProjectSaved(project, () => {
        Dialog.openFile(lastDir, 'PROJECT').then(file => {
            dispatch(openProject(file));
        });
    });
};

export const undoProject = (): AppThunk => dispatch => {
    dispatch(Project.actions.undo());
};

export const redoProject = (): AppThunk => dispatch => {
    dispatch(Project.actions.redo());
};

export const closeProject = (): AppThunk => (dispatch, getState) => {
    const { project } = getState();

    checkProjectSaved(project, () => {
        dispatch(closeOverlay());
        dispatch(Project.actions.set(null));
    });
};

export const setProjectName = (name: string): AppThunk => dispatch => {
    dispatch(Project.actions.setName(name));
};

export const setProjectTempo = (tempo: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTempo(tempo));
};

export const setProjectAuthor = (author: string): AppThunk => dispatch => {
    dispatch(Project.actions.setAuthor(author));
};

export const setProjectDescription = (desc: string): AppThunk => dispatch => {
    dispatch(Project.actions.setDescription(desc));
};

export const selectTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.selectTrack(id));
};

export const setTrackName = (track: TrackID, name: string): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackName({ track, value: name }));
};

export const soloProjectTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.soloTrack(id));
};

export const muteProjectTrack = (id: TrackID): AppThunk => dispatch => {
    dispatch(Project.actions.muteTrack(id));
};

export const setTrackPan = (track: TrackID, pan: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackPan({ track, value: pan }));
};

export const setTrackDelay = (track: TrackID, delay: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackDelay({ track, value: delay }));
};

export const setTrackReverb = (track: TrackID, reverb: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackReverb({ track, value: reverb }));
};

export const setTrackVolume = (track: TrackID, volume: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackVolume({ track, value: volume }));
};

export const removeTrackPatterns = (track: TrackID): AppThunk => dispatch => {
    Dialog.ask(TXT.track.removePatterns.message).then(result => {
        if (result) {
            dispatch(Project.actions.removeTrackPatterns(track));
        }
    });
};

export const deleteTrack = (track: TrackID): AppThunk => dispatch => {
    Dialog.ask(TXT.track.delete.message).then(result => {
        if (result) {
            dispatch(Project.actions.deleteTrack(track));
        }
    });
};

export const setMasterVolume = (volume: number): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterVolume(volume));
};

export const setMasterReverbType = (type: ReverbID): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterReverbType(type));
};

export const setMasterReverbDepth = (depth: number): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterReverbDepth(depth));
};

export const setMasterDelayAmount = (amount: number): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterDelayAmount(amount));
};

export const setMasterDelayRate = (rate: number): AppThunk => dispatch => {
    dispatch(Project.actions.setMasterDelayRate(rate));
};
