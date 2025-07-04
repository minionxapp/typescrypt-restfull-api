import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";
import {Dev_projectController } from "../controller/dev-project-controller";
import {Dev_tablexController } from "../controller/dev-tablex-controller";
import {DevTableKolomController } from "../controller/DevTableKolom-controller";
import {DevDirektoriController } from "../controller/DevDirektori-controller";
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






//ROUTE Dev_tablex
apiRouter.get("/api/dev_tablexs/projectid/:dev_tablexId",Dev_tablexController.getByProjectId)
apiRouter.post("/api/dev_tablexs",Dev_tablexController.create)
apiRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)
apiRouter.put("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.update)
apiRouter.delete("/api/dev_tablexs/:dev_tablexId", Dev_tablexController.remove)
apiRouter.get("/api/dev_tablexs", Dev_tablexController.search)

//ROUTE Dev_project
apiRouter.post("/api/dev_projects",Dev_projectController.create)
apiRouter.get("/api/dev_projects/:dev_projectId",Dev_projectController.get)
apiRouter.put("/api/dev_projects/:dev_projectId",Dev_projectController.update)
apiRouter.delete("/api/dev_projects/:dev_projectId", Dev_projectController.remove)
apiRouter.get("/api/dev_projects", Dev_projectController.search)

apiRouter.post("/api/devTableKoloms",DevTableKolomController.create)
apiRouter.get("/api/devTableKoloms/:devTableKolomId",DevTableKolomController.get)
apiRouter.put("/api/devTableKoloms/:devTableKolomId",DevTableKolomController.update)
apiRouter.delete("/api/devTableKoloms/:devTableKolomId", DevTableKolomController.remove)
apiRouter.get("/api/devTableKoloms", DevTableKolomController.search)

                                
//ROUTE DevDirektori
apiRouter.post("/api/devDirektoris",DevDirektoriController.create)
apiRouter.get("/api/devDirektoris/:devDirektoriId",DevDirektoriController.get)
apiRouter.put("/api/devDirektoris/:devDirektoriId",DevDirektoriController.update)
apiRouter.delete("/api/devDirektoris/:devDirektoriId", DevDirektoriController.remove)
apiRouter.get("/api/devDirektoris", DevDirektoriController.search)

