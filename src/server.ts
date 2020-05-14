/**
 * Created by Wilton O. Ferreira on 14/05/2020
 */
import * as Hapi from 'hapi';

import * as settings from "./setting";
import {Swagger} from './plugins/swagger';
import { sequelize } from './dao/index';
import fs from "fs";
import path from "path";

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
            port: settings.getSettings(process.env.NODE_ENV).server.port,
            routes: {cors: {origin: ['http://localhost:3000']}}
        });
        if (settings.getDatabase(process.env.NODE_ENV).forceSync) {
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
        }

        /**
         * Registering plugins
         */
        const swagger = new Swagger();
        await swagger.register(server,  settings.getServerInfo(process.env.NODE_ENV));
    }



}
