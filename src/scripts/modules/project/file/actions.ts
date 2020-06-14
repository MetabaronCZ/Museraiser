import { limitNumber } from 'core/number';
import { PROJECT } from 'data/config';

import { ProjectFile } from 'modules/project/file';

const { NAME, AUTHOR, DESCRIPTION, TEMPO } = PROJECT;

export const ProjectFileActions = {
    setName: (file: ProjectFile, name: string): void => {
        name = name.substring(0, NAME.MAX);
        file.name = name;
    },
    setAuthor: (file: ProjectFile, author: string): void => {
        author = author.substring(0, AUTHOR.MAX);
        file.author = author;
    },
    setDescription: (file: ProjectFile, desc: string): void => {
        desc = desc.substring(0, DESCRIPTION.MAX);
        file.description = desc;
    },
    setTempo: (file: ProjectFile, tempo: number): void => {
        tempo = limitNumber(tempo, TEMPO.MIN, TEMPO.MIN);
        file.tempo = tempo;
    }
};
