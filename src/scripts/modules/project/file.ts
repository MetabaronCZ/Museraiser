import { Tracks, createTracks, createTracksFrom } from 'modules/project/track';
import { MasterData, createMasterData, createMasterFrom } from 'modules/project/master';

export interface ProjectFile {
    readonly created: number;
    readonly tracks: Tracks;
    readonly master: MasterData;
    name: string;
    modified: number;
}

export const createProjectFile = (): ProjectFile => {
    const now = Date.now();
    return {
        name: 'New project',
        created: now,
        modified: now,
        tracks: createTracks(),
        master: createMasterData()
    };
};

export const createProjectFrom = (data: any): ProjectFile => {
    return {
        name: `${data.name}`,
        created: parseInt(data.created, 10),
        modified: parseInt(data.modified, 10),
        tracks: createTracksFrom(data.tracks),
        master: createMasterFrom(data.master)
    };
};
