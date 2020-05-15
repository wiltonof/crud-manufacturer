/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Joi from "joi";
import {GenericValidator} from "../../../common/validator/GenericValidator";
import {ManufacturerValidator} from "../../manufacturer/validator/ManufacturerValidator";

export class EquipmentValidator extends GenericValidator {

    static equipment = Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.string().required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.binary().encoding('base64').required(),
        notaFiscal:  Joi.binary().encoding('base64').required(),
        manufacturerId:  Joi.number().max(999999).required()
    });

    static equipments = Joi.array().items(Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.string().required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.binary().encoding('base64').required(),
        notaFiscal:  Joi.binary().encoding('base64').required(),
        manufacturerId:  Joi.number().max(999999).required(),
        manufacturer: ManufacturerValidator.manufacturerFindById
    })).allow(null);

    static equipmentFindById = Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        model:Joi.string().required(),
        type: Joi.string().required(),
        ppm: Joi.string().required(),
        wifi:  Joi.boolean().required(),
        consumption:  Joi.number().max(999999).required(),
        image:  Joi.binary().encoding('base64').required(),
        notaFiscal:  Joi.binary().encoding('base64').required(),
        manufacturerId:  Joi.number().max(999999).required(),
        manufacturer: ManufacturerValidator.manufacturerFindById,
        createAt: Joi.date(),
        updatedAt: Joi.date()
    });

}