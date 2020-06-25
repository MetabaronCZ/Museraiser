import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

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
    pattern: string | null; // selected pattern
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
    pattern: null,
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
    readonly setTrackReverb: ProjectReducer<TrackActionPayload<number>>;
    readonly setTrackVolume: ProjectReducer<TrackActionPayload<number>>;
    readonly setSample: ProjectReducer<SampleActionPayload>;
    readonly setSampleVolume: ProjectReducer<TrackActionPayload<number>>;
    readonly setSampleLoop: ProjectReducer<TrackActionPayload<boolean>>;
    readonly setSampleFilterCutoff: ProjectReducer<FilterActionPayload>;
    readonly setSampleFilterResonance: ProjectReducer<FilterActionPayload>;
    readonly setSampleEnvelopeAttack: ProjectReducer<TrackActionPayload<number>>;
    readonly setSampleEnvelopeDecay: ProjectReducer<TrackActionPayload<number>>;
    readonly setSampleEnvelopeSustain: ProjectReducer<TrackActionPayload<number>>;
    readonly setSampleEnvelopeRelease: ProjectReducer<TrackActionPayload<number>>;
    readonly createTrackPattern: ProjectReducer<TrackActionPayload<number>>;
    readonly deleteTrackPattern: ProjectReducer<TrackActionPayload<string>>;
    readonly selectPattern: ProjectReducer<TrackActionPayload<string | null>>;
    readonly removeTrackPattern: ProjectReducer<TrackActionPayload<number>>;
    readonly removeTrackPatterns: ProjectReducer<TrackID>;
    readonly deleteTrack: ProjectReducer<TrackID>;
    readonly setMasterVolume: ProjectReducer<number>;
    readonly setMasterReverbDepth: ProjectReducer<number>;
    readonly setMasterReverbDampening: ProjectReducer<number>;
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
                draft.pattern = null;
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
        setTrackReverb: (state, action) => produce(state, draft => {
            const { track: id, value: reverb } = action.payload;
            return editTrack(state, draft, id, track => Track.setReverb(track, reverb));
        }),
        setTrackVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editTrack(state, draft, id, track => Track.setVolume(track, volume));
        }),
        setSample: (state, action) => produce(state, draft => {
            const { track: id, value: { name, buffer } } = action.payload;
            return editTrack(state, draft, id, track => Track.setSample(track, name, buffer));
        }),
        setSampleVolume: (state, action) => produce(state, draft => {
            const { track: id, value: volume } = action.payload;
            return editSample(state, draft, id, sample => Sample.setVolume(sample, volume));
        }),
        setSampleLoop: (state, action) => produce(state, draft => {
            const { track: id, value: loop } = action.payload;
            return editSample(state, draft, id, sample => Sample.loop(sample, loop));
        }),
        setSampleFilterCutoff: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => Sample.setFilterCutoff(sample, filter, attr));
        }),
        setSampleFilterResonance: (state, action) => produce(state, draft => {
            const { track: id, value: { filter, attr } } = action.payload;
            return editSample(state, draft, id, sample => Sample.setFilterResonance(sample, filter, attr));
        }),
        setSampleEnvelopeAttack: (state, action) => produce(state, draft => {
            const { track: id, value: attack } = action.payload;
            return editSample(state, draft, id, sample => Sample.setEnvelopeAttack(sample, attack));
        }),
        setSampleEnvelopeDecay: (state, action) => produce(state, draft => {
            const { track: id, value: decay } = action.payload;
            return editSample(state, draft, id, sample => Sample.setEnvelopeDecay(sample, decay));
        }),
        setSampleEnvelopeSustain: (state, action) => produce(state, draft => {
            const { track: id, value: sustain } = action.payload;
            return editSample(state, draft, id, sample => Sample.setEnvelopeSustain(sample, sustain));
        }),
        setSampleEnvelopeRelease: (state, action) => produce(state, draft => {
            const { track: id, value: release } = action.payload;
            return editSample(state, draft, id, sample => Sample.setEnvelopeRelease(sample, release));
        }),
        selectPattern: (state, action) => produce(state, draft => {
            if (draft) {
                const { track: id, value: patternID } = action.payload;

                if (null === patternID) {
                    draft.pattern = null;
                } else {
                    const { patterns } = draft.file.tracks[id];
                    const pattern = patterns.find(ptn => patternID === ptn.id);

                    if (pattern) {
                        draft.pattern = patternID;
                    }
                }
            }
            return draft;
        }),
        createTrackPattern: (state, action) => produce(state, draft => {
            const { track: id, value: start } = action.payload;
            return editTrack(state, draft, id, track => Track.createPattern(track, start));
        }),
        deleteTrackPattern: (state, action) => produce(state, draft => {
            const { track: id, value: pattern } = action.payload;
            return editTrack(state, draft, id, track => Track.deletePattern(track, pattern));
        }),
        removeTrackPattern: (state, action) => produce(state, draft => {
            const { track: id, value: bar } = action.payload;
            return editTrack(state, draft, id, track => Track.removePattern(track, bar));
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
        setMasterReverbDepth: (state, action) => produce(state, draft => {
            const depth = action.payload;
            return editMaster(state, draft, master => Master.setReverbDepth(master, depth));
        }),
        setMasterReverbDampening: (state, action) => produce(state, draft => {
            const dampening = action.payload;
            return editMaster(state, draft, master => Master.setReverbDampening(master, dampening));
        })
    }
});
