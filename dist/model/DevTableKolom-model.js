"use strict";
//CreateModel
//DevTableKolom-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDevTableKolomResponse = toDevTableKolomResponse;
//toDevTableKolomResponse
function toDevTableKolomResponse(dev_table_kolom) {
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
    };
}
