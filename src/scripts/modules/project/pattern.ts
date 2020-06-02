export interface PatternData {
    name: string;
}

export const createPattern = (name: string): PatternData => ({
    name
});

const createPatternFrom = (data: any): PatternData => ({
    name: `${data.name}`
});

export const createPatternsFrom = (data: any): PatternData[] => {
    if (!data.length) {
        return [];
    }
    return data.map((ptn: any) => createPatternFrom(ptn));
};
