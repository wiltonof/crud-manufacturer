/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {Sequelize} from "sequelize";
import {AbstractModel} from "../model/AbstractModel";
import {IServerSettings} from "../../setting";
import {CreateError} from "../error/CreateError";
import {DeleteError} from "../error/DeleteError";
import {UpdateError} from "../error/UpdateError";
import {FindError} from "../error/FindError";
import {ListError} from "../error/ListError";


export abstract class GenericData<T extends AbstractModel<T>> implements IGenericData {

    constructor(
        protected  configs: IServerSettings,
        protected database: Sequelize,
        protected entity: string
    ) { }

    public async create<T>(obj: any) {
        try {
            return await this.database.models[this.entity].create(JSON.parse(JSON.stringify(obj)));
        } catch (e) {
            throw new CreateError(e);
        }
    }

    public async delete(id: number, physic: boolean = false) {
        try {
            return await this.database.models[this.entity].destroy({where:{ id: id}});
        } catch (e) {
            throw new DeleteError(e);
        }
    }

    public async update(obj: any, id: number) {
        try {
            return await this.database.models[this.entity].update(JSON.parse(JSON.stringify(obj)), {where:{ id: id}});
        } catch (e) {
            throw new UpdateError(e);
        }
    }

    public async findById(id: number, attributes: string[] = null) {
        try {
            if (attributes != null) {
                return await this.database.models[this.entity].findOne({attributes: attributes, where:{ id: id}, order: [['id', 'asc']]});
            } else {
                return await this.database.models[this.entity].findOne({where:{ id: id}, order: [['id', 'asc']]});
            }
        } catch (e) {
            throw new FindError(e);
        }
    }

    public async list(attributes: string[] = null, offset: number = null, limit: number = null) {
        let params = {
            attributes: attributes,
            limit: limit || 10,
            offset: offset || 0
        };

        try {
            if (attributes != null && attributes.length > 0) {
                return await this.database.models[this.entity].findAll({
                    attributes: params.attributes,
                    order: [
                        ['createAt', 'DESC']
                    ],
                    offset: params.offset,
                    limit: params.limit
                });
            } else {
                return await this.database.models[this.entity].findAll(
                    {
                        order: [
                            ['createAt', 'DESC']
                        ],
                        offset: params.offset,
                        limit: params.limit
                    }
                );
            }
        } catch (e) {
            throw new ListError(e);
        }
    }

}

export interface IGenericData {
    list(attributes: string[], offset: number, limit: number);
    findById(id: number, attributes: string[]);
    create(obj: any);
    update(obj: any, id: number);
    delete(id: number, physic: boolean);
}
