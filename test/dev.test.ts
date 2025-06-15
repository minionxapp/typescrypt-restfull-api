
import supertest from "supertest";
import { web } from "../src/application/web"
import { logger } from "../src/application/logging"

describe('Get /api/dev/schema/1', () => {


it('should dev', async () => {
const response = await supertest(web)
            .get("/api/dev/schema/3")
            // .set("X-API-TOKEN", "test")
            // .send({
            //     password: "",
            //     name: ""
            // })

            // logger.debug(response.body.data.message)
            // console.log(response.body.data)
})

})