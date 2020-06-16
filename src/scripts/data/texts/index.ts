import { appTexts } from 'data/texts/app';
import { menuTexts } from 'data/texts/menu';
import { trackTexts } from 'data/texts/track';
import { sampleTexts } from 'data/texts/sample';
import { masterTexts } from 'data/texts/master';
import { projectTexts } from 'data/texts/project';
import { reverbTTexts } from 'data/texts/reverbs';
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
        empty: 'No pattern selected'
    },
    sample: sampleTexts,
    project: projectTexts,
    track: trackTexts,
    master: masterTexts,
    reverb: reverbTTexts,
    paging: {
        first: 'First page',
        prev: 'Previous page',
        next: 'Next page',
        last: 'Last page'
    }
};
