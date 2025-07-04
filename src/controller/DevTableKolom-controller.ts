//Create Controller

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDevTableKolomRequest, SearchDevTableKolomRequest, UpdateDevTableKolomRequest } from "../model/DevTableKolom-model";
import { DevTableKolomService } from "../service/DevTableKolom-service";
import { number } from "zod";
export class DevTableKolomController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        console.log("Create.....")
        try {
            const request: CreateDevTableKolomRequest = req.body as CreateDevTableKolomRequest;
            console.log(request)
            const response = await DevTableKolomService.create(req.user!, request)
            console.log(response)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const devTableKolomId = Number(req.params.devTableKolomId)
            const response = await DevTableKolomService.get(req.user!, devTableKolomId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateDevTableKolomRequest = req.body as UpdateDevTableKolomRequest;
            request.id = Number(req.params.devTableKolomId)
            const response = await DevTableKolomService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const devTableKolomId = Number(req.params.devTableKolomId)
            const response = await DevTableKolomService.remove(req.user!, devTableKolomId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchDevTableKolomRequest = {
                name: req.query.name as string,
                table_name: req.query.table_name as string,
                desc: req.query.desc as string,
                is_id: req.query.is_id as string,
                is_null: req.query.is_null as string,
                is_uniq: req.query.is_uniq as string,
                default: req.query.default as string,
                type: req.query.type as string,
                table_id : Number(req.query.table_id),
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await DevTableKolomService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}
