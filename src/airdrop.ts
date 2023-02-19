import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { AirdropConfig } from "../config/ts/airdrop";
import { Logger } from "./logger";

export class Airdrop
{
    private modConfig: AirdropConfig = require("../config/airdrop.json");
    private logger: Logger;
    private databaseServer: DatabaseServer;
    private airdropConfig: IAirdropConfig;
    private tables: IDatabaseTables

    constructor(logger: Logger, databaseServer: DatabaseServer, airdropConfig: IAirdropConfig)
    {
        this.logger = logger;
        this.tables = databaseServer.getTables();
        this.airdropConfig = airdropConfig;
    }
    
    public updateAirdrops(): void
    {
        const mod = this.modConfig;
        const airdrop = this.airdropConfig;


        // Sets airdropChancePercent to what is configured.
        if (mod.airdropChancePercent != airdrop.airdropChancePercent)
        {
            this.setAirdropChance();
        }

        // Sets airdropMinStartTime and airdropMaxStartTime in Seconds to what is configured.
        if (mod.airdropMinStartTimeSeconds != airdrop.airdropMinStartTimeSeconds || mod.airdropMaxStartTimeSeconds != airdrop.airdropMaxStartTimeSeconds)
        {
            airdrop.airdropMinStartTimeSeconds = mod.airdropMinStartTimeSeconds;
            airdrop.airdropMaxStartTimeSeconds = mod.airdropMaxStartTimeSeconds;
            this.logger.info(`Min Start Time is ${mod.airdropMinStartTimeSeconds} seconds. Max is ${mod.airdropMaxStartTimeSeconds}.`)
        }

        // Sets planeMinFlyHeight and planeMaxFlyHeight in Meters to what is configured.
        if (mod.planeMaxFlyHeight != airdrop.planeMaxFlyHeight || mod.planeMinFlyHeight != airdrop.planeMinFlyHeight)
        {
            airdrop.planeMaxFlyHeight = mod.planeMaxFlyHeight;
            airdrop.planeMinFlyHeight = mod.planeMinFlyHeight;
            this.logger.info(`Max Fly Height is ${mod.planeMaxFlyHeight}. Min is ${mod.planeMinFlyHeight}.`);
        }

        // Sets the volume (loudness) of the plane as it flies to what is configured.
        if (mod.planeVolume != airdrop.planeVolume)
        {
            airdrop.planeVolume = mod.planeVolume;
            this.logger.info(`Plane Volume is ${mod.planeVolume}`);
        }

        // Sets the speed of the plane as it flies to what is configured.
        if (mod.planeSpeed != airdrop.planeSpeed)
        {
            airdrop.planeSpeed = mod.planeSpeed;
            this.logger.info(`Plane Speed is ${mod.planeSpeed}`);
        }

        // Sets the fall speed of the cargo crate dropping out of the plate to what is configured.
        if (mod.crateFallSpeed != airdrop.crateFallSpeed)
        {
            airdrop.crateFallSpeed = mod.crateFallSpeed;
            this.logger.info(`Crate Fall Speed is ${mod.crateFallSpeed}`);
        }

        // Airdrop Loot Settings configuration begin.

        // Sets the Preset Count to what is configured.
        if (mod.loot.presetCount != airdrop.loot.presetCount)
        {
            airdrop.loot.presetCount = mod.loot.presetCount;
            this.logger.info(`Preset Count is ${mod.loot.presetCount}`);
        }

        // Sets the Item Count to what is configured.
        if (mod.loot.itemCount != airdrop.loot.itemCount)
        {
            airdrop.loot.itemCount = mod.loot.itemCount;
            this.logger.info(`Item Count is ${mod.loot.itemCount}`);
        }

        // Sets the Item Blacklist to what is configured.
        if (mod.loot.itemBlacklist != airdrop.loot.itemBlacklist)
        {
            airdrop.loot.itemBlacklist = mod.loot.itemBlacklist;
            this.logger.info(`Item Blacklist is ${mod.loot.itemBlacklist}`);
        }

        // Sets the itemTypeWhitelist to what is configured.
        if (mod.loot.itemTypeWhitelist != airdrop.loot.itemTypeWhitelist)
        {
            airdrop.loot.itemTypeWhitelist = mod.loot.itemTypeWhitelist;
            this.logger.info(`Item Type Whitelist is ${mod.loot.itemTypeWhitelist}`);
        }

        // Sets the itemLimits to what is configured.
        if (mod.loot.itemLimits != airdrop.loot.itemLimits)
        {
            airdrop.loot.itemLimits = mod.loot.itemLimits;
            this.logger.info(`Item Limits is ${mod.loot.itemLimits}`);
        }

        // Sets the itemStackLimits to what is configured.
        if (mod.loot.itemStackLimits != airdrop.loot.itemStackLimits)
        {
            airdrop.loot.itemStackLimits = mod.loot.itemStackLimits;
            this.logger.info(`Item Stack Limits is ${mod.loot.itemStackLimits}`);
        }

        // Sets the Armor Level Whitelist to what is configured.
        if (mod.loot.armorLevelWhitelist != airdrop.loot.armorLevelWhitelist)
        {
            airdrop.loot.armorLevelWhitelist = mod.loot.armorLevelWhitelist;
            this.logger.info(`Armor Level Whitelist is ${mod.loot.armorLevelWhitelist}`);
        }
    }


    // Begin Functions.
    private setAirdropChance(): void
    {
        const mod = this.modConfig.airdropChancePercent;
        const chance = this.airdropConfig.airdropChancePercent;
        chance["bigmap"] = mod.bigmap;
        chance["woods"] = mod.woods;
        chance["lighthouse"] = mod.lighthouse;
        chance["shoreline"] = mod.shoreline;
        chance["interchange"] = mod.interchange;
        chance["reserve"] = mod.reserve;
        chance["tarkovStreets"] = mod.tarkovStreets;
        this.logger.info(`Customs Airdrop Chance is ${mod.bigmap}`);
        this.logger.info(`Woods Airdrop Chance is ${mod.woods}`);
        this.logger.info(`Lighthouse Airdrop Chance is ${mod.lighthouse}`);
        this.logger.info(`Shoreline Airdrop Chance is ${mod.shoreline}`);
        this.logger.info(`Interchange Airdrop Chance is ${mod.interchange}`);
        this.logger.info(`Reserve Airdrop Chance is ${mod.reserve}`);
        this.logger.info(`Streets Airdrop Chance is ${mod.tarkovStreets}`);
    }
}
