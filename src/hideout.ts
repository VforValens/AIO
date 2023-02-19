import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HideoutConfig } from "../config/ts/hideout";
import { Logger } from "./logger";

export class Hideout
{
    private modConfig: HideoutConfig = require("../config/hideout.json")
    private logger: Logger;
    private tables: DatabaseServer;
    private hideoutConfig: IHideoutConfig;

    constructor(logger: Logger, databaseServer: DatabaseServer, hideoutConfig: IHideoutConfig)
    {
        this.logger = logger;
        this.tables = databaseServer;
        this.hideoutConfig = hideoutConfig;
    }

    public updateHideout(): void
    {
        const mod = this.modConfig;
        
        if (mod.constructionTime != 1)
        {
            this.updateConstructionTime();
            this.logger.info(`Construction Time Patched to ${mod.constructionTime} `);
        }

        if (mod.productionTime != 1)
        {
            this.updateProductionTime();
            this.logger.info(`Production Time Patched to ${mod.productionTime} `);
        }

        if (mod.scavCaseTime != 1)
        {
            this.updateScavCase();
            this.logger.info(`Scav Case Time Patched to ${mod.scavCaseTime}`);
        }
    }
    
    private updateConstructionTime()
    {
        const hideout = this.tables.getTables().hideout.areas;
        for (const area of hideout)
        {
            for (const stage in area.stages)
            {
                const stageData = area.stages[stage];
                stageData.constructionTime *= this.modConfig.constructionTime;
            }
        }
    }

    private updateProductionTime()
    {
        for (const production of this.tables.getTables().hideout.production)
        {
            production.productionTime *= this.modConfig.productionTime;
        }
    }

    private updateScavCase()
    {
        for (const scavCase of this.tables.getTables().hideout.scavcase)
        {
            scavCase.ProductionTime *= this.modConfig.scavCaseTime;
        }
    }
}
