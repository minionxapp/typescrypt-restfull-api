//CreateModel
//Project-model.ts
import { Project } from '@prisma/client'
export type ProjectResponse = {
    id: number,
    name: string,
    desc: string,
    project_id: number,
}

//CreateProjectRequest
export type CreateProjectRequest = {
    id: number,
    name: string,
    desc: string,
    project_id: number,
}

//UpdateProjectRequest
export type UpdateProjectRequest = {
    id: number,
    name: string,
    desc: string,
    project_id: number,
}

//SearchProjectRequest
export type SearchProjectRequest = {
    //id: number,
    name: string,
    desc: string,
    page: number,
    size: number,
}

//toProjectResponse
export function toProjectResponse(project: Project): ProjectResponse {
    return {
        id: project.id,
        name: project.name,
        desc: project.desc,
        project_id: project.project_id,
    }
}

