/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../../setting";
import {Sequelize} from "sequelize";
import {GenericController, IGenericController} from "../../../common/controller/GenericController";
import {Equipment} from "../model/Equipment";
import {EquipmentData} from "../data/EquipmentData";
import {ValidateFileTypePNGError} from "../../../common/error/ValidateFileTypePNGError";
import {ValidateFileTypePDFError} from "../../../common/error/ValidateFileTypePDFError";


export class EquipmentController extends GenericController<Equipment> implements IEquipmentController {
    private static equipmentController: EquipmentController = null;
    private equipmentData: EquipmentData;


    private constructor(protected server: Hapi.server, protected  configs: IServerSettings, protected database: Sequelize) {
        super(server, configs, database, EquipmentData.getInstance(server, configs, database));
        this.equipmentData = EquipmentData.getInstance(server, configs, database);
    }

    public static getInstance(server: Hapi.server, configs: IServerSettings, database: Sequelize) {
        if (this.equipmentController == null) {
            this.equipmentController = new EquipmentController(server, configs, database);
        }
        return this.equipmentController;
    }

    public async create(equipment: Equipment) {
        if (!equipment.image.includes('image/png')) {
            throw new ValidateFileTypePNGError('ValidateFileTypePNGError');
        }

        if (!equipment.notaFiscal.includes('pdf')) {
            throw new ValidateFileTypePDFError('ValidateFileTypePDFError');
        }

        return await this.equipmentData.create(equipment);
    }

    public async findById(id: number, attributes: string[]) {
        return this.equipmentData.findById(id);
    }

    public async list(attributes: string[]) {
        return this.equipmentData.list(['id', 'model', 'type', 'ppm', 'wifi', 'consumption', 'image', 'notaFiscal', 'manufacturerId']);
    }

    public async findByManufecturerId(manufacturerId: number) {
        return await this.equipmentData.findByManufecturerId(manufacturerId);
    }

    async deleteByManufecturerId(manufacturerId: number) {
        return await this.equipmentData.deleteByManufecturerId(manufacturerId);
    }
}
export interface IEquipmentController extends IGenericController<Equipment> {
    findByManufecturerId(manufacturerId: number);
    deleteByManufecturerId(id: number);
}
