/**
 * Created by wilton on 18/02/2020.
 */

import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../setting";

export class Auth {

    constructor(protected settings: IServerSettings) {

    }

    async register(server: Hapi.Server) {
        const validate = async (token, request, h) => {
            let isValid = false;
            const credentials = { name: 'gest' };
            if (token === this.settings.token) {
                isValid = true;
            } else {
                server.log(['error'], {error: `[AUTH]:autentication:UnauthorizedError: TOKEN ${token}`});
            }
            return { isValid, credentials, h };
        };


        let plugins = [
            {
                plugin: require('./schema')
            },
           /* {
                plugin: Autorization,
                options: {
                    roles: ['LOGIN_SYS']	// Can also reference a function which returns an array of roles
                }
            }*/
        ];

        await server.register(plugins);
        server.auth.strategy('simple', 'wof', { validate: validate });
        server.auth.default('simple');
    }
}
