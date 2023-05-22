import { defineStore } from "pinia";


export const useAuthStore = defineStore('auth', {
    // variables almacenadas en el store
    state: () => {
        return {
            logeado: false,
            userName: '',
            permisos: {}
        }
    },
    // metodos para recuperar datos del store
    getters: {
        getEstado: (state) => state.logeado,
        getPermisos: (state) => state.permisos
    },
    // funciones custom para interactuar con el store
    actions: {
        ingresarCuenta(user, permisosdb) {
            this.logeado = true
            this.userName = user
            this.permisos = JSON.parse(permisosdb)
            //console.log(this.permisos.productos)
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