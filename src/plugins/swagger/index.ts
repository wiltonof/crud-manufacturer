/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from '@hapi/hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
const Good = require('good');
const Blipp = require('blipp');

import {IServerSettings} from '../../setting';

export class Swagger {

    constructor() {}

    async register(server: Hapi.Server, settings: IServerSettings) {

        const goodOptions = {
            ops: {
                interval: 1000
            },
            reporters: {
                myConsoleReporter: [
                    {
                        module: '@hapi/good-squeeze',
                        name: 'Squeeze',
                        args: [
                            {
                                log: '*',
                                response: {
                                    exclude: ['no-logging']
                                }
                            }
                        ]
                    },
                    {
                        module: 'good-console'
                    },
                    'stdout'
                ]
            }
        };

        const swaggerOptions = {
            pathPrefixSize: 1,
            schemes: [settings.scheme],
            host: settings.hostSwagger,
            lang: 'pt',
            info: {
                title: 'API Documentation',
                description: "Gestão de equipamentos por fabricante!",
                version: '1.0.0',
                contact: {
                    email: 'wiltonof@gmail.com'
                },
            },
            swaggerUI: true,
            documentationPage: true,
            documentationPath: '/docs',
        };

        await server.register([
            Inert,
            Vision,
            Blipp,
            {
                plugin: Good,
                options: goodOptions
            },
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
    }
}
