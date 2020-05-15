/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {IServerSettings} from "../../../setting/index";
import {Sequelize} from "sequelize";
import {Manufacturer} from "../model/Manufacturer";
import {IManufacturerController} from "../controller/ManufacturerController";
import {GenericFacade} from "../../../common/facade/GenericFacade";



export class ManufacturerFacade extends GenericFacade<Manufacturer> {
    constructor(protected configs: IServerSettings, protected database: Sequelize, protected controller: IManufacturerController) {
        super(configs, database, controller);
    }
}
