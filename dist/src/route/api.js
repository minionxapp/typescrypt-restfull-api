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
const project_controller_1 = require("../coba/project-controller");
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
//ROUTE Project
exports.apiRouter.post("/api/projects", project_controller_1.ProjectController.create);
exports.apiRouter.get("/api/projects/:projectId", project_controller_1.ProjectController.get);
exports.apiRouter.put("/api/projects/:projectId", project_controller_1.ProjectController.update);
exports.apiRouter.delete("/api/projects/:projectId", project_controller_1.ProjectController.remove);
exports.apiRouter.get("/api/projects", project_controller_1.ProjectController.search);
//ROUTE Dev_tablex
const dev_tablex_controller_1 = require("../coba/dev_tablex-controller");
exports.apiRouter.post("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.create);
exports.apiRouter.get("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.get);
exports.apiRouter.put("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.update);
exports.apiRouter.delete("/api/dev_tablexs/:dev_tablexId", dev_tablex_controller_1.Dev_tablexController.remove);
exports.apiRouter.get("/api/dev_tablexs", dev_tablex_controller_1.Dev_tablexController.search);
//ROUTE Tablecoba
// apiRouter.post("/api/tablecobas", TablecobaController.create)
// apiRouter.get("/api/tablecobas/:tablecobaId", TablecobaController.get)
// apiRouter.put("/api/tablecobas/:tablecobaId", TablecobaController.update)
// apiRouter.delete("/api/tablecobas/:tablecobaId", TablecobaController.remove)
// apiRouter.get("/api/tablecobas", TablecobaController.search)
