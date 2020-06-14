import { limitNumber } from 'core/number';
import { PROJECT } from 'data/config';

import { ProjectFileData } from 'modules/project/file';

const { NAME, AUTHOR, DESCRIPTION, TEMPO } = PROJECT;

export const ProjectFile = {
    setName: (file: ProjectFileData, name: string): void => {
        name = name.substring(0, NAME.MAX);
        file.name = name;
    },
    setAuthor: (file: ProjectFileData, author: string): void => {
        author = author.substring(0, AUTHOR.MAX);
        file.author = author;
    },
    setDescription: (file: ProjectFileData, desc: string): void => {
        desc = desc.substring(0, DESCRIPTION.MAX);
        file.description = desc;
    },
    setTempo: (file: ProjectFileData, tempo: number): void => {
        tempo = limitNumber(tempo, TEMPO.MIN, TEMPO.MIN);
        file.tempo = tempo;
    }
};
