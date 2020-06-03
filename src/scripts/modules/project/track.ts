import {
    SampleData, SampleSnapshot, parseSample, serializeSample
} from 'modules/project/sample';

import {
    PatternData, PatternSnapshot, parsePatterns, serializePatterns
} from 'modules/project/pattern';

export interface TrackData {
    readonly patterns: PatternData[];
    name: string;
    solo: boolean;
    mute: boolean;
    sample: SampleData | null;
}

interface TrackSnapshot {
    readonly name: string;
    readonly solo: boolean;
    readonly mute: boolean;
    readonly patterns: PatternSnapshot[];
    readonly sample: SampleSnapshot | null;
}

const createTrack = (nr: string): TrackData => ({
    name: `Track ${nr}`,
    sample: null,
    solo: false,
    mute: false,
    patterns: []
});

export type TrackID =
    'T01' | 'T02' | 'T03' | 'T04' | 'T05' | 'T06' | 'T07' | 'T08' |
    'T09' | 'T10' | 'T11' | 'T12' | 'T13' | 'T14' | 'T15' | 'T16';

export type Tracks = {
    readonly [id in TrackID]: TrackData;
};

export type TracksSnapshot = {
    readonly [id in TrackID]: TrackSnapshot;
};

export const createTracks = (): Tracks => ({
    T01: createTrack('01'),
    T02: createTrack('02'),
    T03: createTrack('03'),
    T04: createTrack('04'),
    T05: createTrack('05'),
    T06: createTrack('06'),
    T07: createTrack('07'),
    T08: createTrack('08'),
    T09: createTrack('09'),
    T10: createTrack('10'),
    T11: createTrack('11'),
    T12: createTrack('12'),
    T13: createTrack('13'),
    T14: createTrack('14'),
    T15: createTrack('15'),
    T16: createTrack('16')
});

const parseTrack = (data: any): TrackData => ({
    name: `${data.name}`,
    solo: !!data.solo,
    mute: !!data.mute,
    sample: parseSample(data.sample),
    patterns: parsePatterns(data.patterns)
});

export const parseTracks = (data: any): Tracks => ({
    T01: parseTrack(data.T01),
    T02: parseTrack(data.T02),
    T03: parseTrack(data.T03),
    T04: parseTrack(data.T04),
    T05: parseTrack(data.T05),
    T06: parseTrack(data.T06),
    T07: parseTrack(data.T07),
    T08: parseTrack(data.T08),
    T09: parseTrack(data.T09),
    T10: parseTrack(data.T10),
    T11: parseTrack(data.T11),
    T12: parseTrack(data.T12),
    T13: parseTrack(data.T13),
    T14: parseTrack(data.T14),
    T15: parseTrack(data.T15),
    T16: parseTrack(data.T16)
});

const serializeTrack = (track: TrackData): TrackSnapshot => ({
    ...track,
    sample: serializeSample(track.sample),
    patterns: serializePatterns(track.patterns)
});

export const serializeTracks = (tracks: Tracks): TracksSnapshot => ({
    T01: serializeTrack(tracks.T01),
    T02: serializeTrack(tracks.T02),
    T03: serializeTrack(tracks.T03),
    T04: serializeTrack(tracks.T04),
    T05: serializeTrack(tracks.T05),
    T06: serializeTrack(tracks.T06),
    T07: serializeTrack(tracks.T07),
    T08: serializeTrack(tracks.T08),
    T09: serializeTrack(tracks.T09),
    T10: serializeTrack(tracks.T10),
    T11: serializeTrack(tracks.T11),
    T12: serializeTrack(tracks.T12),
    T13: serializeTrack(tracks.T13),
    T14: serializeTrack(tracks.T14),
    T15: serializeTrack(tracks.T15),
    T16: serializeTrack(tracks.T16)
});
