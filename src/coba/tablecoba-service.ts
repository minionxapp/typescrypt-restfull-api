//Create Service 

//utuk coba--> disesuaikan dulu
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { TablecobaResponse, CreateTablecobaRequest, SearchTablecobaRequest, toTablecobaResponse, UpdateTablecobaRequest } from "../coba/tablecoba-model";
import { Pageable } from "../model/page";
import { TablecobaValidation } from "../coba/tablecoba-validation";
import { Validation } from "../validation/validation";
import { User, Tablecoba } from "@prisma/client";
export class TablecobaService {
    static async create(user: User, request: CreateTablecobaRequest): Promise<TablecobaResponse> {
        const createRequest = Validation.validate(TablecobaValidation.CREATE, request)
        const record = {
            ...createRequest,//dari object yang ada
            ...{ username: user.name } //tambahkan username, dengan value dari object user
        }
        const tablecoba = await prismaClient.tablecoba.create({
            data: record
        })
        return toTablecobaResponse(tablecoba)
    }

    // CEK EXIST
    //function untuk getTablecoba biar bisa dipakai berulang
    static async checkTablecobaMustexist(tablecobaId: number): Promise<Tablecoba> {
        const tablecoba = await prismaClient.tablecoba.findFirst({
            where: {
                id: tablecobaId,
            }
        })
        if (!tablecoba) {
            throw new ResponseError(404, "Contact not found")
        }
        return tablecoba
    }

    // GET
    static async get(id: number): Promise<TablecobaResponse> {
        const tablecoba = await this.checkTablecobaMustexist(id)
        return toTablecobaResponse(tablecoba)
    }

    // UPDATE
    static async update(user: User, request: UpdateTablecobaRequest): Promise<TablecobaResponse> {
        const updateRequest = Validation.validate(TablecobaValidation.UPDATE, request)
        //cek Tablecoba ada atau tidak
        await this.checkTablecobaMustexist(request.id)
        const tablecoba = await prismaClient.tablecoba.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toTablecobaResponse(tablecoba)
    }
    //REMOVE 
    static async remove(/*user: User, */id: number): Promise<TablecobaResponse> {
        await this.checkTablecobaMustexist(id)
        const tablecoba = await prismaClient.tablecoba.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return tablecoba
    }
    //SEARCH 
    static async search(user: User, request: SearchTablecobaRequest): Promise<Pageable<TablecobaResponse>> {
        const searchRequest = Validation.validate(TablecobaValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if first_name exists
        if (searchRequest.first_name) {
            filters.push({
                first_name: {
                    contains: searchRequest.first_name
                }
            })
        }
        // check if last_name exists
        if (searchRequest.last_name) {
            filters.push({
                last_name: {
                    contains: searchRequest.last_name
                }
            })
        }
        // check if email exists
        if (searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        // check if phone exists
        if (searchRequest.phone) {
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }
        // check if address exists
        if (searchRequest.address) {
            filters.push({
                address: {
                    contains: searchRequest.address
                }
            })
        }
        // check if username exists
        if (searchRequest.username) {
            filters.push({
                username: {
                    contains: searchRequest.username
                }
            })
        }
        const tablecobas = await prismaClient.tablecoba.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.tablecoba.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: tablecobas.map(tablecoba => toTablecobaResponse(tablecoba)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

}
