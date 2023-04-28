import { createApp } from 'vue'
import materialInit from '@utils/materialInit'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@styles/index.scss'

createApp(App).use(materialInit).mount('#app')
