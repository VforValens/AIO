import { MinMax } from "@spt-aki/models/common/MinMax";
import { DynamicLoot } from "@spt-aki/models/spt/config/IPmcConfig";

export interface BotsConfig
{
    bossChance: BossChance;
    botGenerationBatchSizePerType: number;
    maxBotCap: MaxBotCap;
    pmc: IPmcConfig;
    scav: Scav;
}

export interface IPmcConfig 
{
    dynamicLoot: DynamicLoot;
    useDifficultyOverride: boolean;
    difficulty: string;
    looseWeaponInBackpackChancePercent: number;
    looseWeaponInBackpackLootMinMax: MinMax;
    isUsec: number;
    usecType: string;
    bearType: string;
    chanceSameSideIsHostilePercent: number;
    /** key: location, value: type for usec/bear */
    pmcType: Record<string, Record<string, Record<string, number>>>;
    maxBackpackLootTotalRub: number;
    maxPocketLootTotalRub: number;
    maxVestLootTotalRub: number;
    convertIntoPmcChance: Record<string, MinMax>;
    enemyTypes: string[];
    botRelativeLevelDeltaMax: number;
    containersOnPMCs: boolean;
    lootNValue: number;
    difficultyWeights: DifficultyWeights;
}
  
export interface BossChance 
{
    activated: boolean
    chance: number
}
    
export interface DifficultyWeights 
{
    useWeights: boolean
    weights: Record<string, number>
}
    
export interface ConvertIntoPmcChance 
{
    assault: PmcChance
    cursedAssault: PmcChance
    pmcBot : PmcChance
    exUsec : PmcChance
}
  
export interface PmcChance 
{
    min: number
    max: number
}

export interface LooseWeapon
{
    min: number
    max: number
}
  
export interface Scav 
{
    lootNValue: number
}

export interface MaxBotCap
{
    factory: number
    customs: number
    woods: number
    shoreline: number
    lighthouse: number
    reservebase: number
    interchange: number
    laboratory: number
    default: number
}