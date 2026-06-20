import axios from "axios";


export const saveTokens = (access:any , refresh:any) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
}

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
})

export const getToken = () => {
    return localStorage.getItem("access")
}

axiosRequest.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
},
(error: any) => {
    return Promise.reject(error)
}
)
