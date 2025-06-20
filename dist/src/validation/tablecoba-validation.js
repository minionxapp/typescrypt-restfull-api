"use strict";
//CREATE validation Tablecoba-validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablecobaValidation = void 0;
//CREATE validation
const zod_1 = require("zod");
class TablecobaValidation {
}
exports.TablecobaValidation = TablecobaValidation;
TablecobaValidation.CREATE = zod_1.z.object({
    first_name: zod_1.z.string().min(1).max(100),
    last_name: zod_1.z.string().max(100).optional(),
    email: zod_1.z.string().min(1).max(100),
    phone: zod_1.z.string().max(20).optional(),
    address: zod_1.z.string().max(20).optional(),
    username: zod_1.z.string().min(1).max(20),
});
//UPDATE validation
TablecobaValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    first_name: zod_1.z.string().min(1).max(100),
    last_name: zod_1.z.string().max(100).optional(),
    email: zod_1.z.string().min(1).max(100),
    phone: zod_1.z.string().max(20).optional(),
    address: zod_1.z.string().max(20).optional(),
    username: zod_1.z.string().min(1).max(20),
});
//SEARCH validation
TablecobaValidation.SEARCH = zod_1.z.object({
    first_name: zod_1.z.string().min(1).optional(),
    last_name: zod_1.z.string().optional(),
    email: zod_1.z.string().min(1).optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    username: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive()
});
