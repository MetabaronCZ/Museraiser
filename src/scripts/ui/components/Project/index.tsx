import React from 'react';
import { useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { AppState } from 'modules/store';
import { ProjectDataState } from 'modules/project';

import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';
import { TrackUI } from 'ui/components/Project/Track';
import { MasterUI } from 'ui/components/Project/Master';
import { TracksUI } from 'ui/components/Project/Tracks';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    const { name, tracks, master } = project.file;
    return (
        <div className="Project">
            <div className="Project-tracks">
                <Heading text={`${TXT.project.title}: ${name}`} />
                <TracksUI tracks={tracks} selected={project.track} />
            </div>

            <div className="Project-footer">
                <div className="Project-footer-track">
                    <TrackUI />
                </div>

                <div className="Project-footer-content">
                    Piano roll / Sample edit / ???
                </div>

                <div className="Project-footer-master">
                    <Heading size="small" text={TXT.master.title} />
                    <MasterUI master={master} />
                </div>
            </div>
        </div>
    );
};
