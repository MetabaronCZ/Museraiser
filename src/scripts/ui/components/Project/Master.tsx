import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { MASTER } from 'data/config';

import { AppDispatch } from 'modules/store';
import { MasterData } from 'modules/project/master';
import {
    setMasterVolume, setMasterReverbDepth, setMasterReverbDampening
} from 'modules/project/actions';

import { FormField } from 'ui/common/FormField';
import { FormSlider } from 'ui/common/FormSlider';

const { VOLUME, REVERB } = MASTER;

interface Props {
    readonly master: MasterData;
}

export const MasterUI: React.SFC<Props> = ({ master }) => {
    const { volume, reverb } = master;
    const dispatch = useDispatch<AppDispatch>();
    return (
        <>
            <FormField id="volume" label={TXT.master.volume}>
                <FormSlider
                    id="master-volume"
                    value={volume.gain}
                    min={VOLUME.MIN}
                    max={VOLUME.MAX}
                    defaultValue={VOLUME.DEFAULT}
                    unit="%"
                    onChange={value => dispatch(setMasterVolume(value))}
                />
            </FormField>

            <FormField id="reverb-depth" label={TXT.master.reverb.depth}>
                <FormSlider
                    id="reverb-depth"
                    value={reverb.depth}
                    min={REVERB.DEPTH.MIN}
                    max={REVERB.DEPTH.MAX}
                    defaultValue={REVERB.DEPTH.DEFAULT}
                    unit="%"
                    onChange={value => dispatch(setMasterReverbDepth(value))}
                />
            </FormField>

            <FormField id="reverb-dampening" label={TXT.master.reverb.dampening}>
                <FormSlider
                    id="reverb-dampening"
                    value={reverb.dampening}
                    min={REVERB.DAMPENING.MIN}
                    max={REVERB.DAMPENING.MAX}
                    defaultValue={REVERB.DAMPENING.DEFAULT}
                    unit="%"
                    onChange={value => dispatch(setMasterReverbDampening(value))}
                />
            </FormField>
        </>
    );
};
