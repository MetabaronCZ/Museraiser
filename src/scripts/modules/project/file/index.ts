import {
    Tracks, TracksSnapshot, createTracks, parseTracks, serializeTracks
} from 'modules/project/tracks';

import {
    MasterData, MasterSnapshot, createMasterData, parseMasterData, serializeMasterData
} from 'modules/project/master';

export interface ProjectFile {
    readonly created: number;
    readonly tracks: Tracks;
    readonly master: MasterData;
    name: string;
    author: string;
    description: string;
    tempo: number;
    modified: number;
}

interface ProjectSnapshot {
    readonly name: string;
    readonly tempo: number;
    readonly author: string;
    readonly created: number;
    readonly modified: number;
    readonly description: string;
    readonly master: MasterSnapshot;
    readonly tracks: TracksSnapshot;
}

export const createProjectFile = (name: string, author: string, desc: string, tempo: number): ProjectFile => {
    const now = Date.now();
    return {
        name,
        tempo,
        author,
        created: now,
        modified: now,
        description: desc,
        tracks: createTracks(),
        master: createMasterData()
    };
};

export const parseProjectFile = (data: any): ProjectFile => {
    return {
        name: `${data.name}`,
        author: `${data.author}`,
        tempo: parseInt(data.tempo, 10),
        description: `${data.description}`,
        created: parseInt(data.created, 10),
        modified: parseInt(data.modified, 10),
        tracks: parseTracks(data.tracks),
        master: parseMasterData(data.master)
    };
};

export const serializeProjectFile = (file: ProjectFile): ProjectSnapshot => ({
    ...file,
    master: serializeMasterData(file.master),
    tracks: serializeTracks(file.tracks)
});
