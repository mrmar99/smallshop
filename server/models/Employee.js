import sequelize from "../db/index.js";
import DataTypes from "sequelize";

/**
 * Модель сотрудника
 */
export const Employee = sequelize.define('employees', {
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    underscored: true
});