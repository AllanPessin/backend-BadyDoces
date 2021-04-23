import { Request, Response, Router } from "express";
import { AdminController } from "./controllers/AdminController";
import { authmiddleware } from "./middleware/authMiddleware";

const router = Router();

const adminController = new AdminController();

router.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Bady Doces API" });
});

router.post("/create-admin", adminController.create);

router.post("/session", adminController.authenticate);

/**
 * Routes below middleware require the token
 */

router.use(authmiddleware);

router.get("/show-admin", adminController.show);

export { router };
