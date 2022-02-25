import Express from "express";
import cors from "cors";
import * as models from "./models/index.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import sequelize from "./db/index.js";
import router from "./routes/index.js";
import multer from "multer";

export default () => {
    const app = new Express();
    const upload = multer();

    const adminJs = new AdminJS({
        databases: [sequelize],
        rootPath: '/admin',
        AdminJSOptions: {
            resources: models
        }
    });
    const adminJsRouter = AdminJSExpress.buildRouter(adminJs);

    app.use(cors());
    app.use(Express.json());
    app.use(adminJs.options.rootPath, adminJsRouter);
    app.use(Express.urlencoded({ extended: true }));
    app.use(upload.array());
    app.use('/api', router);

    return app;
};