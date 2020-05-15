/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {Sequelize} from "sequelize";
import {IGenericData} from "../data/GenericData";
import {AbstractModel} from "../model/AbstractModel";
import {IServerSettings} from "../../setting";

export abstract class GenericController<T extends AbstractModel<T>> implements IGenericController<T> {

    constructor(
        protected configs: IServerSettings,
        protected database: Sequelize,
        protected data: IGenericData
    ) {

    }

    public async list(attributes: string[] = null, limit: number = null, offset: number = null) {
        return this.data.list(attributes, limit, offset);
    }

    public async findById(id: number, attributes: string[] = null) {
        return this.data.findById(id, attributes);
    }
    public async create(obj: T) {
        return this.data.create(obj);
    }
    public async update(obj: T, id: number) {
        return this.data.update(obj, id);
    }
    public async delete(id: number, physic: boolean) {
        return this.data.delete(id, physic);
    }
}

export interface IGenericController<T extends AbstractModel<T>> {
    list(attributes: string[], limit: number, offset: number );
    findById(id: number, attributes: string[]);
    create(ojb: T);
    update(ojb: T, id: number);
    delete(id: number, physic: boolean);
}
