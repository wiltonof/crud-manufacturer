/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as nconf from "nconf";
import * as path from "path";

const settings = nconf.file(path.join(__dirname, './settings.json'));

export interface IEnvironment {
    projectName: string;
    version: string;
    database: IDatabaseSetting;
    server: IServerSettings;
}

export interface IServerSettings {
    port: number;
    plugins: Array<string>;
    jwtSecret: string;
    jwtExpiration: string;
    host: string;
    routePrefix: string;
    uploadPath: string;
    hostSwagger: string;
    scheme: string;
}

export interface IDatabaseSetting {
    dialect: string;
    storage: string;
    forceSync: boolean;
}

export function getSettings(env?: string): IEnvironment {
    return settings.get(env || 'dev');
}

export function getProjectName(): string {
    return settings.get('projectName');
}

export function getVersion(): string {
    return settings.get('version');
}

export function getDatabase(env?: string): IDatabaseSetting {
    return settings.get(env || 'dev').database;
}

export function getServerInfo(env?: string): IServerSettings {
    return settings.get(env || 'dev').server;
}
