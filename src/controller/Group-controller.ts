//Create Controller

import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateGroupRequest, SearchGroupRequest, UpdateGroupRequest } from "../model/Group-model";
import { GroupService } from "../service/Group-service";
import { number } from "zod";
export class GroupController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateGroupRequest = req.body as CreateGroupRequest;
            const response = await GroupService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const groupId = Number(req.params.groupId)
            const response = await GroupService.get(req.user!, groupId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateGroupRequest = req.body as UpdateGroupRequest;
            request.id = Number(req.params.groupId)
            const response = await GroupService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const groupId = Number(req.params.groupId)
            const response = await GroupService.remove(req.user!, groupId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchGroupRequest = {
                name: req.query.name as string,
                desc: req.query.desc as string,
                pic: req.query.pic as string,
                status: req.query.status as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await GroupService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}