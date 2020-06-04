import { PROJECT } from 'data/config';

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
            title: 'Create new project',
            shortcut: 'CTRL+N'
        },
        open: {
            text: 'Open',
            title: 'Open project',
            shortcut: 'CTRL+O'
        },
        save: {
            text: 'Save',
            title: 'Save current project',
            shortcut: 'CTRL+S'
        },
        undo: {
            text: 'Undo',
            title: 'Undo operation',
            shortcut: 'CTRL+Z'
        },
        redo: {
            text: 'Redo',
            title: 'Redo operation',
            shortcut: 'CTRL+SHIFT+Z'
        },
        close: {
            text: 'Close',
            title: 'Close current project',
            shortcut: 'CTRL+W'
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
            message: `Project name should be between ${PROJECT.NAME.MIN} and ${PROJECT.NAME.MAX} characters!`
        },
        setAuthorError: {
            title: 'Invalid author name',
            message: `Author name should be between ${PROJECT.AUTHOR.MIN} and ${PROJECT.AUTHOR.MAX} characters!`
        },
        setDescriptionError: {
            title: 'Invalid project description',
            message: `Description should be between ${PROJECT.DESCRIPTION.MIN} and ${PROJECT.DESCRIPTION.MAX} characters!`
        },
        setTempoError: {
            title: 'Invalid project tempo',
            message: `Project tempo value should be between ${PROJECT.TEMPO.MIN} and ${PROJECT.TEMPO.MAX}!`
        },
        closeAsk: 'Do you want to close current project? Unsaved data will be lost!',
        fields: {
            name: 'Project name',
            tempo: 'Tempo',
            author: 'Author',
            sampleRate: 'Sample rate',
            description: 'Description'
        },
        undo: {
            title: 'Number of undo steps'
        },
        redo: {
            title: 'Number of redo steps'
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
