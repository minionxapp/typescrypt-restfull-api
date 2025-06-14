//Create Service 

//utuk coba--> disesuaikan dulu
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ProjectResponse, CreateProjectRequest, SearchProjectRequest, toProjectResponse, UpdateProjectRequest } from "../coba/project-model";
import { Pageable } from "../model/page";
import { ProjectValidation } from "../coba/project-validation";
import { Validation } from "../validation/validation";
import { User, Project } from "@prisma/client";
export class ProjectService {
    static async create(user: User, request: CreateProjectRequest): Promise<ProjectResponse> {
        const createRequest = Validation.validate(ProjectValidation.CREATE, request)
        const record = {
            ...createRequest,//dari object yang ada
            ...{ create_by: user.name }, //tambahkan username, dengan value dari object user
            ...{ create_at: new Date() }
        }  //tambahkan username, dengan value dari object user}
        const project = await prismaClient.project.create({
            data: record
        })
        return toProjectResponse(project)
    }

    // CEK EXIST
    //function untuk getProject biar bisa dipakai berulang
    static async checkProjectMustexist(projectId: number): Promise<Project> {
        const project = await prismaClient.project.findFirst({
            where: {
                id: projectId,
            }
        })
        if (!project) {
            throw new ResponseError(404, "Project not found")
        }
        return project
    }

    // GET
    static async get(user: User, id: number): Promise<ProjectResponse> {
        const project = await this.checkProjectMustexist(id)
        return toProjectResponse(project)
    }

    // UPDATE
    static async update(user: User, request: UpdateProjectRequest): Promise<ProjectResponse> {
        const updateRequest = Validation.validate(ProjectValidation.UPDATE, request)
        const record = {
            ...updateRequest,//dari object yang ada
            ...{ create_by: user.name },
            ...{ update_at: new Date() }  //tambahkan username, dengan value dari object user
        }
        //cek Project ada atau tidak
        await this.checkProjectMustexist(request.id)
        const project = await prismaClient.project.update({
            where: {
                id: updateRequest.id,
                //     username: user.username
            },
            data: updateRequest
        })
        return toProjectResponse(project)
    }
    //REMOVE 
    static async remove(user: User, id: number): Promise<ProjectResponse> {
        await this.checkProjectMustexist(id)
        const project = await prismaClient.project.delete({
            where: {
                id: id,
                //username: user.username
            }
        })
        return project
    }
    //SEARCH 
    static async search(user: User, request: SearchProjectRequest): Promise<Pageable<ProjectResponse>> {
        const searchRequest = Validation.validate(ProjectValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;
        const filters = [];
        // check if name exists
        // check if name exists
        if (searchRequest.name) {
            filters.push({
                name: {
                    contains: searchRequest.name
                }
            })
        }
        // check if desc exists
        if (searchRequest.desc) {
            filters.push({
                desc: {
                    contains: searchRequest.desc
                }
            })
        }
        const projects = await prismaClient.project.findMany({
            where: {
                // username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });
        const total = await prismaClient.project.count({
            where: {
                //username: user.username,
                AND: filters
            },
        })
        return {
            data: projects.map(project => toProjectResponse(project)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

}