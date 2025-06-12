import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"
import { User, Contact, Tablecoba } from "@prisma/client";

export class UserTest {
    //unutk menghapus user
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

    //unutk menambah user user
    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash("test", 10),
                token: "test"
            }
        })
    }

    //ambil user
    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test"
            }
        })

        if (!user) {
            throw new Error("User is not found")
        }
        return user;
    }
}

export class ContactTest {

    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: "test"
            }
        })
    }
    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test@mail.com",
                phone: "08999999",
                username: "test"
            }
        })
    }

    static async get(): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                username: "test"
            }
        })

        if (!contact) {
            throw new Error("Contact is not found")
        }

        return contact
    }


}


//tambahkan ke dalam file test-util.ts pada folder test 
//CREATE UTIL-TEST Tablecoba
export class TablecobaTest {
    static async deleteAll() {
        await prismaClient.tablecoba.deleteMany({
            where: {
                username: "test"
            }
        })
    }
    static async create() {
        await prismaClient.tablecoba.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test",
                phone: "test",
                address: "test",
                username: "test",
            }
        })
    }
    static async get(): Promise<Tablecoba> {
        const tablecoba = await prismaClient.tablecoba.findFirst({
            where: {
                username: "test"
            }
        })
        if (!tablecoba) {
            throw new Error("Tablecoba is not found")
        }
        return tablecoba
    }
}
//tambahkan Tablecoba pada import { User, Contact, Tablecoba } from "@prisma/client";