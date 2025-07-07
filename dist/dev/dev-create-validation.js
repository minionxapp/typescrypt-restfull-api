"use strict";
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
exports.DevCreateValidation = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateValidation {
    static createValidation(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let validatex = "\n//CREATE validation " + tableName + "-validation.ts\n";
            validatex = validatex + '\nimport { z, ZodType } from "zod"; \n\n';
            validatex = validatex + 'export class ' + tableName + 'Validation {\n';
            validatex = validatex + 'static readonly CREATE: ZodType = z.object({\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n';
                    else
                        validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n';
                }
                if (element.type == 'Number') {
                    validatex = validatex + element.name + ': z.number().min(1).positive(),';
                }
            }
            validatex = validatex + '})\n\n';
            //Update validation
            validatex = validatex + "//UPDATE validation\n";
            validatex = validatex + 'static readonly UPDATE: ZodType = z.object({\nid: z.number().positive(),\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n';
                    else
                        validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n';
                }
                if (element.type == 'Number') {
                    validatex = validatex + element.name + ': z.number().min(1).positive(),';
                }
            }
            validatex = validatex + '})\n\n';
            //Search validation
            validatex = validatex + "//SEARCH validation\n";
            validatex = validatex + 'static readonly SEARCH: ZodType = z.object({\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        //z.string().min(1).optional(),
                        validatex = validatex + element.name + ': z.string().min(1).optional()' + ',\n';
                    else
                        validatex = validatex + element.name + ': z.string()' + '.optional(),\n';
                }
                if (element.type == 'Number') {
                    // validatex = validatex + element.name + ': z.number().min(1).positive(),\n'
                }
            }
            validatex = validatex + 'page : z.number().min(1).positive(),\n' +
                'size : z.number().min(1).max(100).positive()\n';
            validatex = validatex + '})\n}\n';
            // console.log(validatex)
            return validatex;
        });
    }
}
exports.DevCreateValidation = DevCreateValidation;
