import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'modules/store';
import { Logger } from 'modules/logger';
import { ProjectDataState } from 'modules/project';

import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';
import { Paragraph } from 'ui/common/Paragraph';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<State, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    return (
        <div className="Project">
            <Heading text="Project" />

            <Paragraph>
                <pre>{JSON.stringify(project, null, '\t')}</pre>
            </Paragraph>
        </div>
    );
};
