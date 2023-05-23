<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'

const router = useRouter()
const dataProductos = ref('')
const databuscarProducto = ref('')

onMounted(() => {
  fetch(import.meta.env.VITE_API_V1+"/producto",{
    method: 'GET'
  })
  .then(response => response.json() )
  .then(data => {
    console.log(data)
    dataProductos.value = data
  })
})

function buscarProducto() {
  //console.log("Buscar Producto")
  fetch(import.meta.env.VITE_API_V1+`/producto?nombre=${databuscarProducto.value}`,{
    method: 'GET'
  })
  .then(response => response.json() )
  .then(data => {
    console.log(data)
    if(data.hasOwnProperty("error")){
      dataProductos.value = ''
    } else
      dataProductos.value = data
  })
}

function nuevoProducto() {
  router.push({ name: 'productonuevo' })
}

</script>
<template>
  <Navegacion />
    <div class="productos p-5">
      <h1 class="text-center custom-tittle">Vista de Productos</h1>
      <div class="row g-3">
        <div class="col-md-5">
          <label for="inputbuscar" class="form-label custom-tittle">Buscar Producto</label>
          <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Ingrese el nombre para buscar..." v-model="databuscarProducto" @keypress.enter="buscarProducto">
          <button class="btn btn-secondary" type="button" id="inputbuscar"  @click="buscarProducto"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        </div>
        </div>
        <div class="col-md-6 d-flex justify-content-start align-items-end">
          <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" @click="nuevoProducto">Nuevo Producto</button>
        </div>
      </div>
      <div class="col-12 table-responsive dimension-tabla">
        <table class="table table-bordered table-hover h-25">
          <thead>
            <tr class="table-secondary">
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Medida</th>
              <th scope="col">Unidad</th>
              <th scope="col">Stock</th>
              <th scope="col">Estado</th>
              <th scope="col">Imagen</th>
              <th scope="col">Ver</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="dataProductos == ''" class="table-light">
                <td colspan="100%">No se encontraron datos</td>
            </tr>
            <tr v-else class="table-light" v-for="item in dataProductos" :key="dataProductos.id">
              <td>{{ item.id_producto }}</td>
              <td>{{ item.nombre }}</td>
              <td>{{ item.marca }}</td>
              <td>{{ item.medida }}</td>
              <td>{{ item.tipo_unidad }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.estado }}</td>
              <td>
                <button type="button" class="btn btn-light">
                  <font-awesome-icon :icon="['fas', 'camera-retro']" style="color: #0040ff;" />
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-light">
                  <img alt="Vue logo" class="logo" src="@/assets/ojo.svg" width="20" height="20" />
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-light">
                  <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="20" height="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row p-3">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Total de Productos</span>
              <input type="text" class="form-control text-end" disabled value="124">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Total de Unidades</span>
              <input type="text" class="form-control text-end"  disabled value="124">
            </div>
          </div>
          <div class="col-md-4">
            <div class="input-group mb-3">
              <span class="input-group-text custom-tittle"> Total de Inversión S/.</span>
              <input type="text" class="form-control text-end"  disabled value="124.10">
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style>
.productos{
  box-sizing: border-box;
  width: 100vw;
  height: 90vh;
}
</style>
