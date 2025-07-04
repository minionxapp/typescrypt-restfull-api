//Test DevDirektori

import supertest from "supertest"
import { web } from "../src/application/web"
import { DevDirektoriTest, UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
//Create test
describe("POST /api/devdirektoris", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevDirektoriTest.create()
    })
    afterEach(async () => {
        await DevDirektoriTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new devdirektori", async () => {
        const response = await supertest(web)
            .post("/api/devdirektoris")
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                direktori: "Test_direktori",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.direktori).toBe("Test_direktori")
    })
    it("should reject create new devdirektori", async () => {
        const response = await supertest(web)
            .post("/api/devdirektoris")
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                direktori: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/devdirektoris", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevDirektoriTest.create()
    })
    afterEach(async () => {
        await DevDirektoriTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get devdirektori", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .get(`/api/devdirektoris/${devdirektori.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(devdirektori.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.direktori).toBe(devdirektori.direktori)
    })
    it("should reject  get devdirektori if devdirektori is not found", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .get(`/api/devdirektoris/${devdirektori.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(devdirektori.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/devdirektoris/:devdirektoriId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevDirektoriTest.create()
    })
    afterEach(async () => {
        await DevDirektoriTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update devdirektori", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .put(`/api/devdirektoris/${devdirektori.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                direktori: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(devdirektori.id)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.direktori).toBe("test_edited")
    })
    it("should be reject  to update   devdirektori", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .put(`/api/devdirektoris/${devdirektori.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                username: "test",
                direktori: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/devdirektoris/:devdirektoriId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await DevDirektoriTest.create()
    })
    afterEach(async () => {
        await DevDirektoriTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove devdirektori", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .delete(`/api/devdirektoris/${devdirektori.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove devdirektori if devdirektori is not found", async () => {
        const devdirektori = await DevDirektoriTest.get()
        const response = await supertest(web)
            .delete(`/api/devdirektoris/${devdirektori.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/devdirektoris", () => {
    beforeEach(async () => {
        await UserTest.create()
        await DevDirektoriTest.create()
    })
    afterEach(async () => {
        await DevDirektoriTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search devdirektori", async () => {
        const response = await supertest(web)
            .get("/api/devdirektoris")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})