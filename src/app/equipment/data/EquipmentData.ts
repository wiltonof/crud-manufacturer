/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from '@hapi/hapi';
import {Sequelize} from "sequelize";
import {IServerSettings} from "../../../setting";
import {GenericData} from "../../../common/data/GenericData";
import {Equipment} from "../model/Equipment";
import {Manufacturer} from "../../manufacturer/model/Manufacturer";

export class EquipmentData extends GenericData<Equipment> {
    private static equipmentData: EquipmentData = null;

    private constructor(protected server: Hapi.server, protected  configs: IServerSettings, protected database: Sequelize) {
        super(server, configs, database, 'Equipment');
    }

    public static getInstance(server: Hapi.server, configs: IServerSettings, database: Sequelize) {
        if (this.equipmentData == null) {
            this.equipmentData = new EquipmentData(server, configs, database);
        }
        return this.equipmentData;
    }


    public async findById(id: number) {
        let equipment = await Equipment.findOne({
            attributes: ['id', 'model', 'type', 'ppm', 'wifi', 'consumption', 'image', 'notaFiscal', 'manufacturerId', 'createAt', 'updatedAt'],
            include: [
                {
                    attributes: ['id', 'name', 'cnpj', 'createAt', 'updatedAt'],
                    model: Manufacturer,
                    as: 'manufacturer'
                }
            ],
            where:{
                id: id
            }
        });
        return equipment;
    }


    public async findByManufecturerId(manufacturerId: number) {
        let equipments = await Equipment.findAll({
            attributes: ['id', 'model', 'type', 'ppm', 'wifi', 'consumption', 'image', 'notaFiscal', 'manufacturerId', 'createAt', 'updatedAt'],
            include: [
                {
                    attributes: ['id', 'name', 'cnpj', 'createAt', 'updatedAt'],
                    model: Manufacturer,
                    as: 'manufacturer',
                    where:{
                        id: manufacturerId
                    }
                }
            ],
        });
        return equipments;
    }

    async deleteByManufecturerId(manufacturerId: any) {
        return await Equipment.destroy({where:{manufacturerId: manufacturerId}});
    }
}
