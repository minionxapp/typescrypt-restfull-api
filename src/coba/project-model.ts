//CreateModel
//Project-model.ts
import { Project } from '@prisma/client'
export type ProjectResponse = {
    id: number,
    project_id: number,
    name: string,
    desc: string,
}

//CreateProjectRequest
export type CreateProjectRequest = {
    id: number,
    project_id: number,
    name: string,
    desc: string,
}

//UpdateProjectRequest
export type UpdateProjectRequest = {
    id: number,
    project_id: number,
    name: string,
    desc: string,
}

//SearchProjectRequest
export type SearchProjectRequest = {
    //id: number,
    // project_id?: number,
    name?: string | null,
    desc?: string | null,
    page: number,
    size: number,
}

//toProjectResponse
export function toProjectResponse(project: Project): ProjectResponse {
    return {
        id: project.id,
        project_id: project.project_id,
        name: project.name,
        desc: project.desc,
    }
}

