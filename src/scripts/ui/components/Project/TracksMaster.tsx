import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TRACK } from 'data/config';

import { OnChange } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { Tracks, TrackID } from 'modules/project/track';
import {
    setTrackVolume, setTrackPan, setTrackDelay, setTrackReverb
} from 'modules/project/actions';

import { FormNumber } from 'ui/common/FormNumber';

const { VOLUME, PAN, DELAY, REVERB } = TRACK;

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

const getInput = (id: string, value: number, min: number, max: number, onChange: OnChange<number>): React.ReactNode => (
    <FormNumber
        id={id}
        value={value}
        min={min}
        max={max}
        mini
        onChange={onChange}
    />
);

export const TracksMasterUI: React.SFC<Props> = ({ tracks, selected }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="TracksMaster">
            {Object.values(tracks).map(track => {
                const { id, volume, pan, delay, reverb } = track;
                return (
                    <li
                        className={cn('TracksMaster-item', {
                            'is-selected': id === selected
                        })}
                        key={id}
                    >
                        <div className="TracksMaster-item-column">
                            {getInput('VOLUME', volume, VOLUME.MIN, VOLUME.MAX, value => {
                                dispatch(setTrackVolume(id, value));
                            })}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('PAN', pan, PAN.MIN, PAN.MAX, value => {
                                dispatch(setTrackPan(id, value));
                            })}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('DELAY', delay, DELAY.MIN, DELAY.MAX, value => {
                                dispatch(setTrackDelay(id, value));
                            })}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('REVERB', reverb, REVERB.MIN, REVERB.MAX, value => {
                                dispatch(setTrackReverb(id, value));
                            })}&nbsp;%
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
