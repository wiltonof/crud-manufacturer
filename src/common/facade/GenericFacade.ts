/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import {Sequelize} from "sequelize";
import {IGenericController} from "../controller/GenericController";
import {InternalError} from "../error/InternalError";
import {ListError} from "../error/ListError";
import {FindError} from "../error/FindError";
import {UpdateError} from "../error/UpdateError";
import {DeleteError} from "../error/DeleteError";
import {CreateError} from "../error/CreateError";
import {AbstractModel} from "../model/AbstractModel";
import {IServerSettings} from "../../setting";


export abstract class GenericFacade<T extends AbstractModel<T>> {

    constructor(protected configs: IServerSettings, protected database: Sequelize, protected controller: IGenericController<T>) {}

    public async list(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            let list: T[] = await this.controller.list([], request.query.offset, request.query.limit);
            // console.log(JSON.stringify(list));
            return reply.response(JSON.parse(JSON.stringify(list))).code(201);
        } catch (e) {
            if (e instanceof ListError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }

    public async findById(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            let obj: T = await this.controller.findById(request.params.id, []);
            return reply.response(JSON.parse(JSON.stringify(obj))).code(201);
        } catch (e) {
            if (e instanceof FindError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }

    public async create(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.controller.create(request.payload);
            let msg = {
                message: '',
                description: 'Registro criado com sucesso!',
                code: 201
            };
            return reply.response(JSON.parse(JSON.stringify(msg))).code(201);
        } catch (e) {
            if (e instanceof CreateError) {
                return reply.response(e.getError()).code(e.getError().code);
            }  else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }

    public async update(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.controller.update(request.payload, request.params.id);
            let msg = {
                message: '',
                description: 'Registro atualizado com sucesso!',
                code: 201
            };
            return reply.response(JSON.parse(JSON.stringify(msg))).code(201);
        } catch (e) {
            if (e instanceof UpdateError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }

    public async delete(request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
        try {
            await this.controller.delete(request.params.id, false);
            let msg = {
                message: '',
                description: 'Registro apagado com sucesso!',
                code: 201
            };
            return reply.response(JSON.parse(JSON.stringify(msg))).code(201);
        } catch (e) {
            if (e instanceof DeleteError) {
                return reply.response(e.getError()).code(e.getError().code);
            } else {
                let error = new InternalError(e);
                return reply.response(error.getError()).code(error.getError().code);
            }
        }
    }
}
