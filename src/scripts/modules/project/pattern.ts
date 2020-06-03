export interface PatternData {
    name: string;
}

export interface PatternSnapshot {
    name: string;
}

export const createPattern = (name: string): PatternData => ({
    name
});

const parsePattern = (data: any): PatternData => ({
    name: `${data.name}`
});

export const parsePatterns = (data: any): PatternData[] => {
    if (!data.length) {
        return [];
    }
    return data.map((ptn: any) => parsePattern(ptn));
};

export const serializePatterns = (patterns: PatternData[]): PatternSnapshot[] => {
    return patterns.map(ptn => ({
        ...ptn
    }));
};
