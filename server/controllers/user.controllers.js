import ApiError from "../error/ApiError.js";
import {User} from "../models/index.js";
import isEmpty from "../utils/isEmpty.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Функция для генерирования jwt токена
 */
const generateToken = (id, email, isAdmin) => {
    return jwt.sign(
        { id, email, isAdmin },
        process.env.SECRET_KEY,
        {
            expiresIn: "24h"
        }
    );
}

/**
 * Класс, описывающий логику для поступающих запросов
 * на маршруты Пользователя
 */
class UserControllers {
    /** Котроллер для регистрации пользователя */
    /** Котроллер для регистрации пользователя */
    registration = async (req, res, next) => {
        let { first_name, last_name, password, email } = req.body;

        if (isEmpty(password) || isEmpty(email)) {
            return next(ApiError.badRequest(
                "Введите все необходимые данные: эл. почту и пароль"
            ));
        }

        const checkEmail = await User.findOne({ where: { email } });
        if (checkEmail) {
            return next(ApiError.badRequest(
                "Такой пользователь уже существует"
            ));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            first_name,
            last_name,
            password: hashPassword,
            email
        });

        const token = generateToken(
            user.id,
            email,
            false
        );

        res.json({ token, user });
    }

    /** Котроллер для логина пользователя */
    login = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.notFound("Пользователь не найден"));
        }

        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.notFound("Указан неверный пароль"));
        }

        const foundUser = await User.findOne({ where: { email } });
        let isAdmin = false;
        if (foundUser.is_admin) {
            isAdmin = true
        }

        const token = generateToken(
            user.id,
            email,
            isAdmin
        );

        res.json({ token, user });
    }

    /** Котроллер для авторизации пользователя */
    check = async (req, res) => {
        const email = req.user.email;

        const foundUser = await User.findOne({ where: { email } });

        let isAdmin = false;
        if (foundUser.is_admin) {
            isAdmin = true
        }

        const token = generateToken(
            foundUser.id,
            email,
            isAdmin
        );

        res.json({ token });
    }

    getUserIds = async (req, res) => {
        const users = await User.findAll({ where: { is_bot_admin: true } });

        const userIds = users.map((user) => {
            return user.id
        });

        res.json(userIds);
    }
}

export default UserControllers = new UserControllers();