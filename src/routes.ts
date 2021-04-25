import { Request, Response, Router } from "express";
import { RelationCountMetadata } from "typeorm/metadata/RelationCountMetadata";
import { AdminController } from "./controllers/AdminController";
import { SaleController } from "./controllers/SaleController";
import { authmiddleware } from "./middleware/authMiddleware";

const router = Router();

const adminController = new AdminController();
const saleController = new SaleController();

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
router.post("/new-sale", saleController.create);
router.get("/show-sales", saleController.show);
router.delete("/delete-sale/:id", saleController.delete);
router.post("/set-delivered/:id", saleController.setDelivered);
router.get("/count-delivered", saleController.countDeliverdeSales);

export { router };
