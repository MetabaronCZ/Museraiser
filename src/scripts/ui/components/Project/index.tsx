import React from 'react';
import { ProjectData } from 'modules/project';

interface Props {
    readonly data: ProjectData;
}

export const ProjectUI: React.SFC<Props> = ({ data }) => (
    <div className="Project">
        PROJECT:
        <br />
        <pre>{JSON.stringify(data, null, '\t')}</pre>
    </div>
);
