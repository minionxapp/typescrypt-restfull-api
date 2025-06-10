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
exports.DevService = void 0;
const database_1 = require("../application/database");
const dev_model_1 = require("../dev/dev-model");
const util_1 = require("../util/util");
class DevService {
    static getColoumn(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.devTableColumn.findMany({
                where: {
                    table_id: tabelId
                }
            });
            return result;
        });
    }
    static getTable(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.devTable.findFirst({
                where: {
                    id: tabelId
                }
            });
            return (0, dev_model_1.toDevTableResponse)(result);
        });
    }
    static createSchema(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield this.getColoumn(tabelId);
            // console.log(columns)
            let model = "//Screate Schema";
            model = model + 'model ' + tableName + ' {\n';
            model = model + 'id         Int    @id @default(autoincrement())\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                model = model + element.name;
                if (element.type == 'Varchar') {
                    model = model + " String @db.VarChar" + '(' + element.length + ')\n';
                }
                if (element.type == 'Number') {
                    model = model + " Int \n";
                }
            }
            model = model + '@@map("' + (tableName.toLocaleLowerCase()) + 's")\n';
            model = model + "}\n";
            // console.log(model)
            return model;
        });
    }
    static createModel(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield this.getColoumn(tabelId);
            //tabelResponse
            let model = '//CreateModel\n';
            model = model + "import { " + tableName + " } from '@prisma/client'\n";
            model = model + 'export type ' + tableName + 'Response = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    model = model + element.name + "?: string | null," + "\n";
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //createRequest
            model = model + '//CreateXxxxxxRequest\n';
            model = model + 'export type Create' + tableName + 'Request = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    model = model + element.name + "?: string | null," + "\n";
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //updateRequest
            model = model + '//UpdateXxxxxxRequest\n';
            model = model + 'export type Update' + tableName + 'Request = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    model = model + element.name + "?: string | null," + "\n";
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //SearchRequest
            model = model + '//SearchXxxxxxRequest\n';
            model = model + 'export type Search' + tableName + 'Request = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    model = model + element.name + "?: string | null," + "\n";
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "page : number," + "\n";
            model = model + "size : number," + "\n";
            model = model + "}\n\n";
            // //toXxxxxResponse
            model = model + 'export function to' + tableName + 'Response(' + tableName.toLocaleLowerCase() + ': ' + tableName + '): ' + tableName + 'Response {\n';
            model = model + 'return { \n';
            model = model + 'id: ' + tableName.toLocaleLowerCase() + '.id\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                model = model + element.name + ':' + tableName.toLocaleLowerCase() + '.' + element.name + ',\n';
            }
            model = model + "}\n";
            model = model + "}\n\n";
            console.log(model);
            return model;
        });
    }
    //Validation
    //create validation
    static createValidation(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield this.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield this.getColoumn(tabelId);
            let validate = "//CREATE validation";
            validate = validate + '\nimport { z, ZodType } from "zod"; \n\n';
            validate = validate + 'static readonly CREATE: ZodType = z.object({\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        validate = validate + element.name + ': z.string().min(1).max(' + element.length + '),\n';
                    else
                        validate = validate + element.name + ': z.string().max(' + element.length + ').optional(),\n';
                }
                if (element.type == 'Number') {
                    validate = validate + element.name + ': z.number().min(1).positive(),';
                }
            }
            validate = validate + '})\n\n';
            //Update validation
            validate = validate + "//UPDATE validation\n";
            validate = validate + 'static readonly UPDATE: ZodType = z.object({\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        validate = validate + element.name + ': z.string().min(1).max(' + element.length + '),\n';
                    else
                        validate = validate + element.name + ': z.string().max(' + element.length + ').optional(),\n';
                }
                if (element.type == 'Number') {
                    validate = validate + element.name + ': z.number().min(1).positive(),';
                }
            }
            validate = validate + '})\n\n';
            //Update validation
            validate = validate + "//SEARCH validation\n";
            validate = validate + 'static readonly SEARCH: ZodType = z.object({\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type === 'Varchar') {
                    if (element.is_null === 'N')
                        validate = validate + element.name + ': z.string().min(1).max(' + element.length + '),\n';
                    else
                        validate = validate + element.name + ': z.string().max(' + element.length + ').optional(),\n';
                }
                if (element.type == 'Number') {
                    validate = validate + element.name + ': z.number().min(1).positive(),';
                }
            }
            validate = validate + 'page : z.number().min(1).positive(),\n' +
                'size : z.number().min(1).max(100).positive()\n';
            validate = validate + '})\n\n';
            console.log(validate);
            return validate;
        });
    }
} //end class
exports.DevService = DevService;
