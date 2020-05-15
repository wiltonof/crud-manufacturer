/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import * as Path from 'path';
import {IServerSettings} from "../../setting";


var appDir              = Path.dirname(require.main.filename);

export class View {
    private settings: IServerSettings;

    constructor(settings: IServerSettings) {
        this.settings = settings;
        console.log('Path:', Path.resolve(`${appDir}/`));
    }

    async register(server: Hapi.Server) {

        const today = new Date();

        const internals = {
            templatePath: 'basic',
            thisYear: today.getFullYear()
        };

        // await server.register(Vision);





        server.route([
            /*   {
                   method: 'GET',
                   path: '/{assetpath*}',
                   options: {
                       auth: false
                   },
                   handler: {
                       directory: {
                           path: './public'
                       }
                   }
               },*/
            {
                method: 'GET',
                path: '/css/{assetpath*}',
                options: {
                    auth: false
                },
                handler: {
                    directory: {
                        path: Path.resolve(`${appDir}/public/css`)
                    }
                }
            },
            {
                method: 'GET',
                path: '/img/{assetpath*}',
                options: {
                    auth: false
                },
                handler: {
                    directory: {
                        path: Path.resolve(`${appDir}/public/img`)
                    }
                }
            },
            {
                method: 'GET',
                path: '/js/{assetpath*}',
                options: {
                    auth: false
                },
                handler: {
                    directory: {
                        path: Path.resolve(`${appDir}/public/js`)
                    }
                }
            },
            {
                method: 'GET',
                path: '/vendor/{assetpath*}',
                options: {
                    auth: false
                },
                handler: {
                    directory: {
                        path: Path.resolve(`${appDir}/public/vendor`)
                    }
                }
            }
        ]);

    }
}
