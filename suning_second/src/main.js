import Vue from 'vue'
import App from './App'
import router from './router'

//import axios from 'axios'

Vue.use(router)

Vue.config.productionTip = false

//axios.defaults.baseURL = 'https://www.imvango.com/vg_kdcf'


//全局自定义指令
Vue.directive('fontSize14',{
	 bind(el,binding,vnode){
	 	  el.style.fontSize = '14px'
	 }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
