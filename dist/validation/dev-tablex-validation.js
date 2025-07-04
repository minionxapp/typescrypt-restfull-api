"use strict";
//CREATE validation Dev_tablex-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dev_tablexValidation = void 0;
//CREATE validation
const zod_1 = require("zod");
class Dev_tablexValidation {
}
exports.Dev_tablexValidation = Dev_tablexValidation;
Dev_tablexValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    project_id: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
Dev_tablexValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    project_id: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
Dev_tablexValidation.SEARCH = zod_1.z.object({
    project_id: zod_1.z.number().min(1).positive(),
    name: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
