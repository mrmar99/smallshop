import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Модель магазина
 */
export const Store = sequelize.define('stores', {
    store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    underscored: true
});