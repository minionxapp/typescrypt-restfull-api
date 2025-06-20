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
exports.ProjectService = void 0;
//utuk coba--> disesuaikan dulu
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const project_model_1 = require("../coba/project-model");
const project_validation_1 = require("../coba/project-validation");
const validation_1 = require("../validation/validation");
class ProjectService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(project_validation_1.ProjectValidation.CREATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const project = yield database_1.prismaClient.project.create({
                data: record
            });
            return (0, project_model_1.toProjectResponse)(project);
        });
    }
    // CEK EXIST
    //function untuk getProject biar bisa dipakai berulang
    static checkProjectMustexist(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield database_1.prismaClient.project.findFirst({
                where: {
                    id: projectId,
                }
            });
            if (!project) {
                throw new response_error_1.ResponseError(404, "Project not found");
            }
            return project;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.checkProjectMustexist(id);
            return (0, project_model_1.toProjectResponse)(project);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(project_validation_1.ProjectValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { create_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Project ada atau tidak
            yield this.checkProjectMustexist(request.id);
            const project = yield database_1.prismaClient.project.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, project_model_1.toProjectResponse)(project);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkProjectMustexist(id);
            const project = yield database_1.prismaClient.project.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return project;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(project_validation_1.ProjectValidation.SEARCH, request);
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
            const projects = yield database_1.prismaClient.project.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.project.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: projects.map(project => (0, project_model_1.toProjectResponse)(project)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
}
exports.ProjectService = ProjectService;
