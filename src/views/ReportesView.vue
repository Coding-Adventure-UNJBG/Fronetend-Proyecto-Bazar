<script setup>
import Navegacion from '../components/Navegacion.vue'
import { ref } from 'vue'; import exportFromJSON from 'export-from-json'

const dataProductos = ref("")
const dataUsuarios = ref("")
const dataCompras = ref('')
const dataVentas = ref('')

const tipoReporte = ref('')
const fechaCompras = ref({"fechaInicio": "", "fechaFin": ""})
const msgC = ref('')
const fechaVentas = ref({"fechaInicio": "", "fechaFin": ""})
const msgV = ref('')

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

async function obtenerCompras() {

  msgC.value = ''
  if (fechaCompras.value.fechaInicio == '' || fechaCompras.value.fechaFin == '') {
    msgC.value = "Por favor, selecciona ambas fechas requeridas para continuar."
    return
  }

  msgC.value = ''
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/reporte?fechaInicio=${fechaCompras.value.fechaInicio}&fechaFin=${fechaCompras.value.fechaFin}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if (data.length == 0) {
        msgC.value = "Sin resultados para el rango de fechas seleccionado. Intenta con otro rango de fechas."
      } else {
        dataCompras.value = data
      }
    })
    .catch(error => {
      msgC.value = "Error del servicio al verificar los datos"
    })

  if (dataCompras.value != '') {
    const data = dataCompras.value
    const fileName = 'reportCompras'
    const exportType = exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })
    dataCompras.value = ''
    fechaCompras.value.fechaInicio = ''
    fechaCompras.value.fechaFin = ''
  }

}

async function obtenerVentas() {
  msgV.value = ''
  if (fechaVentas.value.fechaInicio == '' || fechaVentas.value.fechaFin == '') {
    msgV.value = "Por favor, selecciona ambas fechas requeridas para continuar."
    return
  }

  msgV.value = ''
  await fetch(`${import.meta.env.VITE_API_V1}/venta/reporte?fechaInicio=${fechaVentas.value.fechaInicio}&fechaFin=${fechaVentas.value.fechaFin}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      if (data.length == 0) {
        msgV.value = "Sin resultados para el rango de fechas seleccionado. Intenta con otro rango de fechas."
      } else {
        dataVentas.value = data
      }
    })
    .catch(error => {
      msgV.value = "Error del servicio al verificar los datos"
    })

  if (dataVentas.value != '') {
    const data = dataVentas.value
    const fileName = 'reportVentas'
    const exportType = exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })
    dataVentas.value = ''
    fechaVentas.value.fechaInicio = ''
    fechaVentas.value.fechaFin = ''
  }

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
                      <input type="date" class="form-control datepicker" min="2023-07-01" v-model="fechaCompras.fechaInicio">
                      <span class="input-group-text">Hasta</span>
                      <input type="date" class="form-control datepicker" :min="fechaCompras.fechaInicio" v-model="fechaCompras.fechaFin">
                    </div>
                  </div>
                  <div class="mt-3">
                    <div v-if="msgC" class="alert alert-danger" role="alert">
                      {{ msgC }}
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mt-2">
                    <button type="button" class="btn btn-primary btn-report" @click="obtenerCompras">
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
                      <input type="date" class="form-control datepicker" min="2023-07-01" v-model="fechaVentas.fechaInicio">
                      <span class="input-group-text">Hasta</span>
                      <input type="date" class="form-control datepicker" :min="fechaVentas.fechaInicio" v-model="fechaVentas.fechaFin">
                    </div>
                  </div>
                  <div class="mt-3">
                      <div v-if="msgV" class="alert alert-danger" role="alert">
                        {{ msgV }}
                      </div>
                    </div>
                  <div class="d-flex justify-content-center mt-2">
                    <button type="button" class="btn btn-primary btn-report" @click="obtenerVentas">
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
