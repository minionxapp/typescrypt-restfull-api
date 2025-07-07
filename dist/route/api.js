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
const dev_project_controller_1 = require("../controller/dev-project-controller");
const dev_tablex_controller_1 = require("../controller/dev-tablex-controller");
const DevTableKolom_controller_1 = require("../controller/DevTableKolom-controller");
const DevDirektori_controller_1 = require("../controller/DevDirektori-controller");
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
//ROUTE Dev_tablex
exports.apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.getByProjectId);
exports.apiRouter.post("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.create);
exports.apiRouter.get("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.get);
exports.apiRouter.put("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.update);
exports.apiRouter.delete("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.remove);
exports.apiRouter.get("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.search);
//ROUTE Dev_project
exports.apiRouter.post("/api/dev_projects", dev_project_controller_1.Dev_projectController.create);
exports.apiRouter.get("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.get);
exports.apiRouter.put("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.update);
exports.apiRouter.delete("/api/dev_projects/:dev_projectId", dev_project_controller_1.Dev_projectController.remove);
exports.apiRouter.get("/api/dev_projects", dev_project_controller_1.Dev_projectController.search);
exports.apiRouter.post("/api/devTableKoloms", DevTableKolom_controller_1.DevTableKolomController.create);
exports.apiRouter.get("/api/devTableKoloms/tableid/:devTableKolomTableId", DevTableKolom_controller_1.DevTableKolomController.getTableId);
exports.apiRouter.get("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.get);
exports.apiRouter.put("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.update);
exports.apiRouter.delete("/api/devTableKoloms/:devTableKolomId", DevTableKolom_controller_1.DevTableKolomController.remove);
exports.apiRouter.get("/api/devTableKoloms", DevTableKolom_controller_1.DevTableKolomController.search);
//ROUTE DevDirektori
exports.apiRouter.post("/api/devDirektoris", DevDirektori_controller_1.DevDirektoriController.create);
exports.apiRouter.get("/api/devDirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.get);
exports.apiRouter.put("/api/devDirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.update);
exports.apiRouter.delete("/api/devDirektoris/:devDirektoriId", DevDirektori_controller_1.DevDirektoriController.remove);
exports.apiRouter.get("/api/devDirektoris", DevDirektori_controller_1.DevDirektoriController.search);
const Group_controller_1 = require("../controller/Group-controller");
exports.apiRouter.post("/api/groups", Group_controller_1.GroupController.create);
exports.apiRouter.get("/api/groups/:groupId", Group_controller_1.GroupController.get);
exports.apiRouter.put("/api/groups/:groupId", Group_controller_1.GroupController.update);
exports.apiRouter.delete("/api/groups/:groupId", Group_controller_1.GroupController.remove);
exports.apiRouter.get("/api/groups", Group_controller_1.GroupController.search);
