// axios封装函数
import axios from 'axios'
interface ICodeMessage {
    [key: number]: string
}
const StatusCodeMessage: ICodeMessage = {
    200: '服务器成功返回请求的数据',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）',
    204: '删除数据成功',
    400: '请求错误(400)',
    401: '未授权，请重新登录(401)',
    403: '拒绝访问(403)',
    404: '请求出错(404)',
    408: '请求超时(408)',
    500: '服务器错误(500)',
    501: '服务未实现(501)',
    502: '网络错误(502)',
    503: '服务不可用(503)',
    504: '网络超时(504)'
}
// 1. 根域名配置
// 2. 超时时间
const request = axios.create({
    //   baseURL: "http://localhost:8080",
    baseURL: "http://110.41.50.108:8080",
    timeout: 10000,
});
// 3. 请求拦截
request.interceptors.request.use(config => {
    config.headers.set(''+localStorage.getItem("token_name"), localStorage.getItem("token_value"))
    return config
}, error => {
    return Promise.reject(error)
})
// 4. 响应拦截
request.interceptors.response.use(response => {
    return response.data
}, error => {
if (error.response) {
        // 服务器返回错误
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
        console.log(StatusCodeMessage[error.response.status])
    } else {
        // 请求超时或者网络有问题
        if (error.message.includes('timeout')) {
            console.log('超时了')
        } else {
            console.log('网络错误')
        }
    }
    return Promise.reject(error)
})
export default request