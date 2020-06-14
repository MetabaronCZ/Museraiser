import { Editable } from 'core/type';

import {
    TrackID, TrackData, TrackSnapshot, trackIDs,
    createTrack, parseTrack, serializeTrack
} from 'modules/project/tracks/track';

export type Tracks = {
    [id in TrackID]: TrackData;
};

export type TracksSnapshot = {
    readonly [id in TrackID]: TrackSnapshot;
};

export const createTracks = (): Tracks => {
    const result: Editable<Tracks> = {};

    for (const id of trackIDs) {
        result[id] = createTrack(id);
    }
    return result as Tracks;
};

export const parseTracks = (data: any): Tracks => {
    const result: Editable<Tracks> = {};

    for (const id of trackIDs) {
        result[id] = parseTrack(data[id]);
    }
    return result as Tracks;
};

export const serializeTracks = (tracks: Tracks): TracksSnapshot => {
    const result: Editable<TracksSnapshot> = {};

    for (const id of trackIDs) {
        result[id] = serializeTrack(tracks[id]);
    }
    return result as TracksSnapshot;
};
