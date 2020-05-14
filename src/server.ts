/**
 * Created by Wilton O. Ferreira on 14/05/2020
 */
import * as Hapi from '@hapi/hapi';

import * as settings from "./setting";

export class Server {


    constructor() {
        console.log('Starting ' + settings.getProjectName() + ' Application...');
        this.init().then(server => {
            console.log('Server Created!');
            console.log('Server running at:', server.info.uri);
        }).catch(err => {
            console.log(err);
        });
    }

    async init() {

        const server = Hapi.server({
            host: settings.getSettings(process.env.NODE_ENV).server.host,
            port: settings.getSettings(process.env.NODE_ENV).server.port,
            routes: {cors: {origin: ['https://front-dev.netfacilities.com.br', 'http://localhost:4200', 'http://localhost:3000']}}
        });
    }

}
