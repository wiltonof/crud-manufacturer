/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from '@hapi/hapi';
import {Manufacturer} from "../model/Manufacturer";
import {Sequelize} from "sequelize";
import {IServerSettings} from "../../../setting";
import {GenericData} from "../../../common/data/GenericData";

export class ManufacturerData extends GenericData<Manufacturer> {
    private static manufacturerData: ManufacturerData = null;

    private constructor(protected server: Hapi.server, protected  configs: IServerSettings, protected database: Sequelize) {
        super(server, configs, database, 'Manufacturer');
    }

    public static getInstance(server: Hapi.server, configs: IServerSettings, database: Sequelize) {
        if (this.manufacturerData == null) {
            this.manufacturerData = new ManufacturerData(server, configs, database);
        }
        return this.manufacturerData;
    }

    async findByCNPJ(cnpj: string) {
        return await Manufacturer.findOne({where:{cnpj: cnpj}});
    }
}
