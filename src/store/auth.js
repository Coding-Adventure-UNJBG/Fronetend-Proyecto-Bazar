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
        ingresarCuenta(user, pass) {
            if(user == "admin" && pass == "123"){
                this.logeado = true
                this.userName = user
            } else{
                this.logeado = false
            }
            return this.logeado
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