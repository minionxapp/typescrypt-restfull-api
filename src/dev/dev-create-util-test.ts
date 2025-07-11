import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { DevUtil } from '../dev/dev-util'
export class DevCreateUtilTest {
    static async createUtilTest(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        // const tableName = (await Util.capitalizeFirstLetter(table.name))
        const tableName = await Util.camelCase(await Util.capitalizeFirstLetter(table.name))
        const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
        const columns = await DevUtil.getColoumn(tabelId)


        // (await Util.lowerFirstLetter(tableName)).toString()
        let utiltest = '\n//CREATE util-test ' + tableName + '-util.test.ts. \n' + '\n'
        //util-test delete
        utiltest = utiltest + 'import { prismaClient } from "../../src/application/database";\n' +
            'import { '+tableName+'} from "@prisma/client";\n'
        utiltest = utiltest + 'export class ' + tableName + 'Test{\n'
        utiltest = utiltest + '  static async deleteAll(){\n' +
            'await prismaClient.' + tableNameLow + '.deleteMany({\n' +
            '    where :{\n' +
            '        create_by :"test"\n' +
            '    }\n' +
            '})\n' +
            '} \n'

        //util-test create 
        utiltest = utiltest + '  static async create(){\n' +
            'await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.create({\n' +
            '    data :{\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    utiltest = utiltest + element.name + ':"test' + '",\n'
                } else {
                    utiltest = utiltest + element.name + ':"test' + '",\n'
                }
            }
            if (element.type == 'Number') {
                utiltest = utiltest + element.name + ':1,\n'
            }
        }
        utiltest = utiltest + '        create_by :"test"\n' + '    }\n' +
            '})\n'
        // '} \n'
        // utiltest = utiltest + '})\n'
        utiltest = utiltest + '}\n'
        //util-test get
        utiltest = utiltest + ' static async get(): Promise<' + tableName + '> {\n' +
            ' const ' + tableNameLow + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.findFirst({\n' +
            '    where: {\n' +
            '       create_by: "test"\n' +
            '    }\n' +
            '  })\n' +

            ' if (!' + tableNameLow + ') {\n' +
            '     throw new Error("' + tableName + ' is not found")\n' +
            '  }\n' +
            ' return ' + tableNameLow + '\n' +
            ' }\n'

        utiltest = utiltest + '}\n'


        utiltest = utiltest + '//tambahkan ' + tableName + ' pada import { User, Contact, Tablecoba } from "@prisma/client";'

        console.log(utiltest)
        return utiltest
    }

}