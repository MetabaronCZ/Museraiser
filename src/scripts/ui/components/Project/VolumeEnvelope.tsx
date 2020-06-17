import React from 'react';

import { TXT } from 'data/texts';
import { ENVELOPE } from 'data/config';

import { EnvelopeData } from 'modules/project/envelope';

import { FormField } from 'ui/common/FormField';
import { FormSlider } from 'ui/common/FormSlider';
import { FormEnvelope } from 'ui/common/FormEnvelope';

interface Props {
    readonly id: string;
    readonly envelope: EnvelopeData;
    readonly onAttack: (attack: number) => void;
    readonly onDecay: (decay: number) => void;
    readonly onSustain: (sustain: number) => void;
    readonly onRelease: (release: number) => void;
}

export const VolumeEnvelope: React.SFC<Props> = ({ id, envelope, onAttack, onDecay, onSustain, onRelease }) => (
    <FormEnvelope>
        <FormField
            id={`${id}-envelope-attack`}
            label={TXT.sample.envelope.attack}
            wide
        >
            <FormSlider
                id={`${id}-envelope-attack`}
                min={ENVELOPE.ATTACK.MIN}
                max={ENVELOPE.ATTACK.MAX}
                value={envelope.attack}
                defaultValue={ENVELOPE.ATTACK.DEFAULT}
                step={ENVELOPE.ATTACK.STEP}
                unit="s"
                vertical
                onChange={onAttack}
            />
        </FormField>

        <FormField
            id={`${id}-envelope-decay`}
            label={TXT.sample.envelope.decay}
            wide
        >
            <FormSlider
                id={`${id}-envelope-decay`}
                min={ENVELOPE.DECAY.MIN}
                max={ENVELOPE.DECAY.MAX}
                value={envelope.decay}
                defaultValue={ENVELOPE.DECAY.DEFAULT}
                step={ENVELOPE.DECAY.STEP}
                unit="s"
                vertical
                onChange={onDecay}
            />
        </FormField>

        <FormField
            id={`${id}-envelope-sustain`}
            label={TXT.sample.envelope.sustain}
            wide
        >
            <FormSlider
                id={`${id}-envelope-sustain`}
                min={ENVELOPE.SUSTAIN.MIN}
                max={ENVELOPE.SUSTAIN.MAX}
                value={envelope.sustain}
                defaultValue={ENVELOPE.SUSTAIN.DEFAULT}
                step={ENVELOPE.SUSTAIN.STEP}
                unit="%"
                vertical
                onChange={onSustain}
            />
        </FormField>

        <FormField
            id={`${id}-envelope-release`}
            label={TXT.sample.envelope.release}
            wide
        >
            <FormSlider
                id={`${id}-envelope-release`}
                min={ENVELOPE.RELEASE.MIN}
                max={ENVELOPE.RELEASE.MAX}
                value={envelope.release}
                defaultValue={ENVELOPE.RELEASE.DEFAULT}
                step={ENVELOPE.RELEASE.STEP}
                unit="s"
                vertical
                onChange={onRelease}
            />
        </FormField>
    </FormEnvelope>
);
