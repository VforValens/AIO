export interface ContainersConfig
{
    commonContainers: CommonContainers
    securedContainers: SecuredContainers
}
  
export interface CommonContainers 
{
    enabled: boolean
    ammoCase: Case
    docsCase: Case
    dogsCase: Case
    grenadeCase: Case
    injectorCase: Case
    itemCase: Case
    keyTool: Case
    keycardHolder: Case
    scavJunkbox: Case
    magsCase: Case
    medsCase: Case
    moneyCase: Case
    holodilnick: Case
    pistolCase: Case
    siccCase: Case
    wallet: Case
    thiccItemCase: Case
    thiccWeaponCase: Case
    weaponCase: Case
    wzWallet: Case
}
    
export interface SecuredContainers 
{
    enabled: boolean
    alpha: Case
    beta: Case
    epsilon: Case
    gamma: Case
    kappa: Case
}

export interface Case 
{
    width: number
    height: number
    cellsH: number
    cellsV: number
}
  