
//Create Controller
import { Response, NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateProjectRequest, SearchProjectRequest, UpdateProjectRequest } from "../coba/project-model";
import { ProjectService } from "../coba/project-service";
import { number } from "zod";
export class ProjectController {
    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateProjectRequest = req.body as CreateProjectRequest;
            const response = await ProjectService.create(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async get(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const projectId = Number(req.params.projectId)
            const response = await ProjectService.get(req.user!, projectId)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async update(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const request: UpdateProjectRequest = req.body as UpdateProjectRequest;
            request.id = Number(req.params.projectId)
            const response = await ProjectService.update(req.user!, request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
    static async remove(req: UserRequest/*sudah login*/, res: Response, next: NextFunction) {
        try {
            const projectId = Number(req.params.projectId)
            const response = await ProjectService.remove(req.user!, projectId)
            res.status(200).json({
                data: "OK"
            })
        } catch (error) {
            next(error)
        }
    }
    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchProjectRequest = {
                // project_id: Number(req.query.project_id),
                name: req.query.name as string,
                desc: req.query.desc as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }
            const response = await ProjectService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}