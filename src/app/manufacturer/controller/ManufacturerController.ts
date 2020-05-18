/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */


import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../../setting";
import {Sequelize} from "sequelize";
import {Manufacturer} from "../model/Manufacturer";
import {GenericController, IGenericController} from "../../../common/controller/GenericController";
import {ManufacturerData} from "../data/ManufacturerData";
import {EquipmentController} from "../../equipment/controller/EquipmentController";
import {CreateUniqueConstraintError} from "../../../common/error/CreateUniqueConstraintError";

export class ManufacturerController extends GenericController<Manufacturer> implements IManufacturerController {
    private static nanufacturerController: ManufacturerController = null;
    private manufacturerData: ManufacturerData;
    private equipmentController: EquipmentController;


    private constructor(protected server: Hapi.server, protected  configs: IServerSettings, protected database: Sequelize) {
        super(server, configs, database, ManufacturerData.getInstance(server, configs, database));
        this.manufacturerData = ManufacturerData.getInstance(server, configs, database);
        this.equipmentController = EquipmentController.getInstance(server, configs, database);
    }

    public static getInstance(server: Hapi.server, configs: IServerSettings, database: Sequelize) {
        if (this.nanufacturerController == null) {
            this.nanufacturerController = new ManufacturerController(server, configs, database);
        }
        return this.nanufacturerController;
    }

    public async list(attributes: string[], offset: number, limit: number) {
        return await this.manufacturerData.list(['id', 'name', 'cnpj', 'createAt', 'updatedAt'], offset, limit);
    }

    public async findById(id: number, attributes: string[]) {
        return await this.manufacturerData.findById(id, ['id', 'name', 'cnpj', 'createAt', 'updatedAt']);
    }

    public async delete(id: number) {
        await this.equipmentController.deleteByManufecturerId(id);
        return await this.manufacturerData.delete(id);
    }

    public async create(manufacturer: Manufacturer) {
        let manufacturerLocla = await this.manufacturerData.findByCNPJ(manufacturer.cnpj);
        if (manufacturerLocla != null) {
            this.server.log(['error'], {error: `[Manufacturer]:create:UniqueConstraintError: CNPJ: ${manufacturer.cnpj} já existe na base de dados!`});
            throw new CreateUniqueConstraintError('UniqueConstraintError');
        } else {
            return await this.manufacturerData.create(manufacturer);
        }
    }
}
export interface IManufacturerController extends IGenericController<Manufacturer> {}
