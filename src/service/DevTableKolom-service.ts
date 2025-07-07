//Create Service 

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { DevTableKolomResponse, CreateDevTableKolomRequest, SearchDevTableKolomRequest, toDevTableKolomResponse, UpdateDevTableKolomRequest } from "../model/DevTableKolom-model";
import { Pageable } from "../model/page";
import { DevTableKolomValidation } from "../validation/DevTableKolom-validation";
import { Validation } from "../validation/validation";
import { User, DevTableKolom } from "@prisma/client";
export class DevTableKolomService {
    static async create(user: User, request: CreateDevTableKolomRequest): Promise<DevTableKolomResponse> {
        const createRequest = Validation.validate(DevTableKolomValidation.CREATE, request)
        console.log("=======create service=========")
        console.log(createRequest)
        console.log("================")
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const devTableKolom = await prismaClient.devTableKolom.create({
            data: record
        })
        return toDevTableKolomResponse(devTableKolom)
    }

    // CEK EXIST
    //function untuk getDevTableKolom biar bisa dipakai berulang
    static async checkDevTableKolomMustexist(devTableKolomId: number): Promise<DevTableKolom> {
        const devTableKolom = await prismaClient.devTableKolom.findFirst({
            where: {
                id: devTableKolomId,
            }
        })
        if (!devTableKolom) {
            throw new ResponseError(404, "DevTableKolom not found")
        }
        return devTableKolom
    }

    // GET
    static async get(user: User, id: number): Promise<DevTableKolomResponse> {
        const devTableKolom = await this.checkDevTableKolomMustexist(id)
        return toDevTableKolomResponse(devTableKolom)
    }
     static async getTableId(user: User, devTableKolomTableId: number): Promise<Array<DevTableKolomResponse> >{
        const devTableKoloms = await prismaClient.devTableKolom.findMany({
            where: {
                table_id: devTableKolomTableId,
            }
        })
        if (!devTableKoloms) {
            throw new ResponseError(404, "DevTableKolom not found")
        }
        return devTableKoloms.map(devTableKoloms => toDevTableKolomResponse(devTableKoloms))
    }

    // UPDATE
    static async update(user: User, request: UpdateDevTableKolomRequest): Promise<DevTableKolomResponse> {
        const updateRequest = Validation.validate(DevTableKolomValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek DevTableKolom ada atau tidak
        await this.checkDevTableKolomMustexist(request.id)
        const devTableKolom = await prismaClient.devTableKolom.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toDevTableKolomResponse(devTableKolom)
    }
    //REMOVE 
    static async remove(user: User, id: number): Promise<DevTableKolomResponse> {
        await this.checkDevTableKolomMustexist(id)
        const devTableKolom = await prismaClient.devTableKolom.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return devTableKolom
    }
    //SEARCH 
    static async search(user: User, request: SearchDevTableKolomRequest): Promise<Pageable<DevTableKolomResponse>> {
        const searchRequest = Validation.validate(DevTableKolomValidation.SEARCH, request);
        // console.log(searchRequest)
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        //  if (searchRequest.table_id) {
        //     filters.push({
        //         table_id: {
        //             contains: searchRequest.table_id
        //         }
        //     })
        // }
        // check if table_name exists
        if (searchRequest.table_name) {
            filters.push({
                table_name: {
                    contains: searchRequest.table_name
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
        // check if is_id exists
        if (searchRequest.is_id) {
            filters.push({
                is_id: {
                    contains: searchRequest.is_id
                }
            })
        }
        // check if is_null exists
        if (searchRequest.is_null) {
            filters.push({
                is_null: {
                    contains: searchRequest.is_null
                }
            })
        }
        // check if is_uniq exists
        if (searchRequest.is_uniq) {
            filters.push({
                is_uniq: {
                    contains: searchRequest.is_uniq
                }
            })
        }
        // check if default exists
        if (searchRequest.default) {
            filters.push({
                default: {
                    contains: searchRequest.default
                }
            })
        }
        // check if type exists
        if (searchRequest.type) {
            filters.push({
                type: {
                    contains: searchRequest.type
                }
            })
        }
        const devTableKoloms = await prismaClient.devTableKolom.findMany({
            where: {
                // username: user.username,
                table_id: searchRequest.table_id,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.devTableKolom.count({
            where: {
                table_id: searchRequest.table_id,
                AND: filters
            },
        })
        return {
            data: devTableKoloms.map(devTableKolom => toDevTableKolomResponse(devTableKolom)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}
