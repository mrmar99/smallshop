import Express from "express";
import OrderControllers from "../controllers/order.controllers.js";

const router = Express.Router();

router.post('/', OrderControllers.create);
router.get('/', OrderControllers.getOrdersByMonth);

export default router;