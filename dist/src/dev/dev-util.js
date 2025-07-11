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
exports.DevUtil = void 0;
const database_1 = require("../application/database");
const dev_model_1 = require("../dev/dev-model");
class DevUtil {
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
    //ambil table
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
}
exports.DevUtil = DevUtil;
