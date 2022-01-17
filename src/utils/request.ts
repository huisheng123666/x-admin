import axios from 'axios';
import { baseApi } from '@/config';
import { ElMessage } from 'element-plus'
import router from '@/router';
import { getItem } from '@/utils/storage';

const service = axios.create({
  baseURL: baseApi,
  timeout: 8000
})

service.interceptors.request.use((req) => {
  const token = getItem('x_token')
  req.headers = {
    ...req.headers,
    Authorization: 'Bearer token'
  }
  if (token) {
    req.headers.Authorization = 'Bearer ' + token
  }
  return req
})

service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  }
  if (code === 50001) {
    ElMessage.error(msg)
    router.push('/login')
    return Promise.reject('token invalid')
  }
  ElMessage.error(msg || '网络异常')
  return Promise.reject(msg || '网络异常')
}, (err: Error) => {
  ElMessage.error(err.message || '网络异常')
  return Promise.reject(err.message || '网络异常')
})

export default service
