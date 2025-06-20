import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";



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



import {Dev_tablexController } from "../controller/dev-tablex-controller";


//ROUTE Dev_tablex
apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId",Dev_tablexController.getByProjectId)
apiRouter.post("/api/dev_tablexs",Dev_tablexController.create)
apiRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)
apiRouter.put("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.update)
apiRouter.delete("/api/dev_tablexs/:dev_tablexId", Dev_tablexController.remove)
apiRouter.get("/api/dev_tablexs", Dev_tablexController.search)



import {Dev_projectController } from "../controller/dev-project-controller";


//ROUTE Dev_project
apiRouter.post("/api/dev_projects",Dev_projectController.create)
apiRouter.get("/api/dev_projects/:dev_projectId",Dev_projectController.get)
apiRouter.put("/api/dev_projects/:dev_projectId",Dev_projectController.update)
apiRouter.delete("/api/dev_projects/:dev_projectId", Dev_projectController.remove)
apiRouter.get("/api/dev_projects", Dev_projectController.search)


