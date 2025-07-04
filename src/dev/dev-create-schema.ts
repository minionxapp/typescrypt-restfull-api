import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'



export class DevCreateSchema{
static async createSchema(tabelId: number): Promise<String> {
    console.log("createSchema")
        const table = await DevUtil.getTable(tabelId)
        const tableName =await Util.camelCase( (await Util.capitalizeFirstLetter(table.name)))
        const tableNamex = (await Util.capitalizeFirstLetter(table.name))
        const columns = await DevUtil.getColoumn(tabelId)
         const tableNameLow = (await Util.lowerFirstLetter(tableNamex)).toString()
        let model = "\n//Create Schema\n//schema.prisma\n\n"
        model = model + 'model ' + (await Util.capitalizeFirstLetter(tableName)).toString() + ' {\n'
        model = model + 'id         Int    @id @default(autoincrement())\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            model = model + element.name
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + " String? @db.VarChar" + '(' + element.length + ')\n'
                } else {
                    if (element.is_uniq == 'Y') {
                        model = model + " String @unique @db.VarChar" + '(' + element.length + ')\n'
                    }else {

                        model = model + " String @db.VarChar" + '(' + element.length + ')\n'
                    }
                }
            }
            if (element.type == 'Number') {
                model = model + " Int \n"
            }
        }
        model = model + 'create_by   String  @db.VarChar(20)\n' +
            'update_by   String?  @db.VarChar(20)\n' +
            'create_at   DateTime? \n' +
            'update_at   DateTime? \n'
        model = model + '@@map("' + (tableNameLow) + 's")\n'
            //  model = model + '@@map("' + (await Util.snackCase(tableName)) + 's")\n'
        model = model + "}\n"
        console.log(model)
        return model
    }

}