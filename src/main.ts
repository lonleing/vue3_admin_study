import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import { loadAllPlugins } from './plugins'
import './themes/styles/index.scss'
import '@/router/permission'

const app = createApp(App)

loadAllPlugins(app)

app.use(router).use(store).mount('#app')
