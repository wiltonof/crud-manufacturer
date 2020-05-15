import {IBaseError} from "./BaseError";

export class CreateError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, CreateError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 422,
            description: 'Erro ao persistir no banco.'
        };
    }
}
