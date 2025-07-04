//CreateModel
//DevDirektori-model.ts

import { DevDirektori } from '@prisma/client'
export type DevDirektoriResponse = {
    id: number,
    username: string,
    direktori?: string | null,
}

//CreateDevDirektoriRequest
export type CreateDevDirektoriRequest = {
    id: number,
    username: string,
    direktori?: string | null,
}

//UpdateDevDirektoriRequest
export type UpdateDevDirektoriRequest = {
    id: number,
    username: string,
    direktori?: string | null,
}

//SearchDevDirektoriRequest
export type SearchDevDirektoriRequest = {
    //id: number,
    username: string,
    direktori?: string | null,
    page: number,
    size: number,
}

//toDevDirektoriResponse
export function toDevDirektoriResponse(dev_direktori: DevDirektori): DevDirektoriResponse {
    return {
        id: dev_direktori.id,
        username: dev_direktori.username,
        direktori: dev_direktori.direktori,
    }
}



