import Express from "express";
import ProductControllers from "../controllers/product.controllers.js";

const router = Express.Router();

router.get('/', ProductControllers.get);
router.get('/:id', ProductControllers.getOne);

export default router;