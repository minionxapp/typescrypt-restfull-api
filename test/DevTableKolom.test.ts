//Test DevTableKolom

import supertest from "supertest"
import { web } from "../src/application/web"
import { DevTableKolomTest, UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
//Create test
describe("POST /api/devtablekoloms", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevTableKolomTest.create()
    })
    afterEach(async () => {
        await DevTableKolomTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new devtablekolom", async () => {
        const response = await supertest(web)
            .post("/api/devtablekoloms")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test_name",
                table_id: 1,
                table_name: "Test_table_name",
                desc: "Test_desc",
                length: 1,
                is_id: "Test_is_id",
                is_null: "Test_is_null",
                is_uniq: "Test_is_uniq",
                default: "Test_default",
                type: "Test_type",
                create_by: "test"
            })
        // logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.table_id).toBe(1)
        expect(response.body.data.table_name).toBe("Test_table_name")
        expect(response.body.data.desc).toBe("Test_desc")
        expect(response.body.data.length).toBe(1)
        expect(response.body.data.is_id).toBe("Test_is_id")
        expect(response.body.data.is_null).toBe("Test_is_null")
        expect(response.body.data.is_uniq).toBe("Test_is_uniq")
        expect(response.body.data.default).toBe("Test_default")
        expect(response.body.data.type).toBe("Test_type")
    })
    it("should reject create new devtablekolom", async () => {
        const response = await supertest(web)
            .post("/api/devtablekoloms")
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                table_id: 1,
                table_name: "",
                desc: "",
                length: 1,
                is_id: "",
                is_null: "",
                is_uniq: "",
                default: "",
                type: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/devtablekoloms", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevTableKolomTest.create()
    })
    afterEach(async () => {
        await DevTableKolomTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get devtablekolom", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .get(`/api/devtablekoloms/${devtablekolom.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(devtablekolom.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe(devtablekolom.name)
        expect(response.body.data.table_id).toBe(devtablekolom.table_id)
        expect(response.body.data.table_name).toBe(devtablekolom.table_name)
        expect(response.body.data.desc).toBe(devtablekolom.desc)
        expect(response.body.data.length).toBe(devtablekolom.length)
        expect(response.body.data.is_id).toBe(devtablekolom.is_id)
        expect(response.body.data.is_null).toBe(devtablekolom.is_null)
        expect(response.body.data.is_uniq).toBe(devtablekolom.is_uniq)
        expect(response.body.data.default).toBe(devtablekolom.default)
        expect(response.body.data.type).toBe(devtablekolom.type)
    })
    it("should reject  get devtablekolom if devtablekolom is not found", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .get(`/api/devtablekoloms/${devtablekolom.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(devtablekolom.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/devtablekoloms/:devtablekolomId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevTableKolomTest.create()
    })
    afterEach(async () => {
        await DevTableKolomTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update devtablekolom", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .put(`/api/devtablekoloms/${devtablekolom.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "test_edited",
                table_id: 1,
                table_name: "test_edited",
                desc: "test_edited",
                length: 1,
                is_id: "test_edited",
                is_null: "test_edited",
                is_uniq: "test_edited",
                default: "test_edited",
                type: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(devtablekolom.id)
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.table_id).toBe(devtablekolom.table_id)
        expect(response.body.data.table_name).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.length).toBe(devtablekolom.length)
        expect(response.body.data.is_id).toBe("test_edited")
        expect(response.body.data.is_null).toBe("test_edited")
        expect(response.body.data.is_uniq).toBe("test_edited")
        expect(response.body.data.default).toBe("test_edited")
        expect(response.body.data.type).toBe("test_edited")
    })
    it("should be reject  to update   devtablekolom", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .put(`/api/devtablekoloms/${devtablekolom.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                table_id: 1,
                table_name: "",
                desc: "",
                length: 1,
                is_id: "",
                is_null: "",
                is_uniq: "",
                default: "",
                type: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/devtablekoloms/:devtablekolomId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevTableKolomTest.create()
    })
    afterEach(async () => {
        await DevTableKolomTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove devtablekolom", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .delete(`/api/devtablekoloms/${devtablekolom.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove devtablekolom if devtablekolom is not found", async () => {
        const devtablekolom = await DevTableKolomTest.get()
        const response = await supertest(web)
            .delete(`/api/devtablekoloms/${devtablekolom.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/devtablekoloms", () => {
    beforeEach(async () => {
        await UserTest.create()
        await DevTableKolomTest.create()
    })
    afterEach(async () => {
        await DevTableKolomTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search devtablekolom", async () => {
        const response = await supertest(web)
            .get("/api/devtablekoloms")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})

