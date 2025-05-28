import { Request, Response, NextFunction } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

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

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            //kirim ke serice
            const response = await UserService.get(req.user!)//!-->paksa ada
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request:UpdateUserRequest=req.body as UpdateUserRequest
            //kirim ke serice
            const response = await UserService.update(req.user!,request)//!-->paksa ada
            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}

