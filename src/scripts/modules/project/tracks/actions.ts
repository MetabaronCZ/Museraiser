import { limitNumber } from 'core/number';

import { TRACK } from 'data/config';

import { TracksData } from 'modules/project/tracks';
import { createSample } from 'modules/project/sample';
import { Volume } from 'modules/project/volume/actions';
import { TrackID, createTrack, TrackData } from 'modules/project/tracks/track';

const { NAME, REVERB, PAN } = TRACK;

export const Track = {
    mute: (tracks: TracksData, id: TrackID): void => {
        const track = tracks[id];
        track.mute = !track.mute;
        track.solo = false;
    },
    solo: (tracks: TracksData, id: TrackID): void => {
        const track = tracks[id];
        const solo = track.solo;

        for (const track of Object.values(tracks)) {
            track.solo = false;
        }
        track.solo = !solo;
        track.mute = false;
    },
    setName: (track: TrackData, name: string): void => {
        name = name.substring(0, NAME.MAX);
        track.name = name;
    },
    setVolume: (track: TrackData, gain: number): void => {
        Volume.setGain(track.volume, gain);
    },
    setPan: (track: TrackData, pan: number): void => {
        pan = limitNumber(pan, PAN.MIN, PAN.MAX);
        track.pan = pan;
    },
    setReverb: (track: TrackData, reverb: number): void => {
        reverb = limitNumber(reverb, REVERB.MIN, REVERB.MAX);
        track.reverb = reverb;
    },
    setSample: (track: TrackData, name: string, buffer: string): void => {
        const { sample } = track;

        if (sample) {
            sample.name = name;
            sample.buffer = buffer;
        } else {
            track.sample = createSample(name, buffer);
        }
    },
    removePatterns: (track: TrackData): void => {
        track.sequences.length = 0;
    },
    reset: (tracks: TracksData, id: TrackID): void => {
        tracks[id] = createTrack(id);
    }
};
