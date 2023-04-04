import Vue from 'vue'
import App from './App'
//挂载到全局
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
