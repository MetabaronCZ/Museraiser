import { Tracks, createTracks } from 'modules/project/track';
import { MasterData, createMasterData } from 'modules/project/master';

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
