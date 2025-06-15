import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import { TablecobaController } from "../controller/tablecoba-controller";
import {ProjectController } from "../coba/project-controller";
import {Dev_tablexController } from "../coba/dev_tablex-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//user api
apiRouter.get("/api/users/current", UserController.get)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/current", UserController.logout)

//Contact API  \\d --> validasi hanya untuk number
apiRouter.post("/api/contacts", ContactController.create)
apiRouter.get("/api/contacts/:contactId", ContactController.get)
apiRouter.put("/api/contacts/:contactId", ContactController.update)
apiRouter.delete("/api/contacts/:contactId", ContactController.remove)
apiRouter.get("/api/contacts", ContactController.search)


//ROUTE Project
apiRouter.post("/api/projects",ProjectController.create)
apiRouter.get("/api/projects/:projectId",ProjectController.get)
apiRouter.put("/api/projects/:projectId",ProjectController.update)
apiRouter.delete("/api/projects/:projectId", ProjectController.remove)
apiRouter.get("/api/projects", ProjectController.search)




//ROUTE Dev_tablex
apiRouter.post("/api/dev_tablexs",Dev_tablexController.create)
apiRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)
apiRouter.put("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.update)
apiRouter.delete("/api/dev_tablexs/:dev_tablexId", Dev_tablexController.remove)
apiRouter.get("/api/dev_tablexs", Dev_tablexController.search)

//ROUTE Tablecoba
// apiRouter.post("/api/tablecobas", TablecobaController.create)
// apiRouter.get("/api/tablecobas/:tablecobaId", TablecobaController.get)
// apiRouter.put("/api/tablecobas/:tablecobaId", TablecobaController.update)
// apiRouter.delete("/api/tablecobas/:tablecobaId", TablecobaController.remove)
// apiRouter.get("/api/tablecobas", TablecobaController.search)


