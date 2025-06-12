//Test Tablecoba
 import supertest from "supertest"
 import { web } from "../application/web"
 import { TablecobaTest, UserTest } from "../../test/test-util"
 import { logger } from "../../src/application/logging"
//Create test
 describe("POST /api/tablecobas", () => {
 
  beforeEach(async () => {
 await UserTest.create()
 await TablecobaTest.create()
 }) 
  afterEach(async () => {
 await TablecobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should create new tablecoba", async () => {
 const response = await supertest(web)
     .post("/api/tablecobas")
     .set("X-API-TOKEN", "test")
     .send({
first_name:"Test_first_name",
last_name:"Test_last_name",
email:"Test_email",
phone:"Test_phone",
address:"Test_address",
username:"test",
     })
 logger.debug(response.body)
 expect(response.status).toBe(200);
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.first_name).toBe("Test_first_name")
expect(response.body.data.last_name).toBe("Test_last_name")
expect(response.body.data.email).toBe("Test_email")
expect(response.body.data.phone).toBe("Test_phone")
expect(response.body.data.address).toBe("Test_address")
expect(response.body.data.username).toBe("test")
     })
 it("should reject create new tablecoba", async () => {
 const response = await supertest(web)
     .post("/api/tablecobas")
     .set("X-API-TOKEN", "test")
     .send({
first_name:"",
last_name:"",
email:"",
phone:"",
address:"",
username:"test",
     })
 logger.debug(response.body)
 expect(response.status).toBe(400);
 expect(response.body.errors).toBeDefined()
})
})
//GET test
 describe("POST /api/tablecobas", () => {
 
  beforeEach(async () => {
 await UserTest.create()
 await TablecobaTest.create()
 }) 
  afterEach(async () => {
 await TablecobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able get tablecoba", async () => {
 const tablecoba = await TablecobaTest.get()
 const response = await supertest(web) 
     .get(`/api/tablecobas/${tablecoba.id}`)
     .set("X-API-TOKEN", "test")
 logger.debug(tablecoba.id)
 logger.debug(response.body)
expect(response.status).toBe(200)
 expect(response.body.data.id).toBeDefined()
expect(response.body.data.first_name).toBe(tablecoba.first_name)
expect(response.body.data.last_name).toBe(tablecoba.last_name)
expect(response.body.data.email).toBe(tablecoba.email)
expect(response.body.data.phone).toBe(tablecoba.phone)
expect(response.body.data.address).toBe(tablecoba.address)
expect(response.body.data.username).toBe("test")
 })
 it("should reject  get tablecoba if tablecoba is not found", async () => {
  const tablecoba = await TablecobaTest.get()
 const response = await supertest(web)
     .get(`/api/tablecobas/${tablecoba.id}` + 1)
     .set("X-API-TOKEN", "test")
 logger.debug(tablecoba.id)
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 })
})
//PUT/UDATE TEST 
 describe("PUT /api/tablecobas/:tablecobaId", () => {
 
  beforeEach(async () => {
 await UserTest.create()
 await TablecobaTest.create()
 }) 
  afterEach(async () => {
 await TablecobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to update tablecoba", async () => {
 const tablecoba = await TablecobaTest.get()
 const response = await supertest(web)
     .put(`/api/tablecobas/${tablecoba.id}`)
    .set("X-API-TOKEN", "test")
    .send({
first_name:"test_edited",
last_name:"test_edited",
email:"test_edited",
phone:"test_edited",
address:"test_edited",
username:"test",
     })
 logger.debug(response.body)
expect(response.status).toBe(200)
expect(response.body.data.id).toBe(tablecoba.id)
expect(response.body.data.first_name).toBe("test_edited")
expect(response.body.data.last_name).toBe("test_edited")
expect(response.body.data.email).toBe("test_edited")
expect(response.body.data.phone).toBe("test_edited")
expect(response.body.data.address).toBe("test_edited")
expect(response.body.data.username).toBe("test")
})
 it("should be reject  to update   tablecoba", async () => {
 const tablecoba = await TablecobaTest.get()
 const response = await supertest(web)
     .put(`/api/tablecobas/${tablecoba.id}`)
    .set("X-API-TOKEN", "test")
    .send({
first_name:"",
last_name:"",
email:"",
phone:"",
address:"",
username:"test",
     })
 logger.debug(response.body)
expect(response.status).toBe(400)
expect(response.body.errors).toBeDefined
})
})
//REMOVETEST 
 describe("DELETE /api/tablecobas/:tablecobaId", () => {
 
  beforeEach(async () => {
 await UserTest.create()
 await TablecobaTest.create()
 }) 
  afterEach(async () => {
 await TablecobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
 it("should be able to remove tablecoba", async () => {
 const tablecoba = await TablecobaTest.get()
 const response = await supertest(web)
     .delete(`/api/tablecobas/${tablecoba.id}`)
    .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(200)
 expect(response.body.data).toBe("OK")
 })
 it("should reject  to remove tablecoba if tablecoba is not found", async () => {
 const tablecoba = await TablecobaTest.get()
  const response = await supertest(web)
   .delete(`/api/tablecobas/${tablecoba.id + 1}`)
   .set("X-API-TOKEN", "test")
 logger.debug(response.body)
 expect(response.status).toBe(404)
 expect(response.body.errors).toBeDefined()
 }) 
 }) //SEARCH Test 
describe("SEARCH /api/tablecobas", () => { 
  beforeEach(async () => {
 await UserTest.create()
 await TablecobaTest.create()
 }) 
  afterEach(async () => {
 await TablecobaTest.deleteAll() //buatkan di util-test dulu
 await UserTest.delete()
 })
  it("should be able to search tablecoba", async () => {
  const response = await supertest(web)
      .get("/api/tablecobas")
     .set("X-API-TOKEN", "test")
  logger.debug(response.body)
  expect(response.status).toBe(200)
  expect(response.body.data.length).toBe(1)
  expect(response.body.paging.current_page).toBe(1)
  expect(response.body.paging.total_page).toBe(1)
  expect(response.body.paging.size).toBe(10)
})
})
