import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { Pageable } from "../model/page";
import { Util } from "../util/util";
import { writeFileSync } from "fs";

export class DevService {
    // ambil kolom tabel
    static async getColoumn(tabelId: number): Promise<Array<DevTableColumnResponse>> {
        const result = await prismaClient.devTableColumn.findMany({
            where: {
                table_id: tabelId
            }
        })
        return result
    }
    // ambil table
    static async getTable(tabelId: number): Promise<DevTableResponse> {
        const result = await prismaClient.dev_tablex.findFirst({
            where: {
                id: tabelId
            }
        })
        return toDevTableResponse(result!)
    }

    // static async createSchema(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const columns = await this.getColoumn(tabelId)
    //     // console.log(columns)
    //     let model = "//Screate Schema\n //schema.prisma\n\n"
    //     model = model + 'model ' + (await Util.capitalizeFirstLetter(tableName)).toString() + ' {\n'
    //     model = model + 'id         Int    @id @default(autoincrement())\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         model = model + element.name
    //         if (element.type == 'Varchar') {
    //             if (element.is_null == 'Y') {
    //                 model = model + " String? @db.VarChar" + '(' + element.length + ')\n'
    //             } else {
    //                 model = model + " String @db.VarChar" + '(' + element.length + ')\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             model = model + " Int \n"
    //         }
    //     }
    //     model = model + ' create_by   String  @db.VarChar(20)\n' +
    //         'update_by   String?  @db.VarChar(20)\n' +
    //         'create_at   DateTime? \n' +
    //         'update_at   DateTime? \n'
    //     model = model + '@@map("' + (tableName.toLocaleLowerCase()) + 's")\n'
    //     model = model + "}\n"
    //     // console.log(model)
    //     return model
    // }
    // Create Model
    // static async createModel(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const columns = await this.getColoumn(tabelId)
    //     //tabelResponse
    //     let model = '//CreateModel\n//' + tableName + '-model.ts\n'
    //     model = model + "import { " + tableName + " } from '@prisma/client'\n"

    //     model = model + 'export type ' + tableName + 'Response = {\nid: number,\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.is_null == 'Y') {
    //                 model = model + element.name + "?: string | null," + "\n"
    //             } else {
    //                 model = model + element.name + ": string," + "\n"
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             model = model + element.name + ": number" + ",\n"
    //         }
    //     }
    //     model = model + "}\n\n"
    //     // //createRequest
    //     model = model + '//Create' + tableName + 'Request\n'
    //     model = model + 'export type Create' + tableName + 'Request = {\nid: number,\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.is_null == 'Y') {
    //                 model = model + element.name + "?: string | null," + "\n"
    //             } else {
    //                 model = model + element.name + ": string," + "\n"
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             model = model + element.name + ": number" + ",\n"
    //         }
    //     }
    //     model = model + "}\n\n"

    //     // //updateRequest
    //     model = model + '//Update' + tableName + 'Request\n'
    //     model = model + 'export type Update' + tableName + 'Request = {\nid: number,\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.is_null == 'Y') {
    //                 model = model + element.name + "?: string | null," + "\n"
    //             } else {
    //                 model = model + element.name + ": string," + "\n"
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             model = model + element.name + ": number" + ",\n"
    //         }
    //     }
    //     model = model + "}\n\n"

    //     // //SearchRequest
    //     model = model + '//Search' + tableName + 'Request\n'
    //     model = model + 'export type Search' + tableName + 'Request = {\n//id: number,\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.is_null == 'Y') {
    //                 model = model + element.name + "?: string | null," + "\n"
    //             } else {
    //                 model = model + element.name + ": string," + "\n"
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             // model = model + element.name + ": number" + ",\n"
    //         }
    //     }
    //     model = model + "page : number," + "\n"
    //     model = model + "size : number," + "\n"
    //     model = model + "}\n\n"

    //     // //toXxxxxResponse
    //     model = model + '//to' + tableName + 'Response\n'
    //     model = model + 'export function to' + tableName + 'Response(' + tableName.toLocaleLowerCase() + ': ' + tableName + '): ' + tableName + 'Response {\n'
    //     model = model + 'return { \n'
    //     model = model + 'id: ' + tableName.toLocaleLowerCase() + '.id,\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         model = model + element.name + ':' + tableName.toLocaleLowerCase() + '.' + element.name + ',\n'
    //     }
    //     model = model + "}\n"
    //     model = model + "}\n\n"

    //     // console.log(model)
    //     return model
    // }


    //Validation //create validation
    // static async createValidation(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const columns = await this.getColoumn(tabelId)
    //     let validatex = "//CREATE validation " + tableName + "-validation.ts\n\n"
    //     validatex = validatex + '//CREATE validation\n'
    //     validatex = validatex + '\nimport { z, ZodType } from "zod"; \n\n'
    //     validatex = validatex + 'export class ' + tableName + 'Validation {\n'
    //     validatex = validatex + 'static readonly CREATE: ZodType = z.object({\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type === 'Varchar') {
    //             if (element.is_null === 'N')
    //                 validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n'
    //             else
    //                 validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n'
    //         }

    //         if (element.type == 'Number') {
    //             validatex = validatex + element.name + ': z.number().min(1).positive(),'
    //         }
    //     }
    //     validatex = validatex + '})\n\n'


    //     //Update validation
    //     validatex = validatex + "//UPDATE validation\n"
    //     validatex = validatex + 'static readonly UPDATE: ZodType = z.object({\nid: z.number().positive(),\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type === 'Varchar') {
    //             if (element.is_null === 'N')
    //                 validatex = validatex + element.name + ': z.string().min(1).max(' + element.length + '),\n'
    //             else
    //                 validatex = validatex + element.name + ': z.string().max(' + element.length + ').optional(),\n'
    //         }

    //         if (element.type == 'Number') {
    //             validatex = validatex + element.name + ': z.number().min(1).positive(),'
    //         }
    //     }
    //     validatex = validatex + '})\n\n'

    //     //Search validation
    //     validatex = validatex + "//SEARCH validation\n"
    //     validatex = validatex + 'static readonly SEARCH: ZodType = z.object({\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type === 'Varchar') {
    //             if (element.is_null === 'N')
    //                 //z.string().min(1).optional(),
    //                 validatex = validatex + element.name + ': z.string().min(1).optional()' + ',\n'
    //             else
    //                 validatex = validatex + element.name + ': z.string()' + '.optional(),\n'
    //         }

    //         if (element.type == 'Number') {
    //             // validatex = validatex + element.name + ': z.number().min(1).positive(),\n'
    //         }
    //     }
    //     validatex = validatex + 'page : z.number().min(1).positive(),\n' +
    //         'size : z.number().min(1).max(100).positive()\n'
    //     validatex = validatex + '})\n}\n'
    //     // console.log(validatex)
    //     return validatex

    // }

    // Service
    // static async createService(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const columns = await this.getColoumn(tabelId)

    //     let servicex = '//Create Service \n\n//utuk coba--> disesuaikan dulu\n'
    //     servicex = servicex + 'import { prismaClient } from "../application/database";\n' +
    //         'import { ResponseError } from "../error/response-error";\n' +
    //         'import { ' + tableName + 'Response, Create' + tableName + 'Request, Search' + tableName + 'Request, to' + tableName + 'Response, Update' + tableName + 'Request } from "../model/' +
    //         (await Util.lowerFirstLetter(tableName)).toString() + '-model";\n' +
    //         'import { Pageable } from "../model/page";\n' +
    //         'import { ' + tableName + 'Validation } from "../validation/' + (await Util.lowerFirstLetter(tableName)).toString() + '-validation";\n' +
    //         'import { Validation } from "../validation/validation";\n' +
    //         'import { User, ' + tableName + ' } from "@prisma/client";\n' +
    //         'export class ' + tableName + 'Service {\n' +
    //         'static async create(user: User, request: Create' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
    //         'const createRequest = Validation.validate(' + tableName + 'Validation.CREATE, request)\n' +
    //         'const record = {\n' +
    //         '...createRequest,//dari object yang ada\n' +
    //         '...{ create_by: user.name }, //tambahkan username, dengan value dari object user\n' +
    //         ' ...{ create_at: new Date()}}  //tambahkan username, dengan value dari object user' +
    //         '}\n' +
    //         'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.create({\n' +
    //         'data: record\n' +
    //         '})\n' +
    //         'return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
    //         '}\n\n'
    //     servicex = servicex + '// CEK EXIST\n'
    //     servicex = servicex + ' //function untuk get' + tableName + ' biar bisa dipakai berulang\n' +
    //         'static async check' + tableName + 'Mustexist( ' + (await Util.lowerFirstLetter(tableName)).toString() + 'Id: number): Promise<' + tableName + '> {\n' +
    //         'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.findFirst({\n' +
    //         'where: {\n' +
    //         'id: ' + (await Util.lowerFirstLetter(tableName)).toString() + 'Id,\n' +
    //         '}\n' +
    //         '})\n' +
    //         'if (!' + (await Util.lowerFirstLetter(tableName)).toString() + ') {\n' +
    //         'throw new ResponseError(404, "' + tableName + ' not found")\n' +
    //         '}\n' +
    //         'return ' + (await Util.lowerFirstLetter(tableName)).toString() + '\n' +
    //         '}\n\n'

    //     servicex = servicex + '// GET\n'
    //     servicex = servicex + ' static async get(user: User,id: number): Promise<' + tableName + 'Response> {\n' +
    //         'const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await this.check' + tableName + 'Mustexist(id)\n' +
    //         'return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
    //         '}\n\n'

    //     //SERVICE UPDATE
    //     servicex = servicex + '// UPDATE\n'
    //     servicex = servicex + ' static async update(user: User, request: Update' + tableName + 'Request): Promise<' + tableName + 'Response> {\n' +
    //         ' const updateRequest = Validation.validate(' + tableName + 'Validation.UPDATE, request)\n' +
    //         ' const record = {\n' +
    //         '...updateRequest,//dari object yang ada\n' +
    //         '...{ update_by: user.name },\n' +
    //         '...{ update_at: new Date()}  //tambahkan username, dengan value dari object user\n' +
    //         '}\n' +
    //         ' //cek ' + tableName + ' ada atau tidak\n' +
    //         ' await this.check' + tableName + 'Mustexist(request.id)\n' +
    //         ' const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.update({\n' +
    //         '    where: {\n' +
    //         '       id: updateRequest.id,\n' +
    //         '  //     username: user.username\n' +
    //         '  },\n' +
    //         '  data: updateRequest\n' +
    //         ' })\n' +
    //         ' return to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')\n' +
    //         '}\n'

    //     servicex = servicex + "//REMOVE \n"
    //     servicex = servicex + ' static async remove(user: User, id: number): Promise<' + tableName + 'Response> {\n' +
    //         ' await this.check' + tableName + 'Mustexist( id)\n' +
    //         ' const ' + (await Util.lowerFirstLetter(tableName)).toString() + ' = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.delete({\n' +
    //         ' where: {\n' +
    //         ' id: id,\n' +
    //         ' //username: user.username\n' +
    //         ' }\n' +
    //         ' })\n' +
    //         ' return ' + (await Util.lowerFirstLetter(tableName)).toString() + '\n' +
    //         ' }\n'

    //     servicex = servicex + "//SEARCH \n"
    //     servicex = servicex + ' static async search(user: User, request: Search' + tableName + 'Request) : Promise<Pageable<' + tableName + 'Response>> {\n' +
    //         ' const searchRequest = Validation.validate(' + tableName + 'Validation.SEARCH, request);\n' +
    //         ' const skip = (searchRequest.page - 1) * searchRequest.size;\n' +

    //         ' const filters = [];\n' +
    //         ' // check if name exists\n'

    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             servicex = servicex + ' // check if ' + element.name + ' exists\n' +
    //                 'if(searchRequest.' + element.name + '){\n' +
    //                 'filters.push({\n' +
    //                 '   ' + element.name + ': {\n' +
    //                 '      contains: searchRequest.' + element.name + '\n' +
    //                 ' }\n' +
    //                 '})\n' +
    //                 '}\n'
    //         }

    //     }
    //     servicex = servicex + 'const ' + (await Util.lowerFirstLetter(tableName)).toString() + 's = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.findMany({\n' +
    //         'where: {\n' +
    //         '  // username: user.username,\n' +
    //         '  AND: filters\n' +
    //         '},\n' +
    //         'take: searchRequest.size,\n' +
    //         'skip: skip\n' +
    //         '});\n' +

    //         'const total = await prismaClient.' + (await Util.lowerFirstLetter(tableName)).toString() + '.count({\n' +
    //         '    where: {\n' +
    //         '        //username: user.username,\n' +
    //         '        AND: filters\n' +
    //         '    },\n' +
    //         '})\n' +

    //         'return {\n' +
    //         '    data: ' + (await Util.lowerFirstLetter(tableName)).toString() + 's.map(' + (await Util.lowerFirstLetter(tableName)).toString() +
    //         ' => to' + tableName + 'Response(' + (await Util.lowerFirstLetter(tableName)).toString() + ')),\n' +
    //         '    paging: {\n' +
    //         '        current_page: searchRequest.page,\n' +
    //         '        total_page: Math.ceil(total / searchRequest.size),\n' +
    //         '        size: searchRequest.size\n' +
    //         '    }\n' +
    //         '}\n}\n'
    //     servicex = servicex + '\n}'
    //     // console.log(servicex)
    //     return servicex
    // }

    //Controller
    // static async createController(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
    //     const columns = await this.getColoumn(tabelId)
    //     let controller = '\n//Create Controller\n'

    //     controller = controller + ' import { Response,NextFunction } from "express";\n' +
    //         'import { UserRequest } from "../type/user-request";\n' +
    //         'import { Create' + tableName + 'Request,Search' + tableName + 'Request,Update' + tableName + 'Request } from "../model/' + tableNameLow + '-model";\n' +
    //         'import { ' + tableName + 'Service } from "../service/' + tableNameLow + '-service";\n' +
    //         'import { number } from "zod";\n' +
    //         'export class ' + tableName + 'Controller{\n' +
    //         ' static async create(req:UserRequest,res:Response, next:NextFunction){\n' +
    //         '        try {\n' +
    //         '            const request : Create' + tableName + 'Request = req.body as Create' + tableName + 'Request;\n' +
    //         '            const response = await ' + tableName + 'Service.create(req.user!, request)\n' +
    //         '           res.status(200).json({\n' +
    //         '               data: response\n' +
    //         '           })\n' +
    //         '       } catch (error) {\n' +
    //         '           next(error)\n' +
    //         '       }\n' +
    //         '   }\n'
    //     //GET
    //     controller = controller + ' static async get(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
    //         'try {\n' +
    //         '    const ' + tableNameLow + 'Id = Number(req.params.' + tableNameLow + 'Id)\n' +
    //         '    const response = await ' + tableName + 'Service.get(req.user!, ' + tableNameLow + 'Id)\n' +
    //         '   res.status(200).json({\n' +
    //         '       data: response\n' +
    //         '   })\n' +
    //         '} catch (error) {\n' +
    //         '    next(error)\n' +
    //         '}\n' +
    //         '}\n'
    //     //UPDATE
    //     controller = controller + 'static async update(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
    //         ' try {\n' +
    //         '    const request : Update' + tableName + 'Request = req.body as Update' + tableName + 'Request;\n' +
    //         '    request.id = Number(req.params.' + tableNameLow + 'Id)\n' +
    //         '    const response = await ' + tableName + 'Service.update(req.user!, request)\n' +
    //         '    res.status(200).json({\n' +
    //         '        data: response\n' +
    //         '    })\n' +
    //         '} catch (error) {\n' +
    //         '    next(error)\n' +
    //         '}\n' +
    //         '}\n'

    //     //REMOVE
    //     controller = controller + ' static async remove(req:UserRequest/*sudah login*/,res:Response, next:NextFunction){\n' +
    //         'try {\n' +
    //         '    const ' + tableNameLow + 'Id = Number(req.params.' + tableNameLow + 'Id)\n' +
    //         '    const response = await ' + tableName + 'Service.remove(req.user!, ' + tableNameLow + 'Id)\n' +
    //         '    res.status(200).json({\n' +
    //         '       data: "OK"\n' +
    //         '   })\n' +
    //         '} catch (error) {\n' +
    //         '    next(error)\n' +
    //         ' }\n' +
    //         '}\n'

    //     //SEARCH
    //     controller = controller + 'static async search(req: UserRequest, res: Response, next: NextFunction) {\n' +
    //         'try {\n' +
    //         '    const request: Search' + tableName + 'Request = {\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             controller = controller + element.name + ': req.query.' + element.name + ' as string,\n'
    //         }
    //         if (element.type == 'Number') {
    //             // controller = controller + element.name + ': req.query.' + element.name + ' as number,\n'
    //         }
    //     }

    //     controller = controller + '       page: req.query.page ? Number(req.query.page) : 1,\n' +
    //         '      size: req.query.size ? Number(req.query.size) : 10,\n' +
    //         '  }\n' +
    //         '  const response = await ' + tableName + 'Service.search(req.user!, request);\n' +
    //         '  res.status(200).json(response);\n' +
    //         '} catch (e) {\n' +
    //         '    next(e);\n' +
    //         '}\n' +
    //         '} \n'

    //     controller = controller + '}'
    //     // console.log(controller)
    //     return controller
    // }


    //ROUTE
    // static async createRoute(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()

    //     let route = '\n\nimport {' + tableName + 'Controller } from "../controller/' + tableNameLow + '-controller";\n\n\n//ROUTE ' + tableName + '\n' +
    //         'apiRouter.post("/api/' + tableNameLow + 's",' + tableName + 'Controller.create)\n' +
    //         'apiRouter.get("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.get)\n' +
    //         'apiRouter.put("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id",' + tableName + 'Controller.update)\n' +
    //         'apiRouter.delete("/api/' + tableNameLow + 's/:' + tableNameLow + 'Id", ' + tableName + 'Controller.remove)\n' +
    //         'apiRouter.get("/api/' + tableNameLow + 's", ' + tableName + 'Controller.search)\n'

    //     console.log(route)
    //     return route
    // }


    //UNIT TEST
    // static async createTest(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
    //     const columns = await this.getColoumn(tabelId)

    //     let test = '//Test ' + tableName + '\n'
    //     test = test + ' import supertest from "supertest"\n' +
    //         ' import { web } from "../src/application/web"\n' +
    //         ' import { ' + tableName + 'Test, UserTest } from "../test/test-util"\n' +
    //         ' import { logger } from "../src/application/logging"\n'
    //     //create test
    //     test = test + '//Create test\n' +
    //         ' describe("POST /api/' + tableNameLow + 's", () => {\n' +
    //         ' \n'
    //     let pratest = '  beforeEach(async () => {\n' +
    //         ' await UserTest.create()\n' +
    //         ' await ' + tableName + 'Test.create()\n' +
    //         ' }) \n'
    //     pratest = pratest + '  afterEach(async () => {\n' +
    //         ' await ' + tableName + 'Test.deleteAll() //buatkan di util-test dulu\n' +
    //         ' await UserTest.delete()\n' +
    //         ' })\n'
    //     test = test + pratest

    //     test = test + ' it("should create new ' + tableNameLow + '", async () => {\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .post("/api/' + tableNameLow + 's")\n' +
    //         '     .set("X-API-TOKEN", "test")\n' +
    //         '     .send({\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + element.name + ':"test' + '",\n'
    //             } else {
    //                 test = test + element.name + ':"Test_' + element.name + '",\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + element.name + ':1,\n'
    //         }
    //     }
    //     test = test + '     })\n'

    //     test = test + ' logger.debug(response.body)\n' +
    //         ' expect(response.status).toBe(200);\n' +
    //         ' expect(response.body.data.id).toBeDefined()\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
    //             } else {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe("Test_' + element.name + '")\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + 'expect(response.body.data.' + element.name + ').toBe(1)\n'
    //         }
    //     }
    //     test = test + '     })\n'

    //     test = test + ' it("should reject create new ' + tableNameLow + '", async () => {\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .post("/api/' + tableNameLow + 's")\n' +
    //         '     .set("X-API-TOKEN", "test")\n' +
    //         '     .send({\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + element.name + ':"test' + '",\n'
    //             } else {
    //                 test = test + element.name + ':"' + '",\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + element.name + ':1,\n'
    //         }
    //     }
    //     test = test + '     })\n'

    //     test = test + ' logger.debug(response.body)\n' +
    //         ' expect(response.status).toBe(400);\n' +
    //         ' expect(response.body.errors).toBeDefined()\n'
    //     test = test + '})\n'
    //     test = test + '})\n'

    //     //GET test
    //     test = test + '//GET test\n' +
    //         ' describe("POST /api/' + tableNameLow + 's", () => {\n' +
    //         ' \n'
    //     test = test + pratest

    //     test = test + ' it("should be able get ' + tableNameLow + '", async () => {\n' +
    //         ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         ' const response = await supertest(web) \n' +
    //         '     .get(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
    //         '     .set("X-API-TOKEN", "test")\n' +
    //         ' logger.debug(' + tableNameLow + '.id)\n' +
    //         ' logger.debug(response.body)\n' +
    //         'expect(response.status).toBe(200)\n' +
    //         ' expect(response.body.data.id).toBeDefined()\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar' || element.type == 'Number') {
    //             if (element.name == 'username') {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
    //             } else {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe(' + tableNameLow + '.' + element.name + ')\n'
    //             }
    //         }
    //     }
    //     test = test + ' })\n'//end of it shout

    //     test = test + ' it("should reject  get ' + tableNameLow + ' if ' + tableNameLow + ' is not found", async () => {\n' +
    //         '  const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .get(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}` + 1)\n' +
    //         '     .set("X-API-TOKEN", "test")\n' +
    //         ' logger.debug(' + tableNameLow + '.id)\n' +
    //         ' logger.debug(response.body)\n' +
    //         ' expect(response.status).toBe(404)\n' +
    //         ' expect(response.body.errors).toBeDefined()\n' +
    //         ' })\n'
    //     test = test + '})\n'//end of describe

    //     //PUT/UDATE TEST

    //     test = test + '//PUT/UDATE TEST \n' +
    //         ' describe("PUT /api/' + tableNameLow + 's/:' + tableNameLow + 'Id", () => {\n' +
    //         ' \n'
    //     test = test + pratest

    //     test = test + ' it("should be able to update ' + tableNameLow + '", async () => {\n' +
    //         ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .put(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
    //         '    .set("X-API-TOKEN", "test")\n' +
    //         '    .send({\n'
    //     //  '        first_name: "eko",\n'

    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + element.name + ':"test' + '",\n'
    //             } else {
    //                 test = test + element.name + ':"test_edited' + '",\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + element.name + ':1,\n'
    //         }
    //     }
    //     test = test + '     })\n'
    //     test = test + ' logger.debug(response.body)\n' +
    //         'expect(response.status).toBe(200)\n' +
    //         'expect(response.body.data.id).toBe(' + tableNameLow + '.id)\n'

    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
    //             }
    //             else {
    //                 test = test + 'expect(response.body.data.' + element.name + ').toBe("test_edited' + '")\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + 'expect(response.body.data.' + element.name + ').toBe(' + tableNameLow + '.' + element.name + ')\n'
    //         }
    //     }
    //     test = test + '})\n'//end of it




    //     test = test + ' it("should be reject  to update   ' + tableNameLow + '", async () => {\n' +
    //         ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .put(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
    //         '    .set("X-API-TOKEN", "test")\n' +
    //         '    .send({\n'
    //     //  '        first_name: "eko",\n'

    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 test = test + element.name + ':"test' + '",\n'
    //             } else {
    //                 test = test + element.name + ':"' + '",\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             test = test + element.name + ':1,\n'
    //         }
    //     }
    //     test = test + '     })\n'
    //     test = test + ' logger.debug(response.body)\n' +
    //         'expect(response.status).toBe(400)\n' +
    //         'expect(response.body.errors).toBeDefined\n'
    //     test = test + '})\n'//end of it
    //     test = test + '})\n'//end of describe





    //     //REMOVE test

    //     test = test + '//REMOVETEST \n' +
    //         ' describe("DELETE /api/' + tableNameLow + 's/:' + tableNameLow + 'Id", () => {\n' +
    //         ' \n'
    //     test = test + pratest
    //     test = test + ' it("should be able to remove ' + tableNameLow + '", async () => {\n' +
    //         ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         ' const response = await supertest(web)\n' +
    //         '     .delete(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
    //         '    .set("X-API-TOKEN", "test")\n' +
    //         ' logger.debug(response.body)\n' +
    //         ' expect(response.status).toBe(200)\n' +
    //         ' expect(response.body.data).toBe("OK")\n' +
    //         ' })\n'


    //     test = test + ' it("should reject  to remove ' + tableNameLow + ' if ' + tableNameLow + ' is not found", async () => {\n' +
    //         ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
    //         '  const response = await supertest(web)\n' +
    //         '   .delete(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id + 1}`)\n' +
    //         '   .set("X-API-TOKEN", "test")\n' +

    //         ' logger.debug(response.body)\n' +
    //         ' expect(response.status).toBe(404)\n' +
    //         ' expect(response.body.errors).toBeDefined()\n' +
    //         ' }) \n' +
    //         ' }) '


    //     //SEARCH test
    //     test = test + '//SEARCH Test \n' +
    //         'describe("SEARCH /api/' + tableNameLow + 's", () => {' +
    //         ' \n'
    //     test = test + pratest

    //     test = test + '  it("should be able to search ' + tableNameLow + '", async () => {\n' +
    //         '  const response = await supertest(web)\n' +
    //         '      .get("/api/' + tableNameLow + 's")\n' +
    //         '     .set("X-API-TOKEN", "test")\n' +
    //         '  logger.debug(response.body)\n' +
    //         '  expect(response.status).toBe(200)\n' +
    //         '  expect(response.body.data.length).toBe(1)\n' +
    //         '  expect(response.body.paging.current_page).toBe(1)\n' +
    //         '  expect(response.body.paging.total_page).toBe(1)\n' +
    //         '  expect(response.body.paging.size).toBe(10)\n'

    //     test = test + '})\n'//end of it
    //     test = test + '})\n'//end of describe
    //     // console.log(test)
    //     return test

    // }

    //CREATE UTIL-TEST
    // static async createUtilTest(tabelId: number): Promise<String> {
    //     const table = await this.getTable(tabelId)
    //     const tableName = (await Util.capitalizeFirstLetter(table.name))
    //     const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
    //     const columns = await this.getColoumn(tabelId)

    //     let utiltest = '//tambahkan ke dalam file test-util.ts pada folder test \n//CREATE UTIL-TEST ' + tableName + '\n'
    //     //util-test delete
    //     utiltest = utiltest + 'export class ' + tableName + 'Test{\n'
    //     utiltest = utiltest + '  static async deleteAll(){\n' +
    //         'await prismaClient.' + tableNameLow + '.deleteMany({\n' +
    //         '    where :{\n' +
    //         '        create_by :"test"\n' +
    //         '    }\n' +
    //         '})\n' +
    //         '} \n'

    //     //util-test create 
    //     utiltest = utiltest + '  static async create(){\n' +
    //         'await prismaClient.' + tableNameLow + '.create({\n' +
    //         '    data :{\n'
    //     for (let index = 0; index < columns.length; index++) {
    //         const element = columns[index];
    //         if (element.type == 'Varchar') {
    //             if (element.name == 'username') {
    //                 utiltest = utiltest + element.name + ':"test' + '",\n'
    //             } else {
    //                 utiltest = utiltest + element.name + ':"test' + '",\n'
    //             }
    //         }
    //         if (element.type == 'Number') {
    //             utiltest = utiltest + element.name + ':1\n'
    //         }
    //     }
    //     utiltest = utiltest + '        create_by :"test"\n' + '    }\n' +
    //         '})\n' 
    //         // '} \n'
    //     // utiltest = utiltest + '})\n'
    //     utiltest = utiltest + '}\n'
    //     //util-test get
    //     utiltest = utiltest + ' static async get(): Promise<' + tableName + '> {\n' +
    //         ' const ' + tableNameLow + ' = await prismaClient.' + tableNameLow + '.findFirst({\n' +
    //         '    where: {\n' +
    //         '       create_by: "test"\n' +
    //         '    }\n' +
    //         '  })\n' +

    //         ' if (!' + tableNameLow + ') {\n' +
    //         '     throw new Error("' + tableName + ' is not found")\n' +
    //         '  }\n' +
    //         ' return ' + tableNameLow + '\n' +
    //         ' }\n'

    //     utiltest = utiltest + '}\n'


    //     utiltest = utiltest + '//tambahkan ' + tableName + ' pada import { User, Contact, Tablecoba } from "@prisma/client";'

    //     console.log(utiltest)
    //     return utiltest
    // }

    //create filenya
    static async createFiles(tabelId: number): Promise<String> {
        const table = await this.getTable(tabelId)
        const tableName = (await Util.lowerFirstLetter(table.name))
        const columns = await this.getColoumn(tabelId)

        let folder = '/Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        let file = ''
        const folderModel = 'src/coba/'//'src/model/'
        const folderValidation = 'src/coba/'//'src/validation/'
        const folderController = 'src/coba/'//'src/controller/'
        const folderService = 'src/coba/'//'src/service/'
        const folderTest = 'src/coba/'//'test/'

        // file = folder + folderModel + tableName + '-model.ts\n'
        // Util.createFile(file, (await this.createModel(tabelId)).toString())

        // file = folder + folderValidation + tableName + '-validation.ts\n\n'
        // Util.createFile(file, (await this.createValidation(tabelId)).toString())

        // file = folder + folderService + tableName + '-service.ts\n\n'
        // Util.createFile(file, (await this.createService(tabelId)).toString())

        // file = folder + folderController + tableName + '-controller.ts\n\n'
        // Util.createFile(file, (await this.createController(tabelId)).toString())

        // file = folder + folderTest + tableName + '.test.ts\n\n'
        // Util.createFile(file, (await this.createTest(tabelId)).toString())

        // file = folder + 'src/coba/' + tableName + '-route.ts\n\n'
        // Util.createFile(file, (await this.createRoute(tabelId)).toString())

        // file = folder + 'src/coba/' + tableName + '-utility.txt\n\n'
        // const utilText = (await this.createSchema(tabelId)).toString() + '\n\n\n//ROUTE' +
        //     (await this.createRoute(tabelId)).toString() + '\n\n\n//UTIL-TEST' +
        //     (await this.createUtilTest(tabelId)).toString()
        // Util.createFile(file, utilText)

        // file = folder + 'src/coba/' + tableName + '-util-test.ts\n\n'
        // Util.createFile(file, (await this.createUtilTest(tabelId)).toString())

        folder = 'rm /Users/macbook/Mugi_data/workspace/typescript/belajar-typescript-restful-api/'
        file = file + folder + folderModel + tableName + '-model.ts\n'
        file = file + folder + folderValidation + tableName + '-validation.ts\n'
        file = file + folder + folderService + tableName + '-service.ts\n'
        file = file + folder + folderController + tableName + '-controller.ts\n'
        file = file + folder + folderTest + tableName + '.test.ts\n'
        file = file + folder + 'src/coba/' + tableName + '-utilily.txt\n'
        // file = file + folder + 'src/coba/' + tableName + '-route.ts\n'
        // file = file + folder + 'src/coba/' + tableName + '-schema.ts\n'


        console.log(file)

        return ''

    }


}//end class



