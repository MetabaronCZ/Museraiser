import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TRACK } from 'data/config';

import { AppDispatch } from 'modules/store';
import { TrackData, Tracks, TrackID } from 'modules/project/track';
import {
    setTrackVolume, setTrackPan, setTrackDelay, setTrackReverb
} from 'modules/project';

import { FormNumber } from 'ui/common/FormNumber';

const { VOLUME, PAN, DELAY, REVERB } = TRACK;

type OnChange = (value: number) => void;

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

const getInput = (id: string, value: number, min: number, max: number, onChange: OnChange): React.ReactNode => (
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
            {Object.entries<TrackData>(tracks).map(([id, track]) => {
                const { volume, pan, delay, reverb } = track;
                const tID = id as TrackID;
                return (
                    <li
                        className={cn('TracksMaster-item', {
                            'is-selected': tID === selected
                        })}
                        key={id}
                    >
                        <div className="TracksMaster-item-column">
                            {getInput('VOLUME', volume, VOLUME.MIN, VOLUME.MAX, value => dispatch(setTrackVolume(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('PAN', pan, PAN.MIN, PAN.MAX, value => dispatch(setTrackPan(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('DELAY', delay, DELAY.MIN, DELAY.MAX, value => dispatch(setTrackDelay(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            {getInput('REVERB', reverb, REVERB.MIN, REVERB.MAX, value => dispatch(setTrackReverb(tID, value)))}&nbsp;%
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
