import { prismaClient } from "../application/database";

import { Request, Response, NextFunction } from "express";
import { DevService } from "./dev-service";
import { DevCreateSchema } from "./dev-create-schema";
import { DevCreateModel } from "./dev-create-model";
import { DevCreateValidation } from "./dev-create-validation";
import { DevCreateService } from "./dev-create-service";
import { DevCreateController } from "./dev-create-controller";
import { DevCreateRoute } from "./dev-create-route";
import { DevCreateTest } from "./dev-create-test";
import { DevCreateUtilTest } from "./dev-create-util-test";
import { DevCreateFile } from "./dev-create-file";
export class DevController {

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const tabelId = Number(req.params.tableId)
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
                    file : await DevCreateFile.createFiles(tabelId)
                }

            })
        } catch (error) {
            next(error)
        }
    }
}