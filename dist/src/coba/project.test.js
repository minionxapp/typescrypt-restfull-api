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
//Test Project
const supertest_1 = __importDefault(require("supertest"));
const web_1 = require("../../src/application/web");
const test_util_1 = require("../../test/test-util");
const logging_1 = require("../../src/application/logging");
//Create test
describe("POST /api/projects", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ProjectTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ProjectTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should create new project", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/projects")
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
    it("should reject create new project", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .post("/api/projects")
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
describe("POST /api/projects", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ProjectTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ProjectTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able get project", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(project.id);
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe(project.name);
        expect(response.body.data.desc).toBe(project.desc);
        expect(response.body.data.project_id).toBe(project.project_id);
    }));
    it("should reject  get project if project is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .get(`/api/projects/${project.id}` + 1)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(project.id);
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
});
//PUT/UDATE TEST 
describe("PUT /api/projects/:projectId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ProjectTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ProjectTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to update project", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test")
            .send({
            name: "test_edited",
            desc: "test_edited",
            project_id: 1,
        });
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(project.id);
        expect(response.body.data.name).toBe("test_edited");
        expect(response.body.data.desc).toBe("test_edited");
        expect(response.body.data.project_id).toBe(project.project_id);
    }));
    it("should be reject  to update   project", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .put(`/api/projects/${project.id}`)
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
describe("DELETE /api/projects/:projectId", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ProjectTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ProjectTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to remove project", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/projects/${project.id}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    }));
    it("should reject  to remove project if project is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield test_util_1.ProjectTest.get();
        const response = yield (0, supertest_1.default)(web_1.web)
            .delete(`/api/projects/${project.id + 1}`)
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    }));
}); //SEARCH Test 
describe("SEARCH /api/projects", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.UserTest.create();
        yield test_util_1.ProjectTest.create();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield test_util_1.ProjectTest.deleteAll(); //buatkan di util-test dulu
        yield test_util_1.UserTest.delete();
    }));
    it("should be able to search project", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(web_1.web)
            .get("/api/projects")
            .set("X-API-TOKEN", "test");
        logging_1.logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    }));
});
