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
exports.DevCreateController = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateController {
    static createController(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.capitalizeFirstLetter(table.name));
            const tableNameLow = (yield util_1.Util.lowerFirstLetter(tableName)).toString();
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let controller = '\n//Create Controller\n\n';
            controller = controller + 'import { Response,NextFunction } from "express";\n' +
                'import { UserRequest } from "../type/user-request";\n' +
                'import { Create' + tableName + 'Request,Search' + tableName + 'Request,Update' + tableName + 'Request } from "../model/' + fileName + '-model";\n' +
                'import { ' + tableName + 'Service } from "../service/' + fileName + '-service";\n' +
                'import { number } from "zod";\n' +
                'export class ' + tableName + 'Controller{\n' +
                ' static async create(req:UserRequest,res:Response, next:NextFunction){\n' +
                '        try {\n' +
                '            const request : Create' + tableName + 'Request = req.body as Create' + tableName + 'Request;\n' +
                '            const response = await ' + tableName + 'Service.create(req.user!, request)\n' +
                '           res.status(200).json({\n' +
                '               data: response\n' +
                '           })\n' +
                '       } catch (error) {\n' +
                '           next(error)\n' +
                '       }\n' +
                '   }\n';
            //GET
            controller = controller + ' static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
                'try {\n' +
                '    const ' + tableNameLow + 'Id = Number(req.params.' + tableNameLow + 'Id)\n' +
                '    const response = await ' + tableName + 'Service.get(req.user!, ' + tableNameLow + 'Id)\n' +
                '   res.status(200).json({\n' +
                '       data: response\n' +
                '   })\n' +
                '} catch (error) {\n' +
                '    next(error)\n' +
                '}\n' +
                '}\n';
            //UPDATE
            controller = controller + 'static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
                ' try {\n' +
                '    const request : Update' + tableName + 'Request = req.body as Update' + tableName + 'Request;\n' +
                '    request.id = Number(req.params.' + tableNameLow + 'Id)\n' +
                '    const response = await ' + tableName + 'Service.update(req.user!, request)\n' +
                '    res.status(200).json({\n' +
                '        data: response\n' +
                '    })\n' +
                '} catch (error) {\n' +
                '    next(error)\n' +
                '}\n' +
                '}\n';
            //REMOVE
            controller = controller + ' static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
                'try {\n' +
                '    const ' + tableNameLow + 'Id = Number(req.params.' + tableNameLow + 'Id)\n' +
                '    const response = await ' + tableName + 'Service.remove(req.user!, ' + tableNameLow + 'Id)\n' +
                '    res.status(200).json({\n' +
                '       data: "OK"\n' +
                '   })\n' +
                '} catch (error) {\n' +
                '    next(error)\n' +
                ' }\n' +
                '}\n';
            //SEARCH
            controller = controller + 'static async search(req: UserRequest, res: Response, next: NextFunction) {\n' +
                'try {\n' +
                '    const request: Search' + tableName + 'Request = {\n';
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    controller = controller + element.name + ': req.query.' + element.name + ' as string,\n';
                }
                if (element.type == 'Number') {
                    // controller = controller + element.name + ': req.query.' + element.name + ' as number,\n'
                }
            }
            controller = controller + '       page: req.query.page ? Number(req.query.page) : 1,\n' +
                '      size: req.query.size ? Number(req.query.size) : 10,\n' +
                '  }\n' +
                '  const response = await ' + tableName + 'Service.search(req.user!, request);\n' +
                '  res.status(200).json(response);\n' +
                '} catch (e) {\n' +
                '    next(e);\n' +
                '}\n' +
                '} \n';
            controller = controller + '}';
            console.log(controller);
            return controller;
        });
    }
}
exports.DevCreateController = DevCreateController;
