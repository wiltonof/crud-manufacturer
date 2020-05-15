/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */


import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../../setting";
import {Sequelize} from "sequelize";
import {Manufacturer} from "../model/Manufacturer";
import {GenericController, IGenericController} from "../../../common/controller/GenericController";
import {ManufacturerData} from "../data/ManufacturerData";

export class ManufacturerController extends GenericController<Manufacturer> implements IManufacturerController {
    private static nanufacturerController: ManufacturerController = null;
    private manufacturerData: ManufacturerData;

    private constructor(protected  configs: IServerSettings, protected database: Sequelize) {
        super(configs, database, ManufacturerData.getInstance(configs, database));
        this.manufacturerData = ManufacturerData.getInstance(configs, database);
    }

    public static getInstance(configs: IServerSettings, database: Sequelize) {
        if (this.nanufacturerController == null) {
            this.nanufacturerController = new ManufacturerController(configs, database);
        }
        return this.nanufacturerController;
    }
}
export interface IManufacturerController extends IGenericController<Manufacturer> {}
