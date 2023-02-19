export interface ItemsConfig
{
    standardStash: Stash
    behindStash: Stash
    escapeStash: Stash
    eodStash: Stash
    examinedByDefault: boolean
    examineTime: ExamineTime
    removeBackpacksRestrictions: boolean
    removeContainersRestrictions: boolean
    removeDiscardLimit: boolean
    removeInRaidItemRestrictions: boolean
    removeKeyUsageMax: boolean
    removeSecureContainersRestrictions: boolean
    dollarsMaxStack: number
    eurosMaxStack: number
    roublesMaxStack: number
    weightModifier: number
}

export interface ExamineTime
{
    enabled: boolean
    examineTime: number
}

export interface Stash 
{
    vertical: number
    horizontal: number
}