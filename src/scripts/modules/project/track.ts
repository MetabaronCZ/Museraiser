import { Editable } from 'core/type';
import { limitNumber } from 'core/number';

import { TRACK } from 'data/config';

import {
    SampleData, SampleSnapshot, parseSample, serializeSample
} from 'modules/project/sample';

import {
    PatternData, PatternSnapshot, parsePatterns, serializePatterns
} from 'modules/project/pattern';

const { NAME, VOLUME, REVERB, DELAY, PAN } = TRACK;

const trackIDs = [
    'T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08',
    'T09', 'T10', 'T11', 'T12', 'T13', 'T14', 'T15', 'T16'
] as const;

export type TrackID = typeof trackIDs[number];

export interface TrackData {
    readonly id: TrackID;
    readonly patterns: PatternData[];
    name: string;
    solo: boolean;
    mute: boolean;
    pan: number;
    delay: number;
    reverb: number;
    volume: number;
    sample: SampleData | null;
}

interface TrackSnapshot {
    readonly id: TrackID;
    readonly name: string;
    readonly solo: boolean;
    readonly mute: boolean;
    readonly pan: number;
    readonly delay: number;
    readonly reverb: number;
    readonly volume: number;
    readonly patterns: PatternSnapshot[];
    readonly sample: SampleSnapshot | null;
}

export const getDefaultTrackName = (id: TrackID): string => {
    return `Track ${id.substring(1)}`;
};

const createTrack = (id: TrackID): TrackData => ({
    id,
    name: getDefaultTrackName(id),
    solo: false,
    mute: false,
    sample: null,
    pan: PAN.DEFAULT,
    delay: DELAY.DEFAULT,
    reverb: REVERB.DEFAULT,
    volume: VOLUME.DEFAULT,
    patterns: []
});

export type Tracks = {
    readonly [id in TrackID]: TrackData;
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

const parseTrack = (data: any): TrackData => ({
    id: `${data.id}` as TrackID,
    name: `${data.name}`,
    solo: !!data.solo,
    mute: !!data.mute,
    pan: parseInt(data.pan, 10),
    delay: parseInt(data.delay, 10),
    reverb: parseInt(data.reverb, 10),
    volume: parseInt(data.volume, 10),
    sample: parseSample(data.sample),
    patterns: parsePatterns(data.patterns)
});

export const parseTracks = (data: any): Tracks => {
    const result: Editable<Tracks> = {};

    for (const id of trackIDs) {
        result[id] = parseTrack(data[id]);
    }
    return result as Tracks;
};

const serializeTrack = (track: TrackData): TrackSnapshot => ({
    ...track,
    sample: serializeSample(track.sample),
    patterns: serializePatterns(track.patterns)
});

export const serializeTracks = (tracks: Tracks): TracksSnapshot => {
    const result: Editable<TracksSnapshot> = {};

    for (const id of trackIDs) {
        result[id] = serializeTrack(tracks[id]);
    }
    return result as TracksSnapshot;
};

export const muteTrack = (tracks: Tracks, id: TrackID): void => {
    const track = tracks[id];
    track.mute = !track.mute;
    track.solo = false;
};

export const soloTrack = (tracks: Tracks, id: TrackID): void => {
    const track = tracks[id];
    const solo = track.solo;

    for (const track of Object.values(tracks)) {
        track.solo = false;
    }
    track.solo = !solo;
    track.mute = false;
};

export const editTrackName = (tracks: Tracks, id: TrackID, name: string): void => {
    name = name.substring(0, NAME.MAX);
    tracks[id].name = name;
};

export const editTrackVolume = (tracks: Tracks, id: TrackID, volume: number): void => {
    volume = limitNumber(volume, VOLUME.MIN, VOLUME.MAX);
    tracks[id].volume = volume;
};

export const editTrackPan = (tracks: Tracks, id: TrackID, pan: number): void => {
    pan = limitNumber(pan, PAN.MIN, PAN.MAX);
    tracks[id].pan = pan;
};

export const editTrackReverb = (tracks: Tracks, id: TrackID, reverb: number): void => {
    reverb = limitNumber(reverb, REVERB.MIN, REVERB.MAX);
    tracks[id].reverb = reverb;
};

export const editTrackDelay = (tracks: Tracks, id: TrackID, delay: number): void => {
    delay = limitNumber(delay, DELAY.MIN, DELAY.MAX);
    tracks[id].delay = delay;
};
