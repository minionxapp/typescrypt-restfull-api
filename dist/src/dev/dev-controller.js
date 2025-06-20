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
const dev_create_file_1 = require("./dev-create-file");
class DevController {
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tabelId = Number(req.params.tableId);
                res.status(200).json({
                    data: {
                        // schema : await DevCreateSchema.createSchema(tabelId),
                        // model : await DevCreateModel.createModel(tabelId),
                        // validate : await DevCreateValidation.createValidation(tabelId),
                        // service: await DevCreateService.createService(tabelId),
                        // controller: await DevCreateController.createController(tabelId),
                        // route: await DevCreateRoute.createRoute(tabelId),
                        // test: await DevCreateTest.createTest(tabelId),
                        // utiltest: await DevCreateUtilTest.createUtilTest(tabelId),
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
