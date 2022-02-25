import {Order, OrdersProducts} from "../models/index.js";
import sequelize from "../db/index.js";
import {QueryTypes} from "sequelize";

/**
 * Класс, описывающий логику для поступающих запросов
 * на маршруты Заказов
 */
class OrderControllers {
    /** Котроллер для регистрации пользователя */
    create = async (req, res) => {
        try {
            const { first_name, last_name, number, address, obtaining_method, payment_method, price, basket } = req.body;
            const jsonBasket = JSON.parse(basket);
            const order = await Order.create({ first_name, last_name, number, address, obtaining_method, payment_method, price });
            Object.values(jsonBasket).map(async (product) => {
                await OrdersProducts.create({ orderId: order.id, productId: product.id });
            })
            res.json(order);
        } catch (e) {
            console.log(e);
        }
    }

    getOrdersByMonth = async (req, res) => {
        const query = `
            SELECT 
                o.id, o.first_name, o.last_name, 
                o.number, o.obtaining_method, o.payment_method,
                o.price, o.created_at, 
                p.id AS product_id, p.name, p.code,
                s.name AS store_name
            FROM orders o
            JOIN orders_products op
            ON op.order_id = o.id
            JOIN products p
            ON p.id = op.product_id
            JOIN stores s
            ON s.store_id = p.store_store_id
            ORDER BY o.id
        `

        try {
            const orders = await sequelize.query(
                query,
                {
                    type: QueryTypes.SELECT
                }
            );
            res.json(orders);
        } catch (e) {
            console.log(e);
        }
    }
}

export default OrderControllers = new OrderControllers();