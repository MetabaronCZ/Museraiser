import { PROJECT_NAME_MIN, PROJECT_TEMPO_MIN, PROJECT_TEMPO_MAX, PROJECT_NAME_MAX } from 'data/config';

import { Tracks, createTracks, createTracksFrom } from 'modules/project/track';
import { MasterData, createMasterData, createMasterFrom } from 'modules/project/master';

export interface ProjectFile {
    readonly created: number;
    readonly tracks: Tracks;
    readonly master: MasterData;
    name: string;
    tempo: number;
    modified: number;
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

export const createProjectFrom = (data: any): ProjectFile => {
    return {
        name: `${data.name}`,
        tempo: parseInt(data.tempo, 10),
        created: parseInt(data.created, 10),
        modified: parseInt(data.modified, 10),
        tracks: createTracksFrom(data.tracks),
        master: createMasterFrom(data.master)
    };
};

export const isValidProjectName = (name: string): boolean => {
    return name.length >= PROJECT_NAME_MIN && name.length <= PROJECT_NAME_MAX;
};

export const isValidProjectTempo = (tempo: number): boolean => {
    return tempo >= PROJECT_TEMPO_MIN && tempo <= PROJECT_TEMPO_MAX;
};
