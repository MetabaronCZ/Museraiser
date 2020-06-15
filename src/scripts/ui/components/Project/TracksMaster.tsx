import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TRACK } from 'data/config';

import { OnChange } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { TracksData } from 'modules/project/tracks';
import { TrackID } from 'modules/project/tracks/track';
import {
    setTrackVolume, setTrackPan, setTrackDelay, setTrackReverb
} from 'modules/project/actions';

import { FormSlider } from 'ui/common/FormSlider';

const { VOLUME, PAN, DELAY, REVERB } = TRACK;

interface Props {
    readonly tracks: TracksData;
    readonly selected: TrackID | null;
}

const getInput = (id: string, value: number, min: number, max: number, onChange: OnChange<number>): React.ReactNode => (
    <FormSlider
        id={id}
        value={value}
        min={min}
        max={max}
        unit="%"
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
                            {getInput('VOLUME', volume.gain, VOLUME.MIN, VOLUME.MAX, value => {
                                dispatch(setTrackVolume(id, value));
                            })}
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('PAN', pan, PAN.MIN, PAN.MAX, value => {
                                dispatch(setTrackPan(id, value));
                            })}
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('DELAY', delay, DELAY.MIN, DELAY.MAX, value => {
                                dispatch(setTrackDelay(id, value));
                            })}
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('REVERB', reverb, REVERB.MIN, REVERB.MAX, value => {
                                dispatch(setTrackReverb(id, value));
                            })}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
