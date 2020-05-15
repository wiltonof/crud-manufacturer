/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../../setting";
import {Sequelize} from "sequelize";
import {GenericController, IGenericController} from "../../../common/controller/GenericController";
import {Equipment} from "../model/Equipment";
import {EquipmentData} from "../data/EquipmentData";
import {ManufacturerController} from "../../manufacturer/controller/ManufacturerController";

export class EquipmentController extends GenericController<Equipment> implements IEquipmentController {
    private static equipmentController: EquipmentController = null;
    private equipmentData: EquipmentData;
    private manufacturerController: ManufacturerController;

    private constructor(protected  configs: IServerSettings, protected database: Sequelize) {
        super(configs, database, EquipmentData.getInstance(configs, database));
        this.equipmentData = EquipmentData.getInstance(configs, database);
        this.manufacturerController = ManufacturerController.getInstance(configs, database);
    }

    public static getInstance(configs: IServerSettings, database: Sequelize) {
        if (this.equipmentController == null) {
            this.equipmentController = new EquipmentController(configs, database);
        }
        return this.equipmentController;
    }

}
export interface IEquipmentController extends IGenericController<Equipment> {}
