/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Joi from "joi";

export abstract class GenericValidator {

    static byId = Joi.object().keys({
        id: Joi.number().max(999999).required()
    });

    static responsePostPutAndDelete = Joi.object().keys({
        message: Joi.string().required(),
        description: Joi.string().required(),
        code: Joi.number().required()
    });

    static paginationInput = Joi.object().keys({
        offset: Joi.number().max(999999).allow(null).optional(),
        limit: Joi.number().max(999999).allow(null).optional(),
    });

    static autorization = Joi.object({'X-API-KEY': Joi.string().required()}).unknown();

}
