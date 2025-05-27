import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            //bikin body reques
            const request: CreateUserRequest = req.body as CreateUserRequest
            //kirim ke serice
            const response = await UserService.register(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            //bikin body reques
            const request: LoginUserRequest = req.body as LoginUserRequest
            //kirim ke serice
            const response = await UserService.login(request)
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}