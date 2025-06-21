import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import { DevUtil } from '../dev/dev-util'



export class DevCreateModel {
    static async createModel(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const columns = await DevUtil.getColoumn(tabelId)
        //tabelResponse
        let model = '\n//CreateModel\n//' + tableName + '-model.ts\n\n'
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
        model = model + 'export type Search' + tableName + 'Request = {\n//id: number,\n'
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
                // model = model + element.name + ": number" + ",\n"
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

        console.log(model)
        return model
    }
}