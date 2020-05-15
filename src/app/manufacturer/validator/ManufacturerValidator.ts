/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Joi from "joi";
import {GenericValidator} from "../../../common/validator/GenericValidator";


export class ManufacturerValidator extends GenericValidator {

    static manufacturer = Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        name: Joi.string().required(),
        cnpj: Joi.string().required()
    });

    static manufacturers = Joi.array().items(Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        createAt: Joi.date(),
        updatedAt: Joi.date()
    })).allow(null);

    static manufacturerFindById = Joi.object().keys({
        id:  Joi.number().max(999999).required(),
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        createAt: Joi.date(),
        updatedAt: Joi.date()
    });

}
