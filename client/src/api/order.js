import {$authHost, $host} from "./axios";

export const fetchOrdersByMonth = async () => {
    const { data } = await $authHost
        .get("/order")
        .catch((err) => console.log(err));
    return data;
};

export const createOrder = async (order) => {
    const { data } = await $host
        .post("/order", order, { headers: { 'Content-Type': 'multipart/form-data' } })
        .catch((err) => console.log(err));
    return data;
};

