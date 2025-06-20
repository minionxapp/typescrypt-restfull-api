//CREATE validation Dev_project-validation.ts

//CREATE validation

import { z, ZodType } from "zod"; 

export class Dev_projectValidation {
static readonly CREATE: ZodType = z.object({
name: z.string().min(1).max(100),
desc: z.string().min(1).max(100),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
name: z.string().min(1).max(100),
desc: z.string().min(1).max(100),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
name: z.string().min(1).optional(),
desc: z.string().min(1).optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
