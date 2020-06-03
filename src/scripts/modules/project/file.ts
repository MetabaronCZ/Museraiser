import {
    PROJECT_NAME_MIN, PROJECT_NAME_MAX,
    PROJECT_TEMPO_MIN, PROJECT_TEMPO_MAX
} from 'data/config';

import {
    Tracks, TracksSnapshot, createTracks, parseTracks, serializeTracks
} from 'modules/project/track';

import {
    MasterData, MasterSnapshot, createMasterData, parseMasterData, serializeMasterData
} from 'modules/project/master';

export interface ProjectFile {
    readonly created: number;
    readonly tracks: Tracks;
    readonly master: MasterData;
    name: string;
    tempo: number;
    modified: number;
}

interface ProjectSnapshot {
    readonly name: string;
    readonly tempo: number;
    readonly created: number;
    readonly modified: number;
    readonly master: MasterSnapshot;
    readonly tracks: TracksSnapshot;
}

export const createProjectFile = (name: string, tempo: number): ProjectFile => {
    const now = Date.now();
    return {
        name,
        tempo,
        created: now,
        modified: now,
        tracks: createTracks(),
        master: createMasterData()
    };
};

export const isValidProjectName = (name: string): boolean => {
    return name.length >= PROJECT_NAME_MIN && name.length <= PROJECT_NAME_MAX;
};

export const isValidProjectTempo = (tempo: number): boolean => {
    return tempo >= PROJECT_TEMPO_MIN && tempo <= PROJECT_TEMPO_MAX;
};

export const parseProject = (data: any): ProjectFile => {
    return {
        name: `${data.name}`,
        tempo: parseInt(data.tempo, 10),
        created: parseInt(data.created, 10),
        modified: parseInt(data.modified, 10),
        tracks: parseTracks(data.tracks),
        master: parseMasterData(data.master)
    };
};

export const serializeProject = (file: ProjectFile): ProjectSnapshot => ({
    ...file,
    master: serializeMasterData(file.master),
    tracks: serializeTracks(file.tracks)
});
