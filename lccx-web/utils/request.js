
const Fly = require('flyio/dist/npm/wx')
// const Fly = require('./fly.js')
var request = new Fly()
var tokenFly = new Fly()
var qs = require('qs');

// 网络超时时间
request.config.timeout = 60 * 1000
request.config.baseURL = 'https://api.kaikaibao.com.cn'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
    uni.showLoading({ title: '加载中...' })

    console.log('----------------')
    let token = uni.getStorageSync('token')
    if (token) {
        request.headers["Authorization"] = 'Bearer ' + token;
    }
	
	// request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
	request.headers["x-lccx-did"] = 2
//     if (uni.getStorageSync('device_id')) {
//         request.headers["x-lccx-did"] = uni.getStorageSync('device_id')
//     }
    return request
})

request.interceptors.response.use(
    function(response, promise) { // 不要使用箭头函数，否则调用this.lock()时，this指向不对
        console.log('interceptors.response', response)
        uni.hideLoading()
        return promise.resolve(response.data)
    },
    function(err, promise) {
        console.log('error-interceptor')

        uni.hideLoading()
        let errorMsg = ''
        if (err.status == 401) {
            console.log('token失效，重新请求token...')
                // this.lock() // 锁定响应拦截器，
			let params = {
				partner_id: uni.getStorageSync("partner_id"),
				imei: uni.getStorageSync("imei")
			};
            loginAgain(params)
                .then((d) => {
					console.log(JSON.stringify(d.data));
                    let token = d.data.data.token;
                    console.log('token已更新，值为: ' + token);
                    uni.setStorageSync('token', token);
                })
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
            uni.showToast({
                title: errorMsg,
                icon: 'none',
                duration: 2000
            })
        }


        return promise.reject()
    }
)

async function loginAgain(params) {
    return await tokenFly.post('3.1/login', qs.stringify(params));
}

export default request