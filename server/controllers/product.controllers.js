import sequelize from "../db/index.js";
import {QueryTypes} from "sequelize";
import {Product} from "../models/index.js";

/**
 * Класс, описывающий логику для поступающих запросов
 * на маршруты Продуктов
 */
class ProductControllers {
    /** Котроллер для регистрации пользователя */
    get = async (req, res) => {
        const query = `
            SELECT 
                   p.id, p.name AS product_name, p.code, p.store_store_id AS store_id,
                   pr.price, 
                   s.name, s.address, s.number
            FROM products p
            JOIN prices pr
            ON pr.product_id = p.id
            JOIN stores s
            ON s.store_id = p.store_store_id
        `

        try {
            const products = await sequelize.query(
                query,
                {
                    type: QueryTypes.SELECT
                }
            );
            res.json(products);
        } catch (e) {
            console.log(e);
        }

        // const products = await Product.findAll();

    }

    getOne = async (req, res) => {
        const { id } = req.params;

        const query = `
            SELECT 
                   p.id, p.name AS product_name, p.code, p.store_store_id AS store_id,
                   pr.price, 
                   s.name, s.address, s.number
            FROM products p
            JOIN prices pr
            ON pr.product_id = p.id
            JOIN stores s
            ON s.store_id = p.store_store_id
            WHERE p.id = ?
        `

        try {
            const product = await sequelize.query(
                query,
                {
                    replacements: [id],
                    type: QueryTypes.SELECT
                }
            );
            res.json(product);
        } catch (e) {
            console.log(e);
        }

        // const products = await Product.findAll();

    }
}

export default ProductControllers = new ProductControllers();