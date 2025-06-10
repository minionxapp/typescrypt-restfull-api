import { DevTableColumn, DevTable } from "@prisma/client";
/*
model DevTableColumn {
  id         Int    @id @default(autoincrement())
  table_id   Int
  table_name String @db.VarChar(100)
  name       String @db.VarChar(100)
  desc       String @db.VarChar(255)
  type       String @db.VarChar(20) //varchar,numeric,date,time dll
  length     Int    @default(1)
  is_id      String @db.VarChar(2) //Yes,No
  is_null    String @db.VarChar(2) //Yes,NO
  is_uniq    String @db.VarChar(2) //Yesy, NO
  default    String @db.VarChar(20)
*/
export function toDevTableColumnResponse(devTableColumn: DevTableColumn): DevTableColumnResponse {
    return {
        id: devTableColumn.id,
        table_id: devTableColumn.table_id,
        table_name: devTableColumn.table_name,
        name: devTableColumn.name,
        desc: devTableColumn.desc,
        type: devTableColumn.type,
        length: devTableColumn.length,
        is_id: devTableColumn.is_id,
        is_null: devTableColumn.is_null,
        is_uniq: devTableColumn.is_uniq,
        default: devTableColumn.default
    }

}

export type DevTableColumnResponse = {
    id: number,
    table_id: number,
    table_name: string,
    name: string,
    desc: string,
    type: string,
    length: number,
    is_id: string,
    is_null: string,
    is_uniq: string,
    default: string
}

export type DevTableResponse = {
    id: number,
    name: string,
    desc: string | null
}
export function toDevTableResponse(devTable: DevTable): DevTableResponse {
    return {
        id: devTable.id,
        name: devTable.name,
        desc: devTable.desc
    }
}