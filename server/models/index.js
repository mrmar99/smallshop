import {User} from "./User.js";
import {Employee} from "./Employee.js";
import {Order} from "./Order.js";
import {OrdersProducts} from "./OrdersProducts.js";
import {Price} from "./Price.js";
import {Product} from "./Product.js";
import {Store} from "./Store.js";

User.hasOne(Employee);
Employee.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Store.hasMany(Employee);
Employee.belongsTo(Store);

Store.hasMany(Order);
Order.belongsTo(Store);

Store.hasMany(Product);
Product.belongsTo(Store);

Order.hasMany(OrdersProducts);
OrdersProducts.belongsTo(Order);

Product.hasMany(OrdersProducts);
OrdersProducts.belongsTo(Product);

Product.hasMany(Price);
Price.belongsTo(Product);

export {
    User,
    Employee,
    Order,
    OrdersProducts,
    Price,
    Product,
    Store
};