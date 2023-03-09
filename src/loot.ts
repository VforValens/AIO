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
        const customsMarked1 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (1)"));
        const customsMarked2 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (2)"));
        const customsMarked3 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (4)"));
        const customsMarked4 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (7)"));
        const customsMarked5 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (8)"));
        const customsMarked6 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (9)"));
        const customsMarked7 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (10)"));

        const customsItem1 = customsMarked1.template.Items;
        const customsItem2 = customsMarked2.template.Items;
        const customsItem3 = customsMarked3.template.Items;
        const customsItem4 = customsMarked4.template.Items;
        const customsItem5 = customsMarked5.template.Items;
        const customsItem6 = customsMarked6.template.Items;
        const customsItem7 = customsMarked7.template.Items;


        // Pushing item Distribution, and ID's into the customs marked room loot pool.
        customsItem1.push(...this.itemId());
        customsMarked1.itemDistribution.push(...this.itemDistribution());
        
        customsItem2.push(...this.itemId());
        customsMarked2.itemDistribution.push(...this.itemDistribution());

        customsItem3.push(...this.itemId());
        customsMarked3.itemDistribution.push(...this.itemDistribution());
        
        customsItem4.push(...this.itemId());
        customsMarked4.itemDistribution.push(...this.itemDistribution());

        customsItem5.push(...this.itemId());
        customsMarked5.itemDistribution.push(...this.itemDistribution());

        customsItem6.push(...this.itemId());
        customsMarked6.itemDistribution.push(...this.itemDistribution());

        customsItem7.push(...this.itemId());
        customsMarked7.itemDistribution.push(...this.itemDistribution());

        
        // Reserve Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.rezervbase.looseLoot.spawnpoints;
        const reserveMarked1 = spawnPoints.find(x=>x.template.Id==="Loot 135 (10)51646628");
        const reserveMarked2 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (8)"));
        const reserveMarked3 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (9)"));
        const reserveMarked4 = spawnPoints.find(x=>x.template.Id.startsWith("cult_Loot 135 (11)"));
        const reserveMarked5 = spawnPoints.find(x=>x.template.Id.startsWith("cult_Loot 135 (12)"));
        const reserveMarked6 = spawnPoints.find(x=>x.template.Id==="Loot 135 (10)51658080");
        const reserveMarked7 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (11)"));
        const reserveMarked8 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (12)"));
        const reserveMarked9 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (1)"));
        const reserveMarked10 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (2)51646104"));
        const reserveMarked11 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (2)51648120"));
        const reserveMarked12 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135 (3)"));
        

        const reserve1items = reserveMarked1.template.Items;
        const reserve2items = reserveMarked2.template.Items;
        const reserve3items = reserveMarked3.template.Items;
        const reserve4items = reserveMarked4.template.Items;
        const reserved5items = reserveMarked5.template.Items;
        const reserve6items = reserveMarked6.template.Items;
        const reserve7items = reserveMarked7.template.Items;
        const reserve8items = reserveMarked8.template.Items;
        const reserve9items = reserveMarked9.template.Items;
        const reserve10items = reserveMarked10.template.Items;
        const reserve11items = reserveMarked11.template.Items;
        const reserve12items = reserveMarked12.template.Items;


        // Pushing item Distribution, and ID's into the reserve base marked room loot pool.
        reserve1items.push(...this.itemId());
        reserveMarked1.itemDistribution.push(...this.itemDistribution());

        reserve2items.push(...this.itemId());
        reserveMarked2.itemDistribution.push(...this.itemDistribution());

        reserve3items.push(...this.itemId());
        reserveMarked3.itemDistribution.push(...this.itemDistribution());

        reserve4items.push(...this.itemId());
        reserveMarked4.itemDistribution.push(...this.itemDistribution());

        reserved5items.push(...this.itemId());
        reserveMarked5.itemDistribution.push(...this.itemDistribution());

        reserve6items.push(...this.itemId());
        reserveMarked6.itemDistribution.push(...this.itemDistribution());

        reserve7items.push(...this.itemId());
        reserveMarked7.itemDistribution.push(...this.itemDistribution());

        reserve8items.push(...this.itemId());
        reserveMarked8.itemDistribution.push(...this.itemDistribution());

        reserve9items.push(...this.itemId());
        reserveMarked9.itemDistribution.push(...this.itemDistribution());

        reserve10items.push(...this.itemId());
        reserveMarked10.itemDistribution.push(...this.itemDistribution());

        reserve11items.push(...this.itemId());
        reserveMarked11.itemDistribution.push(...this.itemDistribution());
        
        reserve12items.push(...this.itemId());
        reserveMarked12.itemDistribution.push(...this.itemDistribution());

        // Streets Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.tarkovstreets.looseLoot.spawnpoints;
        const streets = spawnPoints.find(x=>x.template.Id==="Loot 135_Leo_Rare2741538");
        const streets1 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (1)"));
        const streets2 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (2)"));
        const streets3 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (3)"));
        const streets4 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (4)"));
        const streets5 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (5)"));
        const streets6 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (6)"));
        const streets7 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (7)"));
        const streets8 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (8)"));
        const streets9 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (9)"));
        const streets10 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (10)"));
        const streets11 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (11)"));
        const streets12 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (12)"));
        const streets13 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (13)"));
        const streets14 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (14)"));
        const streets15 = spawnPoints.find(x=>x.template.Id.startsWith("Loot 135_Leo_Rare (15)"));

        const streetsItem = streets.template.Items;
        const streetsItem1 = streets1.template.Items;
        const streetsItem2 = streets2.template.Items;
        const streetsItem3 = streets3.template.Items;
        const streetsItem4 = streets4.template.Items;
        const streetsItem5 = streets5.template.Items;
        const streetsItem6 = streets6.template.Items;
        const streetsItem7 = streets7.template.Items;
        const streetsItem8 = streets8.template.Items;
        const streetsItem9 = streets9.template.Items;
        const streetsItem10 = streets10.template.Items;
        const streetsItem11 = streets11.template.Items;
        const streetsItem12 = streets12.template.Items;
        const streetsItem13 = streets13.template.Items;
        const streetsItem14 = streets14.template.Items;
        const streetsItem15 = streets15.template.Items;
        

        // Pushing item Distribution, and ID's into the streets marked room loot pool.
        streetsItem.push(...this.itemId());
        streets.itemDistribution.push(...this.itemDistribution());

        streetsItem1.push(...this.itemId());
        streets1.itemDistribution.push(...this.itemDistribution());

        streetsItem2.push(...this.itemId());
        streets2.itemDistribution.push(...this.itemDistribution());

        streetsItem3.push(...this.itemId());
        streets3.itemDistribution.push(...this.itemDistribution());

        streetsItem4.push(...this.itemId());
        streets4.itemDistribution.push(...this.itemDistribution());

        streetsItem5.push(...this.itemId());
        streets5.itemDistribution.push(...this.itemDistribution());

        streetsItem6.push(...this.itemId());
        streets6.itemDistribution.push(...this.itemDistribution());

        streetsItem7.push(...this.itemId());
        streets7.itemDistribution.push(...this.itemDistribution());

        streetsItem8.push(...this.itemId());
        streets8.itemDistribution.push(...this.itemDistribution());

        streetsItem9.push(...this.itemId());
        streets9.itemDistribution.push(...this.itemDistribution());

        streetsItem10.push(...this.itemId());
        streets10.itemDistribution.push(...this.itemDistribution());

        streetsItem11.push(...this.itemId());
        streets11.itemDistribution.push(...this.itemDistribution());

        streetsItem12.push(...this.itemId());
        streets12.itemDistribution.push(...this.itemDistribution());

        streetsItem13.push(...this.itemId());
        streets13.itemDistribution.push(...this.itemDistribution());

        streetsItem14.push(...this.itemId());
        streets14.itemDistribution.push(...this.itemDistribution());

        streetsItem15.push(...this.itemId());
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
         