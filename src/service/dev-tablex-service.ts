//Create Service 

//utuk coba--> disesuaikan dulu
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Dev_tablexResponse, CreateDev_tablexRequest, SearchDev_tablexRequest, toDev_tablexResponse, UpdateDev_tablexRequest } from "../model/dev-tablex-model";
import { Pageable } from "../model/page";
import { Dev_tablexValidation } from "../validation/dev-tablex-validation";
import { Validation } from "../validation/validation";
import { User, Dev_tablex } from "@prisma/client";
export class Dev_tablexService {
    static async create(user: User, request: CreateDev_tablexRequest): Promise<Dev_tablexResponse> {
        const createRequest = Validation.validate(Dev_tablexValidation.CREATE, request)
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const dev_tablex = await prismaClient.dev_tablex.create({
            data: record
        })
        return toDev_tablexResponse(dev_tablex)
    }

    // CEK EXIST
    //function untuk getDev_tablex biar bisa dipakai berulang
    static async checkDev_tablexMustexist(dev_tablexId: number): Promise<Dev_tablex> {
        const dev_tablex = await prismaClient.dev_tablex.findFirst({
            where: {
                id: dev_tablexId,
            }
        })
        if (!dev_tablex) {
            throw new ResponseError(404, "Dev_tablex not found")
        }
        return dev_tablex
    }

    // GET
    static async get(user: User, id: number): Promise<Dev_tablexResponse> {
        const dev_tablex = await this.checkDev_tablexMustexist(id)
        return toDev_tablexResponse(dev_tablex)
    }

    // UPDATE
    static async update(user: User, request: UpdateDev_tablexRequest): Promise<Dev_tablexResponse> {
        const updateRequest = Validation.validate(Dev_tablexValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Dev_tablex ada atau tidak
        await this.checkDev_tablexMustexist(request.id)
        const dev_tablex = await prismaClient.dev_tablex.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toDev_tablexResponse(dev_tablex)
    }
    //REMOVE 
    static async remove(user: User, id: number): Promise<Dev_tablexResponse> {
        await this.checkDev_tablexMustexist(id)
        const dev_tablex = await prismaClient.dev_tablex.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return dev_tablex
    }
    //SEARCH 
    static async search(user: User, request: SearchDev_tablexRequest): Promise<Pageable<Dev_tablexResponse>> {
        const searchRequest = Validation.validate(Dev_tablexValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        console.log("kkkkk ::; "+JSON.stringify(request))
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }

        const dev_tablexs = await prismaClient.dev_tablex.findMany({
            where: {
                project_id: request.project_id,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.dev_tablex.count({
            where: {
                //username: user.username,
                 project_id: request.project_id,
                AND: filters
            },
        })
        return {
            data: dev_tablexs.map(dev_tablex => toDev_tablexResponse(dev_tablex)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows:total
            }
        }
    }


    //==============Added=====
     // GET
    static async getByProjectId(user: User, id: number): Promise<Array<Dev_tablexResponse>> {
        // const dev_tablex = await this.checkDev_tablexMustexist(id)
        // return toDev_tablexResponse(dev_tablex)
        const dev_tablexs = await prismaClient.dev_tablex.findMany({
            where: {
                project_id: id,
            }
        })
        if (!dev_tablexs) {
            throw new ResponseError(404, "Dev_tablex not found")
        }
        return dev_tablexs
    }

}