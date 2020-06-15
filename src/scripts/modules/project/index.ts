import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { ReverbID } from 'modules/project/reverb';
import { MasterData } from 'modules/project/master';
import { ProjectFileData } from 'modules/project/file';
import { FilterType, SampleData } from 'modules/project/sample';
import { TrackID, TrackData } from 'modules/project/tracks/track';

import { Track } from 'modules/project/tracks/actions';
import { Sample } from 'modules/project/sample/actions';
import { Master } from 'modules/project/master/actions';
import { ProjectFile } from 'modules/project/file/actions';

type OnTrackEdit = (track: TrackData) => void;
type OnSampleEdit = (sample: SampleData) => void;
type OnMasterEdit = (master: MasterData) => void;
type OnProjectEdit = (file: ProjectFileData) => void;

export interface ProjectData {
    readonly file: ProjectFileData; // actual project file
    readonly path: string | null; // project file path
    readonly maxUndo: number;
    readonly maxRedo: number;
    track: TrackID | null; // selected track
    undo: ProjectFileData[];
    redo: ProjectFileData[];
    saved: boolean;
}
const createProjectData = (data: ProjectSettings): ProjectData => ({
    file: data.file,
    path: data.path,
    saved: !!data.path,
    maxUndo: data.undo,
    maxRedo: data.redo,
    track: null,
    undo: [],
    redo: []
});

export type ProjectDataState = ProjectData | null;
type ProjectReducer<T = void> = CaseReducer<ProjectDataState, PayloadAction<T>>;

interface ProjectSettings {
    readonly file: ProjectFileData;
    readonly path: string | null;
    readonly undo: number;
    readonly redo: number;
}

type TrackActionPayload<T> = {
    readonly track: TrackID;
    readonly value: T;
};

type SampleActionPayload = TrackActionPayload<{
    readonly name: string;
    readonly buffer: string; // base64 encoded sample buffer
}>;

type FilterActionPayload = TrackActionPayload<{
    readonly filter: FilterType;
    readonly attr: number; // filter attribute
}>;

type ProjectReducers = {
    readonly set: ProjectReducer<ProjectSettings | null>;
    readonly save: ProjectReducer<string>;
    readonly undo: ProjectReducer;
    readonly redo: ProjectReducer;
    readonly setName: ProjectReducer<string>;
    readonly setTempo: ProjectReducer<number>;
    readonly setAuthor: ProjectReducer<string>;
    readonly setDescription: ProjectReducer<string>;
    readonly selectTrack: ProjectReducer<TrackID>;
    readonly setTrackName: ProjectReducer<TrackActionPayload<string>>;
    readonly soloTrack: ProjectReducer<TrackID>;
    readonly muteTrack: ProjectReducer<TrackID>;
    readonly setTrackPan: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackDelay: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackReverb: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackVolume: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackSample: ProjectReducer<SampleActionPayload>;
    readonly setTrackSampleVolume: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackSampleLoop: ProjectReducer<TrackActionPayload<boolean>>;
    readonly setTrackSampleFilterCutoff: ProjectReducer<FilterActionPayload>;
    readonly setTrackSampleFilterResonance: ProjectReducer<FilterActionPayload>;
    readonly removeTrackPatterns: ProjectReducer<TrackID>;
    readonly deleteTrack: ProjectReducer<TrackID>;
    readonly setMasterVolume: ProjectReducer<number>;
    readonly setMasterReverbType: ProjectReducer<ReverbID>;
    readonly setMasterReverbDepth: ProjectReducer<number>;
    readonly setMasterDelayRate: ProjectReducer<number>;
    readonly setMasterDelayAmount: ProjectReducer<number>;
};

const edit = (state: ProjectDataState, draft: ProjectDataState): ProjectDataState => {
    if (!draft) {
        return draft;
    }
    draft.saved = false;
    draft.file.modified = Date.now();

    // handle project history
    draft.redo = [];

    if (state) {
        draft.undo.unshift(state.file);
        draft.undo = draft.undo.slice(0, draft.maxUndo);
    }
    return draft;
};

const editProject = (state: ProjectDataState, draft: ProjectDataState, cb: OnProjectEdit): ProjectDataState => {
    if (!draft) {
        return draft;
    }
    cb(draft.file);
    return edit(state, draft);
};

const editTrack = (state: ProjectDataState, draft: ProjectDataState, id: TrackID, cb: OnTrackEdit): ProjectDataState => {
    return editProject(state, draft, file => cb(file.tracks[id]));
};

const editSample = (state: ProjectDataState, draft: ProjectDataState, id: TrackID, cb: OnSampleEdit): ProjectDataState => {
    return editTrack(state, draft, id, ({ sample }) => sample ? cb(sample) : null);
};

const editMaster = (state: ProjectDataState, draft: ProjectDataState, cb: OnMasterEdit): ProjectDataState => {
    return editProject(state, draft, file => cb(file.master));
};

export const Project = createSlice<ProjectDataState, ProjectReducers>({
    name: 'project',
    initialState: null,
    reducers: {
        set: (state, action) => {
            const data = action.payload;

            if (!data) {
                return null;
            }
            return createProjectData(data);
        },
        save: (state, action) => produce(state, draft => {
            if (draft) {
                draft.path = action.payload;
                draft.saved = true;
            }
            return draft;
        }),
        undo: state => produce(state, draft => {
            if (draft) {
                const prev = draft.undo.shift();

                if (prev) {
                    draft.file = prev;
                    draft.saved = false;

                    if (state) {
                        draft.redo.unshift(state.file);
                        draft.redo = draft.redo.slice(0, draft.maxRedo);
                    }
                }
            }
            return draft;
        }),
        redo: state => produce(state, draft => {
            if (draft) {
                const next = draft.redo.shift();

                if (next) {
                    draft.file = next;
                    draft.saved = false;

                    if (state) {
                        draft.undo.unshift(state.file);
                        draft.undo = draft.undo.slice(0, draft.maxUndo);
                    }
                }
            }
            return draft;
        }),
        setName: (state, action) => produce(state, draft => {
            const name = action.payload;
            return editProject(state, draft, file => ProjectFile.setName(file, name));
        }),
        setTempo: (state, action) => produce(state, draft => {
            const tempo = action.payload;
            return editProject(state, draft, file => ProjectFile.setTempo(file, tempo));
        }),
        setAuthor: (state, action) => produce(state, draft => {
            const author = action.payload;
            return editProject(state, draft, file => ProjectFile.setAuthor(file, author));
        }),
        setDescription: (state, action) => produce(state, draft => {
            const desc = action.payload;
            return editProject(state, draft, file => ProjectFile.setDescription(file, desc));
        }),
        selectTrack: (state, action) => produce(state, draft => {
            if (draft) {
                draft.track = action.payload;
            }
            return draft;
        }),
        soloTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => Track.solo(file.tracks, id));
        }),
        muteTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => Track.mute(file.tracks, id));
        }),
        setTrackName: (state, action) => produce(state, draft => {
            const { track: id, value: name } = action.payload;
            return editTrack(state, draft, id, track => Track.setName(track, name));
        }),
        setTrackPan: (state, action) => produce(state, draft => {
            const { track: id, value: pan } = action.payload;
            return editTrack(state, draft, id, track => Track.setPan(track, pan));
        }),
        setTrackDelay: (state, action) => produce(state, draft => {
            const { track: id, value: delay } = action.payload;
            return editTrack(state, draft, id, track => Track.setDelay(track, delay));
        }),
        setTrackReverb: (state, action) => produce(state, draft => {
            const { track: id, value: reverb } = action.payload;
            return editTrack(state, draft, id, track => Track.setReverb(track, reverb));
        }),
        setTrackVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editTrack(state, draft, id, track => Track.setVolume(track, volume));
        }),
        setTrackSample: (state, action) => produce(state, draft => {
            const { track: id, value: { name, buffer } } = action.payload;
            return editTrack(state, draft, id, track => Track.setSample(track, name, buffer));
        }),
        setTrackSampleVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editSample(state, draft, id, sample => Sample.setVolume(sample, volume));
        }),
        setTrackSampleLoop: (state, action) => produce(state, draft => {
            const { track: id, value: loop } = action.payload;
            return editSample(state, draft, id, sample => Sample.loop(sample, loop));
        }),
        setTrackSampleFilterCutoff: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => Sample.setFilterCutoff(sample, filter, attr));
        }),
        setTrackSampleFilterResonance: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => Sample.setFilterResonance(sample, filter, attr));
        }),
        removeTrackPatterns: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editTrack(state, draft, id, track => Track.removePatterns(track));
        }),
        deleteTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => Track.reset(file.tracks, id));
        }),
        setMasterVolume: (state, action) => produce(state, draft => {
            const volume = action.payload;
            return editMaster(state, draft, master => Master.setVolume(master, volume));
        }),
        setMasterReverbType: (state, action) => produce(state, draft => {
            const type = action.payload;
            return editMaster(state, draft, master => Master.setReverbType(master, type));
        }),
        setMasterReverbDepth: (state, action) => produce(state, draft => {
            const depth = action.payload;
            return editMaster(state, draft, master => Master.setReverbDepth(master, depth));
        }),
        setMasterDelayAmount: (state, action) => produce(state, draft => {
            const amount = action.payload;
            return editMaster(state, draft, master => Master.setDelayAmount(master, amount));
        }),
        setMasterDelayRate: (state, action) => produce(state, draft => {
            const rate = action.payload;
            return editMaster(state, draft, master => Master.setDelayRate(master, rate));
        })
    }
});
