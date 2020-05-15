import {IBaseError} from "./BaseError";

export class NotFoundError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 404,
            description: 'Registro não encontrado.'
        };
    }
}
