import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { SAMPLE, ENVELOPE } from 'data/config';

import { Audio } from 'modules/audio';
import { AppDispatch } from 'modules/store';
import { drawWaveform } from 'modules/visual';
import { MasterData } from 'modules/project/master';
import { TrackData } from 'modules/project/tracks/track';

import {
    selectSample, setSampleLoop, setSampleVolume,
    setSampleFilterCutoff, setSampleFilterResonance,
    setSampleVolumeEnvelopeAttack, setSampleVolumeEnvelopeDecay,
    setSampleVolumeEnvelopeSustain, setSampleVolumeEnvelopeRelease
} from 'modules/project/actions';

import { Grid } from 'ui/common/Grid';
import { Button } from 'ui/common/Button';
import { Heading } from 'ui/common/Heading';
import { GridRow } from 'ui/common/Grid/Row';
import { Paragraph } from 'ui/common/Paragraph';
import { FormField } from 'ui/common/FormField';
import { FormSlider } from 'ui/common/FormSlider';
import { ButtonList } from 'ui/common/ButtonList';
import { GridColumn } from 'ui/common/Grid/Column';
import { FormCheckbox } from 'ui/common/FormCheckbox';
import { FormEnvelope } from 'ui/common/FormEnvelope';

const { VOLUME, FILTER } = SAMPLE;
const MAX_DISPLAY_NAME = 16;

interface Props {
    readonly track: TrackData | null;
    readonly master: MasterData;
}

export const SampleUI: React.SFC<Props> = ({ track, master }) => {
    const dispatch = useDispatch<AppDispatch>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const sample = track ? track.sample : null;

        if (canvas && sample) {
            drawWaveform(canvas, sample.buffer);
        }
    });

    if (!track) {
        return (
            <>
                <Heading text={TXT.track.sample} />
                <Paragraph>{TXT.track.notSelected}</Paragraph>
            </>
        );
    }
    const { id, sample } = track;
    let name = (sample ? sample.name : '');

    if (name.length > MAX_DISPLAY_NAME) {
        name = `${name.substr(0, MAX_DISPLAY_NAME - 3)}...`;
    }
    return (
        <>
            <Heading text={TXT.track.sample} extra={name} />
            {sample
                ? (
                    <>
                        <canvas className="SampleCanvas" ref={canvasRef} />

                        <Grid>
                            <GridRow>
                                <GridColumn align="left">
                                    <Button
                                        text={TXT.sample.select}
                                        onClick={() => dispatch(selectSample(id))}
                                    />
                                </GridColumn>

                                <GridColumn align="right">
                                    <ButtonList>
                                        <Button
                                            text={TXT.sample.start}
                                            onClick={() => Audio.auditStart(sample, master)}
                                        />

                                        <Button
                                            text={TXT.sample.stop}
                                            onClick={() => Audio.auditStop()}
                                        />
                                    </ButtonList>
                                </GridColumn>
                            </GridRow>
                        </Grid>

                        <Grid>
                            <GridRow>
                                <GridColumn>
                                    <FormField id="sample-volume" label={TXT.sample.volume} wide>
                                        <FormSlider
                                            id="sample-volume"
                                            min={VOLUME.MIN}
                                            max={VOLUME.MAX}
                                            value={sample.volume.gain}
                                            defaultValue={VOLUME.DEFAULT}
                                            unit="%"
                                            onChange={value => dispatch(setSampleVolume(id, value))}
                                        />
                                    </FormField>

                                    <FormField id="sample-loop" label={TXT.sample.loop} wide>
                                        <FormCheckbox
                                            id="sample-loop"
                                            checked={sample.loop}
                                            onChange={value => dispatch(setSampleLoop(id, value))}
                                        />
                                    </FormField>
                                </GridColumn>

                                <GridColumn>
                                    <FormEnvelope>
                                        <FormField id="envelope-1-attack" label={TXT.sample.envelope.attack} wide>
                                            <FormSlider
                                                id="envelope-1-attack"
                                                min={ENVELOPE.ATTACK.MIN}
                                                max={ENVELOPE.ATTACK.MAX}
                                                value={sample.volumeEnvelope.attack}
                                                defaultValue={ENVELOPE.ATTACK.DEFAULT}
                                                step={ENVELOPE.ATTACK.STEP}
                                                unit="s"
                                                vertical
                                                onChange={value => dispatch(setSampleVolumeEnvelopeAttack(id, value))}
                                            />
                                        </FormField>

                                        <FormField id="envelope-1-decay" label={TXT.sample.envelope.decay} wide>
                                            <FormSlider
                                                id="envelope-1-decay"
                                                min={ENVELOPE.DECAY.MIN}
                                                max={ENVELOPE.DECAY.MAX}
                                                value={sample.volumeEnvelope.decay}
                                                defaultValue={ENVELOPE.DECAY.DEFAULT}
                                                step={ENVELOPE.DECAY.STEP}
                                                unit="s"
                                                vertical
                                                onChange={value => dispatch(setSampleVolumeEnvelopeDecay(id, value))}
                                            />
                                        </FormField>

                                        <FormField id="envelope-1-sustain" label={TXT.sample.envelope.sustain} wide>
                                            <FormSlider
                                                id="envelope-1-sustain"
                                                min={ENVELOPE.SUSTAIN.MIN}
                                                max={ENVELOPE.SUSTAIN.MAX}
                                                value={sample.volumeEnvelope.sustain}
                                                defaultValue={ENVELOPE.SUSTAIN.DEFAULT}
                                                step={ENVELOPE.SUSTAIN.STEP}
                                                unit="%"
                                                vertical
                                                onChange={value => dispatch(setSampleVolumeEnvelopeSustain(id, value))}
                                            />
                                        </FormField>

                                        <FormField id="envelope-1-release" label={TXT.sample.envelope.release} wide>
                                            <FormSlider
                                                id="envelope-1-release"
                                                min={ENVELOPE.RELEASE.MIN}
                                                max={ENVELOPE.RELEASE.MAX}
                                                value={sample.volumeEnvelope.release}
                                                defaultValue={ENVELOPE.RELEASE.DEFAULT}
                                                step={ENVELOPE.RELEASE.STEP}
                                                unit="s"
                                                vertical
                                                onChange={value => dispatch(setSampleVolumeEnvelopeRelease(id, value))}
                                            />
                                        </FormField>
                                    </FormEnvelope>
                                </GridColumn>
                            </GridRow>

                            <GridRow>
                                <GridColumn>
                                    <Heading size="small" text={TXT.sample.filter.title1} />

                                    <FormField id="filter-1-cutoff" label={TXT.sample.filter.cutoff} wide>
                                        <FormSlider
                                            id="filter-1-cutoff"
                                            min={FILTER.CUTOFF.MIN}
                                            max={FILTER.CUTOFF.MAX}
                                            value={sample.filter1.cutoff}
                                            defaultValue={FILTER.CUTOFF.DEFAULT}
                                            unit="%"
                                            onChange={value => dispatch(setSampleFilterCutoff(id, 'FILTER1', value))}
                                        />
                                    </FormField>

                                    <FormField id="filter-1-resonance" label={TXT.sample.filter.resonance} wide>
                                        <FormSlider
                                            id="filter-1-resonance"
                                            min={FILTER.RESONANCE.MIN}
                                            max={FILTER.RESONANCE.MAX}
                                            value={sample.filter1.resonance}
                                            defaultValue={FILTER.RESONANCE.DEFAULT}
                                            unit="%"
                                            onChange={value => dispatch(setSampleFilterResonance(id, 'FILTER1', value))}
                                        />
                                    </FormField>
                                </GridColumn>

                                <GridColumn>
                                    <Heading size="small" text={TXT.sample.filter.title2} />

                                    <FormField id="filter-2-cutoff" label={TXT.sample.filter.cutoff} wide>
                                        <FormSlider
                                            id="filter-2-cutoff"
                                            min={FILTER.CUTOFF.MIN}
                                            max={FILTER.CUTOFF.MAX}
                                            value={sample.filter2.cutoff}
                                            defaultValue={FILTER.CUTOFF.DEFAULT}
                                            unit="%"
                                            onChange={value => dispatch(setSampleFilterCutoff(id, 'FILTER2', value))}
                                        />
                                    </FormField>

                                    <FormField id="filter-2-resonance" label={TXT.sample.filter.resonance} wide>
                                        <FormSlider
                                            id="filter-2-resonance"
                                            min={FILTER.RESONANCE.MIN}
                                            max={FILTER.RESONANCE.MAX}
                                            value={sample.filter2.resonance}
                                            defaultValue={FILTER.RESONANCE.DEFAULT}
                                            unit="%"
                                            onChange={value => dispatch(setSampleFilterResonance(id, 'FILTER2', value))}
                                        />
                                    </FormField>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </>
                )
                : (
                    <Button
                        text={TXT.sample.select}
                        onClick={() => dispatch(selectSample(id))}
                    />
                )
            }
        </>
    );
};
