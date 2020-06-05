import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { editMasterVolume } from 'modules/project/master';
import { setDelayAmount, setDelayRate } from 'modules/project/delay';
import { ReverbID, setReverbType, setReverbDepth } from 'modules/project/reverb';

import {
    TrackID, muteTrack, soloTrack,
    editTrackName, editTrackVolume, editTrackPan, editTrackDelay, editTrackReverb
} from 'modules/project/track';

import {
    ProjectFile,
    setTempo, editProjectName, editProjectAuthor, editProjectDescription
} from 'modules/project/file';

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

interface TrackValue<T> {
    readonly track: TrackID;
    readonly value: T;
}

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
    readonly setTrackName: CaseReducer<ProjectDataState, PayloadAction<TrackValue<string>>>;
    readonly soloTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly muteTrack: CaseReducer<ProjectDataState, PayloadAction<TrackID>>;
    readonly setTrackPan: CaseReducer<ProjectDataState, PayloadAction<TrackValue<number>>>;
    readonly setTrackDelay: CaseReducer<ProjectDataState, PayloadAction<TrackValue<number>>>;
    readonly setTrackReverb: CaseReducer<ProjectDataState, PayloadAction<TrackValue<number>>>;
    readonly setTrackVolume: CaseReducer<ProjectDataState, PayloadAction<TrackValue<number>>>;
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
            if (draft) {
                editProjectName(draft.file, action.payload);
            }
            return edit(state, draft);
        }),
        setTempo: (state, action) => produce(state, draft => {
            if (draft) {
                setTempo(draft.file, action.payload);
            }
            return edit(state, draft);
        }),
        setAuthor: (state, action) => produce(state, draft => {
            if (draft) {
                editProjectAuthor(draft.file, action.payload);
            }
            return edit(state, draft);
        }),
        setDescription: (state, action) => produce(state, draft => {
            if (draft) {
                editProjectDescription(draft.file, action.payload);
            }
            return edit(state, draft);
        }),
        selectTrack: (state, action) => produce(state, draft => {
            if (draft) {
                draft.track = action.payload;
            }
            return draft;
        }),
        soloTrack: (state, action) => produce(state, draft => {
            if (draft) {
                soloTrack(draft.file.tracks, action.payload);
            }
            return edit(state, draft);
        }),
        muteTrack: (state, action) => produce(state, draft => {
            if (draft) {
                muteTrack(draft.file.tracks, action.payload);
            }
            return edit(state, draft);
        }),
        setTrackName: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, value } = action.payload;
                editTrackName(draft.file.tracks, track, value);
            }
            return edit(state, draft);
        }),
        setTrackPan: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, value } = action.payload;
                editTrackPan(draft.file.tracks, track, value);
            }
            return edit(state, draft);
        }),
        setTrackDelay: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, value } = action.payload;
                editTrackDelay(draft.file.tracks, track, value);
            }
            return edit(state, draft);
        }),
        setTrackReverb: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, value } = action.payload;
                editTrackReverb(draft.file.tracks, track, value);
            }
            return edit(state, draft);
        }),
        setTrackVolume: (state, action) => produce(state, draft => {
            if (draft) {
                const { track, value } = action.payload;
                editTrackVolume(draft.file.tracks, track, value);
            }
            return edit(state, draft);
        }),
        setMasterVolume: (state, action) => produce(state, draft => {
            if (draft) {
                editMasterVolume(draft.file.master, action.payload);
            }
            return edit(state, draft);
        }),
        setMasterReverbType: (state, action) => produce(state, draft => {
            if (draft) {
                setReverbType(draft.file.master.reverb, action.payload);
            }
            return edit(state, draft);
        }),
        setMasterReverbDepth: (state, action) => produce(state, draft => {
            if (draft) {
                setReverbDepth(draft.file.master.reverb, action.payload);
            }
            return edit(state, draft);
        }),
        setMasterDelayAmount: (state, action) => produce(state, draft => {
            if (draft) {
                setDelayAmount(draft.file.master.delay, action.payload);
            }
            return edit(state, draft);
        }),
        setMasterDelayRate: (state, action) => produce(state, draft => {
            if (draft) {
                setDelayRate(draft.file.master.delay, action.payload);
            }
            return edit(state, draft);
        })
    }
});
