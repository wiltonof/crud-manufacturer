import {IBaseError} from "./BaseError";

export class ListError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, ListError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 406,
            description: 'Conteúdo não encontrado.'
        };
    }
}
