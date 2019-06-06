
const Fly = require('./fly.js')
console.log(Fly);

var request = new Fly()
var tokenFly = new Fly()

// 网络超时时间
request.config.timeout = 60 * 1000
request.config.baseURL = 'https://bay.2donghua.com/'

tokenFly.config = request.config

request.interceptors.request.use((request) => {
    if (getApp().globalData.showLoading) {
        uni.showLoading({ title: '加载中...' })
    }
	request.headers["Content-Type"] = 'application/x-www-form-urlencoded';
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
        let errorMsg = '';
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

export default request