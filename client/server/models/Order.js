import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Модель заказа
 */
export const Order = sequelize.define('orders', {
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.STRING
    },
    obtaining_method: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Доставка"
    },
    address: {
        type: DataTypes.STRING
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Картой онлайн"
    },
    date: {
        type: DataTypes.DATE
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    }
}, {
    underscored: true
});