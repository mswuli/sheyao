// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import eCharts from 'echarts'
import Viewer from 'v-viewer'
import './util/filter'
import '@/util/axios-util.js'
import store from './util/store'
import './util/filter';

import 'iview/dist/styles/iview.css';
import 'swiper/dist/css/swiper.css';
import 'viewerjs/dist/viewer.css';
import '@/assets/css/reset.css';
import "@/assets/iconfont/iconfont.css";
import "@/assets/css/style.css";

Vue.config.productionTip = false

//引入公共组件start
import footerComponent from './components/common/footer.vue';
import loginComponent from './components/common/login.vue';
import backtopComponent from './components/common/backTop.vue'
const cfooter = {
  install: function (Vue) {
    Vue.component('cFooter', footerComponent)
  } //'cfooter'这就是后面可以使用的组件的名字，install是默认的一个方法
};
const clogin = {
  install: function (Vue) {
    Vue.component('cLogin', loginComponent)
  } //'clogin'这就是后面可以使用的组件的名字，install是默认的一个方法
};
const cBackTop = {
  install(Vue) {
    Vue.component('cBackTop', backtopComponent)
  } //'cBackTop'这就是后面可以使用的组件的名字，install是默认的一个方法
}
Vue.use(cfooter)
Vue.use(clogin)
Vue.use(cBackTop)
//引入公共组件end

Vue.use(iView);
Vue.use(Viewer);

iView.Message.config({
  top: 400,
  duration: 3
})

Vue.prototype.$echarts = eCharts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
