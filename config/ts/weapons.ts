export interface WeaponsConfig
{
    malfunctions: Malfunctions
    recoilTweaks: boolean
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