import { Spawnpoint } from "@spt-aki/models/eft/common/ILooseLoot";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LootConfig } from "../config/ts/loot";
import { Logger } from "./logger";

export class Loot
{
    private modConfig: LootConfig = require("../config/loot.json");
    private logger: Logger;
    private tables: DatabaseServer;
    private locationConfig: ILocationConfig;

    constructor (logger: Logger, databaseServer: DatabaseServer, locationConfig: ILocationConfig)
    {
        this.logger = logger;
        this.locationConfig = locationConfig;
        this.tables = databaseServer;
    }

    public updateLoot(): void
    {
        const mod = this.modConfig;

        if (mod.looseLootMultiplier != 1)
        {
            for (const map in this.locationConfig.looseLootMultiplier)
            {
                this.locationConfig.looseLootMultiplier[map] = mod.looseLootMultiplier;
            }
            this.logger.info(`Loose Loot Multiplier: ${mod.looseLootMultiplier}`);
        }

        if (mod.staticLootMultiplier != 1)
        {
            for (const map in this.locationConfig.staticLootMultiplier)
            {
                this.locationConfig.staticLootMultiplier[map] = mod.staticLootMultiplier;
            }
            this.logger.info(`Static Loot Multiplier: ${mod.staticLootMultiplier}`);
        }
        
        if (mod.containersInMarkedRoom)
        {
            this.containersInMarkedRoom();
            this.logger.info(`Containers In Marked Room: ${mod.containersInMarkedRoom}`);
        }
    }

    /**
     * Changes the loot database/tables to include containers in marked rooms.
     * 
     * @variable containersInMarkedRoom Enables common containers (items case, weapon case, etc.) in Marked Rooms.
     */
    private containersInMarkedRoom(): void
    {
        // Customs Marked Room Loot.
        let spawnPoints = this.tables.getTables().locations.bigmap.looseLoot.spawnpoints;
        let customsMarked1: Spawnpoint = null;
        let customsMarked2: Spawnpoint = null;
        let customsMarked3: Spawnpoint = null;
        let customsMarked4: Spawnpoint = null;
        let customsMarked5: Spawnpoint = null;
        let customsMarked6: Spawnpoint = null;
        let customsMarked7: Spawnpoint = null;

        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
            {
                customsMarked1 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)"))
            {
                customsMarked2 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (4)"))
            {
                customsMarked3 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (7)"))
            {
                customsMarked4 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                customsMarked5 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                customsMarked6 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 10)"))
            {
                customsMarked7 = spawnPoint;
                continue;
            }
        }

        // Pushing item Distribution, and ID's into the customs marked room loot pool.
        customsMarked1.template.Items.push(...this.itemId());
        customsMarked1.itemDistribution.push(...this.itemDistribution());
        
        customsMarked2.template.Items.push(...this.itemId());
        customsMarked2.itemDistribution.push(...this.itemDistribution());

        customsMarked3.template.Items.push(...this.itemId());
        customsMarked3.itemDistribution.push(...this.itemDistribution());
        
        customsMarked4.template.Items.push(...this.itemId());
        customsMarked4.itemDistribution.push(...this.itemDistribution());

        customsMarked5.template.Items.push(...this.itemId());
        customsMarked5.itemDistribution.push(...this.itemDistribution());

        customsMarked6.template.Items.push(...this.itemId());
        customsMarked6.itemDistribution.push(...this.itemDistribution());

        customsMarked7.template.Items.push(...this.itemId());
        customsMarked7.itemDistribution.push(...this.itemDistribution());

        
        // Reserve Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.rezervbase.looseLoot.spawnpoints;
        let reserveMarked1: Spawnpoint = null;
        let reserveMarked2: Spawnpoint = null;
        let reserveMarked3: Spawnpoint = null;
        let reserveMarked4: Spawnpoint = null;
        let reserveMarked5: Spawnpoint = null;
        let reserveMarked6: Spawnpoint = null;
        let reserveMarked7: Spawnpoint = null;
        let reserveMarked8: Spawnpoint = null;
        let reserveMarked9: Spawnpoint = null;
        let reserveMarked10: Spawnpoint = null;
        let reserveMarked11: Spawnpoint = null;
        let reserveMarked12: Spawnpoint = null;
        
        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135 (10)51646628"))
            {
                reserveMarked1 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                reserveMarked2 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                reserveMarked3 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (11)"))
            {
                reserveMarked4 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (12)"))
            {
                reserveMarked5 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (10)51658080"))
            {
                reserveMarked6 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (11)"))
            {
                reserveMarked7 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (12)"))
            {
                reserveMarked8 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
            {
                reserveMarked9 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51646104"))
            {
                reserveMarked10 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51648120"))
            {
                reserveMarked11 = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (3)"))
            {
                reserveMarked12 = spawnPoint;
                continue;
            }
        }

        // Pushing item Distribution, and ID's into the reserve base marked room loot pool.
        reserveMarked1.template.Items.push(...this.itemId());
        reserveMarked1.itemDistribution.push(...this.itemDistribution());

        reserveMarked2.template.Items.push(...this.itemId());
        reserveMarked2.itemDistribution.push(...this.itemDistribution());

        reserveMarked3.template.Items.push(...this.itemId());
        reserveMarked3.itemDistribution.push(...this.itemDistribution());

        reserveMarked4.template.Items.push(...this.itemId());
        reserveMarked4.itemDistribution.push(...this.itemDistribution());

        reserveMarked5.template.Items.push(...this.itemId());
        reserveMarked5.itemDistribution.push(...this.itemDistribution());

        reserveMarked6.template.Items.push(...this.itemId());
        reserveMarked6.itemDistribution.push(...this.itemDistribution());

        reserveMarked7.template.Items.push(...this.itemId());
        reserveMarked7.itemDistribution.push(...this.itemDistribution());

        reserveMarked8.template.Items.push(...this.itemId());
        reserveMarked8.itemDistribution.push(...this.itemDistribution());

        reserveMarked9.template.Items.push(...this.itemId());
        reserveMarked9.itemDistribution.push(...this.itemDistribution());

        reserveMarked10.template.Items.push(...this.itemId());
        reserveMarked10.itemDistribution.push(...this.itemDistribution());

        reserveMarked11.template.Items.push(...this.itemId());
        reserveMarked11.itemDistribution.push(...this.itemDistribution());
        
        reserveMarked12.template.Items.push(...this.itemId());
        reserveMarked12.itemDistribution.push(...this.itemDistribution());
        

        // Streets Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.tarkovstreets.looseLoot.spawnpoints;
        let streets: Spawnpoint = null;
        const streets1: Spawnpoint = null;
        const streets2: Spawnpoint = null;
        const streets3: Spawnpoint = null;
        const streets4: Spawnpoint = null;
        const streets5: Spawnpoint = null;
        const streets6: Spawnpoint = null;
        const streets7: Spawnpoint = null;
        const streets8: Spawnpoint = null;
        const streets9: Spawnpoint = null;
        const streets10: Spawnpoint = null;
        const streets11: Spawnpoint = null;
        const streets12: Spawnpoint = null;
        const streets13: Spawnpoint = null;
        const streets14: Spawnpoint = null;
        const streets15: Spawnpoint = null;

        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare2741538"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (1)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (2)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (3)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (4)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (5)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (6)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (7)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (8)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (9)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (10)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (11)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (12)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (13)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (14)"))
            {
                streets = spawnPoint;
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (15)"))
            {
                streets = spawnPoint;
                continue;
            }
        }      

        // Pushing item Distribution, and ID's into the streets marked room loot pool.
        streets.template.Items.push(...this.itemId());
        streets.itemDistribution.push(...this.itemDistribution());

        streets1.template.Items.push(...this.itemId());
        streets1.itemDistribution.push(...this.itemDistribution());

        streets2.template.Items.push(...this.itemId());
        streets2.itemDistribution.push(...this.itemDistribution());

        streets3.template.Items.push(...this.itemId());
        streets3.itemDistribution.push(...this.itemDistribution());

        streets4.template.Items.push(...this.itemId());
        streets4.itemDistribution.push(...this.itemDistribution());

        streets5.template.Items.push(...this.itemId());
        streets5.itemDistribution.push(...this.itemDistribution());

        streets6.template.Items.push(...this.itemId());
        streets6.itemDistribution.push(...this.itemDistribution());

        streets7.template.Items.push(...this.itemId());
        streets7.itemDistribution.push(...this.itemDistribution());

        streets8.template.Items.push(...this.itemId());
        streets8.itemDistribution.push(...this.itemDistribution());

        streets9.template.Items.push(...this.itemId());
        streets9.itemDistribution.push(...this.itemDistribution());

        streets10.template.Items.push(...this.itemId());
        streets10.itemDistribution.push(...this.itemDistribution());

        streets11.template.Items.push(...this.itemId());
        streets11.itemDistribution.push(...this.itemDistribution());

        streets12.template.Items.push(...this.itemId());
        streets12.itemDistribution.push(...this.itemDistribution());

        streets13.template.Items.push(...this.itemId());
        streets13.itemDistribution.push(...this.itemDistribution());

        streets14.template.Items.push(...this.itemId());
        streets14.itemDistribution.push(...this.itemDistribution());

        streets15.template.Items.push(...this.itemId());
        streets15.itemDistribution.push(...this.itemDistribution());
    }

    private itemId(): any[]
    {
        const itemId: any = [];
        itemId.push({ "_id": "1337774434331278", "_tpl": "5d235bb686f77443f4331278" });
        itemId.push({ "_id": "1337774562535613", "_tpl": "5c127c4486f7745625356c13" });
        itemId.push({ "_id": "1337774604423522", "_tpl": "59fb023c86f7746d0d4b423c" });
        itemId.push({ "_id": "1337450112255242", "_tpl": "5b6d9ce188a4501afc1b2b25" });
        itemId.push({ "_id": "1337774650057273", "_tpl": "59fb042886f7746c5005a7b2" });
        itemId.push({ "_id": "1337774242482726", "_tpl": "5c0a840b86f7742ffa4f2482" });
        itemId.push({ "_id": "1337774604423825", "_tpl": "59fb016586f7746d0d4b423a" });
        itemId.push({ "_id": "1337774012617384", "_tpl": "5c093db286f7740a1b2617e3" });
        itemId.push({ "_id": "1337774559023584", "_tpl": "5aafbcd986f7745e590fff23" });
        itemId.push({ "_id": "1337450601595759", "_tpl": "5b7c710788a4506dec015957" });
        itemId.push({ "_id": "1337774641590776", "_tpl": "5e2af55f86f7746d4159f07c" });
        itemId.push({ "_id": "1337977215293479", "_tpl": "5857a8bc2459772bad15db29" });
        itemId.push({ "_id": "1337977290079844", "_tpl": "5857a8b324597729ab0a0e7d" });
        itemId.push({ "_id": "1337247084564564", "_tpl": "544a11ac4bdc2d470e8b456a" });
        itemId.push({ "_id": "1337774485952621", "_tpl": "59db794186f77448bc595262" });
        itemId.push({ "_id": "1337774018671223", "_tpl": "5c093ca986f7740a1867ab12" });
        
        return itemId;
    }

    private itemDistribution(): any[]
    {
        /* Container  "id"s
        * S I C C pouch: 5d235bb686f77443f4331278
        * Magazine Case: 5c127c4486f7745625356c13
        * Weapon Case: 59fb023c86f7746d0d4b423c
        * T H I C C Weapon Case: 5b6d9ce188a4501afc1b2b25
        * Item Case: 59fb042886f7746c5005a7b2
        * T H I C C Item Case: 5c0a840b86f7742ffa4f2482
        * Money case: 59fb016586f7746d0d4b423a
        * Mr Holodilnick Thermal Bag: 5c093db286f7740a1b2617e3
        * Medicine case: 5aafbcd986f7745e590fff23
        * Lucky scav junkbox: 5b7c710788a4506dec015957
        * Grenade case: 5e2af55f86f7746d4159f07c
        * Secure container Gamma: 5857a8bc2459772bad15db29
        * Secure container Beta: 5857a8b324597729ab0a0e7d
        * Secure container Alpha: 544a11ac4bdc2d470e8b456a
        * Secure container Epsilon: 59db794186f77448bc595262
        * Secure container Kappa: 5c093ca986f7740a1867ab12
        */
       
        const itemDistribution: any = [];
        itemDistribution.push({ "composedKey": { "key": "1337774434331278" }, "relativeProbability": 12 });
        itemDistribution.push({ "composedKey": { "key": "1337774562535613" }, "relativeProbability": 25 });
        itemDistribution.push({ "composedKey": { "key": "1337774604423522" }, "relativeProbability": 13 });
        itemDistribution.push({ "composedKey": { "key": "1337450112255242" }, "relativeProbability": 10 });
        itemDistribution.push({ "composedKey": { "key": "1337774650057273" }, "relativeProbability": 13 });
        itemDistribution.push({ "composedKey": { "key": "1337774242482726" }, "relativeProbability": 10 });
        itemDistribution.push({ "composedKey": { "key": "1337774604423825" }, "relativeProbability": 25 });
        itemDistribution.push({ "composedKey": { "key": "1337774012617384" }, "relativeProbability": 30 });
        itemDistribution.push({ "composedKey": { "key": "1337774559023584" }, "relativeProbability": 30 });
        itemDistribution.push({ "composedKey": { "key": "1337450601595759" }, "relativeProbability": 15 });
        itemDistribution.push({ "composedKey": { "key": "1337774641590776" }, "relativeProbability": 23 });
        itemDistribution.push({ "composedKey": { "key": "1337977215293479" }, "relativeProbability": 3 });
        itemDistribution.push({ "composedKey": { "key": "1337977290079844" }, "relativeProbability": 3 });
        itemDistribution.push({ "composedKey": { "key": "1337247084564564" }, "relativeProbability": 3 });
        itemDistribution.push({ "composedKey": { "key": "1337774485952621" }, "relativeProbability": 3 });
        itemDistribution.push({ "composedKey": { "key": "1337774018671223" }, "relativeProbability": 1 });

        return itemDistribution;
    }
}
         