import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { GlobalsConfig } from "../config/ts/globals";
import { Logger } from "./logger";

export class Globals
{
    private modConfig: GlobalsConfig = require("../config/globals.json");
    private logger: Logger;
    private tables: DatabaseServer;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateGlobals(): void
    {
        const mod = this.modConfig;
        const global = this.tables.getTables().globals;

        if (mod.damagePerMeter != 9 || mod.safeHeight != 3)
        {
            global.config.Health.Falling.DamagePerMeter = mod.damagePerMeter;
            global.config.Health.Falling.SafeHeight = mod.safeHeight;
            this.logger.info(`Safe Fall Height set to ${mod.safeHeight} meters`);
            this.logger.info(`Damage Per Meter set to ${mod.damagePerMeter} meters`)
        }

        if (mod.maxLoyaltyTraders)
        {
            global.config.MaxLoyaltyLevelForAll = mod.maxLoyaltyTraders;
            this.logger.info(`Max Loyalty Traders is: ${mod.maxLoyaltyTraders}`);
        }

        if (mod.timeBeforeDeployLocal != 10)
        {
            global.config.TimeBeforeDeployLocal = mod.timeBeforeDeployLocal;
            this.logger.info(`Time Before Deploy set to: ${mod.timeBeforeDeployLocal}`);
        }

        if (mod.matchEnd.survivedExpRequirement != 200 || mod.matchEnd.survivedSecondsRequirement != 420 || mod.matchEnd.survivedExpReward != 300
            || mod.matchEnd.miaExpReward != 200 || mod.matchEnd.runnerExpReward != 200 || mod.matchEnd.leftMult != 0
            || mod.matchEnd.miaMult != 1 || mod.matchEnd.survivedMult != 1.3 || mod.matchEnd.runnerMult != 0.5
            || mod.matchEnd.killedMult != 1 || mod.matchEnd.headShotMult != 1.2 || mod.matchEnd.expOnDamageAllHealth != 50)
        {
            this.matchEndSettings();
        }
    }

    private matchEndSettings(): void
    {
        const global1 = this.tables.getTables().globals.config.exp.match_end;
        const mod = this.modConfig.matchEnd;

        global1.survived_exp_requirement = mod.survivedExpRequirement;
        global1.survived_seconds_requirement = mod.survivedSecondsRequirement;
        global1.survived_exp_reward = mod.survivedExpReward;
        global1.mia_exp_reward = mod.miaExpReward;
        global1.runner_exp_reward = mod.runnerExpReward;
        global1.leftMult = mod.leftMult;
        global1.miaMult = mod.miaMult;
        global1.survivedMult = mod.survivedMult;
        global1.runnerMult = mod.runnerMult;
        global1.killedMult = mod.killedMult;
        this.tables.getTables().globals.config.exp.kill.headShotMult = mod.headShotMult;
        this.tables.getTables().globals.config.exp.kill.expOnDamageAllHealth = mod.expOnDamageAllHealth;
        this.logger.info("Match End Settings Patched");
    }
}
