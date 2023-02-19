import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { FleaConfig } from "../config/ts/flea";
import { Logger } from "./logger";

export class Flea
{
    private modConfig: FleaConfig = require("../config/flea.json");
    private logger: Logger;
    private ragfairConfig: IRagfairConfig;
    private tables: DatabaseServer;


    constructor (logger: Logger, ragfairConfig: IRagfairConfig, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.ragfairConfig = ragfairConfig;
        this.tables = databaseServer;
    }


    public updateFlea(): void
    {
        const mod = this.modConfig;
        const global = this.tables.getTables().globals;
        const ragfair = this.ragfairConfig.dynamic;

        if (mod.runIntervalSeconds != this.ragfairConfig.runIntervalSeconds)
        {
            this.ragfairConfig.runIntervalSeconds = mod.runIntervalSeconds;
            this.logger.info(`Run Interval Seconds patched to ${mod.runIntervalSeconds} seconds`);
        }


        if (mod.minUserLevel != global.config.RagFair.minUserLevel)
        {
            global.config.RagFair.minUserLevel = mod.minUserLevel;
            this.logger.info(`Fleamarket unlocked at level ${mod.minUserLevel}`)
        }

        
        if (!mod.blacklist.enableBsgList)
        {
            ragfair.blacklist.enableBsgList = false;
            this.logger.info("Fleamarket Blacklists patched");
        }


        if (!mod.blacklist.enableQuestList)
        {
            ragfair.blacklist.enableQuestList = false;
            this.logger.info("Fleamarket Blacklists patched");
        }


        if (mod.condition.conditionChance != ragfair.condition.conditionChance || mod.condition.min != ragfair.condition.min || mod.condition.max != ragfair.condition.max)
        {
            ragfair.condition.conditionChance = mod.condition.conditionChance;
            ragfair.condition.min = mod.condition.min;
            ragfair.condition.max = mod.condition.max;
            this.logger.info("Fleamarket Condition patched");
        }


        if (mod.currencies.roubles != ragfair.currencies.roubles || mod.currencies.dollars != ragfair.currencies.dollars || mod.currencies.euros != ragfair.currencies.euros)
        {   
            ragfair.currencies["5449016a4bdc2d6f028b456f"] = mod.currencies.roubles;
            ragfair.currencies["5696686a4bdc2da3298b456a"] = mod.currencies.dollars;
            ragfair.currencies["569668774bdc2da2298b4568"] = mod.currencies.euros;
            this.logger.info("Fleamarket Currencies patched")
        }


        if (mod.offerItemCount.min != ragfair.offerItemCount.min || mod.offerItemCount.max != ragfair.offerItemCount.max)
        {
            ragfair.offerItemCount.min = mod.offerItemCount.min;
            ragfair.offerItemCount.max = mod.offerItemCount.max;
            this.logger.info("Fleamarket Offer Item Count patched");
        }


        if (mod.reputation.gain != this.ragfairConfig.sell.reputation.gain || mod.reputation.loss != this.ragfairConfig.sell.reputation.loss)
        {
            ragfair.offerItemCount.min = mod.offerItemCount.min;
            ragfair.offerItemCount.max = mod.offerItemCount.max;
            this.logger.info("Fleamarket Reputation patched");
        }

        
        if (mod.time.baseSellTime != this.ragfairConfig.sell.time.base || mod.time.minSellTime != this.ragfairConfig.sell.time.min || mod.time.maxSellTime != this.ragfairConfig.sell.time.max)
        {
            const sell = this.ragfairConfig.sell.time;
            const mod = this.modConfig.time;
            sell.base = mod.baseSellTime;
            sell.min = mod.minSellTime;
            sell.max = mod.maxSellTime;
            this.logger.info("Fleamarket Sell Times patched");
        }
    }
}
