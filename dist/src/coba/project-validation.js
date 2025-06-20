"use strict";
//CREATE validation Project-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectValidation = void 0;
//CREATE validation
const zod_1 = require("zod");
class ProjectValidation {
}
exports.ProjectValidation = ProjectValidation;
ProjectValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    project_id: zod_1.z.number().min(1).positive(),
});
//UPDATE validation
ProjectValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1).max(100),
    desc: zod_1.z.string().min(1).max(100),
    project_id: zod_1.z.number().min(1).positive(),
});
//SEARCH validation
ProjectValidation.SEARCH = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    desc: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
