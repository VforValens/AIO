export interface GlobalsConfig 
{
    damagePerMeter: number
    safeHeight: number
    maxLoyaltyTraders: boolean
    timeBeforeDeployLocal: number
    matchEnd: MatchEnd
}

export interface MatchEnd 
{
    survivedExpRequirement: number
    survivedSecondsRequirement: number
    survivedExpReward: number
    miaExpReward: number
    runnerExpReward: number
    leftMult: number
    miaMult: number
    survivedMult: number
    runnerMult: number
    killedMult: number
    headShotMult: number
    expOnDamageAllHealth: number
}
  