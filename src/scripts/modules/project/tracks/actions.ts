import { limitNumber } from 'core/number';

import { TRACK } from 'data/config';

import { TracksData } from 'modules/project/tracks';
import { createSample } from 'modules/project/sample';
import { Volume } from 'modules/project/volume/actions';
import { createSequence } from 'modules/project/sequence';
import { createPattern, isPatternOverlap } from 'modules/project/pattern';
import { TrackID, createTrack, TrackData } from 'modules/project/tracks/track';

const { NAME, REVERB, PAN } = TRACK;

export const Track = {
    mute: (tracks: TracksData, id: TrackID) => {
        const track = tracks[id];
        track.mute = !track.mute;
        track.solo = false;
    },
    solo: (tracks: TracksData, id: TrackID) => {
        const track = tracks[id];
        const solo = track.solo;

        for (const track of Object.values(tracks)) {
            track.solo = false;
        }
        track.solo = !solo;
        track.mute = false;
    },
    setName: (track: TrackData, name: string) => {
        name = name.substring(0, NAME.MAX);
        track.name = name;
    },
    setVolume: (track: TrackData, gain: number) => {
        Volume.setGain(track.volume, gain);
    },
    setPan: (track: TrackData, pan: number) => {
        pan = limitNumber(pan, PAN.MIN, PAN.MAX);
        track.pan = pan;
    },
    setReverb: (track: TrackData, reverb: number) => {
        reverb = limitNumber(reverb, REVERB.MIN, REVERB.MAX);
        track.reverb = reverb;
    },
    setSample: (track: TrackData, name: string, buffer: string) => {
        const { sample } = track;

        if (sample) {
            sample.name = name;
            sample.buffer = buffer;
        } else {
            track.sample = createSample(name, buffer);
        }
    },
    createPattern: (track: TrackData, start: number | null) => {
        const pattern = createPattern();
        track.patterns.unshift(pattern);

        if (null !== start) {
            Track.insertPattern(track, pattern.id, start);
        }
    },
    insertPattern: (track: TrackData, patternID: string, start: number) => {
        const { patterns, sequences } = track;
        const pattern = patterns.find(ptn => patternID === ptn.id);

        if (!pattern) {
            throw new Error(`Could not insert pattern: invalid ID ${patternID}`);
        }

        // check free space for pattern insertion
        for (const seq of sequences) {
            const seqPattern = patterns.find(ptn => seq.pattern === ptn.id);

            if (!seqPattern) {
                throw new Error(`Could not insert pattern: invalid sequence ${seq.id}`);
            }

            if (isPatternOverlap(pattern, seqPattern, start, seq.start)) {
                throw new Error('Could not insert pattern: another pattern already present');
            }
        }
        const sequence = createSequence(patternID, start);
        sequences.push(sequence);
    },
    deletePattern: (track: TrackData, patternID: string) => {
        const { patterns, sequences } = track;
        track.patterns = patterns.filter(ptn => patternID !== ptn.id);
        track.sequences = sequences.filter(seq => patternID !== seq.pattern);
    },
    removePattern: (track: TrackData, bar: number) => {
        const { patterns, sequences } = track;

        track.sequences = sequences.filter(seq => {
            const pattern = patterns.find(ptn => seq.pattern === ptn.id);
            return !!pattern && (seq.start > bar || seq.start + pattern.length < bar);
        });
    },
    removePatterns: (track: TrackData) => {
        track.sequences.length = 0;
    },
    reset: (tracks: TracksData, id: TrackID) => {
        tracks[id] = createTrack(id);
    }
};
