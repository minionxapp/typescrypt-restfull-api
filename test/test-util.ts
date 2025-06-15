import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"
import { User, Contact, Tablecoba, Project, Dev_tablex } from "@prisma/client";

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
//UTIL-TEST//tambahkan ke dalam file test-util.ts pada folder test 
//CREATE UTIL-TEST Project
export class ProjectTest {
    static async deleteAll() {
        await prismaClient.project.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.project.create({
            data: {
                project_id: 1,
                name: "test",
                desc: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Project> {
        const project = await prismaClient.project.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!project) {
            throw new Error("Project is not found")
        }
        return project
    }
}

//tambahkan Project pada import { User, Contact, Tablecoba } from "@prisma/client";
//UTIL-TEST//tambahkan ke dalam file test-util.ts pada folder test 
//CREATE UTIL-TEST Dev_tablex
export class Dev_tablexTest {
    static async deleteAll() {
        await prismaClient.dev_tablex.deleteMany({
            where: {
                create_by: "test"
            }
        })
    }
    static async create() {
        await prismaClient.dev_tablex.create({
            data: {
                name: "test",
                desc: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Dev_tablex> {
        const dev_tablex = await prismaClient.dev_tablex.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!dev_tablex) {
            throw new Error("Dev_tablex is not found")
        }
        return dev_tablex
    }
}
//tambahkan Dev_tablex pada import { User, Contact, Tablecoba } from "@prisma/client";