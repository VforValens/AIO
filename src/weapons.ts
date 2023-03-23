import { IGlobals } from "@spt-aki/models/eft/common/IGlobals";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { WeaponsConfig } from "../config/ts/weapons";
import { Logger } from "./logger";

export class Weapons
{
    private modConfig: WeaponsConfig = require("../config/weapons.json")
    private logger: Logger;
    private tables: DatabaseServer;
    private weapons: IDatabaseTables;
    private globals: IGlobals;

    constructor(logger:Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }
    

    public updateWeapons(): void
    {
        const mod = this.modConfig;
        this.weapons = this.tables.getTables().templates.items;
        this.globals = this.tables.getTables().globals;

        if (mod.malfunctions.overheat || mod.malfunctions.jam || mod.malfunctions.slide || mod.malfunctions.misfeed || mod.malfunctions.misfire)
        {
            this.weaponMalfunctions();
            this.logger.info("Weapon Malfunctions Patched");
        }

        if (mod.smgInHolsters)
        {
            this.smgInHolsters();
            this.logger.info("SMGs may now be placed in holsters");
        }
    }

    
    private weaponMalfunctions(): void
    {
        const items = this.tables.getTables().templates.items;

        for (const id in items)
        {
            const base = items[id];
            const malfunctions = this.modConfig.malfunctions;        

            //Weapons malfunctions
            if (malfunctions.jam && base._props.AllowJam)
            {
                base._props.AllowJam = false;
            }

            if (malfunctions.misfire && base._props.AllowMisfire)
            {
                base._props.AllowMisfire = false;
            }

            if (malfunctions.misfeed && base._props.AllowFeed)
            {
                base._props.AllowFeed = false;
            }

            if (malfunctions.overheat && base._props.AllowOverheat)
            {
                base._props.AllowOverheat = false;
            }

            if (malfunctions.slide && base._props.AllowSlide)
            {
                base._props.AllowSlide = false;
            }
        }
    }


    private smgInHolsters(): void
    {
        for (const weaponId in this.weapons)
        {
            if (this.weapons[weaponId]._id === "55d7217a4bdc2d86028b456d")
            {
                this.weapons[weaponId]._props.Slots[2]._props.filters[0].Filter.push("5447b5e04bdc2d62278b4567")
            }
        }
    }
}
