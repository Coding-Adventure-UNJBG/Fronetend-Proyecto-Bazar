<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth'
import { RouterLink, RouterView } from 'vue-router'
// import '../assets/css/styles.css'

const authStore = useAuthStore();
const router = useRouter()

const NAME_PROYECT = import.meta.env.VITE_NAME_PROYECT

function salirSitema() {
  authStore.salirCuenta()
  console.log("Saliendo del sistema...")
  router.push({ name: 'login' })
}
</script>

<template>
  <!-- Menu START -->
  <nav class="navbar navbar-dark">

    <div class="container-fluid">
      <button class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#menuLateral">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container text-center">
        <RouterLink to="/" class="navbar-brand logo__empresa"> {{ NAME_PROYECT }}</RouterLink>
      </div>
    </div>

    <section class="offcanvas offcanvas-start sidebar" id="menuLateral" tabindex="-1">
      <!-- <div class="offcanvas-header">
      </div> -->

      <div class="offcanvas-body menu-content">
        <button type="button" class="btn bt-close ms-auto" data-bs-dismiss="offcanvas">
          <img src="../assets/icons/close.svg" style="width: 10px;">
        </button>
        <ul class="menu-items">
          <li class="item" v-if="authStore.permisos.productos">
            <RouterLink to="/productos">
              <font-awesome-icon :icon="['fas', 'shop']" style="font-size: 15px;" /> Productos
            </RouterLink>
          </li>
          <li class="item">
            <RouterLink to="/proveedores">
              <font-awesome-icon :icon="['fas', 'truck']" style="font-size: 15px;" /> Proveedores
            </RouterLink>
          </li>
          <li class="item">
            <RouterLink to="/compras">
              <font-awesome-icon :icon="['fas', 'cart-shopping']" style="font-size: 15px;" />
              Entradas
            </RouterLink>
          </li>
          <li class="item">
            <RouterLink to="/ventas">
              <font-awesome-icon :icon="['fas', 'cash-register']" style="font-size: 15px;" />
              Ventas
            </RouterLink>
          </li>
          <li class="item">
            <RouterLink to="/usuarios">
              <font-awesome-icon :icon="['fas', 'user-gear']" style="font-size: 15px;" />
              Usuarios
            </RouterLink>
          </li>
          <li class="item">
            <RouterLink to="/reportes">
              <font-awesome-icon :icon="['fas', 'file-contract']" style="font-size: 15px;" />
              Reportes
            </RouterLink>
          </li>
        </ul>
        <div class="align-self-center py-3">
          <button type="button" class="btn btn-danger item-menu" @click="salirSitema">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            CERRAR SESIÓN</button>
        </div>

      </div>
    </section>
  </nav>
  <!-- Menu END -->
  <RouterView />
</template>