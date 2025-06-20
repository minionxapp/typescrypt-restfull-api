//Create Service 

//utuk coba--> disesuaikan dulu
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Dev_projectResponse, CreateDev_projectRequest, SearchDev_projectRequest, toDev_projectResponse, UpdateDev_projectRequest } from "../model/dev-project-model";
import { Pageable } from "../model/page";
import { Dev_projectValidation } from "../validation/dev-project-validation";
import { Validation } from "../validation/validation";
import { User, Dev_project } from "@prisma/client";
export class Dev_projectService {
static async create(user: User, request: CreateDev_projectRequest): Promise<Dev_projectResponse> {
const createRequest = Validation.validate(Dev_projectValidation.CREATE, request)
const record = {
...createRequest,//dari object yang ada
...{ create_by: user.name }, //tambahkan username, dengan value dari object user
 ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user}
const dev_project = await prismaClient.dev_project.create({
data: record
})
return toDev_projectResponse(dev_project)
}

// CEK EXIST
 //function untuk getDev_project biar bisa dipakai berulang
static async checkDev_projectMustexist( dev_projectId: number): Promise<Dev_project> {
const dev_project = await prismaClient.dev_project.findFirst({
where: {
id: dev_projectId,
}
})
if (!dev_project) {
throw new ResponseError(404, "Dev_project not found")
}
return dev_project
}

// GET
 static async get(user: User,id: number): Promise<Dev_projectResponse> {
const dev_project = await this.checkDev_projectMustexist(id)
return toDev_projectResponse(dev_project)
}

// UPDATE
 static async update(user: User, request: UpdateDev_projectRequest): Promise<Dev_projectResponse> {
 const updateRequest = Validation.validate(Dev_projectValidation.UPDATE, request)
 const record = {
...updateRequest,//dari object yang ada
...{ update_by: user.name },
...{ update_at: new Date()}  //tambahkan username, dengan value dari object user
}
 //cek Dev_project ada atau tidak
 await this.checkDev_projectMustexist(request.id)
 const dev_project = await prismaClient.dev_project.update({
    where: {
       id: updateRequest.id,
  //     username: user.username
  },
  data: updateRequest
 })
 return toDev_projectResponse(dev_project)
}
//REMOVE 
 static async remove(user: User, id: number): Promise<Dev_projectResponse> {
 await this.checkDev_projectMustexist( id)
 const dev_project = await prismaClient.dev_project.delete({
 where: {
 id: id,
 //username: user.username
 }
 })
 return dev_project
 }
//SEARCH 
 static async search(user: User, request: SearchDev_projectRequest) : Promise<Pageable<Dev_projectResponse>> {
 const searchRequest = Validation.validate(Dev_projectValidation.SEARCH, request);
 const skip = (searchRequest.page - 1) * searchRequest.size;
 const filters = [];
 // check if name exists
 // check if name exists
if(searchRequest.name){
filters.push({
   name: {
      contains: searchRequest.name
 }
})
}
 // check if desc exists
if(searchRequest.desc){
filters.push({
   desc: {
      contains: searchRequest.desc
 }
})
}
const dev_projects = await prismaClient.dev_project.findMany({
where: {
  // username: user.username,
  AND: filters
},
take: searchRequest.size,
skip: skip
});
const total = await prismaClient.dev_project.count({
    where: {
        //username: user.username,
        AND: filters
    },
})
return {
    data: dev_projects.map(dev_project => toDev_projectResponse(dev_project)),
    paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size
    }
}
}

}