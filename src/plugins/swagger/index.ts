/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import {IServerSettings} from '../../setting';

export class Swagger {

    constructor() {}

    async register(server: Hapi.Server, settings: IServerSettings) {

        const swaggerOptions = {
            pathPrefixSize: 1,
            schemes: [settings.scheme],
            host: settings.hostSwagger,
            lang: 'pt',
            info: {
                title: 'VENTURUS API Documentation',
                version: '1.0.0'
            },
            swaggerUI: true,
            documentationPage: true,
            documentationPath: '/docs'
        };

        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ]);
    }
}
