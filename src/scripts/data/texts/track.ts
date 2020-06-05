import { TRACK } from 'data/config';

export const trackTexts = {
    title: 'Track',
    name: 'Name',
    sample: 'Sample',
    patterns: 'Patterns',
    solo: {
        title: 'Solo',
        ico: 'S'
    },
    mute: {
        title: 'Mute',
        ico: 'M'
    },
    pan: 'Pan',
    delay: 'Delay',
    reverb: 'Reverb',
    volume: 'Volume',
    setNameError: {
        title: 'Invalid track name',
        message: `Track name should be between ${TRACK.NAME.MIN} and ${TRACK.NAME.MAX} characters!`
    },
    notSelected: 'No track selected'
};
