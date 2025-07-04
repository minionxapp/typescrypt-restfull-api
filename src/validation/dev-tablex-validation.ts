//CREATE validation Dev_tablex-validation.ts

//CREATE validation

import { z, ZodType } from "zod"; 

export class Dev_tablexValidation {
static readonly CREATE: ZodType = z.object({
name: z.string().min(1).max(100),
desc: z.string().min(1).max(100),
project_id: z.number().min(1).positive(),})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
name: z.string().min(1).max(100),
desc: z.string().min(1).max(100),
project_id: z.number().min(1).positive(),})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
project_id: z.number().min(1).positive(),
name: z.string().min(1).optional(),
desc: z.string().min(1).optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
