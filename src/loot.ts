import { ItemDistribution, Spawnpoint } from "@spt-aki/models/eft/common/ILooseLoot";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
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
                customsMarked1.template.Items.push(...this.itemId());
                customsMarked1.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)"))
            {
                customsMarked2 = spawnPoint;
                customsMarked2.template.Items.push(...this.itemId());
                customsMarked2.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (4)"))
            {
                customsMarked3 = spawnPoint;
                customsMarked3.template.Items.push(...this.itemId());
                customsMarked3.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (7)"))
            {
                customsMarked4 = spawnPoint;
                customsMarked4.template.Items.push(...this.itemId());
                customsMarked4.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                customsMarked5 = spawnPoint;
                customsMarked5.template.Items.push(...this.itemId());
                customsMarked5.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                customsMarked6 = spawnPoint;
                customsMarked6.template.Items.push(...this.itemId());
                customsMarked6.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 10)"))
            {
                customsMarked7 = spawnPoint;
                customsMarked7.template.Items.push(...this.itemId());
                customsMarked7.itemDistribution.push(...this.itemDistribution());
                continue;
            }
        }    
        
                
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
                reserveMarked1.template.Items.push(...this.itemId());
                reserveMarked1.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (8)"))
            {
                reserveMarked2 = spawnPoint;
                reserveMarked2.template.Items.push(...this.itemId());
                reserveMarked2.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (9)"))
            {
                reserveMarked3 = spawnPoint;
                reserveMarked3.template.Items.push(...this.itemId());
                reserveMarked3.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (11)"))
            {
                reserveMarked4 = spawnPoint;
                reserveMarked4.template.Items.push(...this.itemId());
                reserveMarked4.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("cult_Loot 135 (12)"))
            {
                reserveMarked5 = spawnPoint;
                reserveMarked5.template.Items.push(...this.itemId());
                reserveMarked5.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (10)51658080"))
            {
                reserveMarked6 = spawnPoint;
                reserveMarked6.template.Items.push(...this.itemId());
                reserveMarked6.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (11)"))
            {
                reserveMarked7 = spawnPoint;
                reserveMarked7.template.Items.push(...this.itemId());
                reserveMarked7.itemDistribution.push(...this.itemDistribution());        
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (12)"))
            {
                reserveMarked8 = spawnPoint;
                reserveMarked8.template.Items.push(...this.itemId());
                reserveMarked8.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (1)"))
            {
                reserveMarked9 = spawnPoint;
                reserveMarked9.template.Items.push(...this.itemId());
                reserveMarked9.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51646104"))
            {
                reserveMarked10 = spawnPoint;
                reserveMarked10.template.Items.push(...this.itemId());
                reserveMarked10.itemDistribution.push(...this.itemDistribution());        
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (2)51648120"))
            {
                reserveMarked11 = spawnPoint;
                reserveMarked11.template.Items.push(...this.itemId());
                reserveMarked11.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135 (3)"))
            {
                reserveMarked12 = spawnPoint;
                reserveMarked12.template.Items.push(...this.itemId());
                reserveMarked12.itemDistribution.push(...this.itemDistribution());        
                continue;
            }
        }
        

        // Streets Marked Room Loot.
        spawnPoints = this.tables.getTables().locations.tarkovstreets.looseLoot.spawnpoints;
        let streets: Spawnpoint = null;
        let streets1: Spawnpoint = null;
        let streets2: Spawnpoint = null;
        let streets3: Spawnpoint = null;
        let streets4: Spawnpoint = null;
        let streets5: Spawnpoint = null;
        let streets6: Spawnpoint = null;
        let streets7: Spawnpoint = null;
        let streets8: Spawnpoint = null;
        let streets9: Spawnpoint = null;
        let streets10: Spawnpoint = null;
        let streets11: Spawnpoint = null;
        let streets12: Spawnpoint = null;
        let streets13: Spawnpoint = null;
        let streets14: Spawnpoint = null;
        let streets15: Spawnpoint = null;

        // For loop through the Spawnpoints
        for (const spawnPoint of spawnPoints)
        {
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare2741538"))
            {
                streets = spawnPoint;
                streets.template.Items.push(...this.itemId());
                streets.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (1)"))
            {
                streets1 = spawnPoint;
                streets1.template.Items.push(...this.itemId());
                streets1.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (2)"))
            {
                streets2 = spawnPoint;
                streets2.template.Items.push(...this.itemId());
                streets2.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (3)"))
            {
                streets3 = spawnPoint;
                streets3.template.Items.push(...this.itemId());
                streets3.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (4)"))
            {
                streets4 = spawnPoint;
                streets4.template.Items.push(...this.itemId());
                streets4.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (5)"))
            {
                streets5 = spawnPoint;
                streets5.template.Items.push(...this.itemId());
                streets5.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (6)"))
            {
                streets6 = spawnPoint;
                streets6.template.Items.push(...this.itemId());
                streets6.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (7)"))
            {
                streets7 = spawnPoint;
                streets7.template.Items.push(...this.itemId());
                streets7.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (8)"))
            {
                streets8 = spawnPoint;
                streets8.template.Items.push(...this.itemId());
                streets8.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (9)"))
            {
                streets9 = spawnPoint;
                streets9.template.Items.push(...this.itemId());
                streets9.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (10)"))
            {
                streets10 = spawnPoint;
                streets10.template.Items.push(...this.itemId());
                streets10.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (11)"))
            {
                streets11 = spawnPoint;                
                streets11.template.Items.push(...this.itemId());
                streets11.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (12)"))
            {
                streets12 = spawnPoint;
                streets12.template.Items.push(...this.itemId());
                streets12.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (13)"))
            {
                streets13 = spawnPoint;
                streets13.template.Items.push(...this.itemId());
                streets13.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (14)"))
            {
                streets14 = spawnPoint;
                streets14.template.Items.push(...this.itemId());
                streets14.itemDistribution.push(...this.itemDistribution());
                continue;
            }
            if (spawnPoint.template.Id.startsWith("Loot 135_Leo_Rare (15)"))
            {
                streets15 = spawnPoint;
                streets15.template.Items.push(...this.itemId());
                streets15.itemDistribution.push(...this.itemDistribution());
                continue;
            }
        }      
    }

    
    private itemId(): Item[]
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

        const itemId: Item[] = [];
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

    
    private itemDistribution(): ItemDistribution[]
    {       
        const relativeProbability = this.modConfig.containersInMarkedRoom.RelativeProbability;
        const itemDistribution: ItemDistribution[] = [];
        itemDistribution.push({ "composedKey": { "key": "1337774434331278" }, "relativeProbability": relativeProbability.SICCpouch });
        itemDistribution.push({ "composedKey": { "key": "1337774562535613" }, "relativeProbability": relativeProbability.MagazineCase });
        itemDistribution.push({ "composedKey": { "key": "1337774604423522" }, "relativeProbability": relativeProbability.WeaponCase });
        itemDistribution.push({ "composedKey": { "key": "1337450112255242" }, "relativeProbability": relativeProbability.THICCWeaponCase });
        itemDistribution.push({ "composedKey": { "key": "1337774650057273" }, "relativeProbability": relativeProbability.ItemCase });
        itemDistribution.push({ "composedKey": { "key": "1337774242482726" }, "relativeProbability": relativeProbability.THICCItemCase });
        itemDistribution.push({ "composedKey": { "key": "1337774604423825" }, "relativeProbability": relativeProbability.MoneyCase });
        itemDistribution.push({ "composedKey": { "key": "1337774012617384" }, "relativeProbability": relativeProbability.MrHolodilnick });
        itemDistribution.push({ "composedKey": { "key": "1337774559023584" }, "relativeProbability": relativeProbability.MedicineCase });
        itemDistribution.push({ "composedKey": { "key": "1337450601595759" }, "relativeProbability": relativeProbability.Junkbox });
        itemDistribution.push({ "composedKey": { "key": "1337774641590776" }, "relativeProbability": relativeProbability.GrenadeCase });
        itemDistribution.push({ "composedKey": { "key": "1337977215293479" }, "relativeProbability": relativeProbability.SecureGamma });
        itemDistribution.push({ "composedKey": { "key": "1337977290079844" }, "relativeProbability": relativeProbability.SecureBeta });
        itemDistribution.push({ "composedKey": { "key": "1337247084564564" }, "relativeProbability": relativeProbability.SecureAlpha });
        itemDistribution.push({ "composedKey": { "key": "1337774485952621" }, "relativeProbability": relativeProbability.SecureEpsilon });
        itemDistribution.push({ "composedKey": { "key": "1337774018671223" }, "relativeProbability": relativeProbability.SecureKappa });

        return itemDistribution;
    }
}
         