"use strict";
//CreateModel
//DevDirektori-model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDevDirektoriResponse = toDevDirektoriResponse;
//toDevDirektoriResponse
function toDevDirektoriResponse(dev_direktori) {
    return {
        id: dev_direktori.id,
        username: dev_direktori.username,
        direktori: dev_direktori.direktori,
    };
}
