import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { CreateUserRequest, LoginUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import{v4 as uuid} from "uuid"

export class UserService{
    static async register(request:CreateUserRequest) : Promise<UserResponse>{
        //validasi
        const registerRequest = Validation.validate(UserValidation.REGISTER, request)
        //cek user name
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username : registerRequest.username
            }
        })
        if(totalUserWithSameUsername !=0){
            throw new ResponseError(400,"Username already axist");
        }
        //ubah password pake bcrypt
        registerRequest.password = await bcrypt.hash(registerRequest.password,10)
        //simpan
        const user = await prismaClient.user.create({
            data : registerRequest
        })
        //balikannya
        return toUserResponse(user)

    }

    static async login(request: LoginUserRequest): Promise<UserResponse>{
         //validasi
        const lognRequest = Validation.validate(UserValidation.LOGIN, request)
        //cek database
        let user = await prismaClient.user.findUnique({
            where :{
                username:lognRequest.username
            }
        })
        //user tidak ditemukan
        if(!user){
            throw new ResponseError(401,"Username or password is wrong")
        }
        //cek compare password request vs database
        const isPasswordValid = await bcrypt.compare(lognRequest.password,user.password)
        //password not match
        if(!isPasswordValid){
            throw new ResponseError(401,"Username or password is wrong")
        }
        user = await prismaClient.user.update({
            where :{
                username:lognRequest.username
            },
            data :{
                token : uuid()
            }
        })
        const response= toUserResponse(user);
        response.token = user.token!
        return response

    }
}