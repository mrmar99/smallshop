import app from "../app.js";
import sequelize from "../db/index.js";
import AdminJS from "adminjs";
import AdminJSSequelize from "@adminjs/sequelize";

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        AdminJS.registerAdapter(AdminJSSequelize);
        app().listen(PORT, () => {
            console.log(`Server was started on port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();