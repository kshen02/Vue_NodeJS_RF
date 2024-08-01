import { userStore } from "@/store/userStore"
import axios from "axios"
import { md5 } from "js-md5"

const api = axios.create({
    baseURL: "http://10.186.106.13:3000",
    timeout: 1000,
})

api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("jwt")
        const token = userStore().getAccessToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)
        if (error.response.status == 401) {
            alert("认证失败，请重新登录")
            window.location.href = "/"
        }
        return Promise.reject(error)
    }
)

export function userLogin(username, password) {
    return api.post("/login", {
        username: username,
        password: md5(username + password),
    })
}

export function userRegister(username, password, role) {
    return api.post("/register", {
        username: username,
        password: md5(username + password),
        role: role,
    })
}

export async function loadRoutes() {
    return api.post("/routes", {
        role: sessionStorage.getItem("role"),
    })
}

export async function loadUsers() {
    return api.post("/users", {
        role: sessionStorage.getItem("role"),
    })
}
