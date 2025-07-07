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
exports.DevTableKolomService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const DevTableKolom_model_1 = require("../model/DevTableKolom-model");
const DevTableKolom_validation_1 = require("../validation/DevTableKolom-validation");
const validation_1 = require("../validation/validation");
class DevTableKolomService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(DevTableKolom_validation_1.DevTableKolomValidation.CREATE, request);
            console.log("=======create service=========");
            console.log(createRequest);
            console.log("================");
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const devTableKolom = yield database_1.prismaClient.devTableKolom.create({
                data: record
            });
            return (0, DevTableKolom_model_1.toDevTableKolomResponse)(devTableKolom);
        });
    }
    // CEK EXIST
    //function untuk getDevTableKolom biar bisa dipakai berulang
    static checkDevTableKolomMustexist(devTableKolomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const devTableKolom = yield database_1.prismaClient.devTableKolom.findFirst({
                where: {
                    id: devTableKolomId,
                }
            });
            if (!devTableKolom) {
                throw new response_error_1.ResponseError(404, "DevTableKolom not found");
            }
            return devTableKolom;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const devTableKolom = yield this.checkDevTableKolomMustexist(id);
            return (0, DevTableKolom_model_1.toDevTableKolomResponse)(devTableKolom);
        });
    }
    static getTableId(user, devTableKolomTableId) {
        return __awaiter(this, void 0, void 0, function* () {
            const devTableKoloms = yield database_1.prismaClient.devTableKolom.findMany({
                where: {
                    table_id: devTableKolomTableId,
                }
            });
            if (!devTableKoloms) {
                throw new response_error_1.ResponseError(404, "DevTableKolom not found");
            }
            // return toDevTableKolomResponse(devTableKolom)
            return devTableKoloms.map(devTableKoloms => (0, DevTableKolom_model_1.toDevTableKolomResponse)(devTableKoloms));
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(DevTableKolom_validation_1.DevTableKolomValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek DevTableKolom ada atau tidak
            yield this.checkDevTableKolomMustexist(request.id);
            const devTableKolom = yield database_1.prismaClient.devTableKolom.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, DevTableKolom_model_1.toDevTableKolomResponse)(devTableKolom);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDevTableKolomMustexist(id);
            const devTableKolom = yield database_1.prismaClient.devTableKolom.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return devTableKolom;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(DevTableKolom_validation_1.DevTableKolomValidation.SEARCH, request);
            // console.log(searchRequest)
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
            //  if (searchRequest.table_id) {
            //     filters.push({
            //         table_id: {
            //             contains: searchRequest.table_id
            //         }
            //     })
            // }
            // check if table_name exists
            if (searchRequest.table_name) {
                filters.push({
                    table_name: {
                        contains: searchRequest.table_name
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
            // check if is_id exists
            if (searchRequest.is_id) {
                filters.push({
                    is_id: {
                        contains: searchRequest.is_id
                    }
                });
            }
            // check if is_null exists
            if (searchRequest.is_null) {
                filters.push({
                    is_null: {
                        contains: searchRequest.is_null
                    }
                });
            }
            // check if is_uniq exists
            if (searchRequest.is_uniq) {
                filters.push({
                    is_uniq: {
                        contains: searchRequest.is_uniq
                    }
                });
            }
            // check if default exists
            if (searchRequest.default) {
                filters.push({
                    default: {
                        contains: searchRequest.default
                    }
                });
            }
            // check if type exists
            if (searchRequest.type) {
                filters.push({
                    type: {
                        contains: searchRequest.type
                    }
                });
            }
            const devTableKoloms = yield database_1.prismaClient.devTableKolom.findMany({
                where: {
                    // username: user.username,
                    table_id: searchRequest.table_id,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.devTableKolom.count({
                where: {
                    table_id: searchRequest.table_id,
                    AND: filters
                },
            });
            return {
                data: devTableKoloms.map(devTableKolom => (0, DevTableKolom_model_1.toDevTableKolomResponse)(devTableKolom)),
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
exports.DevTableKolomService = DevTableKolomService;
