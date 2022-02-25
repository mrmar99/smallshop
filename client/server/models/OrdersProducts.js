import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Промежуточная модель Заказы-Товары
 */
export const OrdersProducts = sequelize.define('orders_products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    underscored: true
});