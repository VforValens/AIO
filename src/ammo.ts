import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { Logger } from "./logger";
import { Grenade, Ammo762x51, Ammo762x54, Ammo86x70, Ammo46x30, Ammo57x28, Ammo762x25, Ammo9x18, Ammo9x19, Ammo9x21, Ammo9x33R, Ammo1143x23ACP, Ammo545x39, Ammo556x45, Ammo762x35, Ammo762x39, Ammo9x39, Ammo366TKM, Ammo127x55, Ammo12Gauge, Ammo20Gauge, Ammo23x75, Ammo30x29, Ammo26x75 } from "@spt-aki/models/enums/AmmoTypes";
import { Weapons127x55, Weapons86x70, Weapons9x39, Weapons762x54R, Weapons762x51, Weapons366TKM, Weapons762x39, Weapons762x35, Weapons556x45, Weapons545x39, Weapons57x28FN, Weapons46x30HK, Weapons1143x23, Weapons9x33R, Weapons9x21, Weapons9x19, Weapons9x18, Weapons762x25, Weapons12Gauge, Weapons20Gauge, Weapons23x75 } from "@spt-aki/models/enums/WeaponTypes";
import { AmmoConfig } from "../config/ts/ammo";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";

export class Ammo
{
    private modConfig: AmmoConfig = require("../config/ammo.json")
    private logger: Logger;
    private databaseServer: DatabaseServer
    private tables: IDatabaseTables;

    constructor(logger: Logger, databaseServer: DatabaseServer)
    {
        this.logger = logger;
        this.tables = databaseServer.getTables().templates.items;
    }

    public updateAmmo(): void
    {
        const items = this.tables;
        const stacks = this.modConfig.stacks;
        

        // Sets HE grenades from GLaunchers max stacks.
        if (stacks.grenades != 1)
        {
            for (const value of Object.values(Grenade)) 
            {
                items[value]._props.StackMaxSize = stacks.grenades;
                this.logger.info(`Grenade Max Stacks set to ${stacks.grenades}`);
            }
        }

        // Sets .338 Lapua Magnum max stacks.
        if (stacks.a86x70 != 30)
        {
            for (const value of Object.values(Ammo86x70))
            {
                items[value]._props.StackMaxSize = stacks.a86x70;
                this.logger.info(`.338 Lapua Magnum Max Stacks set to ${stacks.a86x70}`);
            }
        }
        
        // Sets 12.7x55mm max stacks.
        if (stacks.a127x55 != 30)
        {
            for (const value of Object.values(Ammo127x55)) 
            {
                items[value]._props.StackMaxSize = stacks.a127x55;
                this.logger.info(`12.7x55mm Max Stacks set to ${stacks.a127x55}`);
            }
        }

        // Sets 7.62x54mm max stacks.
        if (stacks.a762x54 != 40)
        {
            for (const value of Object.values(Ammo762x54)) 
            {
                items[value]._props.StackMaxSize = stacks.a762x54;
                this.logger.info(`7.62x54R Max Stacks set to ${stacks.a762x54}`);
            }
        }

        // Sets 7.62x51mm max stacks.
        if (stacks.a762x51 != 40)
        {
            for (const value of Object.values(Ammo762x51))
            {
                items[value]._props.StackMaxSize = stacks.a762x51;
                this.logger.info(`7.62x51mm Max Stacks set to ${stacks.a762x51}`);
            }
        }

        // Sets 9x39mm max stacks.
        if (stacks.a9x39 != 50)
        {
            for (const value of Object.values(Ammo9x39)) 
            {
                items[value]._props.StackMaxSize = stacks.a9x39;
                this.logger.info(`9x39mm Max Stacks set to ${stacks.a9x39}`);
            }
        }

        // Sets .366 TKM max stacks.
        if (stacks.a366TKM != 50)
        {
            for (const value of Object.values(Ammo366TKM)) 
            {
                items[value]._props.StackMaxSize = stacks.a366TKM;
                this.logger.info(`.366 TKM Max Stacks set to ${stacks.a366TKM}`);
            }
        }

        // Sets 7.62x39mm max stacks.
        if (stacks.a762x39 != 60)
        {
            for (const value of Object.values(Ammo762x39)) 
            {
                items[value]._props.StackMaxSize = stacks.a762x39;
                this.logger.info(`7.62x39mm Max Stacks set to ${stacks.a762x39}`);
            }
        }

        // Sets 7.62x35mm (.300 Blackout) max stacks.          
        if (stacks.a762x35 != 60)
        {
            for (const value of Object.values(Ammo762x35))
            {
                items[value]._props.StackMaxSize = stacks.a762x35;
                this.logger.info(`762x35mm Max Stacks set to ${stacks.a762x35}`);
            }
        } 
        
        // Sets 5.56x45mm max stacks.
        if (stacks.a556x45 != 60)
        {
            for (const value of Object.values(Ammo556x45)) 
            {
                items[value]._props.StackMaxSize = stacks.a556x45;
                this.logger.info(`5.56x45mm Max Stacks set to ${stacks.a556x45}`);
            }
        }

        // Sets 5.45x39mm max stacks.
        if (stacks.a545x39 != 60)
        {
            for (const value of Object.values(Ammo545x39)) 
            {
                items[value]._props.StackMaxSize = stacks.a545x39;
                this.logger.info(`5.45x39mm Max Stacks set to ${stacks.a545x39}`);
            }
        }

        // Sets 5.7x28mm max stacks.
        if (stacks.a57x28 != 60)
        {
            for (const value of Object.values(Ammo57x28)) 
            {
                items[value]._props.StackMaxSize = stacks.a57x28;
                this.logger.info(`5.7x28mm Max Stacks set to ${stacks.a57x28}`);
            }
        }

        // Sets 4.6x30mm max stacks.
        if (stacks.a46x30 != 70)
        {
            for (const value of Object.values(Ammo46x30)) 
            {
                items[value]._props.StackMaxSize = stacks.a46x30;
                this.logger.info(`4.6x30mm Max Stacks set to ${stacks.a46x30}`);
            }
        }

        // Sets 9x33R or .357 Mag max stacks.
        if (stacks.a9x33R != 30)
        {
            for (const value of Object.values(Ammo9x33R)) 
            {
                items[value]._props.StackMaxSize = stacks.a9x33R;
                this.logger.info(`.357 Magnum Max Stacks set to ${stacks.a9x33R}`);
            }
        }

        // Sets 1143x23ACP or .45 ACP max stacks.
        if (stacks.a1143x23ACP != 50)
        {
            for (const value of Object.values(Ammo1143x23ACP)) 
            {
                items[value]._props.StackMaxSize = stacks.a1143x23ACP;
                this.logger.info(`.45 ACP Max Stacks set to ${stacks.a1143x23ACP}`);
            }
        }

        // Sets 7.62x25mm or .300BLK max stacks.
        if (stacks.a762x25 != 50)
        {
            for (const value of Object.values(Ammo762x25)) 
            {
                items[value]._props.StackMaxSize = stacks.a762x25;
                this.logger.info(`7.62x25mm TT Max Stacks set to ${stacks.a762x25}`);
            }
        }

        // Sets 9x21mm max stacks.
        if (stacks.a9x21 != 50)
        {
            for (const value of Object.values(Ammo9x21)) 
            {
                items[value]._props.StackMaxSize = stacks.a9x21;
                this.logger.info(`9x21mm Max Stacks set to ${stacks.a9x21}`);
            }
        }

        // Sets 9x19mm parabellum max stacks.
        if (stacks.a9x19 != 50)
        {
            for (const value of Object.values(Ammo9x19)) 
            {
                items[value]._props.StackMaxSize = stacks.a9x19;
                this.logger.info(`9x19mm Max Stacks set to ${stacks.a9x19}`);
            }
        }

        // Sets 9x18mm max stacks.          
        if (stacks.a9x18 != 50)
        {
            for (const value of Object.values(Ammo9x18)) 
            {
                items[value]._props.StackMaxSize = stacks.a9x18;
                this.logger.info(`9x18mm Max Stacks set to ${stacks.a9x18}`);
            }
        }

        // Sets 23x75 KS-23 max stacks.          
        if (stacks.a23x75 != 15)
        {
            for (const value of Object.values(Ammo23x75)) 
            {
                items[value]._props.StackMaxSize = stacks.a23x75;
                this.logger.info(`23x75mm KS-23 Max Stacks set to ${stacks.a23x75}`);
            }
        }

        // Sets 12x70 12 Gauge max stacks.
        if (stacks.a12Gauge != 20)
        {
            for (const value of Object.values(Ammo12Gauge)) 
            {
                items[value]._props.StackMaxSize = stacks.a12Gauge;
                this.logger.info(`12 Gauge Max Stacks set to ${stacks.a12Gauge}`);
            }
        }

        // Sets 20x70 20 Gauge max stacks.
        if (stacks.a20Gauge != 20)
        {
            for (const value of Object.values(Ammo20Gauge)) 
            {
                items[value]._props.StackMaxSize = stacks.a20Gauge;
                this.logger.info(`20 Gauge Max Stacks set to ${stacks.a20Gauge}`);
            }
        }

        // Sets 30x29mm max stacks.
        if (stacks.a30x29 != 1)
        {
            for (const value of Object.values(Ammo30x29)) 
            {
                items[value]._props.StackMaxSize = stacks.a30x29;
                this.logger.info(`VOG-30x29mm Max Stacks set to ${stacks.a30x29}`);
            }
        }

        // Sets 26x75mm max stacks.
        if (stacks.a26x75 != 1)
        {
            for (const value of Object.values(Ammo26x75)) 
            {
                items[value]._props.StackMaxSize = stacks.a26x75;
                this.logger.info(`Flare Max Stacks set to ${stacks.a26x75}`);
            }
        }

        const zero = this.modConfig.zero;

        // Sets 127x55mm Zeroing default ammo to the  configured value.
        if (zero.g127x55 != "5cadf6ddae9215051e1c23b2")
        {
            for (const value of Object.values(Weapons127x55))
            {
                items[value]._props.defAmmo = zero.g127x55;
                this.logger.info("12.7x55mm Weapons Zero Changed");
            }
        }

        if (zero.g86x70 != "5fc275cf85fd526b824a571a")
        {
            for (const value of Object.values(Weapons86x70))
            {
                items[value]._props.defAmmo = zero.g86x70;
                this.logger.info("86x70mm Weapons Zero Changed");
            }
        }

        if (zero.g762x54 != "5887431f2459777e1612938f")
        {
            for (const value of Object.values(Weapons762x54R))
            {
                items[value]._props.defAmmo = zero.g762x54;
                this.logger.info("7.62x54mmR Weapons Zero Changed");
            }
        }

        if (zero.g762x51 != "58dd3ad986f77403051cba8f")
        {
            for (const value of Object.values(Weapons762x51))
            {
                items[value]._props.defAmmo = zero.g762x51;
                this.logger.info("7.62x51mm Weapons Zero Changed");
            }
        }

        if (zero.g9x39 != "57a0dfb82459774d3078b56c")
        {
            for (const value of Object.values(Weapons9x39))
            {
                items[value]._props.defAmmo = zero.g9x39;
                this.logger.info("9x39mm Weapons Zero Changed");
            }
        }

        if (zero.g366TKM != "59e655cb86f77411dc52a77b")
        {
            for (const value of Object.values(Weapons366TKM))
            {
                items[value]._props.defAmmo = zero.g366TKM;
                this.logger.info(".366 TKM Weapons Zero Changed");
            }
        }

        if (zero.g762x39 != "5656d7c34bdc2d9d198b4587")
        {
            for (const value of Object.values(Weapons762x39))
            {
                items[value]._props.defAmmo = zero.g762x39;
                this.logger.info("7.62x39mm Weapons Zero Changed");
            }
        }

        if (zero.g762x35 != "5fbe3ffdf8b6a877a729ea82")
        {
            for (const value of Object.values(Weapons762x35))
            {
                items[value]._props.defAmmo = zero.g762x35;
                this.logger.info("7.62x35mm Weapons Zero Changed");
            }
        }

        if (zero.g556x45 != "54527a984bdc2d4e668b4567")
        {
            for (const value of Object.values(Weapons556x45))
            {
                items[value]._props.defAmmo = zero.g556x45;
                this.logger.info("5.56x45mm Weapons Zero Changed");
            }
        }

        if (zero.g545x39 != "56dff3afd2720bba668b4567")
        {
            for (const value of Object.values(Weapons545x39))
            {
                items[value]._props.defAmmo = zero.g545x39;
                this.logger.info("5.45x39mm Weapons Zero Changed");
            }
        }

        if (zero.g57x28 != "5cc80f38e4a949001152b560")
        {
            for (const value of Object.values(Weapons57x28FN))
            {
                items[value]._props.defAmmo = zero.g57x28;
                this.logger.info("5.7x28mm Weapons Zero Changed");
            }
        }

        if (zero.g46x30 != "5ba2678ad4351e44f824b344")
        {
            for (const value of Object.values(Weapons46x30HK))
            {
                items[value]._props.defAmmo = zero.g46x30;
                this.logger.info("4.6x30mm Weapons Zero Changed");
            }
        }

        if (zero.g9x33R != "62330b3ed4dc74626d570b95")
        {
            for (const value of Object.values(Weapons9x33R))
            {
                items[value]._props.defAmmo = zero.g9x33R;
                this.logger.info("9x33R Weapons Zero Changed");
            }
        }

        if (zero.g1143x23ACP != "5e81f423763d9f754677bf2e")
        {
            for (const value of Object.values(Weapons1143x23))
            {
                items[value]._props.defAmmo = zero.g1143x23ACP;
                this.logger.info("1143x23ACP Weapons Zero Changed");
            }
        }

        if (zero.g762x25 != "5736026a245977644601dc61")
        {
            for (const value of Object.values(Weapons762x25))
            {
                items[value]._props.defAmmo = zero.g762x25;
                this.logger.info("7.62x25mm Weapons Zero Changed");
            }
        }

        if (zero.g9x21 != "5a269f97c4a282000b151807")
        {
            for (const value of Object.values(Weapons9x21))
            {
                items[value]._props.defAmmo = zero.g9x21;
                this.logger.info("9x21mm Weapons Zero Changed");
            }
        }

        if (zero.g9x19 != "56d59d3ad2720bdb418b4577")
        {
            for (const value of Object.values(Weapons9x19))
            {
                items[value]._props.defAmmo = zero.g9x19;
                this.logger.info("9x19mm Weapons Zero Changed");
            }
        }

        if (zero.g9x18 != "573719762459775a626ccbc1")
        {
            for (const value of Object.values(Weapons9x18))
            {
                items[value]._props.defAmmo = zero.g9x18;
                this.logger.info("9x18mm Weapons Zero Changed");
            }
        }

        if (zero.g23x75 != "5e85aa1a988a8701445df1f5")
        {
            for (const value of Object.values(Weapons23x75))
            {
                items[value]._props.defAmmo = zero.g23x75;
                this.logger.info("KS-23M Weapons Zero Changed");
            }
        }

        if (zero.g12Gauge != "560d5e524bdc2d25448b4571")
        {
            for (const value of Object.values(Weapons12Gauge))
            {
                items[value]._props.defAmmo = zero.g12Gauge;
                this.logger.info("12 Gauge Weapons Zero Changed");
            }
        }

        if (zero.g20Gauge != "5a38ebd9c4a282000d722a5b")
        {
            for (const value of Object.values(Weapons20Gauge))
            {
                items[value]._props.defAmmo = zero.g20Gauge;
                this.logger.info("20 Gauge Weapons Zero Changed");
            }
        }
    }
}
