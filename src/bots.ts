import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { BotsConfig } from "../config/ts/bots";
import { Logger } from "./logger";

export class Bots
{
    private modConfig: BotsConfig = require("../config/bots.json");
    private logger: Logger;
    private botConfig: IBotConfig;
    private tables: DatabaseServer;
    private weightedRandomHelper: WeightedRandomHelper;

    constructor(logger: Logger, databaseServer: DatabaseServer, botConfig: IBotConfig, weightedRandomHelper: WeightedRandomHelper)
    {
        this.logger = logger;
        this.botConfig = botConfig;
        this.tables = databaseServer;
        this.weightedRandomHelper = weightedRandomHelper;
    }

    public updateBots(): void
    {
        // modConfig variables
        const mod = this.modConfig;
        const modPMC = this.modConfig.pmc;
        const modScav = this.modConfig.scav;

        // Server side variables
        const pmc = this.botConfig.pmc;
        const bot = this.botConfig;
        const lootNValue = this.botConfig.lootNValue;

        // Start modifications
        

        // Checks if straight up difficulty selection is used or not to determine if it should use that or if it should then go to use weighted difficulties.
        if (modPMC.difficultyWeights.useWeights)
        {
            const chosenDifficulty = this.chooseRandomWeightedDifficulty();
            this.logger.info("PMC Difficulty Chance Weights Patched");
            this.logger.info(`PMC Difficulty Chosen: ${chosenDifficulty}`)
        }
        else if (modPMC.difficulty != pmc.difficulty)
        {
            pmc.difficulty = modPMC.difficulty;
            this.logger.info(`PMC Bot Difficulty set to ${modPMC.difficulty}`);
        }
        else if (modPMC.useDifficultyOverride)
        {
            pmc.useDifficultyOverride = modPMC.useDifficultyOverride;
            this.logger.info("PMC Bot Difficulty now overriden by raid settings");
        }


        // Enables common and secure containers to spawn on PMCs by whitelisting the parent IDs. Rarity adjusted via PMC lootNValue. Default true.
        if (modPMC.containersOnPMCs)
        {
            this.containersOnPMCs();
            this.logger.info(`Containers On PMCs: ${modPMC.containersOnPMCs}`);
        }


        // Chance that PMC bot will be USEC or BEAR. Default is 50%
        if (modPMC.isUsec != pmc.isUsec)
        {
            pmc.isUsec = modPMC.isUsec;
            this.logger.info(`PMC isUsec Chance is: ${modPMC.isUsec}`);
        }


        // Max Loot Value in Rubles for PMC bots in Backpack, Pockets, and Vest respectively. Default is 150,000/50,000/50,000
        if (modPMC.maxBackpackLootTotalRub != pmc.maxBackpackLootTotalRub
            || modPMC.maxPocketLootTotalRub != pmc.maxPocketLootTotalRub
            || modPMC.maxVestLootTotalRub != pmc.maxVestLootTotalRub)
        {
            this.changeMaxLootvalue();
            this.logger.info(`PMC Loot Value totals changed! \n Max Backpack Total Value: ${modPMC.maxBackpackLootTotalRub} \n Max Pocket Total Value: ${modPMC.maxPocketLootTotalRub} \n Max Vest Total Value: ${modPMC.maxVestLootTotalRub}`);
        }


        // Chance that the PMC bot of your faction (BEAR/USEC) will be hostile or not. Default is 50%.
        if (modPMC.chanceSameSideIsHostilePercent != pmc.chanceSameSideIsHostilePercent)
        {
            pmc.chanceSameSideIsHostilePercent = modPMC.chanceSameSideIsHostilePercent;
            this.logger.info(`Chance Same Side Is Hostle is ${modPMC.chanceSameSideIsHostilePercent}`);
        }

        
        //  Adjusts the Max Bot Cap located in configs/bot.json/maxBotCap
        {
            for (const [key] of Object.entries(bot.maxBotCap))
            {
                bot.maxBotCap[key] = mod.maxBotCap[key];
                this.logger.info(mod.maxBotCap[key]);
            }
        }


        // Modifies the lootNValue of PMC or Scav if configured outside of the defaults.
        if (modPMC.lootNValue != lootNValue.pmc || modScav.lootNValue != lootNValue.scav)
        {
            lootNValue.scav = modScav.lootNValue;
            lootNValue.pmc = modPMC.lootNValue;
            this.logger.info(`lootNValue for bots has been changed! \n Scav lootNValue set to ${modScav.lootNValue} \n PMC lootNValue set to ${modPMC.lootNValue}`);
        }


        // Adjusts the chance for PMC to spawn instead of the default bot type if configured outside of the default values.
        if (this.modConfig.pmc.convertIntoPmcChance.assault.min != this.botConfig.pmc.convertIntoPmcChance.assault.min || this.modConfig.pmc.convertIntoPmcChance.assault.max != this.botConfig.pmc.convertIntoPmcChance.assault.max
            || this.modConfig.pmc.convertIntoPmcChance.cursedassault.min != this.botConfig.pmc.convertIntoPmcChance.cursedassault.min || this.modConfig.pmc.convertIntoPmcChance.cursedassault.max != this.botConfig.pmc.convertIntoPmcChance.cursedassault.max
            || this.modConfig.pmc.convertIntoPmcChance.pmcbot.min != this.botConfig.pmc.convertIntoPmcChance.pmcbot.min || this.modConfig.pmc.convertIntoPmcChance.pmcbot.max != this.botConfig.pmc.convertIntoPmcChance.pmcbot.max
            || this.modConfig.pmc.convertIntoPmcChance.exusec.min != this.botConfig.pmc.convertIntoPmcChance.exusec.min || this.modConfig.pmc.convertIntoPmcChance.exusec.max != this.botConfig.pmc.convertIntoPmcChance.exusec.max)
        {
            this.adjustPmcChance();
            this.logger.info("Chance to Convert Bots into PMC Patched");
        }


        // Modfiies the botRelativeLevelDeltaMax which alters the relative level delta maximum of PMC bots.
        if (mod.pmc.botRelativeLevelDeltaMax != this.botConfig.pmc.botRelativeLevelDeltaMax)
        {
            this.botConfig.pmc.botRelativeLevelDeltaMax = mod.pmc.botRelativeLevelDeltaMax;
            this.logger.info(`Bot Relative Delta Max Level set to ${mod.pmc.botRelativeLevelDeltaMax}`);
        }

        
        // Makes *all* bosses spawn chance configurable.
        if (mod.bossChance.activated)
        {
            this.configureBossChance();
            this.logger.info(`Boss Chance set to ${mod.bossChance.chance}`);
        }


        if (modPMC.looseWeaponInBackpackChancePercent != 15 || modPMC.looseWeaponInBackpackLootMinMax.max != 1 || modPMC.looseWeaponInBackpackLootMinMax.min != 1)
        {
            this.changeLooseWeapon();
            this.logger.info("Loose Weapon In PMC Backpack Values Patched");
        }
    }

    // Functions start here.
    
    // Function to enable secured and common containers on PMCs.
    private containersOnPMCs(): void
    {
        const backpackLoot = this.botConfig.pmc.backpackLoot.whitelist;

        backpackLoot.push("5448bf274bdc2dfc2f8b456a");
        backpackLoot.push("5795f317245977243854e041");
    }

    private chooseRandomWeightedDifficulty(): string
    {
        const chosenDifficulty = this.weightedRandomHelper.getWeightedInventoryItem(this.modConfig.pmc.difficultyWeights.weights);
        this.botConfig.pmc.difficulty = chosenDifficulty;

        return chosenDifficulty;
    }

    private adjustPmcChance(): void
    {
        const pmcConfig = this.botConfig.pmc.convertIntoPmcChance;
        const modConfig = this.modConfig.pmc.convertIntoPmcChance;

        pmcConfig.assault.min = modConfig.assault.min;
        pmcConfig.assault.max = modConfig.assault.max;
        pmcConfig.cursedassault.min = modConfig.cursedassault.min;
        pmcConfig.cursedassault.max = modConfig.cursedassault.max;
        pmcConfig.pmcbot.min = modConfig.pmcbot.min;
        pmcConfig.pmcbot.max = modConfig.pmcbot.max;
        pmcConfig.exusec.min = modConfig.exusec.min;
        pmcConfig.exusec.max = modConfig.exusec.max;
    }


    private changeMaxLootvalue(): void
    {
        const lootConfig = this.botConfig.pmc;
        const modConfig = this.modConfig.pmc;

        lootConfig.maxBackpackLootTotalRub = modConfig.maxBackpackLootTotalRub;
        lootConfig.maxPocketLootTotalRub = modConfig.maxPocketLootTotalRub;
        lootConfig.maxVestLootTotalRub = modConfig.maxVestLootTotalRub;
    }


    private configureBossChance(): void
    {
        const locations = this.tables.getTables().locations;

        for (const i in locations)
        {
            if (i !== "base")
            {
                for (const x in locations[i].base.BossLocationSpawn)
                {
                    locations[i].base.BossLocationSpawn[x].BossChance = this.modConfig.bossChance.chance;
                }
            }
        } 
    }

    private changeLooseWeapon():void
    {
        const pmcConfig = this.botConfig.pmc;
        const modConfig = this.modConfig.pmc;

        pmcConfig.looseWeaponInBackpackChancePercent = modConfig.looseWeaponInBackpackChancePercent;
        pmcConfig.looseWeaponInBackpackLootMinMax.min = modConfig.looseWeaponInBackpackLootMinMax.min;
        pmcConfig.looseWeaponInBackpackLootMinMax.max = modConfig.looseWeaponInBackpackLootMinMax.max;
    }

}
