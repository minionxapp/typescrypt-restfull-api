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
exports.DevCreateRoute = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateRoute {
    static createRoute(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const tableNameLow = (yield util_1.Util.lowerFirstLetter(tableName)).toString();
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            let route = '\n\nimport {' + tableName + 'Controller } from "../controller/' + fileName + '-controller";\n\n\n//ROUTE ' + tableName + '\n' +
                'apiRouter.post("/api/' + tableNameLow + 's",' + tableName + 'Controller.create)\n' +
                'apiRouter.get("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.get)\n' +
                'apiRouter.put("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.update)\n' +
                'apiRouter.delete("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id", ' + tableName + 'Controller.remove)\n' +
                'apiRouter.get("/api/' + tableNameLow + 's", ' + tableName + 'Controller.search)\n';
            console.log(route);
            return route;
        });
    }
}
exports.DevCreateRoute = DevCreateRoute;
