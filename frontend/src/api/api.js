import * as axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000'

const axiosInstance = axios.default.create({
    baseURL: baseUrl,
    withCredentials: true,
})

export default axiosInstance