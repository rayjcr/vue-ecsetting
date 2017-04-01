import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'      //vue路由插件
import VueResource from 'vue-resource'  //vue资源插件
import iView from 'iview'
import store from './vuex/store'

//各种组件模版
import setting from './components/setting.vue'
import selectclass from './components/selectclass.vue'
import selectmode from './components/selectmode.vue'
import setlighteness from './components/setlighteness.vue'
import setvoice from './components/setvoice.vue'
import settime from './components/settime.vue'
import setclosetime from './components/setclosetime.vue'
import selectweek from './components/selectweek.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);


const routes = [  
  {path: '/', component: setting},      //这里是为了让输入错误路径和空路径时默认显示home的内容
  {path: '/selclass', component: selectclass},
  {path: '/selmode', component: selectmode},
  {path: '/setlighteness', component: setlighteness},
  {path: '/setvoice', component: setvoice},
  {path: '/settime', component: settime},
  {path: '/selectweek', component: selectweek}
]; 

// 声明一个路由对象                        
const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  el: '#app',            // 挂载点，挂载在id为appx的组件上  
  template: '<App/>',    // 模版名称
  components: { App }
  //render: h => h(App)
})