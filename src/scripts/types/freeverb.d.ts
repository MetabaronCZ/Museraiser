declare module 'freeverb' {
    class Freeverb extends GainNode {
        constructor(ctx: AudioContext);
        public roomSize: number;
        public dampening: number;
        public wet: AudioParam;
        public dry: AudioParam;
    }
    export = Freeverb;
}
