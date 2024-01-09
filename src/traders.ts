import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { TradersConfig } from "../config/ts/traders";
import { Logger } from "./logger";

export class Traders
{
    private modConfig: TradersConfig = require("../config/traders.json")
    private logger: Logger;
    private databaseServer: DatabaseServer;
    private traderConfig: ITraderConfig;

    constructor(logger:Logger, databaseServer: DatabaseServer, traderConfig: ITraderConfig)
    {
        this.logger = logger;
        this.databaseServer = databaseServer;
        this.traderConfig = traderConfig;
    }

    public updateTraders(): void
    {
        const mod = this.modConfig;
        const trader = this.traderConfig;

        if (mod.updateTime.enabled)
        {
            this.updateTime();
        }

        if (trader.updateTimeDefault != mod.updateTimeDefault)
        {
            trader.updateTimeDefault = mod.updateTimeDefault;
        }

        if (trader.traderPriceMultipler != mod.traderPriceMultipler)
        {
            this.traderPriceMultiplier();
        }

        if (mod.disableMaxPurchaseLimits)
        {
            this.disableMaxPurchaseLimits();
        }


        if (trader.persistPurchaseDataInProfile != mod.persistPurchaseDataInProfile)
        {
            trader.persistPurchaseDataInProfile = mod.persistPurchaseDataInProfile;
        }

        if (trader.fence != mod.fence)
        {
            this.updateFence();
        }
    }

    private updateTime(): void
    {
        const mod = this.modConfig;
        const trader = this.traderConfig;
        trader.updateTime = mod.updateTime.updateTime;
        this.logger.info("Update Time Patched");
    }

    private traderPriceMultiplier(): void
    {
        const mod = this.modConfig;
        const trader = this.traderConfig;
        trader.traderPriceMultipler = mod.traderPriceMultipler;
        this.logger.info(`Trader Price Multiplier Set to ${mod.traderPriceMultipler}`);
    }

    private disableMaxPurchaseLimits(): void
    {
        const mod = this.modConfig;

        if (!mod.disableMaxPurchaseLimits)
        {
            return;
        }

        const traders = this.databaseServer.getTables().traders;

        for (const trader in traders)
        {
            const traderItems = traders[trader]?.assort?.items
            if (!traderItems)
            {
                continue;
            }
            for (const item of traderItems)
            {
                if (item.upd?.BuyRestrictionMax >= 1)
                {
                    item.upd.BuyRestrictionMax = 0;
                }
            }
        }
    }

    private updateFence(): void
    {
        const mod = this.modConfig.fence;
        const trader = this.traderConfig.fence;

        // Start updating Fence config.

        trader.partialRefreshTimeSeconds = mod.partialRefreshTimeSeconds;
        trader.partialRefreshChangePercent = mod.partialRefreshChangePercent;
        trader.discountOptions.assortSize = mod.assortSize;
        trader.maxPresetsPercent = mod.maxPresetsPercent;
        trader.discountOptions.itemPriceMult = mod.itemPriceMult;
        trader.discountOptions.presetPriceMult = mod.presetPriceMult;
        trader.regenerateAssortsOnRefresh = mod.regenerateAssortsOnRefresh;
        trader.itemTypeLimits = mod.itemTypeLimits;
        trader.presetMaxDurabilityPercentMinMax = mod.presetMaxDurabilityPercentMinMax;
        trader.armorMaxDurabilityPercentMinMax = mod.armorMaxDurabilityPercentMinMax;
        trader.blacklist = mod.blacklist;
        this.logger.info("Fence Has Been Patched");
    }
}