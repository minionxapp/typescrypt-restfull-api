"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDevTableColumnResponse = toDevTableColumnResponse;
exports.toDevTableResponse = toDevTableResponse;
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
function toDevTableColumnResponse(devTableColumn) {
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
    };
}
function toDevTableResponse(devTable) {
    return {
        id: devTable.id,
        name: devTable.name,
        desc: devTable.desc
    };
}
