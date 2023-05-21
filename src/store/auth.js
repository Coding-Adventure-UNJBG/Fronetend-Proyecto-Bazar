import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
    // variables almacenadas en el store
    state: () => {
        return {
            logeado: false,
            userName: '',
        }
    },
    // metodos para recuperar datos del store
    getters: {
        getEstado: (state) => state.logeado
    },
    // funciones custom para interactuar con el store
    actions: {
        ingresarCuenta(user) {
            this.logeado = true
            this.userName = user
        },
        salirCuenta(){
            this.logeado = false
            this.userName = ''
        }
    },
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    },
})