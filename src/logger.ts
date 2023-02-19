import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Config } from "../config/ts/config";

export class Logger
{
    private modConfig: Config = require("../config/config.json");
    private logger: ILogger;

    constructor (logger: ILogger)
    {
        this.logger = logger;
    }

    public info(text: string, forced = false): void
    {
        if (this.modConfig.DebugMode || forced)
        {
            this.logger.info(text);
        }
    }
}