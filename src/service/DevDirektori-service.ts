

//Create Service 

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { DevDirektoriResponse, CreateDevDirektoriRequest, SearchDevDirektoriRequest, toDevDirektoriResponse, UpdateDevDirektoriRequest } from "../model/DevDirektori-model";
import { Pageable } from "../model/page";
import { DevDirektoriValidation } from "../validation/DevDirektori-validation";
import { Validation } from "../validation/validation";
import { User, DevDirektori } from "@prisma/client";
export class DevDirektoriService {
    static async create(user: User, request: CreateDevDirektoriRequest): Promise<DevDirektoriResponse> {
        const createRequest = Validation.validate(DevDirektoriValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        const totalusernameUniq = await prismaClient.devDirektori.count({
            where: {
                username: createRequest.username
            }
        })
        if (totalusernameUniq != 0) {
            throw new ResponseError(400, "username already axist");
        }

        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const devDirektori = await prismaClient.devDirektori.create({
            data: record
        })
        return toDevDirektoriResponse(devDirektori)
    }

    // CEK EXIST
    //function untuk getDevDirektori biar bisa dipakai berulang
    static async checkDevDirektoriMustexist(devDirektoriId: number): Promise<DevDirektori> {
        const devDirektori = await prismaClient.devDirektori.findFirst({
            where: {
                id: devDirektoriId,
            }
        })
        if (!devDirektori) {
            throw new ResponseError(404, "DevDirektori not found")
        }
        return devDirektori
    }

    // GET
    static async get(user: User, id: number): Promise<DevDirektoriResponse> {
        const devDirektori = await this.checkDevDirektoriMustexist(id)
        return toDevDirektoriResponse(devDirektori)
    }

    // UPDATE
    static async update(user: User, request: UpdateDevDirektoriRequest): Promise<DevDirektoriResponse> {
        const updateRequest = Validation.validate(DevDirektoriValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek DevDirektori ada atau tidak
        await this.checkDevDirektoriMustexist(request.id)
        const devDirektori = await prismaClient.devDirektori.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toDevDirektoriResponse(devDirektori)
    }
    //REMOVE 
    static async remove(user: User, id: number): Promise<DevDirektoriResponse> {
        await this.checkDevDirektoriMustexist(id)
        const devDirektori = await prismaClient.devDirektori.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return devDirektori
    }
    //SEARCH 
    static async search(user: User, request: SearchDevDirektoriRequest): Promise<Pageable<DevDirektoriResponse>> {
        const searchRequest = Validation.validate(DevDirektoriValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if username exists
        if (searchRequest.username) {
            filters.push({
                username: {
                    contains: searchRequest.username
                }
            })
        }
        // check if direktori exists
        if (searchRequest.direktori) {
            filters.push({
                direktori: {
                    contains: searchRequest.direktori
                }
            })
        }
        const devDirektoris = await prismaClient.devDirektori.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.devDirektori.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: devDirektoris.map(devDirektori => toDevDirektoriResponse(devDirektori)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}

