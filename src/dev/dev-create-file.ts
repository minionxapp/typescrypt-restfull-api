import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'
import { DevCreateModel } from "./dev-create-model";
import { DevCreateValidation } from "./dev-create-validation";
import { DevCreateService } from "./dev-create-service";
import { DevCreateController } from "./dev-create-controller";
import { DevCreateTest } from "./dev-create-test";
import { DevCreateRoute } from "./dev-create-route";
import { DevCreateUtilTest } from "./dev-create-util-test";
import { DevCreateSchema } from "./dev-create-schema";

export class DevCreateFile {
static async createFiles(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = (await Util.lowerFirstLetter(table.name))
        const tableNameCamelCase = await Util.camelCase(tableName)
        const fileName = await Util.fileNameFormat(tableName)
        const columns = await DevUtil.getColoumn(tabelId)
        console.log(tableName+'======CamelCase==='+tableNameCamelCase+' snack case : '+fileName)

        let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        const folderModel = 'src/model/'//'src/model/'
        const folderValidation = 'src/validation/'//'src/validation/'
        const folderController = 'src/controller/'//'src/controller/'
        const folderService = 'src/service/'//'src/service/'
        const folderTest = 'test/'
        const folderUtilTest = 'src/coba/'//'test/'
        const folderRoute = 'src/coba/'//'test/'
        const folderSchema = 'src/coba/'//'test/'

        file = folder + folderModel + fileName + '-model.ts\n'
        Util.createFile(file, (await DevCreateModel.createModel(tabelId)).toString())

        file = folder + folderValidation + fileName + '-validation.ts\n\n'
        Util.createFile(file, (await DevCreateValidation.createValidation(tabelId)).toString())

        file = folder + folderService + fileName + '-service.ts\n\n'
        Util.createFile(file, (await DevCreateService.createService(tabelId)).toString())

        file = folder + folderController + fileName + '-controller.ts\n\n'
        Util.createFile(file, (await DevCreateController.createController(tabelId)).toString())

        file = folder + folderTest + fileName + '.test.ts\n\n'
        Util.createFile(file, (await DevCreateTest.createTest(tabelId)).toString())

        file = folder + 'src/coba/' + fileName + '-route.txt\n\n'
        Util.createFile(file, (await DevCreateRoute.createRoute(tabelId)).toString())


        file = folder + 'src/coba/' + fileName + '-util-test.txt\n\n'
        Util.createFile(file, (await DevCreateUtilTest.createUtilTest(tabelId)).toString())

        file = folder + 'src/coba/' + fileName + '-schema.txt\n\n'
        Util.createFile(file, (await DevCreateSchema.createSchema(tabelId)).toString())

        folder = 'rm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts\n'
        file = file + folder + folderValidation + tableName + '-validation.ts\n'
        file = file + folder + folderService + tableName + '-service.ts\n'
        file = file + folder + folderController + tableName + '-controller.ts\n'
        file = file + folder + folderTest + tableName + '.test.ts\n'
        file = file + folder + folderUtilTest + tableName + '-util-test.txt\n'
        file = file + folder + folderRoute + tableName + '-route.txt\n'
        file = file + folder + folderSchema + tableName + '-schema.txt\n'


        // console.log(file)

        return ''

    }
}