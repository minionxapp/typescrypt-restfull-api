import { DevTableColumn } from "@prisma/client"
import { prismaClient } from "../application/database"
import { Util } from "../util/util";
import { DevTableColumnResponse, DevTableResponse, toDevTableColumnResponse, toDevTableResponse } from "../dev/dev-model"
import {DevUtil} from '../dev/dev-util'

export class DevCreateTest {
 static async createTest(tabelId: number): Promise<String> {
        const table = await DevUtil.getTable(tabelId)
        const tableName = (await Util.capitalizeFirstLetter(table.name))
        const tableNameLow = (await Util.lowerFirstLetter(tableName)).toString()
        const columns = await DevUtil.getColoumn(tabelId)

        let test = '//Test ' + tableName + '\n'
        test = test + ' import supertest from "supertest"\n' +
            ' import { web } from "../src/application/web"\n' +
            ' import { ' + tableName + 'Test, UserTest } from "../test/test-util"\n' +
            ' import { logger } from "../src/application/logging"\n'
        //create test
        test = test + '//Create test\n' +
            ' describe("POST /api/' + tableNameLow + 's", () => {\n' +
            ' \n'
        let pratest = '  beforeEach(async () => {\n' +
            ' await UserTest.create()\n' +
            ' await ' + tableName + 'Test.create()\n' +
            ' }) \n'
        pratest = pratest + '  afterEach(async () => {\n' +
            ' await ' + tableName + 'Test.deleteAll() //buatkan di util-test dulu\n' +
            ' await UserTest.delete()\n' +
            ' })\n'
        test = test + pratest

        test = test + ' it("should create new ' + tableNameLow + '", async () => {\n' +
            ' const response = await supertest(web)\n' +
            '     .post("/api/' + tableNameLow + 's")\n' +
            '     .set("X-API-TOKEN", "test")\n' +
            '     .send({\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + element.name + ':"test' + '",\n'
                } else {
                    test = test + element.name + ':"Test_' + element.name + '",\n'
                }
            }
            if (element.type == 'Number') {
                test = test + element.name + ':1,\n'
            }
        }
        test = test + '     })\n'

        test = test + ' logger.debug(response.body)\n' +
            ' expect(response.status).toBe(200);\n' +
            ' expect(response.body.data.id).toBeDefined()\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
                } else {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe("Test_' + element.name + '")\n'
                }
            }
            if (element.type == 'Number') {
                test = test + 'expect(response.body.data.' + element.name + ').toBe(1)\n'
            }
        }
        test = test + '     })\n'

        test = test + ' it("should reject create new ' + tableNameLow + '", async () => {\n' +
            ' const response = await supertest(web)\n' +
            '     .post("/api/' + tableNameLow + 's")\n' +
            '     .set("X-API-TOKEN", "test")\n' +
            '     .send({\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + element.name + ':"test' + '",\n'
                } else {
                    test = test + element.name + ':"' + '",\n'
                }
            }
            if (element.type == 'Number') {
                test = test + element.name + ':1,\n'
            }
        }
        test = test + '     })\n'

        test = test + ' logger.debug(response.body)\n' +
            ' expect(response.status).toBe(400);\n' +
            ' expect(response.body.errors).toBeDefined()\n'
        test = test + '})\n'
        test = test + '})\n'

        //GET test
        test = test + '//GET test\n' +
            ' describe("POST /api/' + tableNameLow + 's", () => {\n' +
            ' \n'
        test = test + pratest

        test = test + ' it("should be able get ' + tableNameLow + '", async () => {\n' +
            ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            ' const response = await supertest(web) \n' +
            '     .get(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
            '     .set("X-API-TOKEN", "test")\n' +
            ' logger.debug(' + tableNameLow + '.id)\n' +
            ' logger.debug(response.body)\n' +
            'expect(response.status).toBe(200)\n' +
            ' expect(response.body.data.id).toBeDefined()\n'
        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar' || element.type == 'Number') {
                if (element.name == 'username') {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
                } else {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe(' + tableNameLow + '.' + element.name + ')\n'
                }
            }
        }
        test = test + ' })\n'//end of it shout

        test = test + ' it("should reject  get ' + tableNameLow + ' if ' + tableNameLow + ' is not found", async () => {\n' +
            '  const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            ' const response = await supertest(web)\n' +
            '     .get(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}` + 1)\n' +
            '     .set("X-API-TOKEN", "test")\n' +
            ' logger.debug(' + tableNameLow + '.id)\n' +
            ' logger.debug(response.body)\n' +
            ' expect(response.status).toBe(404)\n' +
            ' expect(response.body.errors).toBeDefined()\n' +
            ' })\n'
        test = test + '})\n'//end of describe

        //PUT/UDATE TEST

        test = test + '//PUT/UDATE TEST \n' +
            ' describe("PUT /api/' + tableNameLow + 's/:' + tableNameLow + 'Id", () => {\n' +
            ' \n'
        test = test + pratest

        test = test + ' it("should be able to update ' + tableNameLow + '", async () => {\n' +
            ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            ' const response = await supertest(web)\n' +
            '     .put(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
            '    .set("X-API-TOKEN", "test")\n' +
            '    .send({\n'
        //  '        first_name: "eko",\n'

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + element.name + ':"test' + '",\n'
                } else {
                    test = test + element.name + ':"test_edited' + '",\n'
                }
            }
            if (element.type == 'Number') {
                test = test + element.name + ':1,\n'
            }
        }
        test = test + '     })\n'
        test = test + ' logger.debug(response.body)\n' +
            'expect(response.status).toBe(200)\n' +
            'expect(response.body.data.id).toBe(' + tableNameLow + '.id)\n'

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe("test' + '")\n'
                }
                else {
                    test = test + 'expect(response.body.data.' + element.name + ').toBe("test_edited' + '")\n'
                }
            }
            if (element.type == 'Number') {
                test = test + 'expect(response.body.data.' + element.name + ').toBe(' + tableNameLow + '.' + element.name + ')\n'
            }
        }
        test = test + '})\n'//end of it




        test = test + ' it("should be reject  to update   ' + tableNameLow + '", async () => {\n' +
            ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            ' const response = await supertest(web)\n' +
            '     .put(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
            '    .set("X-API-TOKEN", "test")\n' +
            '    .send({\n'
        //  '        first_name: "eko",\n'

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];
            if (element.type == 'Varchar') {
                if (element.name == 'username') {
                    test = test + element.name + ':"test' + '",\n'
                } else {
                    test = test + element.name + ':"' + '",\n'
                }
            }
            if (element.type == 'Number') {
                test = test + element.name + ':1,\n'
            }
        }
        test = test + '     })\n'
        test = test + ' logger.debug(response.body)\n' +
            'expect(response.status).toBe(400)\n' +
            'expect(response.body.errors).toBeDefined\n'
        test = test + '})\n'//end of it
        test = test + '})\n'//end of describe





        //REMOVE test

        test = test + '//REMOVETEST \n' +
            ' describe("DELETE /api/' + tableNameLow + 's/:' + tableNameLow + 'Id", () => {\n' +
            ' \n'
        test = test + pratest
        test = test + ' it("should be able to remove ' + tableNameLow + '", async () => {\n' +
            ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            ' const response = await supertest(web)\n' +
            '     .delete(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id}`)\n' +
            '    .set("X-API-TOKEN", "test")\n' +
            ' logger.debug(response.body)\n' +
            ' expect(response.status).toBe(200)\n' +
            ' expect(response.body.data).toBe("OK")\n' +
            ' })\n'


        test = test + ' it("should reject  to remove ' + tableNameLow + ' if ' + tableNameLow + ' is not found", async () => {\n' +
            ' const ' + tableNameLow + ' = await ' + tableName + 'Test.get()\n' +
            '  const response = await supertest(web)\n' +
            '   .delete(`/api/' + tableNameLow + 's/${' + tableNameLow + '.id + 1}`)\n' +
            '   .set("X-API-TOKEN", "test")\n' +

            ' logger.debug(response.body)\n' +
            ' expect(response.status).toBe(404)\n' +
            ' expect(response.body.errors).toBeDefined()\n' +
            ' }) \n' +
            ' }) '


        //SEARCH test
        test = test + '//SEARCH Test \n' +
            'describe("SEARCH /api/' + tableNameLow + 's", () => {' +
            ' \n'
        test = test + pratest

        test = test + '  it("should be able to search ' + tableNameLow + '", async () => {\n' +
            '  const response = await supertest(web)\n' +
            '      .get("/api/' + tableNameLow + 's")\n' +
            '     .set("X-API-TOKEN", "test")\n' +
            '  logger.debug(response.body)\n' +
            '  expect(response.status).toBe(200)\n' +
            '  expect(response.body.data.length).toBe(1)\n' +
            '  expect(response.body.paging.current_page).toBe(1)\n' +
            '  expect(response.body.paging.total_page).toBe(1)\n' +
            '  expect(response.body.paging.size).toBe(10)\n'

        test = test + '})\n'//end of it
        test = test + '})\n'//end of describe
        console.log(test)
        return test

    }
}