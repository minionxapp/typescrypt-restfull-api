"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDev_tablexResponse = toDev_tablexResponse;
//toDev_tablexResponse
function toDev_tablexResponse(dev_tablex) {
    return {
        id: dev_tablex.id,
        name: dev_tablex.name,
        desc: dev_tablex.desc,
        project_id: dev_tablex.project_id,
    };
}
