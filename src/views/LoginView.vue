<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth'
import { ref } from 'vue'


const authStore = useAuthStore();
const name = ref('')
const password = ref('')
const router = useRouter()

function verificarUser() {
  const validate = authStore.ingresarCuenta(name.value, password.value)
  if (validate) {
    router.push({ name: 'home' })
    alert("Ingreso exitoso")
  } else {
    alert("Contraseña incorrecta")
  }
  console.log("El acceso es admin y 123")
  console.log("Ingreso Exitoso: " + validate)
  console.log("usuarioss: " + name.value)
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
                  <label class="form-label text-white fw-bold" for="IUserName">Nombre de usuario</label>
                  <input type="text" id="IUserName" class="form-control" placeholder="Nombre de usuario" v-model="name" />
                </div>
                <div class="form-group last mb-4">
                  <label class="form-label text-white fw-bold" for="IUserPassword">Contraseña</label>
                  <input type="password" id="IUserPassword" class="form-control" placeholder="Contraseña"
                    v-model="password" @keypress.enter="verificarUser" />
                </div>

                <div class="d-grid gap-2">
                  <button class="btn btn-primary mb-3" type="button" @click="verificarUser">Iniciar Sesión</button>
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
                <img src="../assets/enfermera.png" alt="login form" class="img-fluid" width="400" height="400" />

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

<style>
body {
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
}

.half,
.half .container>.row {
  height: 100vh;
  min-height: 700px;
}

.half .color {
  background: #4152b3;
}

.half .contents,
.half .bg {
  width: 50%;
}

.half .contents .form-control,
.half .bg .form-control {
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 54px;
  background: #fff;
}

.half .bg {
  background-size: cover;
  background-position: center;
}

.half .btn {
  height: 54px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 10px;
}

@media (max-width: 1199.98px) {

  .half .contents,
  .half .bg {
    width: 100%;
  }
}
</style>