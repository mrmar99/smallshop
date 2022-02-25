import {$host} from "./axios";

export const fetchProducts = async () => {
    const { data } = await $host
        .get("/product")
        .catch((err) => console.log(err));
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await $host
        .get("/product/" + id)
        .catch((err) => console.log(err));
    return data;
};