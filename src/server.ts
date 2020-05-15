/**
 * Created by Wilton O. Ferreira on 14/05/2020
 */
import * as Hapi from '@hapi/hapi';

import * as settings from './setting';

import { sequelize } from './dao/index';
import * as fs from 'fs';
import * as path from 'path';


import {Swagger} from './plugins/swagger';


var appDir = path.dirname(require.main.filename);

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
            port: settings.getSettings(process.env.NODE_ENV).server.port
        });
  /*      if (settings.getDatabase(process.env.NODE_ENV).forceSync) {
            let seeds = [];
            await sequelize.sync({force: settings.getDatabase(process.env.NODE_ENV).forceSync}).then(() => {
                fs.readdirSync(path.resolve(`${appDir}/dao/seeds`)).forEach(function (file) {
                    if (path.extname(file) === ".js") {
                        let ff = file.replace('.js', '');
                        let seed = require(`${appDir}/dao/seeds/${ff}`);
                        if (seed) {
                            seeds.push(seed);
                        }
                    }
                });
            });
            for (let seed of seeds) {
                await seed.seedValue();
            }
        }*/

        /**
         * Registering plugins
         */
        const swagger = new Swagger();
        await swagger.register(server,  settings.getServerInfo(process.env.NODE_ENV));


        /**
         * Modules
         */
        fs.readdirSync(path.resolve(`${appDir}/app`)).forEach( folder => {
            console.log(path.resolve(`${appDir}/app/${folder}`));
            require(path.resolve(`${appDir}/app/${folder}`)).init(server, settings.getServerInfo(process.env.NODE_ENV), sequelize);
        });


        try {
            await server.register({
                plugin: require('hapi-cors'),
                options: {
                    origins: [
                        'http://localhost:3000',
                    ],
                    methods: ['POST, GET, PUT, DELETE, OPTIONS'],
                    headers: ['Accept', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
                }
            });

            await server.start();
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
        return server;
    }
}
