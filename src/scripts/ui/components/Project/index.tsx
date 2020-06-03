import React from 'react';
import { useSelector } from 'react-redux';

import { Logger } from 'modules/logger';
import { AppState } from 'modules/store';
import { ProjectDataState } from 'modules/project';

import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';
import { TrackData } from 'modules/project/track';
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

                <ul className="List">
                    {Object.entries<TrackData>(tracks).map(([id, track]) => (
                        <li className="List-item" key={id}>
                            {track.name}
                            {' '}
                            ({track.sample ? track.sample.name : null})
                            {' '}
                            <pre style={{ display: 'inline' }}>
                                {JSON.stringify(track.patterns, null, '\t')}
                            </pre>
                        </li>
                    ))}
                </ul>

                <ButtonList>
                    <Button text="Master" onClick={() => undefined} />
                    <Button text="Track" onClick={() => undefined} />
                    <Button text="Pattern" onClick={() => undefined} />
                    <Button text="Sample" onClick={() => undefined} />
                </ButtonList>
            </div>

            <div className="Project-detail">
                Detail...
            </div>
        </div>
    );
};
