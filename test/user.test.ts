import supertest from "supertest";
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"
import { UserTest } from "./test-util";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    })

    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: '',
                password: "",
                name: ""
            })
        logger.debug(response.body)
        //validation error/zod error
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    });

    it('should register new user', async () => {
        const response = await supertest(web)
            .post("/api/users")
            .send({
                username: "test",
                password: "test",
                name: "test"
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
    });

})

describe('POST /api/users/login', () => {
    //buat user untuk awal test
    beforeEach(async () => {
        await UserTest.create()
    })
    //hapus user setelah test
    afterEach(async () => {
        await UserTest.delete()
    })

    it('should  be able to login', async() => {
        const response = await supertest(web)
        .post("/api/users/login")
        .send({
            username :"test",
            password :"test"
        })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.username).toBe("test")
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.token).toBeDefined()
    });
})