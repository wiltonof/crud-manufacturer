import {IBaseError} from "./BaseError";

export class UnauthorizedError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 401,
            description: 'Token de acesso invalido'
        };
    }
}
