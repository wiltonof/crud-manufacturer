/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {IServerSettings} from "../../../setting/index";
import {Sequelize} from "sequelize";
import {GenericFacade} from "../../../common/facade/GenericFacade";
import {Equipment} from "../model/Equipment";
import {IEquipmentController} from "../controller/EquipmentController";

export class EquipmentFacade extends GenericFacade<Equipment> {
    constructor(protected configs: IServerSettings, protected database: Sequelize, protected controller: IEquipmentController) {
        super(configs, database, controller);
    }
}