//CreateModel
//Dev_project-model.ts
import { Dev_project } from '@prisma/client'
export type Dev_projectResponse = {
id: number,
name: string,
desc: string,
}

//CreateDev_projectRequest
export type CreateDev_projectRequest = {
id: number,
name: string,
desc: string,
}

//UpdateDev_projectRequest
export type UpdateDev_projectRequest = {
id: number,
name: string,
desc: string,
}

//SearchDev_projectRequest
export type SearchDev_projectRequest = {
//id: number,
name: string,
desc: string,
page : number,
size : number,
}

//toDev_projectResponse
export function toDev_projectResponse(dev_project: Dev_project): Dev_projectResponse {
return { 
id: dev_project.id,
name:dev_project.name,
desc:dev_project.desc,
}
}

