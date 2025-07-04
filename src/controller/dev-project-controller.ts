
//Create Controller
import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDev_projectRequest, SearchDev_projectRequest, UpdateDev_projectRequest } from "../model/dev-project-model";
import { Dev_projectService } from "../service/dev-project-service";
import { number } from "zod";
export class Dev_projectController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateDev_projectRequest = req.body as CreateDev_projectRequest;
            const response = await Dev_projectService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const dev_projectId = Number(req.params.dev_projectId)
            const response = await Dev_projectService.get(req.user!, dev_projectId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateDev_projectRequest = req.body as UpdateDev_projectRequest;
            request.id = Number(req.params.dev_projectId)
            const response = await Dev_projectService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const dev_projectId = Number(req.params.dev_projectId)
            const response = await Dev_projectService.remove(req.user!, dev_projectId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchDev_projectRequest = {
                name: req.query.name as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await Dev_projectService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}