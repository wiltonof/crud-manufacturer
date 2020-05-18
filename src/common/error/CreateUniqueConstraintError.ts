/**
 *  * Created by Wilton O. Ferreira on 16/05/2020
 */

import {IBaseError} from "./BaseError";

export class CreateUniqueConstraintError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, CreateUniqueConstraintError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 422,
            description: 'Erro ao persistir no banco, registro já existe. '
        };
    }
}
