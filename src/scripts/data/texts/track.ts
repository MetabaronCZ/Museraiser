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
    reverb: 'Reverb',
    volume: 'Volume',
    notSelected: 'No track selected',
    setNameError: {
        title: 'Invalid track name',
        message: `Track name should be between ${TRACK.NAME.MIN} and ${TRACK.NAME.MAX} characters!`
    },
    createPattern: 'Create pattern',
    removePattern: 'Remove pattern',
    removePatterns: {
        title: 'Remove paterns',
        message: 'Do you want to remove patterns from this track?'
    },
    delete: {
        title: 'Delete track',
        message: 'Do you want to delete patterns and reset this track to default?'
    }
};
