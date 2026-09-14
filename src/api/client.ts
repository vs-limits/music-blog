import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || '网络请求异常'
    return Promise.reject(new Error(message))
  }
)
