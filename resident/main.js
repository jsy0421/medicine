import Vue from 'vue'
import App from './App'
import event from './custom-event.js'

const Event=new event();
Vue.prototype.$event=Event;

Vue.config.productionTip = false
Vue.prototype.$Url = "http://47.98.50.20:12000"

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()
