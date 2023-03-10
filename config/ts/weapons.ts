export interface WeaponsConfig
{
    malfunctions: Malfunctions
    recoilReduction: boolean
    smgInHolsters: boolean
}

export interface Malfunctions
{
    jam: boolean
    misfeed: boolean
    misfire: boolean
    overheat: boolean
    slide: boolean
}