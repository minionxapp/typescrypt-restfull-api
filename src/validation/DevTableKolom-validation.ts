//CREATE validation DevTableKolom-validation.ts
//CREATE validation

import { z, ZodType } from "zod";

export class DevTableKolomValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(100),
        table_id: z.number().min(1).positive(), 
        table_name: z.string().min(1).max(100),
        desc: z.string().min(1).max(100),
        length: z.number().min(1).positive(), 
        is_id: z.string().min(1).max(100),
        is_null: z.string().min(1).max(100),
        is_uniq: z.string().min(1).max(100),
        default: z.string().min(1).max(100),
        type: z.string().min(1).max(100),
    })

    //UPDATE validation
    static readonly UPDATE: ZodType = z.object({
        id: z.number().positive(),
        name: z.string().min(1).max(100),
        table_id: z.number().min(1).positive(), table_name: z.string().min(1).max(100),
        desc: z.string().min(1).max(100),
        length: z.number().min(1).positive(), is_id: z.string().min(1).max(100),
        is_null: z.string().min(1).max(100),
        is_uniq: z.string().min(1).max(100),
        default: z.string().min(1).max(100),
        type: z.string().min(1).max(100),
    })

    //SEARCH validation
    static readonly SEARCH: ZodType = z.object({
        name: z.string().min(1).optional(),
        table_name: z.string().min(1).optional(),
        desc: z.string().min(1).optional(),
        is_id: z.string().min(1).optional(),
        is_null: z.string().min(1).optional(),
        is_uniq: z.string().min(1).optional(),
        default: z.string().min(1).optional(),
         table_id: z.number().min(1).optional(),
        type: z.string().min(1).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}


