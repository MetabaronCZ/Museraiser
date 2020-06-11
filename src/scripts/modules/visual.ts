import { toArrayBuffer } from 'core/buffer';
import { Color } from 'data/colors';

import { Audio } from 'modules/audio';

export const drawWaveform = (canvas: HTMLCanvasElement, sample: string): void => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not draw sample waveform: invalid context!');
    }
    const { width, height } = canvas;
    const data = toArrayBuffer(sample);

    Audio.ctx.decodeAudioData(data).then(buffer => {
        // prepare data
        const rawData = buffer.getChannelData(0);
        const blockSize = Math.floor(rawData.length / width);
        let renderData: number[] = [];
        let mult = 0;

        for (let i = 0; i < width; i++) {
            let avg = 0;

            if (i) {
                const blockStart = blockSize * i;
                let count = 0;

                for (let j = 0; j < blockSize; j++) {
                    const value = rawData[blockStart + j];

                    if (!isNaN(value)) {
                        avg += value;
                        count++;
                    }
                }
                if (count) {
                    avg /= count;
                }
            }
            mult = Math.max(mult, Math.abs(avg));
            renderData.push(avg);
        }

        // normalize data
        renderData = renderData.map(n => {
            n /= mult;
            n = Math.min(n, +1);
            n = Math.max(n, -1);
            return n;
        });

        // draw data
        ctx.clearRect(0, 0, width, height);

        ctx.lineWidth = 0.5;
        ctx.strokeStyle = Color.darkest;
        ctx.beginPath();

        for (let i = 0, imax = renderData.length; i < imax; i++) {
            const x = i;
            const y = (renderData[i] * height / 2) + height / 2;

            if(i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    });
};
