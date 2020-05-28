import { SampleData } from 'modules/project/sample';
import { PatternData } from 'modules/project/pattern';

export interface TrackData {
    readonly patterns: PatternData[];
    name: string;
    sample: SampleData | null;
}
const createTrack = (id: string): TrackData => ({
    name: `Track ${id}`,
    sample: null,
    patterns: []
});

export interface Tracks {
    readonly T01: TrackData;
    readonly T02: TrackData;
    readonly T03: TrackData;
    readonly T04: TrackData;
    readonly T05: TrackData;
    readonly T06: TrackData;
    readonly T07: TrackData;
    readonly T08: TrackData;
    readonly T09: TrackData;
    readonly T10: TrackData;
    readonly T11: TrackData;
    readonly T12: TrackData;
    readonly T13: TrackData;
    readonly T14: TrackData;
    readonly T15: TrackData;
    readonly T16: TrackData;
}

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
