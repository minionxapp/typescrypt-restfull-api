"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDev_projectResponse = toDev_projectResponse;
//toDev_projectResponse
function toDev_projectResponse(dev_project) {
    return {
        id: dev_project.id,
        name: dev_project.name,
        desc: dev_project.desc,
    };
}
