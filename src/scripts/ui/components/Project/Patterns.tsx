import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { ProjectDataState } from 'modules/project';
import { AppDispatch, AppState } from 'modules/store';
import { TrackID } from 'modules/project/tracks/track';
import { selectTrackPattern, deleteTrackPattern } from 'modules/project/actions';

import { List } from 'ui/common/List';
import { Paragraph } from 'ui/common/Paragraph';
import { LinkButton } from 'ui/common/LinkButton';
import { ButtonList } from 'ui/common/ButtonList';

interface Props {
    readonly track: TrackID | null;
}

export const PatternsUI: React.SFC<Props> = ({ track: trackID }) => {
    const project = useSelector<AppState, ProjectDataState>(state => state.project);
    const dispatch = useDispatch<AppDispatch>();

    if (!project) {
        throw new Error('Invalid app state');
    }
    const track = trackID ? project.file.tracks[trackID] : null;

    if (!track) {
        return <Paragraph>{TXT.track.notSelected}</Paragraph>;
    }
    const selected = project.pattern;
    const { patterns } = track;

    if (!patterns.length) {
        return <Paragraph>{TXT.pattern.noPatterns}</Paragraph>;
    }
    return (
        <List>
            {track.patterns.map(ptn => (
                <ButtonList type="stretched" key={ptn.id}>
                    <LinkButton
                        onClick={() => dispatch(selectTrackPattern(track.id, ptn.id))}
                    >
                        {selected === ptn.id
                            ? <strong>{ptn.name}</strong>
                            : ptn.name
                        }
                    </LinkButton>

                    <LinkButton
                        title={TXT.pattern.delete.title}
                        onClick={() => dispatch(deleteTrackPattern(track.id, ptn.id))}
                    >
                        {TXT.pattern.delete.ico}
                    </LinkButton>
                </ButtonList>
            ))}
        </List>
    );
};
