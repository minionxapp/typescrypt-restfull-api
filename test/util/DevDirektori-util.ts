
//tambahkan DevDirektori pada 
import { prismaClient } from "../../src/application/database";
import { DevDirektori} from "@prisma/client";

export class DevDirektoriTest {
    static async deleteAll() {
        await prismaClient.devDirektori.deleteMany({
            where: {
                username: "test" 
            }
        })
    }
    static async create() {
        await prismaClient.devDirektori.create({
            data: {
                username: "test",
                direktori: "test",
                create_by: "test"
            }
        })
    }
    static async get(): Promise<DevDirektori> {
        const devDirektori = await prismaClient.devDirektori.findFirst({
            where: {
                create_by: "test"
            }
        })
        if (!devDirektori) {
            throw new Error("DevDirektori is not found")
        }
        return devDirektori
    }
}