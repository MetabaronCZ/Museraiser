import { SampleData, createSampleFrom } from 'modules/project/sample';
import { PatternData, createPatternsFrom } from 'modules/project/pattern';

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

const createTrackFrom = (data: any): TrackData => ({
    name: `${data.name}`,
    sample: createSampleFrom(data.sample),
    patterns: createPatternsFrom(data.patterns)
});

type TrackID =
    'T01' | 'T02' | 'T03' | 'T04' | 'T05' | 'T06' | 'T07' | 'T08' |
    'T09' | 'T10' | 'T11' | 'T12' | 'T13' | 'T14' | 'T15' | 'T16';

export type Tracks = {
    readonly [id in TrackID]: TrackData;
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

export const createTracksFrom = (data: any): Tracks => ({
    T01: createTrackFrom(data.T01),
    T02: createTrackFrom(data.T02),
    T03: createTrackFrom(data.T03),
    T04: createTrackFrom(data.T04),
    T05: createTrackFrom(data.T05),
    T06: createTrackFrom(data.T06),
    T07: createTrackFrom(data.T07),
    T08: createTrackFrom(data.T08),
    T09: createTrackFrom(data.T09),
    T10: createTrackFrom(data.T10),
    T11: createTrackFrom(data.T11),
    T12: createTrackFrom(data.T12),
    T13: createTrackFrom(data.T13),
    T14: createTrackFrom(data.T14),
    T15: createTrackFrom(data.T15),
    T16: createTrackFrom(data.T16)
});
