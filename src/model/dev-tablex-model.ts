//CreateModel
//Dev_tablex-model.ts
import { Dev_tablex } from '@prisma/client'
export type Dev_tablexResponse = {
id: number,
name: string,
desc: string,
project_id: number,
}

//CreateDev_tablexRequest
export type CreateDev_tablexRequest = {
id: number,
name: string,
desc: string,
project_id: number,
}

//UpdateDev_tablexRequest
export type UpdateDev_tablexRequest = {
id: number,
name: string,
desc: string,
project_id: number,
}

//SearchDev_tablexRequest
export type SearchDev_tablexRequest = {
//id: number,
name: string,
desc: string,
page : number,
size : number,
}

//toDev_tablexResponse
export function toDev_tablexResponse(dev_tablex: Dev_tablex): Dev_tablexResponse {
return { 
id: dev_tablex.id,
name:dev_tablex.name,
desc:dev_tablex.desc,
project_id:dev_tablex.project_id,
}
}

