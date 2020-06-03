import {
    PROJECT_NAME_MIN, PROJECT_NAME_MAX,
    PROJECT_TEMPO_MIN, PROJECT_TEMPO_MAX
} from 'data/config';

export const TXT = {
    dialog: {
        positive: 'Yes',
        negative: 'No'
    },
    app: {
        title: 'Museraiser',
        minimize: {
            ico: '_',
            title: 'Minimize window'
        },
        maximize: {
            ico: '□',
            title: 'Maximize window'
        },
        close: {
            ico: '×',
            title: 'Close window',
            question: 'Do you want to quit application? Unsaved data will be lost!'
        }
    },
    overlay: {
        back: 'Back'
    },
    menu: {
        create: {
            text: 'New',
            title: 'Create new project'
        },
        open: {
            text: 'Open',
            title: 'Open project'
        },
        save: {
            text: 'Save',
            title: 'Save current project'
        },
        undo: {
            text: 'Undo',
            title: 'Undo operation'
        },
        redo: {
            text: 'Redo',
            title: 'Redo operation'
        },
        close: {
            text: 'Close',
            title: 'Close current project'
        }
    },
    recentProjects: {
        title: 'Recent projects',
        empty: 'There are no recently edited projects',
        max: 'Maximum file count',
        remove: {
            title: 'Remove recent project',
            ico: '✕',
            ask: 'Do you want to remove recent project?'
        },
        clear: {
            title: 'Clear all',
            ask: 'Do you want to remove all recent projects?'
        }
    },
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
    project: {
        title: 'Project',
        ico: '♪',
        selectError: {
            title: 'Invalid file',
            message: 'Selected file is not a valid project!'
        },
        saveError: {
            title: 'Save aborted',
            message: 'Project file cannot be saved! File is used by another program or project data are invalid.'
        },
        setNameError: {
            title: 'Invalid project name',
            message: `Project name should be between ${PROJECT_NAME_MIN} and ${PROJECT_NAME_MAX} characters!`
        },
        setTempoError: {
            title: 'Invalid project tempo',
            message: `Project tempo value should be between ${PROJECT_TEMPO_MIN} and ${PROJECT_TEMPO_MAX}!`
        },
        closeAsk: 'Do you want to close current project? Unsaved data will be lost!',
        fields: {
            name: 'Project name',
            tempo: 'Tempo',
            sampleRate: 'Sample rate'
        }
    },
    track: {
        title: 'Track',
        solo: {
            title: 'Solo',
            ico: 'S'
        },
        mute: {
            title: 'Mute',
            ico: 'M'
        }
    }
};
