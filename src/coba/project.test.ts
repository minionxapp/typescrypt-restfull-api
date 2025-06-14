//Test Project
import supertest from "supertest"
import { web } from "../application/web"
import { ProjectTest, UserTest } from "../../test/test-util"
import { logger } from "../application/logging"
//Create test
describe("POST /api/projects", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ProjectTest.create()
    })
    afterEach(async () => {
        await ProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new project", async () => {
        const response = await supertest(web)
            .post("/api/projects")
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
name: "Test_name",
                desc: "Test_desc",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.project_id).toBe(1)
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.desc).toBe("Test_desc")
    })
    it("should reject create new project", async () => {
        const response = await supertest(web)
            .post("/api/projects")
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
name: "",
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/projects", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ProjectTest.create()
    })
    afterEach(async () => {
        await ProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get project", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .get(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(project.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.project_id).toBe(project.project_id)
        expect(response.body.data.name).toBe(project.name)
        expect(response.body.data.desc).toBe(project.desc)
    })
    it("should reject  get project if project is not found", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .get(`/api/projects/${project.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(project.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/projects/:projectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ProjectTest.create()
    })
    afterEach(async () => {
        await ProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update project", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .put(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
name: "test_edited",
                desc: "test_edited",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(project.id)
        expect(response.body.data.project_id).toBe(project.project_id)
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
    })
    it("should be reject  to update   project", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .put(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                project_id: 1,
name: "",
                desc: "",
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/projects/:projectId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await ProjectTest.create()
    })
    afterEach(async () => {
        await ProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove project", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .delete(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove project if project is not found", async () => {
        const project = await ProjectTest.get()
        const response = await supertest(web)
            .delete(`/api/projects/${project.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/projects", () => {
    beforeEach(async () => {
        await UserTest.create()
        await ProjectTest.create()
    })
    afterEach(async () => {
        await ProjectTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search project", async () => {
        const response = await supertest(web)
            .get("/api/projects")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})
