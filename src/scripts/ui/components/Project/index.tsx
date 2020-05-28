import React from 'react';
import { useSelector } from 'react-redux';

import { Logger } from 'modules/logger';
import { AppState } from 'modules/store';
import { ProjectDataState } from 'modules/project';

import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    return (
        <div className="Project">
            <Heading text="Project" />

            <div className="Paragraph">
                <pre>{JSON.stringify(project, null, '\t')}</pre>
            </div>
        </div>
    );
};
