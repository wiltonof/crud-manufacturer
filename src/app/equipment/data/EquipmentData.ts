/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {Sequelize} from "sequelize";
import {IServerSettings} from "../../../setting";
import {GenericData} from "../../../common/data/GenericData";
import {Equipment} from "../model/Equipment";

export class EquipmentData extends GenericData<Equipment> {
    private static equipmentData: EquipmentData = null;

    private constructor(protected  configs: IServerSettings, protected database: Sequelize) {
        super(configs, database, 'Equipment');
    }

    public static getInstance(configs: IServerSettings, database: Sequelize) {
        if (this.equipmentData == null) {
            this.equipmentData = new EquipmentData(configs, database);
        }
        return this.equipmentData;
    }
}
