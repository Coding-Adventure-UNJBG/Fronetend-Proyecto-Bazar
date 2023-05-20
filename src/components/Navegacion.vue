<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth'
import { RouterLink, RouterView } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter()

function salirSitema(){
  authStore.salirCuenta()
  console.log("Saliendo del sistema...")
  router.push({ name: 'login'})
}
</script>

<template>
    <!-- MENU START  -->
    <nav class="navbar navbar-dark">
    <!-- NAV CONTAINER START -->
    <div class="container-fluid">
      <!-- NAV BUTTON  -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#menuLateral"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- NAV TITTLE  -->
      <div class="container text-center">
        <a href="" class="navbar-brand text-white fw-semibold fs-4">BAZAR "E.S.H.T"</a>
      </div>
      <!-- OFFCANVAS MAIN CONTAINER START -->
      <section
        class="offcanvas offcanvas-start custom-menu"
        id="menuLateral"
        tabindex="-1"
      >
      <div class="offcanvas-header" data-bs-theme="dark">
            <button
              class="btn-close"
              type="button"
              data-bs-dismiss="offcanvas"
            >____________________________________________</button>
          </div>
        <!-- OFF CANVAS MENU LINKS  START-->
        <div
          class="offcanvas-body d-flex flex-column justify-content-between px-0"
        >
          <ul class="navbar-nav fs-5 justify-content-center text-center" data-bs-dismiss="offcanvas">
            <li class="nav-item p-3 border-menu">
              <RouterLink to="/productos" class="nav-link item-menu">
                <font-awesome-icon :icon="['fas', 'shop']" />
                Productos
              </RouterLink>
            </li>
            <li class="nav-item p-3 border-menu">
              <RouterLink to="/compras" class="nav-link item-menu">
                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                Entradas
              </RouterLink>
            </li>
            <li class="nav-item p-3 border-menu">
              <RouterLink to="/ventas" class="nav-link item-menu">
                <font-awesome-icon :icon="['fas', 'cash-register']" />
                Ventas
              </RouterLink>
            </li>
            <li class="nav-item p-3 border-menu">
              <RouterLink to="/usuarios" class="nav-link item-menu">
                <font-awesome-icon :icon="['fas', 'user-gear']" />
                Usuarios
              </RouterLink>
            </li>
            <li class="nav-item p-3 border-menu">
              <RouterLink to="/reportes" class="nav-link item-menu">
                <font-awesome-icon :icon="['fas', 'file-contract']" />
                Reportes
              </RouterLink>
            </li>
          </ul>
          <!-- enlaces redes sociales -->

          <div class="align-self-center py-3">
            <button type="button" class="btn btn-danger item-menu" @click="salirSitema">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              CERRAR SESIÓN</button>
          </div>
        </div>
      </section>
      <!-- OFFCANVAS MAIN CONTAINER END  -->
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
nav,
.offcanvas {
  background-color: #4152B3;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}
.custom-menu{
  background-color: black;
  font-weight: bold;
  color: white;
  margin-top: 55px;
}

.item-menu{
  color: #dde3ea;
  font-weight: bold;
}

.border-menu{
  border-style: solid hidden;
  border-width: 1px;
  border-color: white;
}
</style>
