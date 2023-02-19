import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ITrader } from "@spt-aki/models/eft/common/tables/ITrader";
import { IInsuranceConfig } from "@spt-aki/models/spt/config/IInsuranceConfig";
import { InsuranceConfig } from "../config/ts/insurance";
import { Logger } from "./logger";

export class Insurance
{
    private modConfig: InsuranceConfig = require("../config/insurance.json");
    private logger: Logger;
    private insuranceConfig: IInsuranceConfig;
    private tables: DatabaseServer;
    private traders: Record<string, ITrader>;


    constructor(logger:Logger, insuranceConfig: IInsuranceConfig, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.insuranceConfig = insuranceConfig;
        this.tables = databaseServer;
        this.traders = this.tables.getTables().traders;
    }

    public updateInsurance(): void
    {   
        const mod = this.modConfig;

        if (mod.blacklistedEquipment != this.insuranceConfig.blacklistedEquipment)
        {
            this.insuranceConfig.blacklistedEquipment = mod.blacklistedEquipment;
            this.logger.info("Insurance Blacklitsed Equipment Patched");
        }

        if (mod.prapor.minHr != 24 || mod.prapor.maxHr != 24)
        {
            this.changePraporTimes();
            this.logger.info(`Prapor Min Hr ${mod.prapor.minHr} and Max Hr ${mod.prapor.maxHr} patched`);
        }

        if (mod.prapor.storageMaxHr != 96)
        {
            this.changePraporStorage();
            this.logger.info(`Prapor Max Storage set to ${mod.prapor.storageMaxHr} hours`);
        }

        if (mod.prapor.priceCoef != 0.16)
        {
            this.changePraporPriceCoef();
            this.logger.info(`Prapor Price Coefficient set to ${mod.prapor.priceCoef}`);
        }

        if (mod.prapor.returnChance != 80)
        {
            this.changePraporReturnChance();
            this.logger.info(`Prapor Return Chance set to ${mod.prapor.returnChance}%`);
        }

        if (mod.therapist.minHr != 24 || mod.therapist.maxHr != 24)
        {
            this.changeTherapistTimes();
            this.logger.info(`Therapist Min Hr ${mod.therapist.minHr} and Max Hr ${mod.therapist.maxHr} patched`);
        }

        if (mod.therapist.storageMaxHr != 96)
        {
            this.changeTherapistStorage();
            this.logger.info(`Therapist Max Storage set to ${mod.therapist.storageMaxHr} hours`);
        }

        if (mod.therapist.priceCoef != 0.16)
        {
            this.changeTherapistPriceCoef();
            this.logger.info(`Therapist Price Coefficient set to ${mod.therapist.priceCoef}`);
        }

        if (mod.therapist.returnChance != 80)
        {
            this.changeTherapistReturnChance();
            this.logger.info(`Therapist Return Chance set to ${mod.therapist.returnChance}%`);
        }
    }

    changePraporTimes(): void
    {
        this.traders["54cb50c76803fa8b248b4571"].base.insurance.max_return_hour = this.modConfig.prapor.maxHr;
        this.traders["54cb50c76803fa8b248b4571"].base.insurance.min_return_hour = this.modConfig.prapor.minHr;
    }

    changePraporStorage(): void
    {
        this.traders["54cb50c76803fa8b248b4571"].base.insurance.max_storage_time = this.modConfig.prapor.storageMaxHr;
    }

    changePraporPriceCoef(): void
    {
        this.insuranceConfig.insuranceMultiplier["54cb50c76803fa8b248b4571"] = this.modConfig.prapor.priceCoef;
    }

    changePraporReturnChance(): void
    {
        this.insuranceConfig.returnChancePercent["54cb50c76803fa8b248b4571"] = this.modConfig.prapor.returnChance;
    }

    changeTherapistTimes(): void
    {
        this.traders["54cb57776803fa99248b456e"].base.insurance.max_return_hour = this.modConfig.therapist.maxHr;
        this.traders["54cb57776803fa99248b456e"].base.insurance.min_return_hour = this.modConfig.therapist.minHr;
    }

    changeTherapistStorage(): void
    {
        this.traders["54cb57776803fa99248b456e"].base.insurance.max_storage_time = this.modConfig.therapist.storageMaxHr;
    }

    changeTherapistPriceCoef(): void
    {
        this.insuranceConfig.insuranceMultiplier["54cb57776803fa99248b456e"] = this.modConfig.therapist.priceCoef;
    }
    
    changeTherapistReturnChance(): void
    {
        this.insuranceConfig.returnChancePercent["54cb57776803fa99248b456e"] = this.modConfig.therapist.returnChance;
    }
}
