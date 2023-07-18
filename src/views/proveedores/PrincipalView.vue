<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';

const router = useRouter()
const dataProveedor = ref('')
const dataBuscar = ref('')

onMounted(() => {
  cargarData();
})

async function cargarData() {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dataProveedor.value = data
    })
}

//busca por nombre y ruc
function buscarProveedor() {
  fetch(`${import.meta.env.VITE_API_V1}/proveedor?nombre=${dataBuscar.value}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.hasOwnProperty("error")) {
        dataProveedor.value = ''
      } else {
        dataProveedor.value = data
      }
    })
}

async function deshabilitarProveedor(uId, estado) {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor/${uId}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ "estado": `${estado}` })
  })
    .then(response => response.json())
    .then(data => {
      cargarData()
    })
}

function nuevoProveedor() {
  router.push({ name: 'proveedornuevo' })
}

function editarProveedor(uId) {
  router.push({ name: 'proveedoredit', params: { id: uId } })
}

function verProveedor(uId) {
  router.push({ name: 'proveedorver', params: { id: uId }})
}
</script>

<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="text__principal">
        <h1>VISTA DE PROVEEDORES</h1>
      </div>
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <div class="row g-3">

                <div class="col-md-3">
                  <div class="input-group">
                    <input type="search" class="form-control input-sm" placeholder="Busca por nombre o ruc"
                      @keypress.enter="buscarProveedor" v-model="dataBuscar">
                    <button class="btn btn-primary" type="button" id="inputbuscar"
                      @click="buscarProveedor"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                  </div>
                </div>
                <div class="col-md-9 d-flex justify-content-start align-items-end">
                  <button type="button" class="btn btn-primary" @click="nuevoProveedor">Nuevo proveedor</button>
                </div>

              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                  <thead>
                    <tr class="text-center align-middle">
                      <th width="4%" scope="col" class="fw-bold">N°</th>
                      <th width="22%" class="fw-bold">NOMBRE</th>
                      <th width="13%" class="fw-bold">RUC</th>
                      <th width="13%" class="fw-bold">ESTADO</th>
                      <th width="13%" class="fw-bold">FECHA REGISTRO</th>
                      <th width="26%" class="fw-bold">COMENTARIO</th>
                      <th width="9%" colspan="3" class="fw-bold">OPCIÓN</th>
                    </tr>
                    <tr>
                    <tr></tr>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="dataProveedor == ''" class="table-light">
                      <td colspan="100%">No se encontraron datos</td>
                    </tr>
                    <tr v-else class="text-center align-middle" v-for="item in dataProveedor" :key="dataProveedor.id">
                      <td>{{ item.id_proveedor }}</td>
                      <td>{{ item.nombre }}</td>
                      <td>{{ item.ruc }}</td>
                      <td>{{ item.estado }}</td>
                      <td>{{ item.fecha_registro }}</td>
                      <td>{{ item.comentario }}</td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Ver Proveedor" @click="verProveedor(item.id_proveedor)"><img alt="Vue logo" class="logo"
                            src="@/assets/icons/ojo.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Editar" @click="editarProveedor(item.id_proveedor)"><img alt="Vue logo"
                            class="logo" src="@/assets/icons/pencil.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Eliminar" @click="deshabilitarProveedor(item.id_proveedor, item.estado)"><img alt="Vue logo" class="logo"
                            src="@/assets/icons/delete.svg" width="15" /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


