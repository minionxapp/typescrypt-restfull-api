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
exports.DevCreateUtilTest = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateUtilTest {
    static createUtilTest(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const tableNameLow = (yield util_1.Util.lowerFirstLetter(tableName)).toString();
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let utiltest = '\n//CREATE UTIL-TEST ' + tableName + '\n//Tambahkan ke dalam file test-util.ts pada folder test \n' + '\n';
            //util-test delete
            utiltest = utiltest + 'export class ' + tableName + 'Test{\n';
            utiltest = utiltest + '  static async deleteAll(){\n' +
                'await prismaClient.' + tableNameLow + '.deleteMany({\n' +
                '    where :{\n' +
                '        create_by :"test"\n' +
                '    }\n' +
                '})\n' +
                '} \n';
            //util-test create 
            utiltest = utiltest + '  static async create(){\n' +
                'await prismaClient.' + tableNameLow + '.create({\n' +
                '    data :{\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    if (element.name == 'username') {
                        utiltest = utiltest + element.name + ':"test' + '",\n';
                    }
                    else {
                        utiltest = utiltest + element.name + ':"test' + '",\n';
                    }
                }
                if (element.type == 'Number') {
                    utiltest = utiltest + element.name + ':1,\n';
                }
            }
            utiltest = utiltest + '        create_by :"test"\n' + '    }\n' +
                '})\n';
            // '} \n'
            // utiltest = utiltest + '})\n'
            utiltest = utiltest + '}\n';
            //util-test get
            utiltest = utiltest + ' static async get(): Promise<' + tableName + '> {\n' +
                ' const ' + tableNameLow + ' = await prismaClient.' + tableNameLow + '.findFirst({\n' +
                '    where: {\n' +
                '       create_by: "test"\n' +
                '    }\n' +
                '  })\n' +
                ' if (!' + tableNameLow + ') {\n' +
                '     throw new Error("' + tableName + ' is not found")\n' +
                '  }\n' +
                ' return ' + tableNameLow + '\n' +
                ' }\n';
            utiltest = utiltest + '}\n';
            utiltest = utiltest + '//tambahkan ' + tableName + ' pada import { User, Contact, Tablecoba } from "@prisma/client";';
            console.log(utiltest);
            return utiltest;
        });
    }
}
exports.DevCreateUtilTest = DevCreateUtilTest;
