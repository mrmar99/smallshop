import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Модель товара
 */
export const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    underscored: true
});