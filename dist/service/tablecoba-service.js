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
exports.TablecobaService = void 0;
//utuk coba--> disesuaikan dulu
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const tablecoba_model_1 = require("../model/tablecoba-model");
const tablecoba_validation_1 = require("../validation/tablecoba-validation");
const validation_1 = require("../validation/validation");
class TablecobaService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(tablecoba_validation_1.TablecobaValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { username: user.name } //tambahkan username, dengan value dari object user
            );
            const tablecoba = yield database_1.prismaClient.tablecoba.create({
                data: record
            });
            return (0, tablecoba_model_1.toTablecobaResponse)(tablecoba);
        });
    }
    // CEK EXIST
    //function untuk getTablecoba biar bisa dipakai berulang
    static checkTablecobaMustexist(tablecobaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tablecoba = yield database_1.prismaClient.tablecoba.findFirst({
                where: {
                    id: tablecobaId,
                }
            });
            if (!tablecoba) {
                throw new response_error_1.ResponseError(404, "Contact not found");
            }
            return tablecoba;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tablecoba = yield this.checkTablecobaMustexist(id);
            return (0, tablecoba_model_1.toTablecobaResponse)(tablecoba);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(tablecoba_validation_1.TablecobaValidation.UPDATE, request);
            //cek Tablecoba ada atau tidak
            yield this.checkTablecobaMustexist(request.id);
            const tablecoba = yield database_1.prismaClient.tablecoba.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, tablecoba_model_1.toTablecobaResponse)(tablecoba);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkTablecobaMustexist(id);
            const tablecoba = yield database_1.prismaClient.tablecoba.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return tablecoba;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(tablecoba_validation_1.TablecobaValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if first_name exists
            if (searchRequest.first_name) {
                filters.push({
                    first_name: {
                        contains: searchRequest.first_name
                    }
                });
            }
            // check if last_name exists
            if (searchRequest.last_name) {
                filters.push({
                    last_name: {
                        contains: searchRequest.last_name
                    }
                });
            }
            // check if email exists
            if (searchRequest.email) {
                filters.push({
                    email: {
                        contains: searchRequest.email
                    }
                });
            }
            // check if phone exists
            if (searchRequest.phone) {
                filters.push({
                    phone: {
                        contains: searchRequest.phone
                    }
                });
            }
            // check if address exists
            if (searchRequest.address) {
                filters.push({
                    address: {
                        contains: searchRequest.address
                    }
                });
            }
            // check if username exists
            if (searchRequest.username) {
                filters.push({
                    username: {
                        contains: searchRequest.username
                    }
                });
            }
            const tablecobas = yield database_1.prismaClient.tablecoba.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.tablecoba.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: tablecobas.map(tablecoba => (0, tablecoba_model_1.toTablecobaResponse)(tablecoba)),
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
exports.TablecobaService = TablecobaService;
