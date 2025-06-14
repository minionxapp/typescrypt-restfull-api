//CREATE validation Project-validation.ts

//CREATE validation

import { z, ZodType } from "zod"; 

export class ProjectValidation {
static readonly CREATE: ZodType = z.object({
project_id: z.number().min(1).positive(),name: z.string().min(1).max(100),
desc: z.string().min(1).max(256),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
project_id: z.number().min(1).positive(),name: z.string().min(1).max(100),
desc: z.string().min(1).max(256),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
// project_id: z.number().min(1).positive(),//z.number().min(1).positive(),name: z.string().min(1).optional(),
desc: z.string().min(1).optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
