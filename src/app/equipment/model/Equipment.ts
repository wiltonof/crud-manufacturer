/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import {BelongsTo, Column, DataType, Default, ForeignKey, Table} from 'sequelize-typescript';
import {AbstractModel, IAbstractModel} from '../../../common/model/AbstractModel';
import {Manufacturer} from "../../manufacturer/model/Manufacturer";



@Table({tableName: 'equipments', modelName: 'Equipment'})
export class Equipment extends AbstractModel<Equipment> implements IManufacturer {

    @Column({allowNull: false, field: 'name'})
    model: string;

    @Default('CARTUCHO')
    @Column(DataType.ENUM('CARTUCHO', 'TONNER'))
    type: string;

    @Column({allowNull: false, field: 'ppm', type: DataType.INTEGER})
    ppm: number;

    @Column({allowNull: false, field: 'wifi', type: DataType.BOOLEAN})
    wifi: boolean;

    @Column({allowNull: false, field: 'consumption', type: DataType.DOUBLE})
    consumption: number;

    @Column({allowNull: false, field: 'image', type: DataType.BLOB})
    image: string;

    @Column({allowNull: false, field: 'nota_fiscal', type: DataType.BLOB})
    notaFiscal: string;

    @ForeignKey(() => Manufacturer)
    @Column({field:'address_id', type: DataType.INTEGER})
    manufacturerId: number;

    @BelongsTo(() => Manufacturer)
    manufacturer: Manufacturer;
}


export interface IManufacturer extends  IAbstractModel {
    model: string;
    type: string;
    ppm: number;
    wifi: boolean;
    consumption: number;
    image: string;
    notaFiscal: string;
    manufacturerId: number;
    manufacturer: Manufacturer;
}