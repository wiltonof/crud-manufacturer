/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {Manufacturer} from "../model/Manufacturer";

import {Sequelize} from "sequelize";
import {IServerSettings} from "../../../setting";
import {GenericData} from "../../../common/data/GenericData";

export class ManufacturerData extends GenericData<Manufacturer> {
    private static manufacturerData: ManufacturerData = null;

    private constructor(protected  configs: IServerSettings, protected database: Sequelize) {
        super(configs, database, 'Manufacturer');
    }

    public static getInstance(configs: IServerSettings, database: Sequelize) {
        if (this.manufacturerData == null) {
            this.manufacturerData = new ManufacturerData(configs, database);
        }
        return this.manufacturerData;
    }
}
