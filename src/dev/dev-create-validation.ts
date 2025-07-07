import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'
export class DevCreateValidation {
static async createValidation(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = await Util.camelCase(await Util.capitalizeFirstLetter(table.name))
        const columns = await DevUtil.getColoumn(tabelId)
        let validatex = "\n//CREATE validation " + tableName + "-validation.ts\n"
        validatex = validatex + '\nimport { z, ZodType } from "zod"; \n\n'
        validatex = validatex + 'export class ' + tableName + 'Validation {\n'
        validatex = validatex + 'static readonly CREATE: ZodType = z.object({\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type === 'Varchar') {
                if (element.is_null === 'N')
                    validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n'
                else
                    validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n'
            }

            if (element.type == 'Number') {
                validatex = validatex + element.name + ': z.number().min(1).positive(),'
            }
        }
        validatex = validatex + '})\n\n'


        //Update validation
        validatex = validatex + "//UPDATE validation\n"
        validatex = validatex + 'static readonly UPDATE: ZodType = z.object({\nid: z.number().positive(),\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type === 'Varchar') {
                if (element.is_null === 'N')
                    validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n'
                else
                    validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n'
            }

            if (element.type == 'Number') {
                validatex = validatex + element.name + ': z.number().min(1).positive(),'
            }
        }
        validatex = validatex + '})\n\n'

        //Search validation
        validatex = validatex + "//SEARCH validation\n"
        validatex = validatex + 'static readonly SEARCH: ZodType = z.object({\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type === 'Varchar') {
                if (element.is_null === 'N')
                    //z.string().min(1).optional(),
                    validatex = validatex + element.name + ': z.string().min(1).optional()' + ',\n'
                else
                    validatex = validatex + element.name + ': z.string()' + '.optional(),\n'
            }

            if (element.type == 'Number') {
                // validatex = validatex + element.name + ': z.number().min(1).positive(),\n'
            }
        }
        validatex = validatex + 'page : z.number().min(1).positive(),\n' +
            'size : z.number().min(1).max(100).positive()\n'
        validatex = validatex + '})\n}\n'
        // console.log(validatex)
        return validatex

    }
}