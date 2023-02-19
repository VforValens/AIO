export interface RaidConfig
{
    carExtractBaseStandingGain: number;
    chompiesBossFix: boolean;
    fixOpenZones: boolean;
    scavExtractGain: number;
    timeLimit: TimeLimit;
    aiAmount: string;
    aiDifficulty: string;
    bossEnabled: boolean;
    scavWars: boolean;
    taggedAndCursed: boolean;
    enablePve: boolean;
}

export interface TimeLimit
{
    enabled: boolean;
    raidTime: number;
}