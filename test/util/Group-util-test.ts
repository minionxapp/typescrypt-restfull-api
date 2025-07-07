//CREATE UTIL-TEST Group
//Tambahkan ke dalam file test-util.ts pada folder test 

import { prismaClient } from "../../src/application/database";
import { Group } from "@prisma/client";
export class GroupTest {
    static async deleteAll() {
        await prismaClient.group.deleteMany({
            where: {
                create_by: "test"
            }
        })
        
    }
    static async create() {
        await prismaClient.group.create({
            data: {
                name: "test",
                desc: "test",
                pic: "test",
                status: "N",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<Group> {
        const group = await prismaClient.group.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!group) {
            throw new Error("Group is not found")
        }
        return group
    }
}
//tambahkan Group pada import { User, Contact, Tablecoba } from "@prisma/client";