//CREATE validation Dev_tablex-validation.ts

//CREATE validation

import { z, ZodType } from "zod"; 

export class Dev_tablexValidation {
static readonly CREATE: ZodType = z.object({
name: z.string().max(100),
desc: z.string().max(100),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
name: z.string().min(1).max(100),///perbaii coy yang mengndung not nulll
desc: z.string().min(1).max(100),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
name: z.string().optional(),
desc: z.string().optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
