import { FenceConfig } from "@spt-aki/models/spt/config/ITraderConfig";

export interface TradersConfig 
{
    updateTime: UpdateTime;
    updateTimeDefault: number;
    /** What % of max durability an item needs to sell to a trader*/
    durabilityPurchaseThreshhold: Record<string, number>;
    traderPriceMultipler: number;
    persistPurchaseDataInProfile: boolean;
    fence: FenceConfig;
}

export interface UpdateTime 
{
    enabled: boolean;
    updateTime: UpdateTime1[];
}

export interface UpdateTime1
{
    traderId: string;
    seconds: number;
}