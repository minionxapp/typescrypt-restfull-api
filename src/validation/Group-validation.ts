//CREATE validation Group-validation.ts
//CREATE validation

import { z, ZodType } from "zod";

export class GroupValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        desc: z.string().max(250).optional(),
        pic: z.string().max(250).optional(),
        status: z.string().min(1).max(3),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100),
        desc: z.string().max(250).optional(),
        pic: z.string().max(250).optional(),
        status: z.string().min(1).max(3),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        name: z.string().min(1).optional(),
        desc: z.string().optional(),
        pic: z.string().optional(),
        status: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}