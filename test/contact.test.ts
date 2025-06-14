import supertest from 'supertest'
import { web } from "../src/application/web"
import { ContactTest, UserTest } from './test-util'
import { logger } from '../src/application/logging'
describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create()
    })
    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })
    it('should create new contact', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: 'mugi',
                last_name: "arto",
                email: "mugi@mail.com",
                phone: "089999999999"
            })
        logger.debug(response.body)
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe("mugi")
        expect(response.body.data.last_name).toBe("arto")
        expect(response.body.data.email).toBe("mugi@mail.com")
        expect(response.body.data.phone).toBe("089999999999")

    })


    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(web)
            .post("/api/contacts")
            .set("X-API-TOKEN", "test")
            .send({
                first_name: '',
                last_name: "",
                email: "mugi",
                phone: "08999999999900000000000"
            })
        logger.debug(response.body)
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined()
    });
})


describe('GET /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })
    
   
    it('should be able get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web) 
            .get(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
        logger.debug(contact.id)
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should reject  get contact if contact is not found', async () => {
         const contact = await ContactTest.get()
        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}` + 1)
            .set("X-API-TOKEN", "test")
        logger.debug(contact.id)
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })
})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                first_name: 'eko',
                last_name: "mugi",
                email: "mail@mailx.com",
                phone: "0811111111"
            })
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(contact.id)
        expect(response.body.data.first_name).toBe("eko")
        expect(response.body.data.last_name).toBe("mugi")
        expect(response.body.data.email).toBe("mail@mailx.com")
        expect(response.body.data.phone).toBe("0811111111")
    });
    it('should reject  to update contact request is invalid', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
        .put(`/api/contacts/${contact.id}`)
        .set("X-API-TOKEN", "test")
        .send({
            first_name: '',
            last_name: "",
            email: "mail",
            phone: "081111111111112121323232323223"
        })
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined
        
    });
})

//samoai sini kode generatornya...............
describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('OK')
    })

    it('should reject  to remove contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

})

//samoai sini kode generatornya...............
describe('SEARCH /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })
    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })
    it('should be able to search contact', async () => {
        const response = await supertest(web)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test")
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(1)
        expect(response.body.paging.current_page).toBe(1)
        expect(response.body.paging.total_page).toBe(1)
        expect(response.body.paging.size).toBe(10)


    });
}
)