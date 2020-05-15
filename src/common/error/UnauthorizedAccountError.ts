import {IBaseError} from "./BaseError";

export class UnauthorizedAccountError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedAccountError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 401,
            description: 'Conta de usuário não encontrada'
        };
    }
}
