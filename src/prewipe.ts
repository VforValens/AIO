import { PrewipeConfig } from "../config/ts/prewipe";
import { Money } from "@spt-aki/models/enums/Money"
import type { BossLocationSpawn } from "@spt-aki/models/eft/common/ILocationBase";
import { Logger } from "./logger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ITrader } from "@spt-aki/models/eft/common/tables/ITrader";

export class Prewipe
{
    private modConfig: PrewipeConfig = require("../config/prewipe.json");
    private logger: Logger;
    private tables: DatabaseServer;
    private traders: Record<string, ITrader>;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
        this.traders = this.tables.getTables().traders;
    }

    public updatePrewipe(): void
    {
        // modConfig variables
        const preWipe = this.modConfig;

        // Start modifications
        // Prewipe Events

        // Spawn Killa On Factory
        if (preWipe.killaOnFactory)
        {
            this.spawnKillaOnFactory();
            this.logger.info("Killa On Factry Enabled");
        }


        // Spawns All Bosses On Reserve
        if (preWipe.allBossesOnReserve)
        {
            this.spawnAllBossesOnReserve();
            this.logger.info("Bosses On Reserve Prewipe Event Enabled");
        }

  
        // Spawns Gluhar On Labs
        if (preWipe.gluharOnLabs)
        {
            this.spawnGluharOnLabs();
            this.logger.info("Gluhar On Labs Prewipe Event Enabled");
        }


        // All cheap items on traders
        if (preWipe.allTradersSellCheapItems)
        {
            this.allTradersSellCheapItems();
            this.logger.info("Cheap Items On Traders Prewipe Event Enabled");
        }

        // Makes Obdolbos Super Powered
        if (preWipe.makeObdolbosPowerful) 
        {
            this.makeObdolbosPowerful();
            this.logger.info("Make Obdolbos Powerful Prewipe Event Enabled");
        }
    }


    // Functions start here.
    public createBossWave(role: string, chance: number, followers: string, escortAmount: number, zones: string): any
    {
        return {
            "BossName": role,
            "BossChance": chance,
            "BossZone": zones,
            "BossPlayer": false,
            "BossDifficult": "normal",
            "BossEscortType": followers,
            "BossEscortDifficult": "normal",
            "BossEscortAmount": escortAmount,
            "Time": -1
        }
    }

    private spawnKillaOnFactory(): void
    {
        const locations = this.tables.getTables().locations;
        const killaWave = this.createBossWave("bossKilla", 100, "followerBully", 0, locations.factory4_day.base.OpenZones);
        locations.factory4_day.base.BossLocationSpawn.push(killaWave);
        locations.factory4_night.base.BossLocationSpawn.push(killaWave);
    }


    private spawnAllBossesOnReserve(): void
    {
        const locations = this.tables.getTables().locations;
        let bossWave = this.createBossWave("bossKilla", 100, "followerBully", 0, locations.rezervbase.base.OpenZones);
        locations.rezervbase.base.BossLocationSpawn.push(bossWave);
        bossWave = this.createBossWave("bossBully", 100, "followerBully", 4, locations.rezervbase.base.OpenZones);
        locations.rezervbase.base.BossLocationSpawn.push(bossWave);
        bossWave = this.createBossWave("bossKojaniy", 100, "followerKojaniy", 2, locations.rezervbase.base.OpenZones);
        locations.rezervbase.base.BossLocationSpawn.push(bossWave);
        bossWave = this.createBossWave("bossSanitar", 100, "followerSanitar", 2, locations.rezervbase.base.OpenZones);
        locations.rezervbase.base.BossLocationSpawn.push(bossWave);
    }


    private spawnGluharOnLabs(): void
    {
        const locations = this.tables.getTables().locations;
        const glugluWave: BossLocationSpawn = 
        {
            "BossName": "bossGluhar",
            "BossChance": 43,
            "BossZone": "ZoneRailStrorage,ZoneRailStrorage,ZoneRailStrorage,ZonePTOR1,ZonePTOR2,ZoneBarrack,ZoneBarrack,ZoneBarrack,ZoneSubStorage",
            "BossPlayer": false,
            "BossDifficult": "normal",
            "BossEscortType": "followerGluharAssault",
            "BossEscortDifficult": "normal",
            "BossEscortAmount": "0",
            "Time": -1,
            "TriggerId": "",
            "TriggerName": "",
            "Supports": [
                {
                    "BossEscortType": "followerGluharAssault",
                    "BossEscortDifficult": [
                        "normal"
                    ],
                    "BossEscortAmount": "2"
                },
                {
                    "BossEscortType": "followerGluharSecurity",
                    "BossEscortDifficult": [
                        "normal"
                    ],
                    "BossEscortAmount": "2"
                },
                {
                    "BossEscortType": "followerGluharScout",
                    "BossEscortDifficult": [
                        "normal"
                    ],
                    "BossEscortAmount": "2"
                }
            ],
            RandomTimeSpawn: false
        }

        glugluWave.BossZone = locations.laboratory.base.OpenZones;
        locations.laboratory.base.BossLocationSpawn.push(glugluWave);
    }


    private allTradersSellCheapItems(): void
    {
        
        for (const trader in this.traders)
        {
            for (const assort in this.traders[trader]?.assort?.barter_scheme)
            {
                const itemScheme = this.traders[trader].assort.barter_scheme[assort];
                switch (itemScheme[0][0]._tpl)
                {
                    case Money.ROUBLES:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.01;
                        break;
                    case Money.DOLLARS:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.1;
                        break;
                    case Money.EUROS:
                        itemScheme[0][0].count = itemScheme[0][0].count * 0.05;
                        break;
                    default:
                        break;
                        
                }
            }
        }
    }


    private makeObdolbosPowerful(): void
    {
        
        const obdolbosBuff = [
            {
                "BuffType": "StaminaRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": 0.5,
                "AbsoluteValue": true,
                "SkillName": ""
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": 10,
                "AbsoluteValue": true,
                "SkillName": "Endurance"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": 10,
                "AbsoluteValue": true,
                "SkillName": "Strength"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": 20,
                "AbsoluteValue": true,
                "SkillName": "StressResistance"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": 20,
                "AbsoluteValue": true,
                "SkillName": "Charisma"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": -20,
                "AbsoluteValue": true,
                "SkillName": "Memory"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": -20,
                "AbsoluteValue": true,
                "SkillName": "Intellect"
            },
            {
                "BuffType": "SkillRate",
                "Chance": 1,
                "Delay": 1,
                "Duration": 1800,
                "Value": -20,
                "AbsoluteValue": true,
                "SkillName": "Attention"
            },
            {
                "BuffType": "Pain",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": 0,
                "AbsoluteValue": false,
                "SkillName": ""
            },
            {
                "BuffType": "StomachBloodloss",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": 0,
                "AbsoluteValue": false,
                "SkillName": ""
            },
            {
                "BuffType": "HydrationRate",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": -0.05,
                "AbsoluteValue": true,
                "SkillName": ""
            },
            {
                "BuffType": "EnergyRate",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": -0.05,
                "AbsoluteValue": true,
                "SkillName": ""
            },
            {
                "BuffType": "DamageModifier",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": 0.2,
                "AbsoluteValue": false,
                "SkillName": ""
            },
            {
                "BuffType": "QuantumTunnelling",
                "Chance": 0.25,
                "Delay": 1,
                "Duration": 1800,
                "Value": 0,
                "AbsoluteValue": false,
                "SkillName": ""
            }]
        this.tables.getTables().globals.config.Health.Effects.Stimulator.Buffs.Buffs_Obdolbos = obdolbosBuff;
    }
}
