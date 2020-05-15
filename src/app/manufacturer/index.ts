/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import {IServerSettings} from "../../setting/index";
import {Sequelize} from "sequelize";
import ManufacturerRoutes from "./routes/ManufacturerRoutes";

export function init(server: Hapi.Server, settings: IServerSettings, database: Sequelize) {
    ManufacturerRoutes(server, settings, database);
}
