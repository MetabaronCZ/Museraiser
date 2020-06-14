import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { ReverbID } from 'modules/project/reverb';
import { ProjectFile } from 'modules/project/file';
import { MasterData } from 'modules/project/master';
import { FilterType, SampleData } from 'modules/project/sample';
import { TrackID, TrackData } from 'modules/project/tracks/track';

import { TrackActions } from 'modules/project/tracks/actions';
import { SampleActions } from 'modules/project/sample/actions';
import { MasterActions } from 'modules/project/master/actions';
import { ProjectFileActions } from 'modules/project/file/actions';

type OnProjectEdit = (file: ProjectFile) => void;
type OnTrackEdit = (track: TrackData) => void;
type OnSampleEdit = (sample: SampleData) => void;
type OnMasterEdit = (master: MasterData) => void;

export interface ProjectData {
    readonly file: ProjectFile; // actual project file
    readonly path: string | null; // project file path
    readonly maxUndo: number;
    readonly maxRedo: number;
    track: TrackID | null; // selected track
    undo: ProjectFile[];
    redo: ProjectFile[];
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

interface ProjectSettings {
    readonly file: ProjectFile;
    readonly path: string | null;
    readonly undo: number;
    readonly redo: number;
}

type TrackAction<T> = PayloadAction<{
    readonly track: TrackID;
    readonly value: T;
}>;

type SampleAction = TrackAction<{
    readonly name: string;
    readonly buffer: string; // base64 encoded sample buffer
}>;

type FilterAction = TrackAction<{
    readonly filter: FilterType;
    readonly attr: number; // filter attribute
}>;

type ProjectReducers = {
    readonly set: CaseReducer<ProjectDataState, PayloadAction<ProjectSettings | null>>;
    readonly save: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly undo: CaseReducer<ProjectDataState, PayloadAction>;
    readonly redo: CaseReducer<ProjectDataState, PayloadAction>;
    readonly setName: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setTempo: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setAuthor: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly setDescription: CaseReducer<ProjectDataState, PayloadAction<string>>;
    readonly selectTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly setTrackName: CaseReducer<ProjectDataState, TrackAction<string>>;
    readonly soloTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly muteTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly setTrackPan: CaseReducer<ProjectDataState, TrackAction<number>>;
    readonly setTrackDelay: CaseReducer<ProjectDataState, TrackAction<number>>;
    readonly setTrackReverb: CaseReducer<ProjectDataState, TrackAction<number>>;
    readonly setTrackVolume: CaseReducer<ProjectDataState, TrackAction<number>>;
    readonly setTrackSample: CaseReducer<ProjectDataState, SampleAction>;
    readonly setTrackSampleVolume: CaseReducer<ProjectDataState, TrackAction<number>>;
    readonly setTrackSampleLoop: CaseReducer<ProjectDataState, TrackAction<boolean>>;
    readonly setTrackSampleFilterCutoff: CaseReducer<ProjectDataState, FilterAction>;
    readonly setTrackSampleFilterResonance: CaseReducer<ProjectDataState, FilterAction>;
    readonly removeTrackPatterns: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly deleteTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly setMasterVolume: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setMasterReverbType: CaseReducer<ProjectDataState, PayloadAction<ReverbID>>;
    readonly setMasterReverbDepth: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setMasterDelayRate: CaseReducer<ProjectDataState, PayloadAction<number>>;
    readonly setMasterDelayAmount: CaseReducer<ProjectDataState, PayloadAction<number>>;
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
            return editProject(state, draft, file => ProjectFileActions.setName(file, name));
        }),
        setTempo: (state, action) => produce(state, draft => {
            const tempo = action.payload;
            return editProject(state, draft, file => ProjectFileActions.setTempo(file, tempo));
        }),
        setAuthor: (state, action) => produce(state, draft => {
            const author = action.payload;
            return editProject(state, draft, file => ProjectFileActions.setAuthor(file, author));
        }),
        setDescription: (state, action) => produce(state, draft => {
            const desc = action.payload;
            return editProject(state, draft, file => ProjectFileActions.setDescription(file, desc));
        }),
        selectTrack: (state, action) => produce(state, draft => {
            if (draft) {
                draft.track = action.payload;
            }
            return draft;
        }),
        soloTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => TrackActions.solo(file.tracks, id));
        }),
        muteTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => TrackActions.mute(file.tracks, id));
        }),
        setTrackName: (state, action) => produce(state, draft => {
            const { track: id, value: name } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setName(track, name));
        }),
        setTrackPan: (state, action) => produce(state, draft => {
            const { track: id, value: pan } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setPan(track, pan));
        }),
        setTrackDelay: (state, action) => produce(state, draft => {
            const { track: id, value: delay } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setDelay(track, delay));
        }),
        setTrackReverb: (state, action) => produce(state, draft => {
            const { track: id, value: reverb } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setReverb(track, reverb));
        }),
        setTrackVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setVolume(track, volume));
        }),
        setTrackSample: (state, action) => produce(state, draft => {
            const { track: id, value: { name, buffer } } = action.payload;
            return editTrack(state, draft, id, track => TrackActions.setSample(track, name, buffer));
        }),
        setTrackSampleVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editSample(state, draft, id, sample => SampleActions.setVolume(sample, volume));
        }),
        setTrackSampleLoop: (state, action) => produce(state, draft => {
            const { track: id, value: loop } = action.payload;
            return editSample(state, draft, id, sample => SampleActions.loop(sample, loop));
        }),
        setTrackSampleFilterCutoff: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => SampleActions.setFilterCutoff(sample, filter, attr));
        }),
        setTrackSampleFilterResonance: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => SampleActions.setFilterResonance(sample, filter, attr));
        }),
        removeTrackPatterns: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editTrack(state, draft, id, track => TrackActions.removePatterns(track));
        }),
        deleteTrack: (state, action) => produce(state, draft => {
            const id = action.payload;
            return editProject(state, draft, file => TrackActions.reset(file.tracks, id));
        }),
        setMasterVolume: (state, action) => produce(state, draft => {
            const volume = action.payload;
            return editMaster(state, draft, master => MasterActions.setVolume(master, volume));
        }),
        setMasterReverbType: (state, action) => produce(state, draft => {
            const type = action.payload;
            return editMaster(state, draft, master => MasterActions.setReverbType(master, type));
        }),
        setMasterReverbDepth: (state, action) => produce(state, draft => {
            const depth = action.payload;
            return editMaster(state, draft, master => MasterActions.setReverbDepth(master, depth));
        }),
        setMasterDelayAmount: (state, action) => produce(state, draft => {
            const amount = action.payload;
            return editMaster(state, draft, master => MasterActions.setDelayAmount(master, amount));
        }),
        setMasterDelayRate: (state, action) => produce(state, draft => {
            const rate = action.payload;
            return editMaster(state, draft, master => MasterActions.setDelayRate(master, rate));
        })
    }
});
