import axios, { type AxiosRequestConfig } from 'axios'
import Tools from '../Tools'
import pinia from '../../stores/registerPina'
import { useAuthStore } from '../../stores/index'
import './config'
const authStore = useAuthStore(pinia)
// let { token, user } = storeToRefs(authStore)

var url = window.location.href //获取url
var start = window.location.href.indexOf('?') + 1
var jinhao = window.location.href.indexOf('#')
var str = window.location.href.substring(start)

if (start !== 0) {
  if (str.indexOf('Ticket') < 0) {
    //判断url地址中是否包含code字符串
    var stred: string=str.replace('ticket=', '')
    console.log(stred)
    
    // const urlParameter:any = Tools.GetRequest(str)
    seturlParameter(stred)

    if (url.indexOf('?') != -1) {
      //判断是否存在参数
      url = url.replace(/(\?|#)[^'"]*/, '') //去除参数
      window.history.pushState({}, '0', url)
    }
  }
}

function seturlParameter(val: string) {
  console.log(window.ApiBaseURL)
  axios
    .get(window.ApiBaseURL + 'api/Auth/LoginByTicket?ticket=' + val)
    .then(function(response) {
      authStore.token = response.data.data.token
      authStore.user = response.data.data.user
      localStorage.setItem('IBMSToken', response.data.data.token)
      authStore.modelMode = '2D'
    })
    .catch(function(error) {
      alert('失败')
    })
}

const axiosServer = axios.create({
  baseURL: window.ApiBaseURL,
  headers: {
    'Content-Type': 'application/json-patch+json'
  },

  withCredentials: true,
  // timeout: 15000
})

const axiosServer1 = axios.create({
  baseURL: window.ApiBaseURL,
  headers: {
    'Content-Type': 'application/json-patch+json'
  },
 responseType: "blob",
  withCredentials: true,
  // timeout: 150000
})

const axiosServerFile = axios.create({
  baseURL: window.ApiFileURL,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true, //跨域请求是否提供凭据
  // timeout: 15000
})
axiosServer1.interceptors.request.use(
  function(config) {
    config.headers.Token = authStore.token

    //请求开始时显示进度条
    // Nprogress.start()
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
//添加请求拦截器
axiosServer.interceptors.request.use(
  function(config) {
    config.headers.Token = authStore.token

    //请求开始时显示进度条
    // Nprogress.start()
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// http response 响应拦截器
axiosServer.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.data.data && response.data.data.code == 401) {
      window.opener = null
      Tools.LayerMsgErr(response.data.data.msg)
      return setTimeout(() => {
        window.location.href = 'login.html'
      }, 2000)
    }
    if (
      response.data.type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return response
    } else if (!response.data.ok) {
      return Tools.LayerMsgErr(response.data.message)
    }

    return response
  },
  error => {
    if (error.response.status === 401) {
      // 401 说明 token 验证失败
      // 可以直接跳转到登录页面，重新登录获取 token
      //Layer提示框
      // Tools.LayerMsgErr('请重新登录')
      // window.location.href = 'login.html'
    } else if (error.response.status === 500) {
      // 服务器错误
      // do something
      return Promise.reject(error.response.data)
    } else if (error.response.status === 403) {
      Tools.LayerMsgErr('没有权限')
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data)
  }
)

export { axiosServer, axiosServerFile }

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: undefined) {
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

//文件系统post
export function UploadPost(url: string, params?: undefined) {
  return new Promise((resolve, reject) => {
    axiosServerFile({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
export function downPost(url: string, params?: undefined) {
  return new Promise((resolve, reject) => {
    axiosServerFile({
      method: 'post',
      url: url,
      data: params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params?: { [x: string]: any; hasOwnProperty: ((arg0: string) => any) | ((arg0: string) => any) } | undefined) {
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

//文件下载post封装
export function exportPost(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axiosServer({
      method: 'post',
      url: url,
      data: params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
//文件下载get封装
export function exportGet(url: string, params?: undefined) {
  return new Promise((resolve, reject) => {
    axiosServer({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function exportGet1(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axiosServer1
      .get(url, {
        params: params,
         
      })
      .then(res => {
       
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
//文件系统get请求
export function exportGetFile(url: string, params?: undefined) {
  return new Promise((resolve, reject) => {
    axiosServerFile({
      method: 'get',
      url: url,
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
//图片上传返回Blob
export function exportGetFileBlob(url: string, params?: undefined) {
  return new Promise((resolve, reject) => {
    axiosServerFile({
      method: 'get',
      url: url,
      params: params,
      responseType: 'blob'
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

export function Delete(url: string, params?: AxiosRequestConfig<any> | undefined) {
  return new Promise((resolve, reject) => {
    axiosServerFile
      .delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
