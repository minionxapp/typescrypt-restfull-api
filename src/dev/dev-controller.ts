import { prismaClient } from "../application/database";

import { Request, Response, NextFunction } from "express";
import { DevService } from "./dev-service";
export class DevController {

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const tabelId = Number(req.params.tableId)
            res.status(200).json({
                data: {
                    schema : await DevService.createSchema(tabelId),
                    model : await DevService.createModel(tabelId),
                    validate : await DevService.createValidation(tabelId),
                    service: await DevService.createService(tabelId),
                    controller: await DevService.createController(tabelId),
                    route: await DevService.createRoute(tabelId),
                    test: await DevService.createTest(tabelId),
                    utiltest: await DevService.createUtilTest(tabelId),
                    file : await DevService.createFiles(tabelId)
                }

            })
        } catch (error) {
            next(error)
        }
    }
}