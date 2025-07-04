
//Create Controller

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateDevDirektoriRequest, SearchDevDirektoriRequest, UpdateDevDirektoriRequest } from "../model/DevDirektori-model";
import { DevDirektoriService } from "../service/DevDirektori-service";
import { number } from "zod";
export class DevDirektoriController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateDevDirektoriRequest = req.body as CreateDevDirektoriRequest;
            //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
            const response = await DevDirektoriService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const devDirektoriId = Number(req.params.devDirektoriId)
            const response = await DevDirektoriService.get(req.user!, devDirektoriId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateDevDirektoriRequest = req.body as UpdateDevDirektoriRequest;
            request.id = Number(req.params.devDirektoriId)
            const response = await DevDirektoriService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const devDirektoriId = Number(req.params.devDirektoriId)
            const response = await DevDirektoriService.remove(req.user!, devDirektoriId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchDevDirektoriRequest = {
                username: req.query.username as string,
                direktori: req.query.direktori as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await DevDirektoriService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}

