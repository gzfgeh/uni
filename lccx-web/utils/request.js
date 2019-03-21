// #ifdef H5
const Fly = require('flyio/dist/npm/fly')
// #endif

var request = new Fly()
var tokenFly = new Fly()

// 网络超时时间
request.config.timeout = 60 * 1000
request.config.baseURL = 'https://api.kaikaibao.com.cn'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
    if (wx.getApp().globalData.showLoading) {
        wx.showLoading({ title: '加载中...' })
    }

    console.log('----------------')
    let token = wx.getStorageSync('token')
    if (token) {
        request.headers["Authorization"] = 'Bearer ' + token;
    }

    if (wx.getStorageSync('device_id')) {
        request.headers["x-lccx-did"] = wx.getStorageSync('device_id')
    }
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        console.log('interceptors.response', response)
        wx.hideLoading()
        return promise.resolve(response.data)
    },
    function(err, promise) {
        console.log('error-interceptor')

        wx.hideLoading()
        let errorMsg = ''
        if (err.status == 401) {
            console.log('token失效，重新请求token...')
                // this.lock() // 锁定响应拦截器，
            wx.login({
                success: function(res) {
                    if (res.code) {
                        wx.setStorageSync('code', res.code);
                        loginAgain(res.code)
                            .then((d) => {
                                let token = d.data.data.token;
                                console.log('token已更新，值为: ' + token);
                                wx.setStorageSync('token', token);
                                wx.setStorageSync('session_key', d.data.data.session_key);
                            })
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                },
                fail: function(err) {
                    console.log(err);
                }
            });
        } else if (err.status == 500) {
            errorMsg = err.response.data.msg
            console.log(errorMsg)
        } else if (err.status == 0) {
            errorMsg = '网络连接异常'
        } else if (err.status == 1) {
            errorMsg = '网络连接超时'
        } else {
            if (err.response.data.errors && err.response.data.errors.code) {
                errorMsg = err.response.data.errors.code[0]
            } else {
                errorMsg = '请求数据失败,请稍后再试'
            }
        }
        if (errorMsg) {
            wx.showToast({
                title: errorMsg,
                icon: 'none',
                duration: 2000
            })
        }


        return promise.reject()
    }
)

async function loginAgain(code) {
    return await tokenFly.post('3.0/mina/login', { code: code });
}

export default request