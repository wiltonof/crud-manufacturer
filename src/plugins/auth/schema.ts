/**
 *  * Created by Wilton O. Ferreira on 16/05/2020
 */

'use strict';

import {UnauthorizedError} from "../../common/error/UnauthorizedError";

const Hoek = require('@hapi/hoek');


const internals = {
    implementation: undefined
};


exports.plugin = {
    pkg: require('../../../package.json'),
    requirements: {
        hapi: '>=18.4.0'
    },

    register(server, options) {

        server.auth.scheme('wof', internals.implementation);
    }
};


internals.implementation = function (server, options) {

    Hoek.assert(options, 'Missing wof auth strategy options');
    Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in basic scheme');

    const settings = Hoek.clone(options);

    const scheme = {
        authenticate: async function (request, h) {
            const authorization = request.headers['x-api-key'];
            delete request.headers['x-api-key'];
            request.headers['X-API-KEY'] = authorization;

            if (!authorization) {
                let error = new UnauthorizedError('UnauthorizedError');
                return h.response(error.getError()).code(error.getError().code).takeover();
            }

            const { isValid, credentials, response } = await settings.validate(authorization, request, h);

            if (response !== undefined) {
                return h.response(response).takeover();
            }

            if (!isValid) {
                let error = new UnauthorizedError('UnauthorizedError');
                return h.response(error.getError()).code(error.getError().code).takeover();
            }

            return h.authenticated({ credentials });
        }
    };

    return scheme;
};
