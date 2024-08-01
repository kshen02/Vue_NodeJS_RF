import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { createPinia, setActivePinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"
import "./permission"

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)
setActivePinia(pinia)

app.use(pinia)
app.use(router)

app.mount("#app")
