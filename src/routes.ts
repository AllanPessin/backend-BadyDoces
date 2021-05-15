import { Request, Response, Router } from "express";
import { AdminController } from "./controllers/AdminController";
import { CategoryController } from "./controllers/CategoryController";
import { ProductController } from "./controllers/ProductController";
import { SaleController } from "./controllers/SaleController";
import { authmiddleware } from "./middleware/authMiddleware";

const router = Router();

const adminController = new AdminController();
const saleController = new SaleController();
const categoryController = new CategoryController();
const productController = new ProductController();

router.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Bady Doces API" });
});

router.post("/create-admin", adminController.create);
router.post("/session", adminController.authenticate);


router.get("/show-admin", adminController.show);

router.post("/new-sale", saleController.create);
router.get("/show-sales", saleController.show);
router.delete("/delete-sale/:id", saleController.delete);
router.post("/set-delivered/:id", saleController.setDelivered);
router.get("/count-delivered", saleController.countDeliverdeSales);

router.post("/new-category", categoryController.create);
router.get("/show-category", categoryController.show);
router.patch("/update-category/:name", categoryController.update);
router.delete("/delete-category/:id", categoryController.delete);

router.post("/new-product", productController.create);
router.get("/show-product", productController.show);
router.patch("/update-product/:id", productController.update);
router.get("/show-product/:id", productController.index);
router.delete("/delete-product/:id", productController.delete);
router.get("/show-product-category/:name_category", productController.showProductByCategory);

/**
 * Routes below middleware require the token
 */

router.use(authmiddleware);

export { router };
