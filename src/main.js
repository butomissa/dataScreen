import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import 'echarts-wordcloud'
import { DatePicker } from 'ant-design-vue'
import 'ant-design-vue/lib/date-picker/style/css'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(DatePicker)

new Vue({
    router,
  render: h => h(App),
}).$mount('#app')
