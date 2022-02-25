import {$authHost, $host} from "./axios";
import jwt_decode from "jwt-decode";

export const fetchUser = async (id) => {
    const { data } = await $authHost
        .get("/user/" + id)
        .catch((err) => console.log(err));
    delete data["password"];
    return data;
};

export const registration = async (email, password, first_name, last_name) => {
    const { data } = await $host.post("/user/reg", { email, password, first_name, last_name });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};

export const check = async () => {
    const { data } = await $authHost.get("/user/auth");
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};