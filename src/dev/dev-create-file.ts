import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { DevUtil } from '../dev/dev-util'
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
        // const tableName = (await Util.lowerFirstLetter(table.name))
         const tableName = (await Util.camelCase(await Util.capitalizeFirstLetter(table.name)))
        const tableNameCamelCase = await Util.camelCase(tableName)
        const fileName = await Util.fileNameFormat(tableName)
        const columns = await DevUtil.getColoumn(tabelId)

        let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        const folderModel = 'src/model/'//'src/model/'
        const folderValidation = 'src/validation/'//'src/validation/'
        const folderController = 'src/controller/'//'src/controller/'
        const folderService = 'src/service/'//'src/service/'
        const folderTest = 'test/'
        const folderUtilTest = 'test/util/'
        const folderRoute = 'src/coba/'//'test/'
        const folderSchema = 'src/coba/'//'test/'

        // file = folder + folderModel + fileName + '-model.ts\n'
        // // Util.createFile(file, (await DevCreateModel.createModel(tabelId)).toString())

        // file = folder + folderValidation + fileName + '-validation.ts\n\n'
        // // Util.createFile(file, (await DevCreateValidation.createValidation(tabelId)).toString())

        // file = folder + folderService + fileName + '-service.ts\n\n'
        // // Util.createFile(file, (await DevCreateService.createService(tabelId)).toString())

        // file = folder + folderController + fileName + '-controller.ts\n\n'
        // // Util.createFile(file, (await DevCreateController.createController(tabelId)).toString())

        // file = folder + folderTest + fileName + '.test.ts\n\n'
        // // Util.createFile(file, (await DevCreateTest.createTest(tabelId)).toString())

        // file = folder + 'src/coba/' + fileName + '-route.txt\n\n'
        // // Util.createFile(file, (await DevCreateRoute.createRoute(tabelId)).toString())


        // file = folder + 'src/coba/' + fileName + '-util-test.txt\n\n'
        // // Util.createFile(file, (await DevCreateUtilTest.createUtilTest(tabelId)).toString())

        // file = folder + 'src/coba/' + fileName + '-schema.txt\n\n'
        // Util.createFile(file, (await DevCreateSchema.createSchema(tabelId)).toString())
        file = file +"\nCREATE FILE"
        folder = '\ntouch /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts'
        file = file + folder + folderValidation + tableName + '-validation.ts'
        file = file + folder + folderService + tableName + '-service.ts'
        file = file + folder + folderController + tableName + '-controller.ts'
        file = file + folder + folderTest + tableName + '.test.ts'
        file = file + folder + folderUtilTest + tableName + '-util-test.ts'
        file = file + folder + folderRoute + tableName + '-route.txt'
        file = file + folder + folderSchema + tableName + '-schema.txt\n'

        file = file +"\nREMOVE FILE"
        folder = '\nrm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts'
        file = file + folder + folderValidation + tableName + '-validation.ts'
        file = file + folder + folderService + tableName + '-service.ts'
        file = file + folder + folderController + tableName + '-controller.ts'
        file = file + folder + folderTest + tableName + '.test.ts'
        file = file + folder + folderUtilTest + tableName + '-util-test.ts'
        file = file + folder + folderRoute + tableName + '-route.txt'
        file = file + folder + folderSchema + tableName + '-schema.txt\n'
        // console.log(file)

        return file

    }
}