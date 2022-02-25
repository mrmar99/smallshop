import {Router} from "express";
import userRouter from "./user.routes.js";
// import employeeRouter from "./employee.routes.js";
import orderRouter from "./order.routes.js";
// import priceRouter from "./price.routes.js";
import productRouter from "./product.routes.js";
// import storeRouter from "./store.routes.js";

const router = new Router();

router.use('/user', userRouter);
// router.use('/employee', employeeRouter);
router.use('/order', orderRouter);
// router.use('/price', priceRouter);
router.use('/product', productRouter);
// router.use('/store', storeRouter);

export default router;