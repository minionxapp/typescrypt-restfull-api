//CreateModel
//DevTableKolom-model.ts

import { DevTableKolom } from '@prisma/client'
export type DevTableKolomResponse = {
    id: number,
    name: string,
    table_id: number,
    table_name: string,
    desc: string,
    length: number,
    is_id: string,
    is_null: string,
    is_uniq: string,
    default: string,
    type: string,
}

//CreateDevTableKolomRequest
export type CreateDevTableKolomRequest = {
    id: number,
    name: string,
    table_id: number,
    table_name: string,
    desc: string,
    length: number,
    is_id: string,
    is_null: string,
    is_uniq: string,
    default: string,
    type: string,
}

//UpdateDevTableKolomRequest
export type UpdateDevTableKolomRequest = {
    id: number,
    name: string,
    table_id: number,
    table_name: string,
    desc: string,
    length: number,
    is_id: string,
    is_null: string,
    is_uniq: string,
    default: string,
    type: string,
}

//SearchDevTableKolomRequest
export type SearchDevTableKolomRequest = {
    //id: number,
    name: string,
    table_name: string,
    desc: string,
    is_id: string,
    is_null: string,
    is_uniq: string,
    default: string,
    table_id :number,
    type: string,
    page: number,
    size: number,
}

//toDevTableKolomResponse
export function toDevTableKolomResponse(dev_table_kolom: DevTableKolom): DevTableKolomResponse {
    return {
        id: dev_table_kolom.id,
        name: dev_table_kolom.name,
        table_id: dev_table_kolom.table_id,
        table_name: dev_table_kolom.table_name,
        desc: dev_table_kolom.desc,
        length: dev_table_kolom.length,
        is_id: dev_table_kolom.is_id,
        is_null: dev_table_kolom.is_null,
        is_uniq: dev_table_kolom.is_uniq,
        default: dev_table_kolom.default,
        type: dev_table_kolom.type,
    }
}

