import axios from 'axios'
import { AppCookies } from './cookies';

axios.interceptors.request.use(function (request) {
    // Do something before request is sent
    request.headers.Authorization = AppCookies.getCookie('token')
    return request;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

class Ajax {

    static get(url) {
        return axios.get(`${process.env.REACT_APP_BASE_URL}${url}`)
    }

    static post(url, data) {
        return axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, data)
    }

    static put(url, data) {
        return axios.put(`${process.env.REACT_APP_BASE_URL}${url}`, data)
    }

    static delete(url) {
        return axios.delete(`${process.env.REACT_APP_BASE_URL}${url}`)
    }

    static head() {

    }
}

export default Ajax