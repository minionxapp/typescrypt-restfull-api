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
exports.GroupService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const Group_model_1 = require("../model/Group-model");
const Group_validation_1 = require("../validation/Group-validation");
const validation_1 = require("../validation/validation");
class GroupService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(Group_validation_1.GroupValidation.CREATE, request);
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            const totalnameUniq = yield database_1.prismaClient.group.count({
                where: {
                    name: createRequest.name
                }
            });
            if (totalnameUniq != 0) {
                throw new response_error_1.ResponseError(400, "name already axist");
            }
            const record = Object.assign(Object.assign(Object.assign({}, createRequest), { create_by: user.name }), { create_at: new Date() }); //tambahkan username, dengan value dari object user}
            const group = yield database_1.prismaClient.group.create({
                data: record
            });
            return (0, Group_model_1.toGroupResponse)(group);
        });
    }
    // CEK EXIST
    //function untuk getGroup biar bisa dipakai berulang
    static checkGroupMustexist(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield database_1.prismaClient.group.findFirst({
                where: {
                    id: groupId,
                }
            });
            if (!group) {
                throw new response_error_1.ResponseError(404, "Group not found");
            }
            return group;
        });
    }
    // GET
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.checkGroupMustexist(id);
            return (0, Group_model_1.toGroupResponse)(group);
        });
    }
    // UPDATE
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(Group_validation_1.GroupValidation.UPDATE, request);
            const record = Object.assign(Object.assign(Object.assign({}, updateRequest), { update_by: user.name }), { update_at: new Date() } //tambahkan username, dengan value dari object user
            );
            //cek Group ada atau tidak
            yield this.checkGroupMustexist(request.id);
            const group = yield database_1.prismaClient.group.update({
                where: {
                    id: updateRequest.id,
                    //     username: user.username
                },
                data: updateRequest
            });
            return (0, Group_model_1.toGroupResponse)(group);
        });
    }
    //REMOVE 
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkGroupMustexist(id);
            const group = yield database_1.prismaClient.group.delete({
                where: {
                    id: id,
                    //username: user.username
                }
            });
            return group;
        });
    }
    //SEARCH 
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(Group_validation_1.GroupValidation.SEARCH, request);
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
            // check if pic exists
            if (searchRequest.pic) {
                filters.push({
                    pic: {
                        contains: searchRequest.pic
                    }
                });
            }
            // check if status exists
            if (searchRequest.status) {
                filters.push({
                    status: {
                        contains: searchRequest.status
                    }
                });
            }
            const groups = yield database_1.prismaClient.group.findMany({
                where: {
                    // username: user.username,
                    AND: filters
                },
                take: searchRequest.size,
                skip: skip
            });
            const total = yield database_1.prismaClient.group.count({
                where: {
                    //username: user.username,
                    AND: filters
                },
            });
            return {
                data: groups.map(group => (0, Group_model_1.toGroupResponse)(group)),
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
exports.GroupService = GroupService;
