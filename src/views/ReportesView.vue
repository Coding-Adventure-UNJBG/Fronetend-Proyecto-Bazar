<script setup>
  import Navegacion from '../components/Navegacion.vue'
  import { ref } from 'vue';import exportFromJSON from 'export-from-json'

  const dataProductos = ref("")
  const dataUsuarios = ref("")

  async function obtenerProductos() {
    console.log("Obtener datos de los productos")
    await fetch(`${import.meta.env.VITE_API_V1}/producto`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dataProductos.value = data
    })

    const data = dataProductos.value
    const fileName = 'download'
    const exportType =  exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })
  }
  async function obtenerUsuarios() {
    console.log("Obtener datos de los productos")
    await fetch(`${import.meta.env.VITE_API_V1}/usuario`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dataUsuarios.value = data
    })

    const data = dataUsuarios.value
    const fileName = 'download'
    const exportType =  exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })
  }
</script>
<template>
  <Navegacion />

  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="w-personalizado mx-auto">

      <div class="card shadow m-4">

        <!-- Cabezera -->
        <div class="card-header py-3">
          <div class="row g-3">

          <h1 class="text-center custom-tittle">VISTA DE REPORTES</h1>

          </div>
        </div>
        <!-- Fin cabezera -->
        <!-- Cuerpo card -->
        <div class="card-body">
          <div class="row d-flex justify-content-center align-items-center text-center">
            <div class="col-md-4">
                <h5 class="custom-tittle">Usuarios</h5>
            </div>
            <div class="col-md-8">
                <button type="button" class="btn btn-primary custom-btn-color" @click="obtenerUsuarios">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
            </div>
            <div class="col-md-4">
                <h5 class="custom-tittle">Productos</h5>
            </div>
            <div class="col-md-8">
                <button type="button" class="btn btn-primary custom-btn-color" @click="obtenerProductos">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
            </div>
            <div class="col-md-4">
                <h5 class="custom-tittle">Compras</h5>
            </div>
            <div class="col-md-8">
              <input type="date" class="btn"/>
              <span> a </span>
              <input type="date" class="btn"/>
                <button type="button" class="btn btn-primary custom-btn-color" >
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
            </div>
            <div class="col-md-4">
                <h5 class="custom-tittle">Ventas</h5>
            </div>
            <div class="col-md-8">
              <input type="date" class="btn"/>
              <span> a </span>
              <input type="date" class="btn"/>
                <button type="button" class="btn btn-primary custom-btn-color" >
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
            </div>
          </div>
        </div>
        <!-- Fin cuerpo card -->
      </div>
    </div>
  </div>
</template>

<style scoped>




/* Ancho completo en la vista móvil */
@media (max-width: 768px) {
  .w-personalizado {
    width: 100%;
  }
}

/* Ancho al 75% para vista no movil */
@media (min-width: 769px) {
  .w-personalizado {
    width: 85%;
  }
}
</style>
