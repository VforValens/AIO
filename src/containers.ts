import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { Logger } from "./logger";
import { ContainersConfig } from "../config/ts/containers";
import { CommonContainers, SecuredContainers } from "@spt-aki/models/enums/ContainerTypes";

export class Containers
{
    private modConfig: ContainersConfig = require("../config/containers.json");
    private logger: Logger;
    private tables: DatabaseServer;
    
    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateContainers(): void
    {
        const mod = this.modConfig;

        if (mod.commonContainers.enabled)
        {
            this.updatingCommonContainers();
            this.logger.info("Common Containers Patched");
        }

        if (mod.securedContainers.enabled)
        {
            this.updatingSecuredContainers();
            this.logger.info("Secured Containers Patched");
        }
    }

    private updatingCommonContainers()
    {
        const items = this.tables.getTables().templates.items;
        const mod = this.modConfig.commonContainers;

        for (const [key, value] of Object.entries(CommonContainers))
        {
            items[value]._props.Grids[0]._props.cellsH = mod[key].cellsH;
            items[value]._props.Grids[0]._props.cellsV = mod[key].cellsV;
            items[value]._props.Width = mod[key].width;
            items[value]._props.Height = mod[key].height;
        }
    }

    private updatingSecuredContainers()
    {
        const items = this.tables.getTables().templates.items;
        const mod = this.modConfig.securedContainers;

        for (const [key, value] of Object.entries(SecuredContainers))
        {
            items[value]._props.Grids[0]._props.cellsH = mod[key].cellsH;
            items[value]._props.Grids[0]._props.cellsV = mod[key].cellsV;
            items[value]._props.Width = mod[key].width;
            items[value]._props.Height = mod[key].height;
        }
    }
}