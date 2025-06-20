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
//Test Dev_tablex
const supertest_1 = __importDefault(require("supertest"));
const web_1 = require("../../src/application/web");
const test_util_1 = require("../../test/test-util");
const logging_1 = require("../../src/application/logging");
//Create test
describe("POST /api/dev_tablexs", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.Dev_tablexTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.Dev_tablexTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should create new dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/dev_tablexs")
            .set("X-API-TOKEN", "test")
            .send({
            name: "Test_name",
            desc: "Test_desc",
            project_id: 1,
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe("Test_name");
        expect(response.body.data.desc).toBe("Test_desc");
        expect(response.body.data.project_id).toBe(1);
    }));
    it("should reject create new dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/dev_tablexs")
            .set("X-API-TOKEN", "test")
            .send({
            name: "",
            desc: "",
            project_id: 1,
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    }));
});
//GET test
describe("POST /api/dev_tablexs", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.Dev_tablexTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.Dev_tablexTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able get dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/dev_tablexs/${dev_tablex.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(dev_tablex.id);
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe(dev_tablex.name);
        expect(response.body.data.desc).toBe(dev_tablex.desc);
        expect(response.body.data.project_id).toBe(dev_tablex.project_id);
    }));
    it("should reject  get dev_tablex if dev_tablex is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/dev_tablexs/${dev_tablex.id}` + 1)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(dev_tablex.id);
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
//PUT/UDATE TEST 
describe("PUT /api/dev_tablexs/:dev_tablexId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.Dev_tablexTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.Dev_tablexTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to update dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/dev_tablexs/${dev_tablex.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            name: "test_edited",
            desc: "test_edited",
            project_id: 1,
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(dev_tablex.id);
        expect(response.body.data.name).toBe("test_edited");
        expect(response.body.data.desc).toBe("test_edited");
        expect(response.body.data.project_id).toBe(dev_tablex.project_id);
    }));
    it("should be reject  to update   dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/dev_tablexs/${dev_tablex.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            name: "",
            desc: "",
            project_id: 1,
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined;
    }));
});
//REMOVETEST 
describe("DELETE /api/dev_tablexs/:dev_tablexId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.Dev_tablexTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.Dev_tablexTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to remove dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/dev_tablexs/${dev_tablex.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    }));
    it("should reject  to remove dev_tablex if dev_tablex is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const dev_tablex = yield test_util_1.Dev_tablexTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/dev_tablexs/${dev_tablex.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
}); //SEARCH Test 
describe("SEARCH /api/dev_tablexs", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.Dev_tablexTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.Dev_tablexTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to search dev_tablex", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/dev_tablexs")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(4);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
});
