"use strict";
//CREATE validation DevTableKolom-validation.ts
//CREATE validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevTableKolomValidation = void 0;
const zod_1 = require("zod");
class DevTableKolomValidation {
}
exports.DevTableKolomValidation = DevTableKolomValidation;
DevTableKolomValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    table_id: zod_1.z.number().min(1).positive(),
    table_name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    length: zod_1.z.number().min(1).positive(),
    is_id: zod_1.z.string().min(1).max(100),
    is_null: zod_1.z.string().min(1).max(100),
    is_uniq: zod_1.z.string().min(1).max(100),
    default: zod_1.z.string().min(1).max(100),
    type: zod_1.z.string().min(1).max(100),
});
//UPDATE validation
DevTableKolomValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    table_id: zod_1.z.number().min(1).positive(), table_name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    length: zod_1.z.number().min(1).positive(), is_id: zod_1.z.string().min(1).max(100),
    is_null: zod_1.z.string().min(1).max(100),
    is_uniq: zod_1.z.string().min(1).max(100),
    default: zod_1.z.string().min(1).max(100),
    type: zod_1.z.string().min(1).max(100),
});
//SEARCH validation
DevTableKolomValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    table_name: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().min(1).optional(),
    is_id: zod_1.z.string().min(1).optional(),
    is_null: zod_1.z.string().min(1).optional(),
    is_uniq: zod_1.z.string().min(1).optional(),
    default: zod_1.z.string().min(1).optional(),
    table_id: zod_1.z.number().min(1).optional(),
    type: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
