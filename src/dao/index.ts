/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import { Sequelize } from 'sequelize-typescript';
import * as path from 'path';
import * as settings from "../setting";
import * as fs from 'fs';

var appDir = path.dirname(require.main.filename);



var Paths = new Array();
fs.readdirSync(path.resolve(`${appDir}/app`)).forEach( folder => {
    console.log(path.resolve(`${appDir}/app/${folder}/model/`));
    Paths.push(path.resolve(`${appDir}/app/${folder}/model/`));
});

const databaseInfo = settings.getDatabase(process.env.NODE_ENV);

// @ts-ignore
export const sequelize =  new Sequelize({
    dialect: databaseInfo.dialect,
    storage: databaseInfo.storage
});

