/**
 *  * Created by Wilton O. Ferreira on 14/05/2020
 */
import * as Hapi from "@hapi/hapi";
import { IServerSettings } from "../../../setting/index";
import { Sequelize } from "sequelize";
import {EquipmentController} from "../controller/EquipmentController";
import {EquipmentFacade} from "../facade/EquipmentFacade";
import {EquipmentValidator} from "../validator/EquipmentValidator";

export default function (server: Hapi.server, settings: IServerSettings, sequelize: Sequelize) {

    const facade = new EquipmentFacade(settings, sequelize, EquipmentController.getInstance(settings, sequelize));
    server.bind(facade);

    server.route({
        method: 'POST',
        path: '/equipment/create',
        options: {
            handler: facade.create,
            auth: false,
            tags: ['api', "equipment"], // ADD THIS TAG
            description: 'Criar cadastro de equipamento',
            validate: {
                headers: EquipmentValidator.autorization,
                payload: EquipmentValidator.equipment
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
                schema: EquipmentValidator.responsePostPutAndDelete
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/equipment/update/{id}',
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
            description: 'Atualizar cadastro de equipamento',
            notes: 'Serviço para cadastro de equipamento',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: EquipmentValidator.autorization,
                params:  EquipmentValidator.byId,
                payload: EquipmentValidator.equipment
            },
            handler: facade.update
        }
    });

    server.route({
        method: 'GET',
        path: '/equipment/find/{id}',
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
                schema: EquipmentValidator.equipmentFindById
            },
            description: 'Localizar cadastro de equipamento por id',
            notes: 'Serviço para localizar cadastro de equipamento por id',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: EquipmentValidator.autorization,
                params: EquipmentValidator.byId
            },
            handler: facade.findById
        }
    });

    server.route({
        method: 'GET',
        path: '/equipment/list',
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
                schema: EquipmentValidator.equipments
            },
            description: 'Listar todos os cadastros de equipamento',
            notes: 'Serviço para listar todos os cadastros de equipamento',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: EquipmentValidator.autorization,
                query: EquipmentValidator.paginationInput
            },
            handler: facade.list
        }
    });

    server.route({
        method: 'DELETE',
        path: '/equipment/delete/{id}',
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
            description: 'Apagar cadastro de equipamento por id',
            notes: 'Serviço para apagar cadastro de equipamento por id',
            tags: ['api'], // ADD THIS TAG
            validate: {
                headers: EquipmentValidator.autorization,
                params: EquipmentValidator.byId
            },
            handler: facade.delete
        }
    });

}