import { TRACK } from 'data/config';

import {
    Volume, createVolume, parseVolume, serializeVolume
} from 'modules/project/volume';

import {
    SampleData, SampleSnapshot, parseSample, serializeSample
} from 'modules/project/sample';

import {
    PatternData, PatternSnapshot, parsePatterns, serializePatterns
} from 'modules/project/pattern';

import {
    SequenceData, SequenceSnapshot, parseSequences, serializeSequences
} from 'modules/project/sequence';

const { VOLUME, REVERB, DELAY, PAN } = TRACK;

export const trackIDs = [
    'T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08',
    'T09', 'T10', 'T11', 'T12', 'T13', 'T14', 'T15', 'T16'
] as const;

export type TrackID = typeof trackIDs[number];

export interface TrackData {
    readonly id: TrackID;
    readonly patterns: PatternData[];
    readonly sequences: SequenceData[];
    name: string;
    solo: boolean;
    mute: boolean;
    pan: number;
    delay: number;
    reverb: number;
    volume: Volume;
    sample: SampleData | null;
}

export interface TrackSnapshot {
    readonly id: TrackID;
    readonly name: string;
    readonly solo: boolean;
    readonly mute: boolean;
    readonly pan: number;
    readonly delay: number;
    readonly reverb: number;
    readonly volume: Volume;
    readonly patterns: PatternSnapshot[];
    readonly sequences: SequenceSnapshot[];
    readonly sample: SampleSnapshot | null;
}

export const getDefaultTrackName = (id: TrackID): string => {
    return `Track ${id.substring(1)}`;
};

export const createTrack = (id: TrackID): TrackData => ({
    id,
    name: getDefaultTrackName(id),
    solo: false,
    mute: false,
    sample: null,
    pan: PAN.DEFAULT,
    delay: DELAY.DEFAULT,
    reverb: REVERB.DEFAULT,
    volume: createVolume(VOLUME.DEFAULT),
    patterns: [],
    sequences: []
});

export const parseTrack = (data: any): TrackData => ({
    id: `${data.id}` as TrackID,
    name: `${data.name}`,
    solo: !!data.solo,
    mute: !!data.mute,
    pan: parseInt(data.pan, 10),
    delay: parseInt(data.delay, 10),
    reverb: parseInt(data.reverb, 10),
    volume: parseVolume(data.volume),
    sample: parseSample(data.sample),
    patterns: parsePatterns(data.patterns),
    sequences: parseSequences(data.sequences)
});

export const serializeTrack = (track: TrackData): TrackSnapshot => ({
    ...track,
    volume: serializeVolume(track.volume),
    sample: serializeSample(track.sample),
    patterns: serializePatterns(track.patterns),
    sequences: serializeSequences(track.sequences)
});
