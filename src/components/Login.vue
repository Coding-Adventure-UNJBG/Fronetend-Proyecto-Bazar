<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<section class="h-100 gradient-form">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6 d-flex align-items-center custom-bg-color ">
              <div class="card-body p-md-5 mx-md-4">
                <div class="text-center">
                  <h4 class="mt-1 mb-5 pb-1">BIENVENIDO!</h4>
                </div>
                <form>
                  <div class="form-outline mb-4">
                    <label class="form-label" for="IUserName">Nombre de usuario</label>
                    <input type="text" id="IUserName" class="form-control"
                      placeholder="Nombre de usuario(sin espacios...)" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="IUserPassword">Contraseña</label>
                    <input type="password" id="IUserPassword" class="form-control"
                      placeholder="Contraseña" />
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <!-- <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Iniciar Sesión</button>-->
                    <router-link to="/productos" tag="button" class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Ir a Productos</router-link>
                  </div>
                  <div class="text-center pt-1 mb-5 pb-1">
                    <a class="text-white" href="#!">¿¿Olvidaste tu contraseña?</a>
                  </div>

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="card text-center h-100 w-100">
                <img src="../assets/enfermera.png" alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                <div class="card-body">
                  <h4 class="card-title">EQUPOS DE SEGURIDAD E HIGIENE TACNA</h4>
                  <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/facebook.svg" width="45" height="45" /></a>
                  <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/whatsapp.svg" width="45" height="45" /></a>
                  <a href="#" class="btn btn-outline-light"><img alt="Vue logo" class="logo" src="@/assets/gmail.svg" width="45" height="45" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  <RouterView />
</template>

<style scoped>
</style>
