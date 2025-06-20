"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const contact_controller_1 = require("../controller/contact-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
//user api
exports.apiRouter.get("/api/users/current", user_controller_1.UserController.get);
exports.apiRouter.patch("/api/users/current", user_controller_1.UserController.update);
exports.apiRouter.delete("/api/users/current", user_controller_1.UserController.logout);
//Contact API  \\d --> validasi hanya untuk number
exports.apiRouter.post("/api/contacts", contact_controller_1.ContactController.create);
exports.apiRouter.get("/api/contacts/:contactId", contact_controller_1.ContactController.get);
exports.apiRouter.put("/api/contacts/:contactId", contact_controller_1.ContactController.update);
exports.apiRouter.delete("/api/contacts/:contactId", contact_controller_1.ContactController.remove);
exports.apiRouter.get("/api/contacts", contact_controller_1.ContactController.search);
const dev_tablex_controller_1 = require("../controller/dev-tablex-controller");
//ROUTE Dev_tablex
exports.apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.getByProjectId);
exports.apiRouter.post("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.create);
exports.apiRouter.get("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.get);
exports.apiRouter.put("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.update);
exports.apiRouter.delete("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.remove);
exports.apiRouter.get("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.search);
const dev_project_controller_1 = require("../controller/dev-project-controller");
//ROUTE Dev_project
exports.apiRouter.post("/api/dev_projects", dev_project_controller_1.Dev_projectController.create);
exports.apiRouter.get("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.get);
exports.apiRouter.put("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.update);
exports.apiRouter.delete("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.remove);
exports.apiRouter.get("/api/dev_projects", dev_project_controller_1.Dev_projectController.search);
