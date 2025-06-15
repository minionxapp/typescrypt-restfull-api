import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'
export class DevCreateRoute {
static async createRoute(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()

        let route = '\n\nimport {' + tableName + 'Controller } from "../controller/' + tableNameLow + '-controller";\n\n\n//ROUTE ' + tableName + '\n' +
            'apiRouter.post("/api/' + tableNameLow + 's",' + tableName + 'Controller.create)\n' +
            'apiRouter.get("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.get)\n' +
            'apiRouter.put("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.update)\n' +
            'apiRouter.delete("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id", ' + tableName + 'Controller.remove)\n' +
            'apiRouter.get("/api/' + tableNameLow + 's", ' + tableName + 'Controller.search)\n'

        console.log(route)
        return route
    }
}