import { Logger } from "./logger";
import { QuestsConfig } from "../config/ts/quests";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

export class Quests
{
    private modConfig: QuestsConfig = require("../config/quests.json");
    private logger: Logger;
    private tables: DatabaseServer;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateQuests(): void
    {
        if (!this.modConfig.onlyFoundInRaid)
        {
            this.onlyFoundInRaid();
            this.logger.info("Quest Items No Longer Need Be Found In Raid");
        }
    }

    // Updates the weight modifier (as a multiplier) for all items in database/templates/items.json
    private onlyFoundInRaid(): void
    {
        const quests = this.tables.getTables().templates.quests;
        Object.values(quests).forEach(quest => 
        {
            quest.conditions.AvailableForFinish.forEach((prop, index) => 
            {
                if (prop._parent == "FindItem" || prop._parent == "HandoverItem") 
                {
                    prop._props.onlyFoundInRaid = false;
                    quest.conditions.AvailableForFinish[index] = prop;
                }
            })
        })
    }
}
