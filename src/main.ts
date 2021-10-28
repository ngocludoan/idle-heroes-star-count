import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import './css/index.css'
import 'vfonts/Lato.css'


const app = createApp(App)

app.use(naive)

app.mount('#app')