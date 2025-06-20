"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dev_tablexTest = exports.TablecobaTest = exports.ContactTest = exports.UserTest = void 0;
const database_1 = require("../src/application/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserTest {
    //unutk menghapus user
    static delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.deleteMany({
                where: {
                    username: "test"
                }
            });
        });
    }
    //unutk menambah user user
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.create({
                data: {
                    username: "test",
                    name: "test",
                    password: yield bcrypt_1.default.hash("test", 10),
                    token: "test"
                }
            });
        });
    }
    //ambil user
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findFirst({
                where: {
                    username: "test"
                }
            });
            if (!user) {
                throw new Error("User is not found");
            }
            return user;
        });
    }
}
exports.UserTest = UserTest;
class ContactTest {
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.contact.deleteMany({
                where: {
                    username: "test"
                }
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.contact.create({
                data: {
                    first_name: "test",
                    last_name: "test",
                    email: "test@mail.com",
                    phone: "08999999",
                    username: "test"
                }
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield database_1.prismaClient.contact.findFirst({
                where: {
                    username: "test"
                }
            });
            if (!contact) {
                throw new Error("Contact is not found");
            }
            return contact;
        });
    }
}
exports.ContactTest = ContactTest;
//tambahkan ke dalam file test-util.ts pada folder test 
//CREATE UTIL-TEST Tablecoba
class TablecobaTest {
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.tablecoba.deleteMany({
                where: {
                    username: "test"
                }
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.tablecoba.create({
                data: {
                    first_name: "test",
                    last_name: "test",
                    email: "test",
                    phone: "test",
                    address: "test",
                    username: "test",
                }
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const tablecoba = yield database_1.prismaClient.tablecoba.findFirst({
                where: {
                    username: "test"
                }
            });
            if (!tablecoba) {
                throw new Error("Tablecoba is not found");
            }
            return tablecoba;
        });
    }
}
exports.TablecobaTest = TablecobaTest;
//============
//tambahkan ke dalam file test-util.ts pada folder test 
//CREATE UTIL-TEST Dev_tablex
class Dev_tablexTest {
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.dev_tablex.deleteMany({
                where: {
                    create_by: "test"
                }
            });
        });
    }
    static create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.dev_tablex.create({
                data: {
                    name: "test",
                    desc: "test",
                    project_id: 1,
                    create_by: "test"
                }
            });
        });
    }
    static get() {
        return __awaiter(this, void 0, void 0, function* () {
            const dev_tablex = yield database_1.prismaClient.dev_tablex.findFirst({
                where: {
                    create_by: "test"
                }
            });
            if (!dev_tablex) {
                throw new Error("Dev_tablex is not found");
            }
            return dev_tablex;
        });
    }
}
exports.Dev_tablexTest = Dev_tablexTest;
//tambahkan Dev_tablex pada import { User, Contact, Tablecoba } from "@prisma/client";
//tambahkan Dev_tablex pada import { User, Contact, Tablecoba } from "@prisma/client";
