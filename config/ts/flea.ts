export interface FleaConfig
{
    runIntervalSeconds: number;
    minUserLevel: number;
    blacklist: Blacklist;
    condition: Condition;
    currencies: Currencies;
    offerItemCount: OfferItemCount;
    reputation: Reputation;
    time: Time;
}
  
export interface Blacklist 
{
    enableBsgList: boolean;
    enableQuestList: boolean;
}
  
export interface Condition 
{
    conditionChance: number;
    min: number;
    max: number;
}
  
export interface Currencies 
{
    roubles: number;
    dollars: number;
    euros: number;
}
  
export interface OfferItemCount 
{
    min: number;
    max: number;
}
  
export interface Reputation 
{
    gain: number;
    loss: number;
}
  
export interface Time 
{
    baseSellTime: number;
    minSellTime: number;
    maxSellTime: number;
}
  