
//CreateModel
//Dev_tablex-model.ts
import { Dev_tablex } from '@prisma/client'
export type Dev_tablexResponse = {
    id: number,
    name?: string | null,
    desc?: string | null,
}

//CreateDev_tablexRequest
export type CreateDev_tablexRequest = {
    id: number,
    name: string ,//perbaiki unutk yang tidak boleh nulll
    desc: string ,
}

//UpdateDev_tablexRequest
export type UpdateDev_tablexRequest = {
    id: number,
    name: string ,//pernaiki unutk yang mengandul not null coyyyyy
    desc: string 
}

//SearchDev_tablexRequest
export type SearchDev_tablexRequest = {
    //id: number,
    name?: string | null,
    desc?: string | null,
    page: number,
    size: number,
}

//toDev_tablexResponse
export function toDev_tablexResponse(dev_tablex: Dev_tablex): Dev_tablexResponse {
    return {
        id: dev_tablex.id,
        name: dev_tablex.name,
        desc: dev_tablex.desc,
    }
}

