import axios from 'axios'
import { useUserStore } from '@/store/user'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api/v1',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 如果配置了 skipToken，则不添加 token
    if (config.skipToken) {
      return config
    }

    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 可以在这里统一处理响应数据
    return response.data
  },
  error => {
    // 可以在这里统一处理错误
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

export default request
