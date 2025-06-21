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
exports.DevCreateModel = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateModel {
    static createModel(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            //tabelResponse
            let model = '\n//CreateModel\n//' + tableName + '-model.ts\n\n';
            model = model + "import { " + tableName + " } from '@prisma/client'\n";
            model = model + 'export type ' + tableName + 'Response = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    if (element.is_null == 'Y') {
                        model = model + element.name + "?: string | null," + "\n";
                    }
                    else {
                        model = model + element.name + ": string," + "\n";
                    }
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //createRequest
            model = model + '//Create' + tableName + 'Request\n';
            model = model + 'export type Create' + tableName + 'Request = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    if (element.is_null == 'Y') {
                        model = model + element.name + "?: string | null," + "\n";
                    }
                    else {
                        model = model + element.name + ": string," + "\n";
                    }
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //updateRequest
            model = model + '//Update' + tableName + 'Request\n';
            model = model + 'export type Update' + tableName + 'Request = {\nid: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    if (element.is_null == 'Y') {
                        model = model + element.name + "?: string | null," + "\n";
                    }
                    else {
                        model = model + element.name + ": string," + "\n";
                    }
                }
                if (element.type == 'Number') {
                    model = model + element.name + ": number" + ",\n";
                }
            }
            model = model + "}\n\n";
            // //SearchRequest
            model = model + '//Search' + tableName + 'Request\n';
            model = model + 'export type Search' + tableName + 'Request = {\n//id: number,\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    if (element.is_null == 'Y') {
                        model = model + element.name + "?: string | null," + "\n";
                    }
                    else {
                        model = model + element.name + ": string," + "\n";
                    }
                }
                if (element.type == 'Number') {
                    // model = model + element.name + ": number" + ",\n"
                }
            }
            model = model + "page : number," + "\n";
            model = model + "size : number," + "\n";
            model = model + "}\n\n";
            // //toXxxxxResponse
            model = model + '//to' + tableName + 'Response\n';
            model = model + 'export function to' + tableName + 'Response(' + tableName.toLocaleLowerCase() + ': ' + tableName + '): ' + tableName + 'Response {\n';
            model = model + 'return { \n';
            model = model + 'id: ' + tableName.toLocaleLowerCase() + '.id,\n';
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
}
exports.DevCreateModel = DevCreateModel;
