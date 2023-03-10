export interface WeaponsConfig
{
    malfunctions: Malfunctions
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