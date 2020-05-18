/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Joi from "joi";
import {GenericValidator} from "../../../common/validator/GenericValidator";
import {ManufacturerValidator} from "../../manufacturer/validator/ManufacturerValidator";

export class EquipmentValidator extends GenericValidator {

    static equipment = Joi.object({
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.number().max(999999).required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.string().min(20).max(2097152),
        notaFiscal: Joi.string(),
        manufacturerId:  Joi.number().max(999999).required()
    });

    static equipments = Joi.array().items(Joi.object({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.number().max(999999).required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.string().dataUri(),
        notaFiscal: Joi.string().dataUri(),
        manufacturerId:  Joi.number().max(999999).required(),
        createAt: Joi.date(),
        updatedAt: Joi.date(),
    }));

    static equipmentFindById = Joi.object({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.number().max(999999).required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.string().min(20).max(2097152),
        notaFiscal: Joi.string(),
        manufacturerId:  Joi.number().max(999999).required(),
        manufacturer: ManufacturerValidator.manufacturer,
        createAt: Joi.date(),
        updatedAt: Joi.date(),
    });

    static equipmentByManufacturerId = Joi.array().items(Joi.object({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.number().max(999999).required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.string().min(20).max(2097152),
        notaFiscal: Joi.string(),
        manufacturerId:  Joi.number().max(999999).required(),
        manufacturer: ManufacturerValidator.manufacturer,
        createAt: Joi.date(),
        updatedAt: Joi.date(),
    }));


}