import React from 'react';
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

export const TracksMasterUI: React.SFC<Props> = ({ tracks }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="TracksMaster">
            {Object.entries<TrackData>(tracks).map(([id, track]) => {
                const { volume, pan, delay, reverb } = track;
                const tID = id as TrackID;
                return (
                    <li className="TracksMaster-item" key={id}>
                        <div className="TracksMaster-item-column">
                            V:&nbsp;{getInput('VOLUME', volume, VOLUME.MIN, VOLUME.MAX, value => dispatch(setTrackVolume(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            P:&nbsp;{getInput('PAN', pan, PAN.MIN, PAN.MAX, value => dispatch(setTrackPan(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            D:&nbsp;{getInput('DELAY', delay, DELAY.MIN, DELAY.MAX, value => dispatch(setTrackDelay(tID, value)))}&nbsp;%
                        </div>

                        <div className="TracksMaster-item-column">
                            R:&nbsp;{getInput('REVERB', reverb, REVERB.MIN, REVERB.MAX, value => dispatch(setTrackReverb(tID, value)))}&nbsp;%
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
