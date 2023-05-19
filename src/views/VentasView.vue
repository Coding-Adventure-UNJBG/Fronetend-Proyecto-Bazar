<script setup>
  import Navegacion from '../components/Navegacion.vue'
</script>
<template>
  <Navegacion/>
  <div class="about">
    <h1>Vista de Ventas de Productos</h1>
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
