"use strict";
//Create Service 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dev_projectService = void 0;
//utuk coba--> disesuaikan dulu
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const dev_project_model_1 = require("../model/dev-project-model");
const dev_project_validation_1 = require("../validation/dev-project-validation");
const validation_1 = require("../validation/validation");
class Dev_projectService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(dev_project_validation_1.Dev_projectValidation.CREATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const dev_project = yield database_1.prismaClient.dev_project.create({
                data: record
            });
            return (0, dev_project_model_1.toDev_projectResponse)(dev_project);
        });
    }
    // CEK EXIST
    //function untuk getDev_project biar bisa dipakai berulang
    static checkDev_projectMustexist(dev_projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dev_project = yield database_1.prismaClient.dev_project.findFirst({
                where: {
                    id: dev_projectId,
                }
            });
            if (!dev_project) {
                throw new response_error_1.ResponseError(404, "Dev_project not found");
            }
            return dev_project;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dev_project = yield this.checkDev_projectMustexist(id);
            return (0, dev_project_model_1.toDev_projectResponse)(dev_project);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(dev_project_validation_1.Dev_projectValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Dev_project ada atau tidak
            yield this.checkDev_projectMustexist(request.id);
            const dev_project = yield database_1.prismaClient.dev_project.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, dev_project_model_1.toDev_projectResponse)(dev_project);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDev_projectMustexist(id);
            const dev_project = yield database_1.prismaClient.dev_project.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return dev_project;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(dev_project_validation_1.Dev_projectValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if name exists
            if (searchRequest.name) {
                filters.push({
                    name: {
                        contains: searchRequest.name
                    }
                });
            }
            // check if desc exists
            if (searchRequest.desc) {
                filters.push({
                    desc: {
                        contains: searchRequest.desc
                    }
                });
            }
            const dev_projects = yield database_1.prismaClient.dev_project.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.dev_project.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: dev_projects.map(dev_project => (0, dev_project_model_1.toDev_projectResponse)(dev_project)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                    total_rows: total
                }
            };
        });
    }
}
exports.Dev_projectService = Dev_projectService;
