/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

//const validator = require('cpf-cnpj-validator');
//const Joi = require('@hapi/joi'); //.extend(validator);

 import * as Joi from "joi";
import {GenericValidator} from "../../../common/validator/GenericValidator";


export class ManufacturerValidator extends GenericValidator {

    static manufacturerCreate = Joi.object({
        name: Joi.string().required(),
        cnpj: Joi.string().regex(/^\d{2}\.\d{3}.\d{3}\/\d{4}\-\d{2}$/).required()
    });

    static manufacturers = Joi.array().items(Joi.object({
        id:  Joi.number().max(999999).required(),
        name: Joi.string().required(),
        cnpj: Joi.string().required(),
        createAt: Joi.date(),
        updatedAt: Joi.date()
    }));

    static manufacturer = Joi.object({
        id:  Joi.number().max(999999).required(),
        name: Joi.string().required(),
        cnpj: Joi.string().regex(/^\d{2}\.\d{3}.\d{3}\/\d{4}\-\d{2}$/).required(),
        createAt: Joi.date(),
        updatedAt: Joi.date()
    });





}
