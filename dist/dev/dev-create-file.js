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
exports.DevCreateFile = void 0;
const util_1 = require("../util/util");
const dev_util_1 = require("../dev/dev-util");
class DevCreateFile {
    static createFiles(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            // const tableName = (await Util.lowerFirstLetter(table.name))
            const tableName = (yield util_1.Util.camelCase(yield util_1.Util.capitalizeFirstLetter(table.name)));
            const tableNameCamelCase = yield util_1.Util.camelCase(tableName);
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            let file = '';
            const folderModel = 'src/model/'; //'src/model/'
            const folderValidation = 'src/validation/'; //'src/validation/'
            const folderController = 'src/controller/'; //'src/controller/'
            const folderService = 'src/service/'; //'src/service/'
            const folderTest = 'test/';
            const folderUtilTest = 'src/coba/'; //'test/'
            const folderRoute = 'src/coba/'; //'test/'
            const folderSchema = 'src/coba/'; //'test/'
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
            file = file + "\nCREATE FILE";
            folder = '\ntouch /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            file = file + folder + folderModel + tableName + '-model.ts';
            file = file + folder + folderValidation + tableName + '-validation.ts';
            file = file + folder + folderService + tableName + '-service.ts';
            file = file + folder + folderController + tableName + '-controller.ts';
            file = file + folder + folderTest + tableName + '.test.ts';
            file = file + folder + folderUtilTest + tableName + '-util-test.txt';
            file = file + folder + folderRoute + tableName + '-route.txt';
            file = file + folder + folderSchema + tableName + '-schema.txt\n';
            file = file + "\nREMOVE FILE";
            folder = '\nrm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            file = file + folder + folderModel + tableName + '-model.ts';
            file = file + folder + folderValidation + tableName + '-validation.ts';
            file = file + folder + folderService + tableName + '-service.ts';
            file = file + folder + folderController + tableName + '-controller.ts';
            file = file + folder + folderTest + tableName + '.test.ts';
            file = file + folder + folderUtilTest + tableName + '-util-test.txt';
            file = file + folder + folderRoute + tableName + '-route.txt';
            file = file + folder + folderSchema + tableName + '-schema.txt\n';
            // console.log(file)
            return file;
        });
    }
}
exports.DevCreateFile = DevCreateFile;
