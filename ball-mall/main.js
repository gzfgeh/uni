import Vue from 'vue'
import AMap from 'vue-amap'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.use(AMap);


AMap.initAMapApiLoader({
			  key: '0f8d53697264ae0a58bed025edb73e31',
			  plugin: ['AMap.Geolocation'],
			  v: '1.4.4'
			});


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
