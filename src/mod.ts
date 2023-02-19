import { WeightedRandomHelper } from "@spt-aki/helpers/WeightedRandomHelper";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IAirdropConfig } from "@spt-aki/models/spt/config/IAirdropConfig";
import { IBotConfig } from "@spt-aki/models/spt/config/IBotConfig";
import { IHideoutConfig } from "@spt-aki/models/spt/config/IHideoutConfig";
import { IInRaidConfig } from "@spt-aki/models/spt/config/IInRaidConfig";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { ILocationConfig } from "@spt-aki/models/spt/config/ILocationConfig";
import { IRagfairConfig } from "@spt-aki/models/spt/config/IRagfairConfig";
import { ITraderConfig } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { Config } from "../config/ts/config";
import { Airdrop } from "./airdrop";
import { Ammo } from "./ammo";
import { Armor } from "./armor";
import { Bots } from "./bots";
import { Containers } from "./containers";
import { Flea } from "./flea";
import { Globals } from "./globals";
import { Hideout } from "./hideout";
import { Insurance } from "./insurance";
import { Items } from "./items";
import { Locations } from "./locations";
import { Logger } from "./logger";
import { Loot } from "./loot";
import { Prewipe } from "./prewipe";
import { Quests } from "./quests";
import { Raid } from "./raid";
import { Skills } from "./skills";
import { Traders } from "./traders";
import { Weapons } from "./weapons";

class ValensAIO implements IPostDBLoadMod
{
    private modConfig: Config = require("../config/config.json");
    private logger: ILogger;
    private databaseServer: DatabaseServer;
    private configServer: ConfigServer;
    private botConfig: IBotConfig;
    private insuranceConfig: IInsuranceConfig;
    private locationConfig: ILocationConfig;
    private ragfairConfig: IRagfairConfig;
    private airdropConfig: IAirdropConfig;
    private inRaidConfig: IInRaidConfig;
    private weightedRandomHelper : WeightedRandomHelper;
    private hideoutConfig: IHideoutConfig
    private traderConfig: ITraderConfig;

    public postDBLoad(container: DependencyContainer): void
    {
        // get database from server
        const logger = container.resolve<ILogger>("WinstonLogger");
        const vLogger = new Logger(logger);
        this.databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        this.configServer = container.resolve<ConfigServer>("ConfigServer");
        this.weightedRandomHelper = container.resolve<WeightedRandomHelper>("WeightedRandomHelper");
        this.locationConfig = this.configServer.getConfig<ILocationConfig>(ConfigTypes.LOCATION);
        this.ragfairConfig = this.configServer.getConfig<IRagfairConfig>(ConfigTypes.RAGFAIR);
        this.botConfig = this.configServer.getConfig<IBotConfig>(ConfigTypes.BOT);
        this.inRaidConfig = this.configServer.getConfig<IInRaidConfig>(ConfigTypes.IN_RAID);
        this.insuranceConfig = this.configServer.getConfig<IInsuranceConfig>(ConfigTypes.INSURANCE);
        this.hideoutConfig = this.configServer.getConfig<IHideoutConfig>(ConfigTypes.HIDEOUT);
        this.traderConfig = this.configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        this.airdropConfig = this.configServer.getConfig<IAirdropConfig>(ConfigTypes.AIRDROP);
		

        const airdrops = new Airdrop(vLogger, this.databaseServer, this.airdropConfig);
        airdrops.updateAirdrops();

        const ammo = new Ammo(vLogger, this.databaseServer);
        ammo.updateAmmo();

        const armor = new Armor(vLogger, this.databaseServer);
        armor.updateArmor();

        const bots = new Bots(vLogger, this.databaseServer, this.botConfig, this.weightedRandomHelper);
        bots.updateBots();

        const containers = new Containers(vLogger, this.databaseServer);
        containers.updateContainers();

        const flea = new Flea(vLogger, this.ragfairConfig, this.databaseServer);
        flea.updateFlea();

        const globals = new Globals(vLogger, this.databaseServer);
        globals.updateGlobals();

        const hideout = new Hideout(vLogger, this.databaseServer, this.hideoutConfig);
        hideout.updateHideout();

        const insurance = new Insurance(vLogger, this.insuranceConfig, this.databaseServer);
        insurance.updateInsurance();

        const items = new Items(vLogger, this.databaseServer);
        items.updateItems();

        const locations = new Locations(vLogger, this.databaseServer);
        locations.updateLocations();
        
        const loot = new Loot(vLogger, this.databaseServer, this.locationConfig);
        loot.updateLoot();

        const prewipe = new Prewipe(vLogger, this.databaseServer);
        prewipe.updatePrewipe();
        
        const quests = new Quests(vLogger, this.databaseServer);
        quests.updateQuests();

        const raid = new Raid(vLogger, this.databaseServer, this.inRaidConfig);
        raid.updateRaid();

        const skills = new Skills(vLogger, this.databaseServer);
        skills.updateSkills();

        const traders = new Traders(vLogger, this.databaseServer, this.traderConfig);
        traders.updateTraders();

        const weapons = new Weapons(vLogger, this.databaseServer);
        weapons.updateWeapons();

    }
}
    
module.exports = { mod: new ValensAIO() }