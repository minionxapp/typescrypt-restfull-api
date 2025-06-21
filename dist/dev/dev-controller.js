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
exports.DevController = void 0;
const dev_create_schema_1 = require("./dev-create-schema");
const dev_create_model_1 = require("./dev-create-model");
const dev_create_validation_1 = require("./dev-create-validation");
const dev_create_service_1 = require("./dev-create-service");
const dev_create_controller_1 = require("./dev-create-controller");
const dev_create_route_1 = require("./dev-create-route");
const dev_create_test_1 = require("./dev-create-test");
const dev_create_util_test_1 = require("./dev-create-util-test");
const dev_create_file_1 = require("./dev-create-file");
class DevController {
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tabelId = Number(req.params.tableId);
                res.status(200).json({
                    data: {
                        schema: yield dev_create_schema_1.DevCreateSchema.createSchema(tabelId),
                        model: yield dev_create_model_1.DevCreateModel.createModel(tabelId),
                        validate: yield dev_create_validation_1.DevCreateValidation.createValidation(tabelId),
                        service: yield dev_create_service_1.DevCreateService.createService(tabelId),
                        controller: yield dev_create_controller_1.DevCreateController.createController(tabelId),
                        route: yield dev_create_route_1.DevCreateRoute.createRoute(tabelId),
                        test: yield dev_create_test_1.DevCreateTest.createTest(tabelId),
                        utiltest: yield dev_create_util_test_1.DevCreateUtilTest.createUtilTest(tabelId),
                        file: yield dev_create_file_1.DevCreateFile.createFiles(tabelId)
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.DevController = DevController;
