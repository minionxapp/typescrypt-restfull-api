//CreateModel
//Tablecoba-model.ts
import { Tablecoba } from '@prisma/client'
export type TablecobaResponse = {
id: number,
first_name: string,
last_name?: string | null,
email: string,
phone?: string | null,
address?: string | null,
username: string,
}

//CreateTablecobaRequest
export type CreateTablecobaRequest = {
id: number,
first_name: string,
last_name?: string | null,
email: string,
phone?: string | null,
address?: string | null,
username: string,
}

//UpdateTablecobaRequest
export type UpdateTablecobaRequest = {
id: number,
first_name: string,
last_name?: string | null,
email: string,
phone?: string | null,
address?: string | null,
username: string,
}

//SearchTablecobaRequest
export type SearchTablecobaRequest = {
//id: number,
first_name: string,
last_name?: string | null,
email: string,
phone?: string | null,
address?: string | null,
username: string,
page : number,
size : number,
}

//toTablecobaResponse
export function toTablecobaResponse(tablecoba: Tablecoba): TablecobaResponse {
return { 
id: tablecoba.id,
first_name:tablecoba.first_name,
last_name:tablecoba.last_name,
email:tablecoba.email,
phone:tablecoba.phone,
address:tablecoba.address,
username:tablecoba.username,
}
}

