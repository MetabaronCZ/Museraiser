import { PROJECT } from 'data/config';

export const projectTexts = {
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
};
