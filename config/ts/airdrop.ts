import { AirdropChancePercent, AirdropLoot } from "@spt-aki/models/spt/config/IAirdropConfig";

export interface AirdropConfig
{
    airdropChancePercent: AirdropChancePercent;
    planeMinFlyHeight: number;
    planeMaxFlyHeight: number;
    planeVolume: number;
    planeSpeed: number;
    crateFallSpeed: number;
    airdropMinStartTimeSeconds: number;
    airdropMaxStartTimeSeconds: number;
    loot: AirdropLoot;
}