/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */

import * as Hapi from "@hapi/hapi";
import { IServerSettings } from "../../../setting/index";
import { Sequelize } from "sequelize";
import {ManufacturerController} from "../controller/ManufacturerController";
import {ManufacturerFacade} from "../facade/ManufacturerFacade";
import {ManufacturerValidator} from "../validator/ManufacturerValidator";

export default function (server: Hapi.server, settings: IServerSettings, sequelize: Sequelize) {

    const facade = new ManufacturerFacade(settings, sequelize, ManufacturerController.getInstance(settings, sequelize));
    server.bind(facade);

    server.route({
        method: 'POST',
        path: '/manufacturer/create',
        options: {
            handler: facade.create,
            auth: false,
            tags: ['api', "manufacturer"], // ADD THIS TAG
            description: 'Criar cadastro de fabricante',
            validate: {
//                headers: ManufacturerValidator.autorization,
                payload: ManufacturerValidator.manufacturer
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {
                            description: 'BadRequest'
                        }
                    }
                }
            },
            response: {
                schema: ManufacturerValidator.responsePostPutAndDelete
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/manufacturer/update/{id}',
        config: {
            auth: false,
            plugins: {
                'hapiAuthorization': {
                    roles: ['UPDATE_ADDRESS']
                },
                'hapi-swagger': {
                    responses: {
                        '400': {
                            'description': 'BadRequest'
                        }
                    }
                }
            },
            description: 'Atualizar cadastro de fabricante',
            notes: 'Serviço para cadastro de fabricante',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: ManufacturerValidator.autorization,
                params:  ManufacturerValidator.byId,
                payload: ManufacturerValidator.manufacturer
            },
            handler: facade.update
        }
    });

    server.route({
        method: 'GET',
        path: '/manufacturer/find/{id}',
        config: {
            auth: false,
            plugins: {
                'hapiAuthorization': {
                    roles: ['VIEW_ADDRESS']
                },
                'hapi-swagger': {
                    responses: {
                        '400': {
                            'description': 'BadRequest'
                        }
                    }
                }
            },
            response: {
                schema: ManufacturerValidator.manufacturerFindById
            },
            description: 'Localizar cadastro de fabricante por id',
            notes: 'Serviço para localizar cadastro de fabricante por id',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: ManufacturerValidator.autorization,
                params: ManufacturerValidator.byId
            },
            handler: facade.findById
        }
    });

    server.route({
        method: 'GET',
        path: '/manufacturer/list',
        config: {
            auth: false,
            plugins: {
                'hapiAuthorization': {
                    roles: ['VIEW_ADDRESS']
                },
                'hapi-swagger': {
                    responses: {
                        '400': {
                            'description': 'BadRequest'
                        }
                    }
                }
            },
            response: {
                schema: ManufacturerValidator.manufacturers
            },
            description: 'Listar todos os cadastros de fabricante',
            notes: 'Serviço para listar todos os cadastros de fabricante',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: ManufacturerValidator.autorization,
                query: ManufacturerValidator.paginationInput
            },
            handler: facade.list
        }
    });

    server.route({
        method: 'DELETE',
        path: '/manufacturer/delete/{id}',
        config: {
            auth: false,
            plugins: {
                'hapiAuthorization': {
                    roles: ['DELETE_ADDRESS']
                },
                'hapi-swagger': {
                    responses: {
                        '400': {
                            'description': 'BadRequest'
                        }
                    }
                }
            },
            description: 'Apagar cadastro de fabricante por id',
            notes: 'Serviço para apagar cadastro de fabricante por id',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: ManufacturerValidator.autorization,
                params: ManufacturerValidator.byId
            },
            handler: facade.delete
        }
    });

}