/**
 *  * Created by Wilton O. Ferreira on 17/05/2020
 */

import {IBaseError} from "./BaseError";

export class ValidateFileTypePNGError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, ValidateFileTypePNGError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 412,
            description: 'Tipo de arquivo não é PNG.'
        };
    }
}