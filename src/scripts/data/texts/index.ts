import { appTexts } from 'data/texts/app';
import { menuTexts } from 'data/texts/menu';
import { trackTexts } from 'data/texts/track';
import { sampleTexts } from 'data/texts/sample';
import { masterTexts } from 'data/texts/master';
import { projectTexts } from 'data/texts/project';
import { recentProjectTexts } from 'data/texts/recent-project';

const year = new Date().getFullYear();

export const TXT = {
    dialog: {
        positive: 'Yes',
        negative: 'No'
    },
    app: appTexts,
    overlay: {
        back: 'Back'
    },
    menu: menuTexts,
    recentProjects: recentProjectTexts,
    intro: {
        title: 'Start creating',
        create: 'Create new project',
        open: 'Open existing project'
    },
    create: {
        title: 'Create project',
        new: 'Create'
    },
    settings: {
        title: 'Settings',
        ico: '⚙'
    },
    about: {
        title: 'About',
        ico: '©',
        text: `Copyright © ${year} Milan K.`
    },
    pattern: {
        title: 'Pattern',
        empty: 'Select pattern to start editing',
        noPatterns: 'No patterns created',
        delete: {
            title: 'Delete pattern',
            ico: '✕',
            ask: 'Do you want to delete this pattern? This will also delete its usage in sequencer.'
        }
    },
    sample: sampleTexts,
    project: projectTexts,
    track: trackTexts,
    master: masterTexts,
    paging: {
        first: 'First page',
        prev: 'Previous page',
        next: 'Next page',
        last: 'Last page'
    },
    pianoRoll: {
        octaveUp: {
            title: 'Octave up',
            ico: '∧'
        },
        octaveDown: {
            title: 'Octave down',
            ico: '∨'
        },
        addPage: {
            title: 'Add page',
            ico: '✚'
        }
    }
};
