import {IBaseError} from "./BaseError";

export class InternalError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, InternalError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 501,
            description: 'Erro interno no servidor'
        };
    }
}
