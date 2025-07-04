import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'

export class DevCreateController{
     static async createController(tabelId: number): Promise<String> {
            const table = await DevUtil.getTable(tabelId)
            const tableName = await Util.camelCase(await Util.capitalizeFirstLetter(table.name))
            const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
            const fileName = await Util.fileNameFormat(tableName)
            const columns = await DevUtil.getColoumn(tabelId)
            let controller = '\n//Create Controller\n\n'
    
            controller = controller + 'import { Response,NextFunction } from "express";\n' +
                'import { UserRequest } from "../type/user-request";\n' +
                'import { Create' + tableName + 'Request,Search' + tableName + 'Request,Update' + tableName + 'Request } from "../model/' + tableName + '-model";\n' +
                'import { ' + tableName + 'Service } from "../service/' + tableName + '-service";\n' +
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
                '   }\n'
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
                '}\n'
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
                '}\n'
    
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
                '}\n'
    
            //SEARCH
            controller = controller + 'static async search(req: UserRequest, res: Response, next: NextFunction) {\n' +
                'try {\n' +
                '    const request: Search' + tableName + 'Request = {\n'
            for (let index = 0; index < columns.length; index++) {
                const element = columns[index];
                if (element.type == 'Varchar') {
                    controller = controller + element.name + ': req.query.' + element.name + ' as string,\n'
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
                '} \n'
    
            controller = controller + '}'
            console.log(controller)
            return controller
        }
}