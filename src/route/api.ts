import express from "express"
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { ContactController } from "../controller/contact-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

//user api
apiRouter.get("/api/users/current",UserController.get)
apiRouter.patch("/api/users/current",UserController.update)
apiRouter.delete("/api/users/current",UserController.logout)

//Contact API  \\d --> validasi hanya untuk number
apiRouter.post("/api/contacts",ContactController.create)
apiRouter.get("/api/contacts/:contactId",ContactController.get)
apiRouter.put("/api/contacts/:contactId",ContactController.update)
apiRouter.delete("/api/contacts/:contactId", ContactController.remove)
apiRouter.get("/api/contacts", ContactController.search)
// apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.remove);

