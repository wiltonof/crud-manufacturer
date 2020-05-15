import {IBaseError} from "./BaseError";

export class UpdateError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, UpdateError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 422,
            description: 'Erro ao persistir no banco.'
        };
    }
}
