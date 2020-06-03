import React from 'react';
import { useSelector } from 'react-redux';

import { Logger } from 'modules/logger';
import { AppState } from 'modules/store';
import { ProjectDataState } from 'modules/project';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';
import { TracksUI } from 'ui/components/Tracks';
import { ButtonList } from 'ui/common/ButtonList';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    const { name, tracks } = project.file;
    return (
        <div className="Project">
            <div className="Project-main">
                <Heading text={name} />
                <TracksUI tracks={tracks} />

                <ButtonList>
                    <Button text="Master" onClick={() => undefined} />
                    <Button text="Track" onClick={() => undefined} />
                    <Button text="Pattern" onClick={() => undefined} />
                    <Button text="Sample" onClick={() => undefined} />
                </ButtonList>
            </div>

            <div className="Project-detail">
                Piano roll / Sample edit / Master / ???
            </div>
        </div>
    );
};
