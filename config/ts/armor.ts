export interface ArmorConfig
{
    removeGearRestrictions: boolean
    armorMaterials: Armor
}
  
export interface Armor 
{
    uhmwpe: Materials
    aramid: Materials
    combined: Materials
    titan: Materials
    aluminium: Materials
    armoredSteel: Materials
    ceramic: Materials
    glass: Materials
}

export interface Materials
{
    destructibility: number
    minRepairDegradation: number
    maxRepairDegradation: number
    explosionDestructibility: number
    minRepairKitDegradation: number
    maxRepairKitDegradation: number
}