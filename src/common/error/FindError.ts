import {IBaseError} from "./BaseError";

export class FindError extends Error implements IBaseError {
    constructor (public message: string) {
        super(message);
        Object.setPrototypeOf(this, FindError.prototype);
    }

    getError() {
        return {
            message: this.message,
            code: 406,
            description: 'Conteúdo não encontrado.'
        };
    }
}
