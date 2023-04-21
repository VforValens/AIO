import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { LocationsConfig } from "../config/ts/locations";
import { Logger } from "./logger";

export class Locations
{
    private modConfig: LocationsConfig = require("../config/locations.json");
    private logger: Logger;
    private tables: DatabaseServer;

    constructor (logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateLocations(): void
    {
        const mod = this.modConfig;

        // Gives all extracts 100% chance to spawn.
        if (mod.allExtractsAvailable)
        {
            this.allExtractsAvailable();
            this.logger.info("All Extracts @ 100% Chance to Spawn");
        }

        // Sets exfil/extract timer to config.
        if (mod.ExfiltrationTime != 8)
        {
            this.exfiltrationTime();
            this.logger.info(`Exfil Time Set to ${mod.ExfiltrationTime}`);
        }

        // Remove extracts restrictions
        if (mod.noExtractRestrictions)
        {
            this.noExtractRestrictions();
            this.logger.info("No Extract Restrictions Enabled");
        }

        // Make all extractions of the map available regardless of the infil
        if (mod.extractionsExtended)
        {
            this.extractionsExtended();
            this.logger.info("Extractions Are Extended");
        }

        // Remove the access key "5c94bbff86f7747ee735c08f" (Labs access card) from Labs.
        if (mod.freeLabsEntry)
        {
            this.freeLabsEntry();
            this.logger.info("Labs is now Free to enter");
        }
    }

    private allExtractsAvailable(): void
    {
        const locations = this.tables.getTables().locations;
        for (const i in locations)
        {
            if (i !== "base")
            {
                for (const x in locations[i].base.exits)
                {
                    if (locations[i].base.exits[x].Name !== "EXFIL_Train")
                    {
                        if (locations[i].base.exits[x].Chance !== 100)
                        {
                            locations[i].base.exits[x].Chance = 100;
                        }
                    }
                }
            }
        }
    }

    private exfiltrationTime(): void
    {
        const maps = this.tables.getTables().locations;
        const mod = this.modConfig;
        for (const map in maps)
        {
            if (map.toLowerCase() === "base")
            {
                continue;
            }

            const mapBase = this.tables.getTables().locations[map].base;
            if (mapBase.Locked === true || mapBase?.EnabledCoop === undefined)
            {
                continue;
            }

            for (const exit of mapBase.exits)
            {
                exit.ExfiltrationTime = mod.ExfiltrationTime;
            }
        }
    }

    private noExtractRestrictions(): void
    {
        const locations = this.tables.getTables().locations;
        for (const i in locations)
        {
            if (i !== "base")
            {
                for (const x in locations[i].base.exits)
                {
                    if (locations[i].base.exits[x].Name !== "EXFIL_Train")
                    {
                        // Remove requirements for empty slots.
                        if (locations[i].base.exits[x].PassageRequirement === "Empty")
                        {
                            locations[i].base.exits[x].PassageRequirement = "None";
                            locations[i].base.exits[x].RequiredSlot = "FirstPrimaryWeapon";
                            locations[i].base.exits[x].RequirementTip = "";
                        }
                        // Remove transfer item requirements (v-extracts).
                        if (locations[i].base.exits[x].PassageRequirement === "TransferItem")
                        {
                            locations[i].base.exits[x].PassageRequirement = "None";
                            locations[i].base.exits[x].ExfiltrationType = "Individual";
                            locations[i].base.exits[x].Id = "";
                            locations[i].base.exits[x].PlayersCount = "0";
                            locations[i].base.exits[x].RequirementTip = "";
                            locations[i].base.exits[x].Count = 0;
                        }
                        // Remove Scav Coop requirements
                        if (locations[i].base.exits[x].PassageRequirement === "ScavCooperation")
                        {
                            locations[i].base.exits[x].PassageRequirement = "None";
                            locations[i].base.exits[x].ExfiltrationType = "Individual";
                            locations[i].base.exits[x].RequirementTip = "";
                        }
                        // Specifically item requirements like descent
                        if (locations[i].base.exits[x].PassageRequirement === "Reference")
                        {
                            locations[i].base.exits[x].PassageRequirement = "None";
                            locations[i].base.exits[x].Id = "";
                        }
                        // Bunker Hermetic Door and ZB-013. D2 and labs beyond my capability - need to be able to open door.
                        if (locations[i].base.exits[x].Name === "EXFIL_Bunker" || locations[i].base.exits[x].Name === "EXFIL_ZB013")
                        {
                            locations[i].base.exits[x].PassageRequirement = "None";
                            locations[i].base.exits[x].RequirementTip = "";
                        }
                    }
                }
            }
        }
    }
     

    private extractionsExtended(): void
    {
        const locations = this.tables.getTables().locations;
        for (const map in locations)
        {
            switch (map) 
            {
                case "base":
                    break;
                case "bigmap":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "Customs,Boiler Tanks";
                    }
                    break;
                case "interchange":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "MallSE,MallNW";
                    }
                    break;
                case "shoreline":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "Village,Riverside";
                    }
                    break;
                case "woods":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "House,Old Station";
                    }
                    break;
                case "lighthouse":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "Tunnel,North";
                    }
                    break;
                case "tarkovstreets":
                    for (const extract in locations[map].base.exits)
                    {
                        locations[map].base.exits[extract].EntryPoints = "E1_2,E6_1,E2_3,E3_4,E4_5,E5_6,E6_1";
                    }
                    break;
                default:
                    break;
            }
        }
        
    }

    private freeLabsEntry(): void
    {
        const locations = this.tables.getTables().locations.laboratory.base;
        locations.AccessKeys = [];
    }
}