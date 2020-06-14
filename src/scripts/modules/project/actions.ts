import { TXT } from 'data/texts';

import { Audio } from 'modules/audio';
import { Dialog } from 'modules/dialog';
import { Logger } from 'modules/logger';
import { readFile, saveFile } from 'modules/file';
import { ReverbID } from 'modules/project/reverb';
import { AppThunk, AppDispatch } from 'modules/store';
import { TrackID } from 'modules/project/tracks/track';
import { closeOverlay, openOverlay } from 'modules/overlay';
import { ProjectDataState, Project } from 'modules/project';
import { readSample, FilterType } from 'modules/project/sample';
import { getDirame, setAuthor, getFilename } from 'modules/app/actions';
import { setRecentFilesDirectory, addRecentProject } from 'modules/recent-projects/actions';
import { ProjectFileData, parseProjectFile, serializeProjectFile} from 'modules/project/file';

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

export const setProject = (data: ProjectFileData, path: string | null): AppThunk => (dispatch, getState) => {
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

        const project = parseProjectFile(data);
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

const save = (dispatch: AppDispatch, file: ProjectFileData, path: string): void => {
    const data = serializeProjectFile(file);

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

export const selectTrackSample = (track: TrackID): AppThunk => dispatch => {
    Dialog.openFile(__dirname, 'AUDIO').then(path => {
        if (!path) {
            return;
        }
        try {
            const base64 = readSample(path);

            dispatch(Project.actions.setTrackSample({ track, value: {
                name: getFilename(path),
                buffer: base64
            }}));

            Audio.auditStop();

        } catch (err) {
            Logger.log(err);

            const { title, message } = TXT.sample.selectError;
            Dialog.showError(title, message);
        }
    });
};

export const setTrackSampleVolume = (track: TrackID, volume: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackSampleVolume({ track, value: volume }));
};

export const setTrackSampleLoop = (track: TrackID, loop: boolean): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackSampleLoop({ track, value: loop }));
};

export const setTrackSampleFilterCutoff = (track: TrackID, filter: FilterType, cutoff: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackSampleFilterCutoff({
        track,
        value: {
            filter,
            attr: cutoff
        }
    }));
};

export const setTrackSampleFilterResonance = (track: TrackID, filter: FilterType, reso: number): AppThunk => dispatch => {
    dispatch(Project.actions.setTrackSampleFilterResonance({
        track,
        value: {
            filter,
            attr: reso
        }
    }));
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
