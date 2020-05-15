/**
 * Created by Wilton O. Ferreira on 14/05/2020
 */


import {Server} from "./server";
import * as Dotenv from "dotenv";
Dotenv.config();

new Server();

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});