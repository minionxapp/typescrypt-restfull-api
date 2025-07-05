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
exports.DevDirektoriService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const DevDirektori_model_1 = require("../model/DevDirektori-model");
const DevDirektori_validation_1 = require("../validation/DevDirektori-validation");
const validation_1 = require("../validation/validation");
class DevDirektoriService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(DevDirektori_validation_1.DevDirektoriValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            const totalusernameUniq = yield database_1.prismaClient.devDirektori.count({
                where: {
                    username: createRequest.username
                }
            });
            if (totalusernameUniq != 0) {
                throw new response_error_1.ResponseError(400, "username already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const devDirektori = yield database_1.prismaClient.devDirektori.create({
                data: record
            });
            return (0, DevDirektori_model_1.toDevDirektoriResponse)(devDirektori);
        });
    }
    // CEK EXIST
    //function untuk getDevDirektori biar bisa dipakai berulang
    static checkDevDirektoriMustexist(devDirektoriId) {
        return __awaiter(this, void 0, void 0, function* () {
            const devDirektori = yield database_1.prismaClient.devDirektori.findFirst({
                where: {
                    id: devDirektoriId,
                }
            });
            if (!devDirektori) {
                throw new response_error_1.ResponseError(404, "DevDirektori not found");
            }
            return devDirektori;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const devDirektori = yield this.checkDevDirektoriMustexist(id);
            return (0, DevDirektori_model_1.toDevDirektoriResponse)(devDirektori);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(DevDirektori_validation_1.DevDirektoriValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek DevDirektori ada atau tidak
            yield this.checkDevDirektoriMustexist(request.id);
            const devDirektori = yield database_1.prismaClient.devDirektori.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, DevDirektori_model_1.toDevDirektoriResponse)(devDirektori);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDevDirektoriMustexist(id);
            const devDirektori = yield database_1.prismaClient.devDirektori.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return devDirektori;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(DevDirektori_validation_1.DevDirektoriValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = [];
            // check if name exists
            // check if username exists
            if (searchRequest.username) {
                filters.push({
                    username: {
                        contains: searchRequest.username
                    }
                });
            }
            // check if direktori exists
            if (searchRequest.direktori) {
                filters.push({
                    direktori: {
                        contains: searchRequest.direktori
                    }
                });
            }
            const devDirektoris = yield database_1.prismaClient.devDirektori.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.devDirektori.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: devDirektoris.map(devDirektori => (0, DevDirektori_model_1.toDevDirektoriResponse)(devDirektori)),
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
exports.DevDirektoriService = DevDirektoriService;
