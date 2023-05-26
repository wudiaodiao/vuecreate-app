import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/index'


import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as echarts from 'echarts'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
import htmlToPdf from '@/js/htmlToPdf'
app.use(htmlToPdf)
import api from '@/js/api/list'
app.config.globalProperties.$api = api
app.config.globalProperties.$echarts = echarts
app.mount('#app')
