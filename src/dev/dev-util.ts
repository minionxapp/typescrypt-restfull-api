import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"


export class DevUtil{
    static async getColoumn(tabelId: number): Promise<Array<DevTableColumnResponse>> {
            const result = await prismaClient.devTableColumn.findMany({
                where: {
                    table_id: tabelId
                }
            })
            return result
        }
        //ambil table
        static async getTable(tabelId: number): Promise<DevTableResponse> {
            const result = await prismaClient.devTable.findFirst({
                where: {
                    id: tabelId
                }
            })
            return toDevTableResponse(result!)
        }
}