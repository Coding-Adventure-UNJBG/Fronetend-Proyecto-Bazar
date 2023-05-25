import "bootstrap/dist/css/bootstrap.min.css";
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCameraRetro, faCartShopping, faCashRegister, faCircleLeft, faCircleRight, faFileContract, faMagnifyingGlass, faRightFromBracket, faShop, faUserGear, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* agregar iconos de fontawesome */
library.add(faUserSecret, faShop, faCartShopping, faCashRegister, faUserGear, faFileContract, faRightFromBracket, faMagnifyingGlass, faCameraRetro, faCircleRight, faCircleLeft)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.min";
import { faImages } from "@fortawesome/free-regular-svg-icons";
