import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.5:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {

    // Don't send JWT for public endpoints
    if (
        config.url === "/auth/login" ||
        config.url === "/auth/register"
    ) {
        return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (
            error.response &&
            (error.response.status === 401 ||
             error.response.status === 403)
        ) {

            localStorage.removeItem("token");

            window.location.href = "/";

        }

        return Promise.reject(error);

    }

);

export default api;