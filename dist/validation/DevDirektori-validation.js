"use strict";
//CREATE validation DevDirektori-validation.ts
//CREATE validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevDirektoriValidation = void 0;
const zod_1 = require("zod");
class DevDirektoriValidation {
}
exports.DevDirektoriValidation = DevDirektoriValidation;
DevDirektoriValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(1).max(100),
    direktori: zod_1.z.string().max(250).optional(),
});
//UPDATE validation
DevDirektoriValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    username: zod_1.z.string().min(1).max(100),
    direktori: zod_1.z.string().max(250).optional(),
});
//SEARCH validation
DevDirektoriValidation.SEARCH = zod_1.z.object({
    username: zod_1.z.string().min(1).optional(),
    direktori: zod_1.z.string().optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
