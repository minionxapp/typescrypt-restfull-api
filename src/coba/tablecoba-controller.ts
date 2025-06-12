
//Create Controller
 import { Response,NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { CreateTablecobaRequest,SearchTablecobaRequest,UpdateTablecobaRequest } from "./tablecoba-model";
import { TablecobaService } from "./tablecoba-service";
import { number } from "zod";
export class TablecobaController{
 static async create(req:UserRequest,res:Response, next:NextFunction){
        try {
            const request : CreateTablecobaRequest = req.body as CreateTablecobaRequest;
            const response = await TablecobaService.create(req.user!, request)
           res.status(200).json({
               data: response
           })
       } catch (error) {
           next(error)
       }
   }
 static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const tablecobaId = Number(req.params.tablecobaId)
    const response = await TablecobaService.get(req.user!, tablecobaId)
   res.status(200).json({
       data: response
   })
} catch (error) {
    next(error)
}
}
static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
 try {
    const request : UpdateTablecobaRequest = req.body as UpdateTablecobaRequest;
    request.id = Number(req.params.tablecobaId)
    const response = await TablecobaService.update(req.user!, request)
    res.status(200).json({
        data: response
    })
} catch (error) {
    next(error)
}
}
 static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){
try {
    const tablecobaId = Number(req.params.tablecobaId)
    const response = await TablecobaService.remove(req.user!, tablecobaId)
    res.status(200).json({
       data: "OK"
   })
} catch (error) {
    next(error)
 }
}
static async search(req: UserRequest, res: Response, next: NextFunction) {
try {
    const request: SearchTablecobaRequest = {
first_name: req.query.first_name as string,
last_name: req.query.last_name as string,
email: req.query.email as string,
phone: req.query.phone as string,
address: req.query.address as string,
username: req.query.username as string,
       page: req.query.page ? Number(req.query.page) : 1,
      size: req.query.size ? Number(req.query.size) : 10,
  }
  const response = await TablecobaService.search(req.user!, request);
  res.status(200).json(response);
} catch (e) {
    next(e);
}
} 
}