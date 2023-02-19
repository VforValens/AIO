import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { RaidConfig } from "../config/ts/raid";
import { Logger } from "./logger";

export class Raid
{
    private modConfig: RaidConfig = require("../config/raid.json")
    private logger: Logger;
    private tables: DatabaseServer;
    private inRaidConfig: IInRaidConfig;

    constructor(logger:Logger, databaseServer: DatabaseServer, inRaidConfig: IInRaidConfig)
    {
        this.logger = logger;
        this.tables = databaseServer;
        this.inRaidConfig = inRaidConfig;
    }

    public updateRaid(): void
    {
        const mod = this.modConfig;

        if (mod.fixOpenZones)
        {
            this.fixOpenZones();
            this.logger.info(`Open Zones: ${mod.fixOpenZones}.`)
        }
        
        if (mod.chompiesBossFix)
        {
            this.chompiesBossFix();
            this.logger.info(`Chompies Boss Fix: ${mod.chompiesBossFix}.`)
        }

        if (mod.timeLimit.enabled)
        {
            const maps = this.tables.getTables().locations;

            for (const map in maps)
            {
                if (this.tables.getTables().locations[map].base?.EscapeTimeLimit)
                {
                    this.tables.getTables().locations[map].base.EscapeTimeLimit = this.modConfig.timeLimit.raidTime;
                }
            }
            this.logger.info(`Raid Time Limits set to ${mod.timeLimit.raidTime} minutes.`);
        }

        if (mod.aiAmount.toLowerCase() != this.inRaidConfig.raidMenuSettings.aiAmount || mod.aiDifficulty.toLowerCase() != this.inRaidConfig.raidMenuSettings.aiDifficulty || mod.bossEnabled != true
           || mod.scavWars != this.inRaidConfig.raidMenuSettings.scavWars || mod.taggedAndCursed != this.inRaidConfig.raidMenuSettings.taggedAndCursed || mod.enablePve != this.inRaidConfig.raidMenuSettings.enablePve)
        {
            const inRaidConfig = this.inRaidConfig;

            inRaidConfig.raidMenuSettings["aiAmount"] = mod.aiAmount;
            inRaidConfig.raidMenuSettings["aiDifficulty"] = mod.aiDifficulty;
            inRaidConfig.raidMenuSettings["bossEnabled"] = mod.bossEnabled;
            inRaidConfig.raidMenuSettings["scavWars"] = mod.scavWars;
            inRaidConfig.raidMenuSettings["taggedAndCursed"] = mod.taggedAndCursed;
            inRaidConfig.raidMenuSettings["enablePve"] = mod.enablePve;
            this.logger.info(`AI Amount set to ${mod.aiAmount}`);
            this.logger.info(`AI Difficulty set to ${mod.aiDifficulty}`);
            this.logger.info(`Boss Enabled set to ${mod.bossEnabled}`);
            this.logger.info(`Scav Wars set to ${mod.scavWars}`);
            this.logger.info(`Tagged And Cursed set to ${mod.taggedAndCursed}`);
            this.logger.info(`Enable PvE set to ${mod.enablePve}`);
        }

        if (mod.carExtractBaseStandingGain != this.inRaidConfig.carExtractBaseStandingGain)
        {
            this.inRaidConfig.carExtractBaseStandingGain = mod.carExtractBaseStandingGain;
            this.logger.info(`Car Extract Base Standing Gain set to ${mod.carExtractBaseStandingGain}`);
        }

        if (mod.scavExtractGain != this.inRaidConfig.scavExtractGain)
        {
            this.inRaidConfig.scavExtractGain = mod.scavExtractGain;
            this.logger.info(`Scav Extract Gain set to ${mod.scavExtractGain}`);
        }
    }

    private fixOpenZones(): void 
    {  
        const zones = 
        {
            "bigmap": "ZoneBrige,ZoneCrossRoad,ZoneDormitory,ZoneGasStation,ZoneFactoryCenter,ZoneFactorySide,ZoneOldAZS,ZoneSnipeBrige,ZoneSnipeTower,ZoneSnipeFactory,ZoneBlockPost,ZoneBlockPostSniper,ZoneBlockPostSniper3,ZoneTankSquare,ZoneWade,ZoneCustoms,ZoneScavBase",
            "laboratory": "BotZoneGate1,BotZoneGate2,BotZoneBasement,BotZoneFloor1,BotZoneFloor2",
            "rezervbase": "ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBunkerStorage,ZoneSubStorage,ZoneSubCommand",
            "woods": "ZoneClearVill,ZoneHouse,ZoneScavBase2,ZoneHouse,ZoneWoodCutter,ZoneBigRocks,ZoneRoad,ZoneHighRocks,ZoneMiniHouse,ZoneBigRocks,ZoneRedHouse",
            "shoreline": "ZoneSanatorium1,ZoneSanatorium2,ZoneIsland,ZoneGasStation,ZoneMeteoStation,ZonePowerStation,ZoneBusStation,ZoneRailWays,ZonePort,ZoneBunkeSniper,ZonePowerStationSniper,ZoneForestTruck,ZoneForestSpawn,ZoneBunker,GreenHouses,ZoneStartVillage,ZoneTunnel,ZonePassClose,ZonePassFar,ZoneForestGasStation",
            "lighthouse": "Zone_Containers,Zone_Rocks,Zone_Chalet,Zone_Village,Zone_Bridge,Zone_OldHouse,Zone_LongRoad,Zone_DestroyedHouse,Zone_SniperPeak,Zone_Island,Zone_Blockpost,Zone_Helicopter,Zone_RoofBeach,Zone_TreatmentBeach,Zone_TreatmentRocks,Zone_TreatmentContainers,Zone_RoofRocks"
        }

        for (const location in zones)
        {
            this.tables.getTables().locations[location].base.OpenZones = zones[location];
        }
    }

    private chompiesBossFix(): void 
    {
        const labsBosses = this.tables.getTables().locations.laboratory.base.BossLocationSpawn;
        const reserveBosses = this.tables.getTables().locations.rezervbase.base.BossLocationSpawn;
        const spawn1 = labsBosses.find(x => x.TriggerId === "autoId_00008_EXFIL");
        if (spawn1)
        {
            spawn1.TriggerId = "00404";
        }

        const spawn2 = labsBosses.find(x => x.TriggerId === "autoId_00010_EXFIL");
        if (spawn2)
        {
            spawn2.TriggerId = "00409";
        }

        const spawn3 = reserveBosses.find(x => x.TriggerId === "00457");
        if (spawn3)
        {
            spawn3.TriggerId = "autoId_00632_EXFIL";
        }

        const spawn4 = reserveBosses.find(x => x.TriggerId === "00452");
        if (spawn4)
        {
            spawn4.TriggerId = "autoId_00000_D2_LEVER";
        }
    }
}
