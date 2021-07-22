import Vue from 'vue'
import App from './App'
import event from './custom-event.js'
import GoEasy from './js_sdk/goeasy-js/goeasy-1.2.1.js';

const Event = new event();
Vue.prototype.$event = Event;

Vue.config.productionTip = false
Vue.prototype.$Url = "http://47.98.50.20:12000"

Vue.prototype.$goEasy = new GoEasy({
	host: "hangzhou.goeasy.io",
	appkey: "BC-3d6301593ba74327a6db771036444519", //替换为您的应用appkey
	onConnected: function() {
		console.log('连接成功！')
	},
	onDisconnected: function() {
		console.log('连接断开！')
	},
	onConnectFailed: function(error) {
		console.log('连接失败或错误！')
	}
});

Vue.prototype.$goEasy.subscribe({
    channel: "user_"+uni.getStorageSync("userId"), //替换为您自己的channel
    onMessage: function (message) {
		uni.showToast({
		    title: message.content,
		    duration: 2000
		});
		console.log("receive")
    }
});

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
