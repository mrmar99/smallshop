import Express from "express";
import UserControllers from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Express.Router();

router.get('/auth', authMiddleware, UserControllers.check);
router.get('/getuserids', UserControllers.getUserIds);
router.post('/reg', UserControllers.registration);
router.post('/login', UserControllers.login);

export default router;