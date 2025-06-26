import {Request,Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async(req:UserRequest/*Request*/, res:Response,next:NextFunction)=>{
    const token = req.get('X-API-TOKEN');
// cek token 
    if(token){
        //cek user dari token
        const user = await prismaClient.user.findFirst({
            where:{
                token: token
            }
        })
        //jika user ada
        if(user){
            req.user = user;//iawal ini error, 
            // tidak seperti js biasa karena tidak ada properti user pada req. 
            // req punyanya express (Request)
            //bikin userRequest yang mengextend Request dari express
            next()

            return;

        }
        //bila tidak ada langsung ke 401

    }
    res.status(401).json({
        errors :"Unautorized"
    }).end()
}