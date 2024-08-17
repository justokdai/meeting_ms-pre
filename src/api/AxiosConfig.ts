// src/api/AxiosConfig.ts
import axios, { type AxiosInstance } from 'axios';
import { useTokenStore } from '@/stores/token';
// 创建 Axios 实例
const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // 设置基础URL
    timeout: 200000, // 设置超时时间
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        // 获取 Token，可能为空
        const token = useTokenStore().token;

        // 将 Token 放入请求头中的 'token' 字段
        config.headers.Authorization = token || '';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response) => {
        // 处理响应数据
        return response.data;
    },
    (error) => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default http;
