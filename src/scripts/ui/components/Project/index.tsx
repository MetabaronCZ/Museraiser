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
import { PianoRollUI } from 'ui/components/Project/PianoRoll';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    const { name, tracks, master } = project.file;
    const track = project.track ? tracks[project.track] : null;
    return (
        <div className="Project">
            <div className="Project-tracks">
                <Heading size="large" text={`${TXT.project.title}: ${name}`} />
                <TracksUI tracks={tracks} selected={project.track} />
            </div>

            <div className="Project-footer">
                <div className="Project-footer-track">
                    <TrackUI track={track} />
                </div>

                <div className="Project-footer-content">
                    <PianoRollUI />
                </div>

                <div className="Project-footer-master">
                    <MasterUI master={master} />
                </div>
            </div>
        </div>
    );
};
