import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Модель цены на товар
 */
export const Price = sequelize.define('prices', {
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
}, {
    underscored: true
});