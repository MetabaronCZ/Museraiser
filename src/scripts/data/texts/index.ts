import { appTexts } from 'data/texts/app';
import { menuTexts } from 'data/texts/menu';
import { trackTexts } from 'data/texts/track';
import { masterTexts } from 'data/texts/master';
import { projectTexts } from 'data/texts/project';
import { reverbTTexts } from 'data/texts/reverbs';
import { recentProjectTexts } from 'data/texts/recent-project';

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
    pattern: {
        title: 'Pattern'
    },
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
