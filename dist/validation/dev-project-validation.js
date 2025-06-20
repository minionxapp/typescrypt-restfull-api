"use strict";
//CREATE validation Dev_project-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dev_projectValidation = void 0;
//CREATE validation
const zod_1 = require("zod");
class Dev_projectValidation {
}
exports.Dev_projectValidation = Dev_projectValidation;
Dev_projectValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
});
//UPDATE validation
Dev_projectValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
});
//SEARCH validation
Dev_projectValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
