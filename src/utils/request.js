import axios from "axios";
import {_getToken} from "@/utils/token";
import {resetState} from "@/store/modules/user";
import router from "@/routers";
import store from "@/store";

const request = axios.create({
    // 根域名配置
    baseURL: 'https://geek.itheima.net/v1_0',
    // 超时时间设置
    timeout: 5000
})
// 请求/相应拦截器
request.interceptors.request.use((config) => {
    const token = _getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => {
    return Promise.reject(err)
})

request.interceptors.response.use((res) => {
    return res.data
}, err => {
    const {status} = err.response
    if (status === 401) {
        store.dispatch(resetState())
        router.navigate('/login')
    }
    return Promise.reject(err)
})

export default request