/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {Column, Table} from 'sequelize-typescript';
import {AbstractModel, IAbstractModel} from '../../../common/model/AbstractModel';



@Table({tableName: 'manufacturers', modelName: 'Manufacturer'})
export class Manufacturer extends AbstractModel<Manufacturer> implements IManufacturer {

    @Column({allowNull: false, field: 'name'})
    name: string;

    @Column({allowNull: false, field: 'cnpj'})
    cnpj: string;
}


export interface IManufacturer extends  IAbstractModel {
    name: string;
    cnpj: string;
}
