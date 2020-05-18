/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../../setting/index";
import {Sequelize} from "sequelize";
import {GenericFacade} from "../../../common/facade/GenericFacade";
import {Equipment} from "../model/Equipment";
import {IEquipmentController} from "../controller/EquipmentController";
import {FindError} from "../../../common/error/FindError";
import {InternalError} from "../../../common/error/InternalError";
import {NotFoundError} from "../../../common/error/NotFoundError";

export class EquipmentFacade extends GenericFacade<Equipment> {
    constructor(protected configs: IServerSettings, protected database: Sequelize, protected controller: IEquipmentController) {
        super(configs, database, controller);
    }

    public async findByManufecturerId(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            let obj: Equipment = await this.controller.findByManufecturerId(request.params.id);
            if (obj !== null) {
                return reply.response(JSON.parse(JSON.stringify(obj))).code(200);
            } else {
                throw new NotFoundError("NotFoundError");
            }

        } catch (e) {
            if (e instanceof FindError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else if (e instanceof NotFoundError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }
}