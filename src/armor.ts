import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ArmorConfig } from "../config/ts/armor";
import { Logger } from "./logger";

export class Armor
{
    private modConfig: ArmorConfig = require("../config/armor.json");
    private logger: Logger;
    private tables: DatabaseServer;
    private mod: any;
    private armor: any;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateArmor(): void
    {
        const mod = this.modConfig;
        const uhmwpe = this.modConfig.armorMaterials.uhmwpe;
        const aramid = this.modConfig.armorMaterials.aramid;
        const combined = this.modConfig.armorMaterials.combined;
        const titan = this.modConfig.armorMaterials.titan;
        const aluminium = this.modConfig.armorMaterials.aluminium;
        const steel = this.modConfig.armorMaterials.armoredSteel;
        const ceramic = this.modConfig.armorMaterials.ceramic;
        const glass = this.modConfig.armorMaterials.glass;
        
        if (mod.removeGearRestrictions)
        {
            this.removeGearRestrictions();
            this.logger.info("Gear Restrictions Removed");
        }

        if (uhmwpe.destructibility != 0.45 || uhmwpe.minRepairDegradation != 0.01 || uhmwpe.maxRepairDegradation != 0.03 
            || uhmwpe.explosionDestructibility != 0.4 || uhmwpe.minRepairKitDegradation != 0.005 || uhmwpe.maxRepairKitDegradation != 0.025)
        {
            this.uhmwpe();
            this.logger.info("UHMWPE Armor Materials Patched");
        }

        if (aramid.destructibility != 0.25 || aramid.minRepairDegradation != 0.03 || aramid.maxRepairDegradation != 0.07 
            || aramid.explosionDestructibility != 0.2 || aramid.minRepairKitDegradation != 0.025 || aramid.maxRepairKitDegradation != 0.065)
        {
            this.aramid();
            this.logger.info("Aramid Armor Materials Patched");
        }

        if (combined.destructibility != 0.5 || combined.minRepairDegradation != 0.1 || combined.maxRepairDegradation != 0.15 
            || combined.explosionDestructibility != 0.4 || combined.minRepairKitDegradation != 0.009 || combined.maxRepairKitDegradation != 0.014)
        {
            this.combined();
            this.logger.info("Combined Armor Materials Patched");
        }

        if (titan.destructibility != 0.55 || titan.minRepairDegradation != 0.06 || titan.maxRepairDegradation != 0.1
            || titan.explosionDestructibility != 0.5 || titan.minRepairKitDegradation != 0.055 || titan.maxRepairKitDegradation != 0.09)
        {
            this.titan();
            this.logger.info("Titan Armor Materials Patched");
        }

        if (aluminium.destructibility != 0.6 || aluminium.minRepairDegradation != 0.06 || aluminium.maxRepairDegradation != 0.1 
            || aluminium.explosionDestructibility != 0.6 || aluminium.minRepairKitDegradation != 0.055 || aluminium.maxRepairKitDegradation != 0.09)
        {
            this.aluminium();
            this.logger.info("Aluminium Armor Materials Patched");
        }

        if (steel.destructibility != 0.7 || steel.minRepairDegradation != 0.01 || steel.maxRepairDegradation != 0.03 
            || steel.explosionDestructibility != 0.6 || steel.minRepairKitDegradation != 0.005 || steel.maxRepairKitDegradation != 0.025)
        {
            this.steel();
            this.logger.info("Steel Armor Materials Patched");
        }

        if (ceramic.destructibility != 0.8 || ceramic.minRepairDegradation != 0.17 || ceramic.maxRepairDegradation != 0.22 
            || ceramic.explosionDestructibility != 0.7 || ceramic.minRepairKitDegradation != 0.155 || ceramic.maxRepairKitDegradation != 0.2)
        {
            this.ceramic();
            this.logger.info("Ceramic Armor Materials Patched");
        }

        if (glass.destructibility != 0.8 || glass.minRepairDegradation != 0.23 || glass.maxRepairDegradation != 0.42 
            || glass.explosionDestructibility != 0.8 || glass.minRepairKitDegradation != 0.21 || glass.maxRepairKitDegradation != 0.38)
        {
            this.glass();
            this.logger.info("Glass Armor Materials Patched");
        }


    }


    // Functions start
    // Removes all restrictions from gear/equipment.
    private removeGearRestrictions():void
    {
        const armors = this.tables.getTables().templates.items;
        for (const armor in armors)
        {
            const item = armors[armor]._props;
            item.BlocksArmorVest = false;
            item.BlocksCollapsible = false;
            item.BlocksEarpiece = false;
            item.BlocksEyewear = false;
            item.BlocksFaceCover = false;
            item.BlocksFolding = false;
            item.BlocksHeadwear = false;
        }
    }

    private uhmwpe(): void
    {
        const uhmwpe = this.modConfig.armorMaterials.uhmwpe;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.UHMWPE;

        armor.Destructibility = uhmwpe.destructibility;
        armor.MinRepairDegradation = uhmwpe.minRepairDegradation;
        armor.MaxRepairDegradation = uhmwpe.maxRepairDegradation;
        armor.ExplosionDestructibility = uhmwpe.explosionDestructibility;
        armor.MinRepairKitDegradation = uhmwpe.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = uhmwpe.maxRepairKitDegradation;
    }

    private aramid(): void
    {
        const aramid = this.modConfig.armorMaterials.aramid;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Aramid;

        armor.Destructibility = aramid.destructibility;
        armor.MinRepairDegradation = aramid.minRepairDegradation;
        armor.MaxRepairDegradation = aramid.maxRepairDegradation;
        armor.ExplosionDestructibility = aramid.explosionDestructibility;
        armor.MinRepairKitDegradation = aramid.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = aramid.maxRepairKitDegradation;
        this.logger.info("Aramid Armor Materials Patched");
    }

    private combined(): void
    {
        const combined = this.modConfig.armorMaterials.combined;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Combined;

        armor.Destructibility = combined.destructibility;
        armor.MinRepairDegradation = combined.minRepairDegradation;
        armor.MaxRepairDegradation = combined.maxRepairDegradation;
        armor.ExplosionDestructibility = combined.explosionDestructibility;
        armor.MinRepairKitDegradation = combined.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = combined.maxRepairKitDegradation;
    }

    private titan(): void
    {
        const titan = this.modConfig.armorMaterials.titan;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Titan;

        armor.Destructibility = titan.destructibility;
        armor.MinRepairDegradation = titan.minRepairDegradation;
        armor.MaxRepairDegradation = titan.maxRepairDegradation;
        armor.ExplosionDestructibility = titan.explosionDestructibility;
        armor.MinRepairKitDegradation = titan.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = titan.maxRepairKitDegradation;
    }

    private aluminium(): void
    {
        const aluminium = this.modConfig.armorMaterials.aluminium;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Aluminium;

        armor.Destructibility = aluminium.destructibility;
        armor.MinRepairDegradation = aluminium.minRepairDegradation;
        armor.MaxRepairDegradation = aluminium.maxRepairDegradation;
        armor.ExplosionDestructibility = aluminium.explosionDestructibility;
        armor.MinRepairKitDegradation = aluminium.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = aluminium.maxRepairKitDegradation;
    }

    private steel(): void
    {
        const steel = this.modConfig.armorMaterials.armoredSteel;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.ArmoredSteel;

        armor.Destructibility = steel.destructibility;
        armor.MinRepairDegradation = steel.minRepairDegradation;
        armor.MaxRepairDegradation = steel.maxRepairDegradation;
        armor.ExplosionDestructibility = steel.explosionDestructibility;
        armor.MinRepairKitDegradation = steel.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = steel.maxRepairKitDegradation;
    }

    private ceramic(): void
    {
        const ceramic = this.modConfig.armorMaterials.ceramic;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Ceramic;

        armor.Destructibility = ceramic.destructibility;
        armor.MinRepairDegradation = ceramic.minRepairDegradation;
        armor.MaxRepairDegradation = ceramic.maxRepairDegradation;
        armor.ExplosionDestructibility = ceramic.explosionDestructibility;
        armor.MinRepairKitDegradation = ceramic.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = ceramic.maxRepairKitDegradation;
    }

    private glass(): void
    {
        const glass = this.modConfig.armorMaterials.glass;
        const armor = this.tables.getTables().globals.config.ArmorMaterials.Glass;

        armor.Destructibility = glass.destructibility;
        armor.MinRepairDegradation = glass.minRepairDegradation;
        armor.MaxRepairDegradation = glass.maxRepairDegradation;
        armor.ExplosionDestructibility = glass.explosionDestructibility;
        armor.MinRepairKitDegradation = glass.minRepairKitDegradation;
        armor.MaxRepairKitDegradation = glass.maxRepairKitDegradation;
    }

}