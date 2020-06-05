import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { MASTER } from 'data/config';

import { AppDispatch } from 'modules/store';
import { MasterData } from 'modules/project/master';
import { ReverbID, reverbs } from 'modules/project/reverb';
import {
    setMasterVolume,
    setMasterDelayAmount, setMasterDelayRate,
    setMasterReverbType, setMasterReverbDepth
} from 'modules/project/actions';

import { FormField } from 'ui/common/FormField';
import { FormNumber } from 'ui/common/FormNumber';
import { FormSelect, createSelectOptions } from 'ui/common/FormSelect';

const { VOLUME, DELAY, REVERB } = MASTER;

const reverbTypes = createSelectOptions<ReverbID>(reverbs.slice(0), type => ({
    label: TXT.reverb[type],
    value: type
}));

interface Props {
    readonly master: MasterData;
}

export const MasterUI: React.SFC<Props> = ({ master }) => {
    const { volume, delay, reverb } = master;
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            <FormField id="volume" label={TXT.master.volume}>
                <FormNumber
                    id="master-volume"
                    value={volume.gain}
                    min={VOLUME.MIN}
                    max={VOLUME.MAX}
                    mini
                    onChange={value => dispatch(setMasterVolume(value))}
                />&nbsp;%
            </FormField>

            <FormField id="delay-amount" label={TXT.master.delay.amount}>
                <FormNumber
                    id="delay-amount"
                    value={delay.amount}
                    min={DELAY.AMOUNT.MIN}
                    max={DELAY.AMOUNT.MAX}
                    mini
                    onChange={value => dispatch(setMasterDelayAmount(value))}
                />&nbsp;%
            </FormField>

            <FormField id="delay-rate" label={TXT.master.delay.rate}>
                <FormNumber
                    id="delay-rate"
                    value={delay.rate}
                    min={DELAY.RATE.MIN}
                    max={DELAY.RATE.MAX}
                    mini
                    onChange={value => dispatch(setMasterDelayRate(value))}
                />&nbsp;x
            </FormField>

            <FormField id="reverb-type" label={TXT.master.reverb.type}>
                <FormSelect
                    id="reverb-type"
                    value={reverb.type}
                    options={reverbTypes}
                    onChange={value => dispatch(setMasterReverbType(value as ReverbID))}
                />
            </FormField>

            <FormField id="reverb-depth" label={TXT.master.reverb.depth}>
                <FormNumber
                    id="reverb-depth"
                    value={reverb.depth}
                    min={REVERB.DEPTH.MIN}
                    max={REVERB.DEPTH.MAX}
                    mini
                    onChange={value => dispatch(setMasterReverbDepth(value))}
                />&nbsp;%
            </FormField>
        </>
    );
};
