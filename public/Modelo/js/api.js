/*
 * @Author: your name
 * @Date: 2021-10-28 18:21:52
 * @LastEditTime: 2021-11-23 15:13:24
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ibms_ty/public/static/Modelo/js/api.js
 */
const axiosServer = axios.create({
    baseURL: window.ApiBaseURL,
    headers: {
        'Content-Type': 'application/json-patch+json'
    },
    withCredentials: true,
    timeout: 15000,
    headers: {}
})
//添加请求拦截器
axiosServer.interceptors.request.use(
    function (config) {
        if (localStorage.getItem("YZJ_MMSToken")) {
            config.headers.Token = localStorage.getItem("YZJ_MMSToken")
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
// http response 响应拦截器
axiosServer.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            // Tools.LayerMsgErr('您已被登出，请重新登录');
            window.location.href = "login.html";
        } else if (error.response.status === 500) {
            return Promise.reject(error.response.data)
        }
        return Promise.reject(error.response.data)
    }
)
function axiosGet(url, params) {
    return new Promise((resolve, reject) => {
        axiosServer
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
function axiosPost(url, params) {
    return new Promise((resolve, reject) => {
        axiosServer
            .post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}
