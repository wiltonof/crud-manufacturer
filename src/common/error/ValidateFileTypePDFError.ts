/**
 *  * Created by Wilton O. Ferreira on 17/05/2020
 */

import {IBaseError} from "./BaseError";

export class ValidateFileTypePDFError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, ValidateFileTypePDFError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 412,
            description: 'Tipo de arquivo não é PDF.'
        };
    }
}
