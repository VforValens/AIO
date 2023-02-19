import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { SkillsConfig } from "../config/ts/skills";
import { Logger } from "./logger";

export class Skills
{
    private modConfig: SkillsConfig = require("../config/skills.json");
    private logger: Logger;
    private tables: DatabaseServer;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer;
    }

    public updateSkills(): void
    {
        const skills = this.tables.getTables().globals.config;
        const mod = this.modConfig;

        if (mod.weaponSkillProgressRate != 1)
        {
            skills.SkillsSettings.WeaponSkillProgressRate = mod.weaponSkillProgressRate;
            this.logger.info(`Weapon Skill Progress Rate changed to ${mod.weaponSkillProgressRate}`)
        }

        if (mod.skillProgressRate != 0.4)
        {
            skills.SkillsSettings.SkillProgressRate = mod.skillProgressRate;
            this.logger.info(`Skill Progress Rate changed to ${mod.skillProgressRate}`)
        }

        if (mod.skillEnduranceWeightThreshold != 0.65)
        {
            skills.SkillEnduranceWeightThreshold = mod.skillEnduranceWeightThreshold;
            this.logger.info(`Skill Endurance Weight Threshold changed to ${mod.skillEnduranceWeightThreshold}`)
        }

        if (mod.skillMinEffectiveness != 0.0001)
        {
            skills.SkillMinEffectiveness = mod.skillMinEffectiveness;
            this.logger.info(`Skill Min Effectiveness changed to ${mod.skillMinEffectiveness}`)
        }

        if (mod.skillFatiguePerPoint != 0.6)
        {
            skills.SkillFatiguePerPoint = mod.skillFatiguePerPoint;
            this.logger.info(`Skill Fatigue Per Point changed to ${mod.skillFatiguePerPoint}`);
        }

        if (mod.skillFreshEffectiveness != 1.3)
        {
            skills.SkillFreshEffectiveness = mod.skillFreshEffectiveness;
            this.logger.info(`Skill Fresh Effectiveness changed to ${mod.skillFreshEffectiveness}`);
        }

        if (mod.skillFreshPoints != 1)
        {
            skills.SkillFreshPoints = mod.skillFreshPoints;
            this.logger.info(`Skill Fresh Points changed to ${mod.skillFreshPoints}`);
        }

        if (mod.skillPointsBeforeFatigue != 1)
        {
            skills.SkillPointsBeforeFatigue = mod.skillPointsBeforeFatigue;
            this.logger.info(`Skill Points Before Fatigue changed to ${mod.skillPointsBeforeFatigue}`);
        }

        if (mod.skillFatiguePerPoint != 200)
        {
            skills.SkillFatigueReset = mod.skillFatigueReset;
            this.logger.info(`Skill Fatigue Reset changed to ${mod.skillFatigueReset}`);
        }
    }
}
