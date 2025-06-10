import express from 'express'
import { UserController } from '../controller/user-controller';
import { DevController } from '../dev/dev-controller';


export const publicRouter = express.Router();
publicRouter.post("/api/users",UserController.register)
publicRouter.post("/api/users/login",UserController.login)


//dev
publicRouter.get("/api/dev/schema/:tableId",DevController.get)