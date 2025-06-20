import express from 'express'
import { UserController } from '../controller/user-controller';
import { DevController } from '../dev/dev-controller';


export const publicRouter = express.Router();
publicRouter.post("/api/users",UserController.register)
publicRouter.post("/api/users/login",UserController.login)


//dev
publicRouter.get("/api/dev/schema/:tableId",DevController.get)


// import {Dev_tablexController } from "../controller/dev-tablex-controller";

// publicRouter.get("/api/dev_tablexs/:dev_tablexId",Dev_tablexController.get)

// import {Dev_projectController } from "../controller/dev-project-controller";
// publicRouter.get("/api/dev_projects", Dev_projectController.search)