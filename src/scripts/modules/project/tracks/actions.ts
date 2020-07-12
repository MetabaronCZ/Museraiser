import { limitNumber } from 'core/number';

import { TRACK } from 'data/config';

import { TracksData } from 'modules/project/tracks';
import { createSample } from 'modules/project/sample';
import { Volume } from 'modules/project/volume/actions';
import { Pattern } from 'modules/project/pattern/actions';
import { createSequence, getSequence } from 'modules/project/sequence';
import { TrackID, createTrack, TrackData } from 'modules/project/tracks/track';
import { createPattern, isPatternOverlap, canAddPatternPage } from 'modules/project/pattern';

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
    setPatternName: (track: TrackData, patternID: string, name: string) => {
        const pattern = track.patterns.find(ptn => patternID === ptn.id);

        if (!pattern) {
            throw new Error(`Could not set pattern name: invalid ID ${patternID}`);
        }
        Pattern.setname(pattern, name);
    },
    addPatternPage: (track: TrackData, patternID: string) => {
        const pattern = track.patterns.find(ptn => patternID === ptn.id);

        if (!pattern) {
            throw new Error(`Could not add pattern page: invalid ID ${patternID}`);
        }
        if (canAddPatternPage(track, pattern)) {
            Pattern.addPage(pattern);
        }
    },
    removeSequence: (track: TrackData, bar: number) => {
        const seq = getSequence(track, bar);

        if (seq) {
            track.sequences = track.sequences.filter(s => seq.id !== s.id);
        }
    },
    removePatterns: (track: TrackData) => {
        track.sequences.length = 0;
    },
    reset: (tracks: TracksData, id: TrackID) => {
        tracks[id] = createTrack(id);
    }
};
