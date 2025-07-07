//Test Group

import supertest from "supertest"
import { web } from "../src/application/web"
import { UserTest } from "../test/test-util"
import { logger } from "../src/application/logging"
import { prismaClient } from "../src/application/database";
import { GroupTest } from "../test/util/Group-util-test"//Create test
describe("POST /api/groups", () => {

    beforeEach(async () => {
        await UserTest.create()
        //await GroupTest.create()
    })
    afterEach(async () => {
        await GroupTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should create new group", async () => {
        const response = await supertest(web)
            .post("/api/groups")
            .set("X-API-TOKEN", "test")
            .send({
                name: "Test_name",
                desc: "Test_desc",
                pic: "Test_pic",
                status: "N",
                create_by:'test'
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe("Test_name")
        expect(response.body.data.desc).toBe("Test_desc")
        expect(response.body.data.pic).toBe("Test_pic")
        expect(response.body.data.status).toBe("N")
    })
    it("should reject create new group", async () => {
        const response = await supertest(web)
            .post("/api/groups")
            .set("X-API-TOKEN", "test")
            .send({
                name: null,
                desc: "",
                pic: "",
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    })
})
//GET test
describe("POST /api/groups", () => {

    beforeEach(async () => {
        await UserTest.create()
        await GroupTest.create()
    })
    afterEach(async () => {
        await GroupTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able get group", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .get(`/api/groups/${group.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(group.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.name).toBe(group.name)
        expect(response.body.data.desc).toBe(group.desc)
        expect(response.body.data.pic).toBe(group.pic)
        expect(response.body.data.status).toBe(group.status)
    })
    it("should reject  get group if group is not found", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .get(`/api/groups/${group.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(group.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})
//PUT/UDATE TEST 
describe("PUT /api/groups/:groupId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await GroupTest.create()
    })
    afterEach(async () => {
        await GroupTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to update group", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .put(`/api/groups/${group.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: "test_edited",
                desc: "test_edited",
                pic: "test_edited",
                status: "Y",
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(group.id)
        expect(response.body.data.name).toBe("test_edited")
        expect(response.body.data.desc).toBe("test_edited")
        expect(response.body.data.pic).toBe("test_edited")
        expect(response.body.data.status).toBe("Y")
    })
    it("should be reject  to update   group", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .put(`/api/groups/${group.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                name: null,
                desc: "test",
                pic: "test",
                status: null,
            })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
    })
})
//REMOVETEST 
describe("DELETE /api/groups/:groupId", () => {

    beforeEach(async () => {
        await UserTest.create()
        await GroupTest.create()
    })
    afterEach(async () => {
        await GroupTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to remove group", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .delete(`/api/groups/${group.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")
    })
    it("should reject  to remove group if group is not found", async () => {
        const group = await GroupTest.get()
        const response = await supertest(web)
            .delete(`/api/groups/${group.id + 1}`)
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
}) //SEARCH Test 
describe("SEARCH /api/groups", () => {
    beforeEach(async () => {
        await UserTest.create()
        await GroupTest.create()
    })
    afterEach(async () => {
        await GroupTest.deleteAll() //buatkan di util-test dulu
        await UserTest.delete()
    })
    it("should be able to search group", async () => {
        const response = await supertest(web)
            .get("/api/groups")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBeGreaterThanOrEqual(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)
    })
})