// convert Node Buffer to ArrayBuffer
export const fromBuffer = (buffer: Buffer): ArrayBuffer => {
    const result = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(result);

    for (let i = 0; i < buffer.length; i++) {
        view[i] = buffer[i];
    }
    return result;
};

// convert ArrayBuffer to base64 encoded string
export const toBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';

    for (let i = 0, imax = buffer.byteLength; i < imax; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

// convert base64 encoded sample to AudioBuffer
export const toArrayBuffer = (base64: string): ArrayBuffer => {
    const binary = atob(base64);
    const buffer = new ArrayBuffer(binary.length);
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < buffer.byteLength; i++) {
        bytes[i] = binary.charCodeAt(i) & 0xFF;
    }
    return buffer;
};
