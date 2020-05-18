/**
 *  * Created by Wilton O. Ferreira on 16/05/2020
 */

import * as Hapi from "@hapi/hapi";
import * as fs from 'fs';

let writeStream = fs.createWriteStream('log/output.log');

export  class Logger {
    async register(server: Hapi.Server) {
        let plugins = [
            {
                plugin : require('hapi-pino'),
                options  : {
                    stream : writeStream,
                    logEvents: ['request-error'],
                }
            }
        ];
        server.register(plugins);

    }
}