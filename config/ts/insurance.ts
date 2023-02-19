export interface InsuranceConfig
{
    blacklistedEquipment: string[]
    prapor: Prapor
    therapist: Therapist
}

export interface Prapor 
{
    minHr: number
    maxHr: number
    storageMaxHr: number
    priceCoef: number
    returnChance: number
}
  
export interface Therapist 
{
    minHr: number
    maxHr: number
    storageMaxHr: number
    priceCoef: number
    returnChance: number
}