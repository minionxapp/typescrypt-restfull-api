import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { Pageable } from "../model/page";
import { Util } from "../util/util";
import { writeFileSync } from "fs";

export class DevService {

    static async getColoumn(tabelId: number): Promise<Array<DevTableColumnResponse>> {
        const result = await prismaClient.devTableColumn.findMany({
            where: {
                table_id: tabelId
            }
        })
        return result
    }
    static async getTable(tabelId: number): Promise<DevTableResponse> {
        const result = await prismaClient.devTable.findFirst({
            where: {
                id: tabelId
            }
        })
        return toDevTableResponse(result!)
    }

    static async createSchema(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)
        // console.log(columns)
        let model = "//Screate Schema\n //schema.prisma\n\n"
        model = model + 'model ' + (await Util.capitalizeFirstLetter(tableName)).toString() + ' {\n'
        model = model + 'id         Int    @id @default(autoincrement())\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            model = model + element.name
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + " String? @db.VarChar" + '(' + element.length + ')\n'
                } else {
                    model = model + " String @db.VarChar" + '(' + element.length + ')\n'
                }
            }
            if (element.type == 'Number') {
                model = model + " Int \n"
            }
        }
        model = model + '@@map("' + (tableName.toLocaleLowerCase()) + 's")\n'
        model = model + "}\n"
        // console.log(model)
        return model
    }

    static async createModel(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)
        //tabelResponse
        let model = '//CreateModel\n//' + tableName + '-model.ts\n'
        model = model + "import { " + tableName + " } from '@prisma/client'\n"

        model = model + 'export type ' + tableName + 'Response = {\nid: number,\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + element.name + "?: string | null," + "\n"
                } else {
                    model = model + element.name + ": string," + "\n"
                }
            }
            if (element.type == 'Number') {
                model = model + element.name + ": number" + ",\n"
            }
        }
        model = model + "}\n\n"
        // //createRequest
        model = model + '//Create' + tableName + 'Request\n'
        model = model + 'export type Create' + tableName + 'Request = {\nid: number,\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + element.name + "?: string | null," + "\n"
                } else {
                    model = model + element.name + ": string," + "\n"
                }
            }
            if (element.type == 'Number') {
                model = model + element.name + ": number" + ",\n"
            }
        }
        model = model + "}\n\n"

        // //updateRequest
        model = model + '//Update' + tableName + 'Request\n'
        model = model + 'export type Update' + tableName + 'Request = {\nid: number,\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + element.name + "?: string | null," + "\n"
                } else {
                    model = model + element.name + ": string," + "\n"
                }
            }
            if (element.type == 'Number') {
                model = model + element.name + ": number" + ",\n"
            }
        }
        model = model + "}\n\n"

        // //SearchRequest
        model = model + '//Search' + tableName + 'Request\n'
        model = model + 'export type Search' + tableName + 'Request = {\nid: number,\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.is_null == 'Y') {
                    model = model + element.name + "?: string | null," + "\n"
                } else {
                    model = model + element.name + ": string," + "\n"
                }
            }
            if (element.type == 'Number') {
                model = model + element.name + ": number" + ",\n"
            }
        }
        model = model + "page : number," + "\n"
        model = model + "size : number," + "\n"
        model = model + "}\n\n"

        // //toXxxxxResponse
        model = model + '//to' + tableName + 'Response\n'
        model = model + 'export function to' + tableName + 'Response(' + tableName.toLocaleLowerCase() + ': ' + tableName + '): ' + tableName + 'Response {\n'
        model = model + 'return { \n'
        model = model + 'id: ' + tableName.toLocaleLowerCase() + '.id,\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            model = model + element.name + ':' + tableName.toLocaleLowerCase() + '.' + element.name + ',\n'
        }
        model = model + "}\n"
        model = model + "}\n\n"

        // console.log(model)
        return model
    }


    //Validation
    //create validation

    static async createValidation(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)
        let validatex = "//CREATE validation " + tableName + "-validation.ts\n\n"
        validatex = validatex + '//CREATE validation\n'
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
        validatex = validatex + 'static readonly UPDATE: ZodType = z.object({\n'
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
        validatex = validatex + "//SEARCH validation\n"
        validatex = validatex + 'static readonly SEARCH: ZodType = z.object({\n'
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
        validatex = validatex + 'page : z.number().min(1).positive(),\n' +
            'size : z.number().min(1).max(100).positive()\n'
        validatex = validatex + '})\n}\n'
        // console.log(validatex)
        return validatex

    }

    static async createService(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)

        let servicex = '//Create Service \n\n//utuk coba--> disesuaikan dulu\n'
        servicex = servicex + 'import { prismaClient } from "../application/database";\n' +
            'import { ResponseError } from "../error/response-error";\n' +
            'import { ' + tableName + 'Response, Create' + tableName + 'Request, Search' + tableName + 'Request, to' + tableName + 'Response, Update' + tableName + 'Request } from "../coba/' +
            (await Util.lowerFirstLetter(tableName)).toString() + '-model";\n' +
            'import { Pageable } from "../model/page";\n' +
            'import { ' + tableName + 'Validation } from "../coba/' + (await Util.lowerFirstLetter(tableName)).toString() + '-validation";\n' +
            'import { Validation } from "../validation/validation";\n' +
            'import { User, ' + tableName + ' } from "@prisma/client";\n' +
            'export class ' + tableName + 'Service {\n' +
            'static async create(user: User, request: Create' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
            'const createRequest = Validation.validate(' + tableName + 'Validation.CREATE, request)\n' +
            'const record = {\n' +
            '...createRequest,//dari object yang ada\n' +
            '...{ username: user.name } //tambahkan username, dengan value dari object user\n' +
            '}\n' +
            'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.create({\n' +
            'data: record\n' +
            '})\n' +
            'return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
            '}\n\n'
        servicex = servicex + '// CEK EXIST\n'
        servicex = servicex + ' //function untuk get' + tableName + ' biar bisa dipakai berulang\n' +
            'static async check' + tableName + 'Mustexist( ' + (await Util.lowerFirstLetter(tableName)).toString() + 'Id: number): Promise<' + tableName + '> {\n' +
            'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.findFirst({\n' +
            'where: {\n' +
            'id: ' + (await Util.lowerFirstLetter(tableName)).toString() + 'Id,\n' +
            '}\n' +
            '})\n' +
            'if (!' + (await Util.lowerFirstLetter(tableName)).toString() + ') {\n' +
            'throw new ResponseError(404, "Contact not found")\n' +
            '}\n' +
            'return ' + (await Util.lowerFirstLetter(tableName)).toString() + '\n' +
            '}\n\n'

        servicex = servicex + '// GET\n'
        servicex = servicex + ' static async get(id: number): Promise<' + tableName + 'Response> {\n' +
            'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await this.check' + tableName + 'Mustexist(id)\n' +
            'return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
            '}\n\n'

        servicex = servicex + '// UPDATE\n'
        servicex = servicex + ' static async update(user: User, request: Update' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
            ' const updateRequest = Validation.validate(' + tableName + 'Validation.UPDATE, request)\n' +
            ' //cek ' + tableName + ' ada atau tidak\n' +
            ' await this.check' + tableName + 'Mustexist(request.id)\n' +
            ' const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.update({\n' +
            '    where: {\n' +
            '       id: updateRequest.id,\n' +
            '  //     username: user.username\n' +
            '  },\n' +
            '  data: updateRequest\n' +
            ' })\n' +
            ' return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
            '}\n'

        servicex = servicex + "//REMOVE \n"
        servicex = servicex + ' static async remove(/*user: User, */id: number): Promise<' + tableName + 'Response> {\n' +
            ' await this.check' + tableName + 'Mustexist( id)\n' +
            ' const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.delete({\n' +
            ' where: {\n' +
            ' id: id,\n' +
            ' //username: user.username\n' +
            ' }\n' +
            ' })\n' +
            ' return ' + (await Util.lowerFirstLetter(tableName)).toString() + '\n' +
            ' }\n'

        servicex = servicex + "//SEARCH \n"
        servicex = servicex + ' static async search(user: User, request: Search' + tableName + 'Request) : Promise<Pageable<' + tableName + 'Response>> {\n' +
            ' const searchRequest = Validation.validate(' + tableName + 'Validation.SEARCH, request);\n' +
            ' const skip = (searchRequest.page - 1) * searchRequest.size;\n' +

            ' const filters = [];\n' +
            ' // check if name exists\n'

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            servicex = servicex + ' // check if '+element.name+' exists\n' +
                'if(searchRequest.' + element.name + '){\n'+
            'filters.push({\n'+
            '   ' + element.name + ': {\n'+
            '      contains: searchRequest.' + element.name + '\n'+
            ' }\n'+
            '})\n'+
            '}\n'

        }
servicex = servicex +'const '+(await Util.lowerFirstLetter(tableName)).toString() +'s = await prismaClient.'+(await Util.lowerFirstLetter(tableName)).toString() +'.findMany({\n'+
            'where: {\n'+
             '  // username: user.username,\n'+
              '  AND: filters\n'+
            '},\n'+
            'take: searchRequest.size,\n'+
            'skip: skip\n'+
        '});\n'+

        'const total = await prismaClient.'+(await Util.lowerFirstLetter(tableName)).toString() +'.count({\n'+
        '    where: {\n'+
        '        //username: user.username,\n'+
        '        AND: filters\n'+
        '    },\n'+
        '})\n'+

        'return {\n'+
        '    data: '+(await Util.lowerFirstLetter(tableName)).toString() +'s.map('+(await Util.lowerFirstLetter(tableName)).toString() +
                ' => to'+tableName+'Response('+(await Util.lowerFirstLetter(tableName)).toString() +')),\n'+
        '    paging: {\n'+
        '        current_page: searchRequest.page,\n'+
        '        total_page: Math.ceil(total / searchRequest.size),\n'+
        '        size: searchRequest.size\n'+
        '    }\n'+
        '}\n}\n'
        /*
        // check if email exists
                if(searchRequest.email){
                    filters.push({
                        email: {
                            contains: searchRequest.email
                        }
                    })
                }
        */
        servicex = servicex + '\n}'
        console.log(servicex)
        return servicex
    }





    //create filenya
    static async createFiles(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.lowerFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)

        let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        file = folder + 'src/coba/' + tableName + '-model.ts\n'
        Util.createFile(file, (await this.createModel(tabelId)).toString())

        file = folder + 'src/coba/' + tableName + '-validation.ts\n\n'
        Util.createFile(file, (await this.createValidation(tabelId)).toString())

        // file = folder+'src/coba/'+ tableName+'-service.ts\n'
        // Util.createFile(file,(await this.crea(tabelId)).toString())
        file = folder + 'src/coba/' + tableName + '-service.ts\n\n'
        Util.createFile(file, (await this.createService(tabelId)).toString())


        folder = 'rm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + 'src/coba/' + tableName + '-model.ts\n'
        file = file + folder + 'src/coba/' + tableName + '-validation.ts\n'
        file = file + folder + 'src/coba/' + tableName + '-service.ts\n'


        console.log(file)

        return ''

    }


}//end class



