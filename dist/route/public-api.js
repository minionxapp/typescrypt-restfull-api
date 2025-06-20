"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const dev_controller_1 = require("../dev/dev-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/users", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
//dev
exports.publicRouter.get("/api/dev/schema/:tableId", dev_controller_1.DevController.get);
// import {Dev_tablexController } from "../controller/dev-tablex-controller";
// publicRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)
// import {Dev_projectController } from "../controller/dev-project-controller";
// publicRouter.get("/api/dev_projects", Dev_projectController.search)
