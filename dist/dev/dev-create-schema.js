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
exports.DevCreateSchema = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateSchema {
    static createSchema(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let model = "\n//Create Schema\n//schema.prisma\n\n";
            model = model + 'model ' + (yield util_1.Util.capitalizeFirstLetter(tableName)).toString() + ' {\n';
            model = model + 'id         Int    @id @default(autoincrement())\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                model = model + element.name;
                if (element.type == 'Varchar') {
                    if (element.is_null == 'Y') {
                        model = model + " String? @db.VarChar" + '(' + element.length + ')\n';
                    }
                    else {
                        model = model + " String @db.VarChar" + '(' + element.length + ')\n';
                    }
                }
                if (element.type == 'Number') {
                    model = model + " Int \n";
                }
            }
            model = model + 'create_by   String  @db.VarChar(20)\n' +
                'update_by   String?  @db.VarChar(20)\n' +
                'create_at   DateTime? \n' +
                'update_at   DateTime? \n';
            model = model + '@@map("' + (tableName.toLocaleLowerCase()) + 's")\n';
            model = model + "}\n";
            console.log(model);
            return model;
        });
    }
}
exports.DevCreateSchema = DevCreateSchema;
