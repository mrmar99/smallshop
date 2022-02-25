import Home from "../pages/Home/Home";
import Basket from "../pages/Basket/Basket";
import Registration from "../pages/Auth/Registration";
import Login from "../pages/Auth/Login";
import Report from "../pages/Report/Report";

import {
    HOME_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    REPORT_ROUTE
} from "../utils/consts";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />
    },
    {
        path: BASKET_ROUTE,
        Component: <Basket />
    }
];

export const adminRoutes = [
    {
        path: REPORT_ROUTE,
        Component: <Report />
    }
];

export const loginRegRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration />
    }
];