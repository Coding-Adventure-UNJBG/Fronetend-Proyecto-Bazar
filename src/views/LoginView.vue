<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth'
import { ref } from 'vue'


const authStore = useAuthStore();
const router = useRouter()
const cuenta = ref('')
const password = ref('')
const msg = ref('')
const respuesta = ref(false)
const isButtonDisabled = ref(false)
const show = ref(false)

function verificarUser() {
  isButtonDisabled.value = true
  fetch(import.meta.env.VITE_API_V1 + "/usuario/login?cuenta=" + cuenta.value, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      isButtonDisabled.value = false
      if (data.error) {
        msg.value = data.error
        respuesta.value = true
      } else if (data[0].password != password.value) {
        console.log(data[0].password + " " + password.value)
        msg.value = "Contraseña incorrecta"
        respuesta.value = true
      } else {
        authStore.ingresarCuenta(cuenta.value, data[0].permiso)
        //console.log(data[0].permiso)
        //console.log("Ingresando al sistema")
        msg.value = "Ingresando al sistema"
        respuesta.value = true
        router.push({ name: 'home' })
      }
    })
    .catch(error => {
      //console.log({error:"API NOT FOUND"})
      msg.value = "El servidor no responde"
      respuesta.value = true
      isButtonDisabled.value = false
    })

  //console.log(import.meta.env.VITE_NAME_PROYECT)
  console.log("usuarioss: " + cuenta.value)
  console.log("password: " + password.value)
}


</script>

<template>
  <section>
    <div class="d-lg-flex half">
      <div class="contents order-md-1 color">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <h1 class="text-white text-center"><strong>BIENVENIDO!</strong></h1>
              <br><br>
              <form>
                <div class="form-group first mb-4">
                  <label class="form-label text-login" for="IUserName">Nombre de usuario</label>
                  <input type="text" id="IUserName" class="form-control" placeholder="Nombre de usuario"
                    v-model="cuenta" />
                </div>

                <div class="form-group last mb-4">

                  <label class="form-label text-login" for="IUserPassword">Contraseña</label>
                  <div class="input-group">
                    <div class="input-group mb-0 mt-0">
                      <input class="form-control" :type="show === true ? 'text' : 'password'" id="IUserPassword"
                        placeholder="Contraseña" v-model="password" @keypress.enter="verificarUser">
                      <span class="input-group-text">
                        <font-awesome-icon :icon="['fas', 'eye']" v-if="show" @click="show = !show"
                          style="width: 18px;" />
                        <font-awesome-icon :icon="['fas', 'eye-slash']" v-else @click="show = !show"
                          style="width: 18px;" />
                      </span>
                    </div>
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <span v-if="respuesta" class="text-black text-center bg-info fw-bold"> {{ msg }}</span>
                  <button class="btn btn-primary mb-3 btn-login" type="button" :disabled="isButtonDisabled"
                    @click="verificarUser">Iniciar Sesión</button>
                </div>

                <div class="text-center mb-5">
                  <a class="text-white" href="#!">¿Olvidaste tu contraseña?</a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- d-none d-md-block  => hace que se oculte en dispositivos pequeños -->
      <div class="contents order-md-2 d-none d-lg-block">
        <div class="container">

          <div class="row align-items-center justify-content-center">

            <div class="col-md-10 d-flex justify-content-center">
              <div class="text-center">
                <img src="@/assets/enfermera.png" alt="login form" class="img-fluid" width="400" height="400" />

                <h2 class="text-center"><strong>EQUIPOS DE SEGURIDAD E HIGIENE TACNA</strong></h2>
                <br><br>
                <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/facebook.svg"
                    width="45" height="45" /></a>
                <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/whatsapp.svg"
                    width="45" height="45" /></a>
                <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/gmail.svg"
                    width="45" height="45" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>