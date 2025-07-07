//Create Service 

import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { GroupResponse, CreateGroupRequest, SearchGroupRequest, toGroupResponse, UpdateGroupRequest } from "../model/Group-model";
import { Pageable } from "../model/page";
import { GroupValidation } from "../validation/Group-validation";
import { Validation } from "../validation/validation";
import { User, Group } from "@prisma/client";
export class GroupService {
    static async create(user: User, request: CreateGroupRequest): Promise<GroupResponse> {
        const createRequest = Validation.validate(GroupValidation.CREATE, request)
        //belum ada validasi bila tidak boleh sama (uniq) dalam kolom
        const totalnameUniq = await prismaClient.group.count({
            where: {
                name: createRequest.name
            }
        })
        if (totalnameUniq != 0) {
            throw new ResponseError(400, "name already axist");
        }

        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const group = await prismaClient.group.create({
            data: record
        })
        return toGroupResponse(group)
    }

    // CEK EXIST
    //function untuk getGroup biar bisa dipakai berulang
    static async checkGroupMustexist(groupId: number): Promise<Group> {
        const group = await prismaClient.group.findFirst({
            where: {
                id: groupId,
            }
        })
        if (!group) {
            throw new ResponseError(404, "Group not found")
        }
        return group
    }

    // GET
    static async get(user: User, id: number): Promise<GroupResponse> {
        const group = await this.checkGroupMustexist(id)
        return toGroupResponse(group)
    }

    // UPDATE
    static async update(user: User, request: UpdateGroupRequest): Promise<GroupResponse> {
        const updateRequest = Validation.validate(GroupValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ update_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Group ada atau tidak
        await this.checkGroupMustexist(request.id)
        const group = await prismaClient.group.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toGroupResponse(group)
    }
    //REMOVE 
    static async remove(user: User, id: number): Promise<GroupResponse> {
        await this.checkGroupMustexist(id)
        const group = await prismaClient.group.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return group
    }
    //SEARCH 
    static async search(user: User, request: SearchGroupRequest): Promise<Pageable<GroupResponse>> {
        const searchRequest = Validation.validate(GroupValidation.SEARCH, request);
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
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        // check if pic exists
        if (searchRequest.pic) {
            filters.push({
                pic: {
                    contains: searchRequest.pic
                }
            })
        }
        // check if status exists
        if (searchRequest.status) {
            filters.push({
                status: {
                    contains: searchRequest.status
                }
            })
        }
        const groups = await prismaClient.group.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.group.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: groups.map(group => toGroupResponse(group)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size,
                total_rows: total
            }
        }
    }

}