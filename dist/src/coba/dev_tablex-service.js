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
exports.Dev_tablexService = void 0;
//utuk coba--> disesuaikan dulu
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const dev_tablex_model_1 = require("../coba/dev_tablex-model");
const dev_tablex_validation_1 = require("../coba/dev_tablex-validation");
const validation_1 = require("../validation/validation");
class Dev_tablexService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(dev_tablex_validation_1.Dev_tablexValidation.CREATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const dev_tablex = yield database_1.prismaClient.dev_tablex.create({
                data: record
            });
            return (0, dev_tablex_model_1.toDev_tablexResponse)(dev_tablex);
        });
    }
    // CEK EXIST
    //function untuk getDev_tablex biar bisa dipakai berulang
    static checkDev_tablexMustexist(dev_tablexId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dev_tablex = yield database_1.prismaClient.dev_tablex.findFirst({
                where: {
                    id: dev_tablexId,
                }
            });
            if (!dev_tablex) {
                throw new response_error_1.ResponseError(404, "Dev_tablex not found");
            }
            return dev_tablex;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dev_tablex = yield this.checkDev_tablexMustexist(id);
            return (0, dev_tablex_model_1.toDev_tablexResponse)(dev_tablex);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(dev_tablex_validation_1.Dev_tablexValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Dev_tablex ada atau tidak
            yield this.checkDev_tablexMustexist(request.id);
            const dev_tablex = yield database_1.prismaClient.dev_tablex.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, dev_tablex_model_1.toDev_tablexResponse)(dev_tablex);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDev_tablexMustexist(id);
            const dev_tablex = yield database_1.prismaClient.dev_tablex.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return dev_tablex;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(dev_tablex_validation_1.Dev_tablexValidation.SEARCH, request);
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
            const dev_tablexs = yield database_1.prismaClient.dev_tablex.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.dev_tablex.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: dev_tablexs.map(dev_tablex => (0, dev_tablex_model_1.toDev_tablexResponse)(dev_tablex)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size
                }
            };
        });
    }
}
exports.Dev_tablexService = Dev_tablexService;
