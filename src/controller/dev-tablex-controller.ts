
//Create Controller
import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDev_tablexRequest, SearchDev_tablexRequest, UpdateDev_tablexRequest } from "../model/dev-tablex-model";
import { Dev_tablexService } from "../service/dev-tablex-service";
import { number } from "zod";
export class Dev_tablexController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateDev_tablexRequest = req.body as CreateDev_tablexRequest;
            const response = await Dev_tablexService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        console.log("get")
        try {
            const dev_tablexId = Number(req.params.dev_tablexId)
            const response = await Dev_tablexService.get(req.user!, dev_tablexId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateDev_tablexRequest = req.body as UpdateDev_tablexRequest;
            request.id = Number(req.params.dev_tablexId)
            const response = await Dev_tablexService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const dev_tablexId = Number(req.params.dev_tablexId)
            const response = await Dev_tablexService.remove(req.user!, dev_tablexId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchDev_tablexRequest = {
                name: req.query.name as string,
                desc: req.query.desc as string,
                project_id: Number(req.query.project_id),
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await Dev_tablexService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }



    //===========================added============
     static async getByProjectId(req: UserRequest, res: Response, next: NextFunction) {
        console.log("getByProjectId")
        try {
            const dev_tablexId = Number(req.params.dev_tablexId)
            const response = await Dev_tablexService.getByProjectId(req.user!, dev_tablexId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}