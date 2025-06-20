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
const dev_create_model_1 = require("./dev-create-model");
const dev_create_validation_1 = require("./dev-create-validation");
const dev_create_service_1 = require("./dev-create-service");
const dev_create_controller_1 = require("./dev-create-controller");
const dev_create_test_1 = require("./dev-create-test");
const dev_create_route_1 = require("./dev-create-route");
const dev_create_util_test_1 = require("./dev-create-util-test");
const dev_create_schema_1 = require("./dev-create-schema");
class DevCreateFile {
    static createFiles(tabelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = yield dev_util_1.DevUtil.getTable(tabelId);
            const tableName = (yield util_1.Util.lowerFirstLetter(table.name));
            const tableNameCamelCase = yield util_1.Util.camelCase(tableName);
            const fileName = yield util_1.Util.fileNameFormat(tableName);
            const columns = yield dev_util_1.DevUtil.getColoumn(tabelId);
            console.log(tableName + '======CamelCase===' + tableNameCamelCase + ' snack case : ' + fileName);
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
            file = folder + folderModel + fileName + '-model.ts\n';
            util_1.Util.createFile(file, (yield dev_create_model_1.DevCreateModel.createModel(tabelId)).toString());
            file = folder + folderValidation + fileName + '-validation.ts\n\n';
            util_1.Util.createFile(file, (yield dev_create_validation_1.DevCreateValidation.createValidation(tabelId)).toString());
            file = folder + folderService + fileName + '-service.ts\n\n';
            util_1.Util.createFile(file, (yield dev_create_service_1.DevCreateService.createService(tabelId)).toString());
            file = folder + folderController + fileName + '-controller.ts\n\n';
            util_1.Util.createFile(file, (yield dev_create_controller_1.DevCreateController.createController(tabelId)).toString());
            file = folder + folderTest + fileName + '.test.ts\n\n';
            util_1.Util.createFile(file, (yield dev_create_test_1.DevCreateTest.createTest(tabelId)).toString());
            file = folder + 'src/coba/' + fileName + '-route.txt\n\n';
            util_1.Util.createFile(file, (yield dev_create_route_1.DevCreateRoute.createRoute(tabelId)).toString());
            file = folder + 'src/coba/' + fileName + '-util-test.txt\n\n';
            util_1.Util.createFile(file, (yield dev_create_util_test_1.DevCreateUtilTest.createUtilTest(tabelId)).toString());
            file = folder + 'src/coba/' + fileName + '-schema.txt\n\n';
            util_1.Util.createFile(file, (yield dev_create_schema_1.DevCreateSchema.createSchema(tabelId)).toString());
            folder = 'rm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/';
            file = file + folder + folderModel + tableName + '-model.ts\n';
            file = file + folder + folderValidation + tableName + '-validation.ts\n';
            file = file + folder + folderService + tableName + '-service.ts\n';
            file = file + folder + folderController + tableName + '-controller.ts\n';
            file = file + folder + folderTest + tableName + '.test.ts\n';
            file = file + folder + folderUtilTest + tableName + '-util-test.txt\n';
            file = file + folder + folderRoute + tableName + '-route.txt\n';
            file = file + folder + folderSchema + tableName + '-schema.txt\n';
            // console.log(file)
            return '';
        });
    }
}
exports.DevCreateFile = DevCreateFile;
