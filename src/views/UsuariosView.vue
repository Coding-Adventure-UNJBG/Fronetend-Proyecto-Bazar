<script setup>
  import Navegacion from '../components/Navegacion.vue'
</script>
<template>
  <Navegacion/>
  <div class="about">
    <h1>Vista de Usuarios del sistema</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
