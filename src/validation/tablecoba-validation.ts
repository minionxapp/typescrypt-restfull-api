//CREATE validation Tablecoba-validation.ts

//CREATE validation

import { z, ZodType } from "zod"; 

export class TablecobaValidation {
static readonly CREATE: ZodType = z.object({
first_name: z.string().min(1).max(100),
last_name: z.string().max(100).optional(),
email: z.string().min(1).max(100),
phone: z.string().max(20).optional(),
address: z.string().max(20).optional(),
username: z.string().min(1).max(20),
})

//UPDATE validation
static readonly UPDATE: ZodType = z.object({
id: z.number().positive(),
first_name: z.string().min(1).max(100),
last_name: z.string().max(100).optional(),
email: z.string().min(1).max(100),
phone: z.string().max(20).optional(),
address: z.string().max(20).optional(),
username: z.string().min(1).max(20),
})

//SEARCH validation
static readonly SEARCH: ZodType = z.object({
first_name: z.string().min(1).optional(),
last_name: z.string().optional(),
email: z.string().min(1).optional(),
phone: z.string().optional(),
address: z.string().optional(),
username: z.string().min(1).optional(),
page : z.number().min(1).positive(),
size : z.number().min(1).max(100).positive()
})
}
