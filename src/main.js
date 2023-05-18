import "bootstrap/dist/css/bootstrap.min.css";
import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faCashRegister, faFileContract, faMagnifyingGlass, faRightFromBracket, faShop, faUserGear, faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* agregar iconos de fontawesome */
library.add(faUserSecret, faShop, faCartShopping, faCashRegister, faUserGear, faFileContract, faRightFromBracket, faMagnifyingGlass)

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.min";