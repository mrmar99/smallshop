import Axios from "axios";

const $host = Axios.create({
    baseURL: "http://localhost:5000/" + "api"
});

const $authHost = Axios.create({
    baseURL: "http://localhost:5000/" + "api"
});

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}