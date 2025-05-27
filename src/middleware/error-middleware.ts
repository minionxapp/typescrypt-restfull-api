import { Request,Response,NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async(error : Error,req: Request,res:Response,nex:NextFunction)=>{

    //error bawaan dari zod
    if(error instanceof ZodError){
        res.status(400).json({
            errors:`Validation error : ${JSON.stringify(error)}`
        });
    //error dari responseError
    }else if(error instanceof ResponseError){
        res.status(error.status).json({
            errors: error.message
        })
    }else{
        res.status(500).json({
            errors : error.message
        })
    }
}