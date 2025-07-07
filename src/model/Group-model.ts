
//CreateModel
//Group-model.ts

import { Group } from '@prisma/client'
export type GroupResponse = {
    id: number,
    name: string,
    desc?: string | null,
    pic?: string | null,
    status: string,
}

//CreateGroupRequest
export type CreateGroupRequest = {
    id: number,
    name: string,
    desc?: string | null,
    pic?: string | null,
    status: string,
}

//UpdateGroupRequest
export type UpdateGroupRequest = {
    id: number,
    name: string,
    desc?: string | null,
    pic?: string | null,
    status: string,
}

//SearchGroupRequest
export type SearchGroupRequest = {
    //id: number,
    name: string,
    desc?: string | null,
    pic?: string | null,
    status: string,
    page: number,
    size: number,
}

//toGroupResponse
export function toGroupResponse(group: Group): GroupResponse {
    return {
        id: group.id,
        name: group.name,
        desc: group.desc,
        pic: group.pic,
        status: group.status,
    }
}
