"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProjectResponse = toProjectResponse;
//toProjectResponse
function toProjectResponse(project) {
    return {
        id: project.id,
        name: project.name,
        desc: project.desc,
        project_id: project.project_id,
    };
}
