<script setup>
import Navegacion from '../components/Navegacion.vue'
import { ref } from 'vue'; import exportFromJSON from 'export-from-json'

const dataProductos = ref("")
const dataUsuarios = ref("")
const tipoReporte = ref('')

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
  const fileName = 'reportProducts'
  const exportType = exportFromJSON.types.xls

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
  const fileName = 'reportUsers'
  const exportType = exportFromJSON.types.xls

  exportFromJSON({ data, fileName, exportType })
}

function haceralgo() {
  console.log("PRPBANDO: ", tipoReporte.value)
}

</script>
<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="text__principal">
        <h1>VISTA DE REPORTES</h1>
      </div>
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-body">
              <label class="form-label">Tipos de Reportes</label>
              <select class="form-select" v-model="tipoReporte">
                <option value="" selected>Elija una Opción</option>
                <option value="usuarios">Usuarios</option>
                <option value="productos">Productos</option>
                <option value="compras">Compras</option>
                <option value="ventas">Ventas</option>
              </select>

              <div v-if="tipoReporte == 'usuarios'" class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-report" @click="obtenerUsuarios">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
              </div>
              <div v-if="tipoReporte == 'productos'" class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary btn-report" @click="obtenerProductos">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                  Generar
                </button>
              </div>
              <div v-if="tipoReporte == 'compras'">
                <div class="row mt-3">
                  <label class="form-label">Seleccione un rango de fecha</label>
                  <div class="d-flex">
                    <div class="input-group">
                      <span class="input-group-text">Desde</span>
                      <input type="date" class="form-control datepicker">
                      <span class="input-group-text">Hasta</span>
                      <input type="date" class="form-control datepicker">
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <button type="button" class="btn btn-primary btn-report">
                      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                      Generar
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="tipoReporte == 'ventas'">
                <div class="row mt-3">
                  <label class="form-label">Seleccione un rango de fecha</label>
                  <div class="d-flex">
                    <div class="input-group">
                      <span class="input-group-text">Desde</span>
                      <input type="date" class="form-control datepicker">
                      <span class="input-group-text">Hasta</span>
                      <input type="date" class="form-control datepicker">
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <button type="button" class="btn btn-primary btn-report">
                      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                      Generar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
