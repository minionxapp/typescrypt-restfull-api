//Test Dev_project
import supertest from "supertest"
import { web } from "../src/application/web"
import { Dev_projectTest, UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
//Create test
describe("POST /api/dev_projects", () => {

    beforeEach(async () => {
        await UserTest.create()
        await Dev_projectTest.create()
    })
    afterEach(async () => {
        await Dev_projectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new dev_project", async () => {
        const response = await supertest(web)
            .post("/api/dev_projects")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test_name",
                desc: "Test_desc",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.desc).toBe("Test_desc")
    })
    it("should reject create new dev_project", async () => {
        const response = await supertest(web)
            .post("/api/dev_projects")
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/dev_projects", () => {

    beforeEach(async () => {
        await UserTest.create()
        await Dev_projectTest.create()
    })
    afterEach(async () => {
        await Dev_projectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get dev_project", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .get(`/api/dev_projects/${dev_project.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(dev_project.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe(dev_project.name)
        expect(response.body.data.desc).toBe(dev_project.desc)
    })
    it("should reject  get dev_project if dev_project is not found", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .get(`/api/dev_projects/${dev_project.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(dev_project.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/dev_projects/:dev_projectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await Dev_projectTest.create()
    })
    afterEach(async () => {
        await Dev_projectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update dev_project", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .put(`/api/dev_projects/${dev_project.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "test_edited",
                desc: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(dev_project.id)
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
    })
    it("should be reject  to update   dev_project", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .put(`/api/dev_projects/${dev_project.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/dev_projects/:dev_projectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await Dev_projectTest.create()
    })
    afterEach(async () => {
        await Dev_projectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove dev_project", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .delete(`/api/dev_projects/${dev_project.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove dev_project if dev_project is not found", async () => {
        const dev_project = await Dev_projectTest.get()
        const response = await supertest(web)
            .delete(`/api/dev_projects/${dev_project.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/dev_projects", () => {
    beforeEach(async () => {
        await UserTest.create()
        await Dev_projectTest.create()
    })
    afterEach(async () => {
        await Dev_projectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search dev_project", async () => {
        const response = await supertest(web)
            .get("/api/dev_projects")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
