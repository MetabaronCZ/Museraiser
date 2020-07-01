import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { clickOnly } from 'modules/events';
import { ProjectDataState } from 'modules/project';
import { AppDispatch, AppState } from 'modules/store';
import { TrackID } from 'modules/project/tracks/track';
import { selectTrackPattern, deleteTrackPattern } from 'modules/project/actions';

import { Paragraph } from 'ui/common/Paragraph';

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
    const { patterns } = track;

    if (!patterns.length) {
        return <Paragraph>{TXT.pattern.noPatterns}</Paragraph>;
    }
    return (
        <ul className="Patterns">
            {track.patterns.map(ptn => (
                <li
                    className={cn('Patterns-item', {
                        'is-selected': ptn.id === project.pattern
                    })}
                    key={ptn.id}
                >
                    <button
                        className="Patterns-item-title"
                        type="button"
                        onClick={clickOnly(
                            () => dispatch(selectTrackPattern(track.id, ptn.id))
                        )}
                    >
                        {ptn.name}
                    </button>

                    <button
                        className="Patterns-item-action"
                        type="button"
                        title={TXT.pattern.delete.title}
                        onClick={clickOnly(
                            () => dispatch(deleteTrackPattern(track.id, ptn.id))
                        )}
                    >
                        {TXT.pattern.delete.ico}
                    </button>
                </li>
            ))}
        </ul>
    );
};

/*
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
*/
