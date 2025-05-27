import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt"

export class UserTest{
    //unutk menghapus user
    static async delete(){
        await prismaClient.user.deleteMany({
            where: {
                username : "test"
            }
        })
    }

    //unutk menambah user user
    static async create(){
        await prismaClient.user.create({
            data :{
                username:"test",
                name :"test",
                password: await bcrypt.hash("test",10),
                token : "test"
            }
        })
    }
}