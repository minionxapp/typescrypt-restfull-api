"use strict";
//CREATE validation Group-validation.ts
//CREATE validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupValidation = void 0;
const zod_1 = require("zod");
class GroupValidation {
}
exports.GroupValidation = GroupValidation;
GroupValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional(),
    pic: zod_1.z.string().max(250).optional(),
    status: zod_1.z.string().min(1).max(3),
});
//UPDATE validation
GroupValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().max(250).optional(),
    pic: zod_1.z.string().max(250).optional(),
    status: zod_1.z.string().min(1).max(3),
});
//SEARCH validation
GroupValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().optional(),
    pic: zod_1.z.string().optional(),
    status: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
