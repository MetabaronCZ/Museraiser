import { Editable } from 'core/type';

import {
    TrackID, TrackData, TrackSnapshot, trackIDs,
    createTrack, parseTrack, serializeTrack
} from 'modules/project/tracks/track';

export type TracksData = {
    [id in TrackID]: TrackData;
};

export type TracksSnapshot = {
    readonly [id in TrackID]: TrackSnapshot;
};

export const createTracks = (): TracksData => {
    const result: Editable<TracksData> = {};

    for (const id of trackIDs) {
        result[id] = createTrack(id);
    }
    return result as TracksData;
};

export const parseTracks = (data: any): TracksData => {
    const result: Editable<TracksData> = {};

    for (const id of trackIDs) {
        result[id] = parseTrack(data[id]);
    }
    return result as TracksData;
};

export const serializeTracks = (tracks: TracksData): TracksSnapshot => {
    const result: Editable<TracksSnapshot> = {};

    for (const id of trackIDs) {
        result[id] = serializeTrack(tracks[id]);
    }
    return result as TracksSnapshot;
};
