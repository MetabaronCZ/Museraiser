import React from 'react';
import { useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { Logger } from 'modules/logger';
import { AppState } from 'modules/store';
import { ProjectDataState } from 'modules/project';

import { Heading } from 'ui/common/Heading';
import { IntroUI } from 'ui/components/Intro';
import { SampleUI } from 'ui/components/Project/Sample';
import { MasterUI } from 'ui/components/Project/Master';
import { TracksUI } from 'ui/components/Project/Tracks';
import { PatternsUI } from 'ui/components/Project/Patterns';
import { PianoRollUI } from 'ui/components/Project/PianoRoll';

export const ProjectUI: React.SFC = () => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);

    if (!project) {
        Logger.error('Could not open project');
        return <IntroUI />;
    }
    const { file, track: trackID, pattern: patternID } = project;
    const { name, tracks, master } = file;

    const track = trackID ? tracks[trackID] : null;
    const pattern = track ? (track.patterns.find(ptn => patternID === ptn.id) || null) : null;

    return (
        <div className="Project">
            <div className="Project-top">
                <Heading size="large" text={`${TXT.project.title}: ${name}`} />
                <TracksUI tracks={tracks} selected={project.track} />
            </div>

            <div className="Project-bottom">
                <div className="Project-bottom-patterns">
                    <Heading text={TXT.track.patterns} />
                    <PatternsUI track={track ? track.id : null} />
                </div>

                <div className="Project-bottom-pianoRoll">
                    <Heading text={TXT.pattern.title} />
                    <PianoRollUI pattern={pattern} />
                </div>

                <div className="Project-bottom-sample">
                    <SampleUI track={track} master={master} />
                </div>

                <div className="Project-bottom-master">
                    <Heading text={TXT.master.title} />
                    <MasterUI master={master} />
                </div>
            </div>
        </div>
    );
};
