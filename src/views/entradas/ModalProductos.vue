<script setup>
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
// import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  show: Boolean,
  indice_compra: String
})

const router = useRouter()
const isButtonDisabled = ref(false)
const msg = ref('')

const detalleDcompra = ref({ "id_compra": "", "id_producto": "", "cantidad": "", "precio_bruto": "" })
const dataProducto = ref({ "nombre": "", "medida": "", "marca": "", "tipo_unidad": "", "cantidad_unidad": "", "estado": "" })
const vistaDetalle = ref('')

const datosProductos = ref('')
const dataBuscar = ref('')
const showResults = ref(false)

if (props.show){
  cargarDetalle()
}

async function cargarDetalle() {

  await fetch(`${import.meta.env.VITE_API_V1}/entrada/detalle?id_compra=${props.indice_compra}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      vistaDetalle.value = data
    })
    .catch(error => {
      msg.value = "Error del servicio al obtener los datos"
    })

}

//Busqueda de productos - START
function cargarProductos() {
  fetch(`${import.meta.env.VITE_API_V1}/producto`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      datosProductos.value = data
    })
}

const buscarProducto = () => {
  if (dataBuscar.value.trim() === '') {
    showResults.value = false
    return
  } else {
    cargarProductos()
  }

  showResults.value = true
  console.log('Buscando ...'.dataBuscar)
}

const filtrarBusqueda = computed(() => {
  const search = dataBuscar.value.toLowerCase()
  const productos = Object.values(datosProductos.value)
  return search ? productos.filter(producto => producto.nombre.toLowerCase().includes(search)) : []
})

function guardarProducto(producto) {
  showResults.value = false
  detalleDcompra.value.id_producto = producto.id_producto
  dataProducto.value.nombre = producto.nombre
  dataProducto.value.marca = producto.marca
  dataProducto.value.medida = producto.medida
  dataProducto.value.tipo_unidad = producto.tipo_unidad
  dataProducto.value.cantidad_unidad = producto.cantidad_unidad
  dataProducto.value.estado = producto.estado
}

async function agregarProducto() {
  //falta validaciones
  detalleDcompra.value.id_compra = props.indice_compra
  console.log(detalleDcompra.value)
  await insertarDetalle()
}

async function insertarDetalle() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/detalle`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(detalleDcompra.value)
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        msg.value = data.message
        // cancelar()
        luegodeInsertar()
      } else {
        msg.value = data.error
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
}

async function luegodeInsertar() {
  detalleDcompra.value = { "id_compra": "", "id_producto": "", "cantidad": "", "precio_bruto": "" }
  dataProducto.value = { "nombre": "", "medida": "", "marca": "", "tipo_unidad": "", "cantidad_unidad": "", "estado": "" }
  await cargarDetalle()
}


</script>

  
<template>
  <Transition name="modal">

    <!-- class="container__principal">
    <div class="vista-principal">
      <div class="container__vista-principal" -->



    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-body">

          <div class="container__secondary">
            <div class="vista-tertiary">
              <div class="container__vista-principal">
                <div class="col-sm-12">
                  <div class="card shadow">
                    <div class="card-body">
                      <div class="text__principal">
                        <h2>DETALLE DE COMPRA {{ indice_compra }}</h2>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <form>
                            <div class="mb-2">
                              <label class="form-label"></label>
                              <div class="search-container">
                                <div class="input-con-icono">
                                  <input type="text" class="form-control" v-model="dataBuscar"
                                    placeholder="Buscar producto ..." @keydown.enter="buscarProducto">
                                  <span class="icon-input">
                                    <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
                                  </span>
                                </div>
                                <div class="search-results" v-if="showResults && filtrarBusqueda.length > 0" tabindex="0">
                                  <ul class="list-group">
                                    <li class="list-group-item" v-for="producto in filtrarBusqueda" :key="producto.id"
                                      @click="guardarProducto(producto)">
                                      {{ producto.nombre }} - {{ producto.marca }} - {{ producto.medida }}</li>
                                  </ul>
                                </div>
                                <div class="search-results" v-else-if="showResults && dataBuscar.trim() !== ''">
                                  <ul class="list-group">
                                    <li class="list-group-item">No se encontraron
                                      resultados</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Nombre del producto</label>
                                  <input type="text" class="form-control" v-model="dataProducto.nombre" disabled>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Marca del producto</label>
                                  <input type="text" class="form-control" v-model="dataProducto.marca" disabled>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Medida del producto</label>
                                  <input type="text" class="form-control" v-model="dataProducto.medida" disabled>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Tipo de unidad</label>
                                  <input type="text" class="form-control" v-model="dataProducto.tipo_unidad" disabled>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Cantidad por unidad</label>
                                  <input type="text" class="form-control" v-model="dataProducto.cantidad_unidad" disabled>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Estado</label>
                                  <input type="text" class="form-control" v-model="dataProducto.estado" disabled>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Cantidad</label>
                                  <input type="text" class="form-control" v-model="detalleDcompra.cantidad">
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="mb-2">
                                  <label class="form-label">Precio Unitario</label>
                                  <input type="text" class="form-control" v-model="detalleDcompra.precio_bruto">
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                        <div class="col-sm-6">
                          <div class="row mt-4">
                            <div class="mb-2">
                              <div class="col-sm-6">
                                <span>Vista previa de productos</span>
                              </div>
                            </div>
                          </div>
                          <div class="table-responsive mt-2">
                            <table class="table table-bordered table-hover" width="100%" cellspacing="0"
                              style="font-size: 14px">
                              <thead>
                                <tr class="text-center align-middle">
                                  <th width="27%" class="fw-bold">NOMBRE</th>
                                  <th width="27%" class="fw-bold">MARCA</th>
                                  <th width="18%" class="fw-bold">CANTIDAD</th>
                                  <th width="18%" class="fw-bold">PRECIO U.</th>
                                  <th width="10%" colspan="3" class="fw-bold">OPCIÓN</th>
                                </tr>
                                <tr>
                                <tr></tr>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="vistaDetalle == ''" class="table-light">
                                  <td colspan="100%">No se encontraron productos</td>
                                </tr>
                                <tr v-else class="text-center align-middle" v-for="item in vistaDetalle"
                                  :key="vistaDetalle.id">
                                  <td>{{ item.nombre }}</td>
                                  <td>{{ item.marca }}</td>
                                  <td>{{ item.cantidad }}</td>
                                  <td>{{ item.precio_bruto }}</td>
                                  <td>
                                    <a href="#" data-toggle="tooltip" title="Editar"><img class="logo"
                                        src="@/assets/icons/pencil.svg" width="15" /></a>
                                  </td>
                                  <td>
                                    <a href="#" data-toggle="tooltip" title="Eliminar"><img class="logo"
                                        src="@/assets/icons/delete.svg" width="15" /></a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <table>

                          </table>
                        </div>

                        <div class="col-md-12">
                          <div v-if="msg" class="alert alert-danger" role="alert">
                            {{ msg }}
                          </div>
                          <div class="d-flex justify-content-center mt-3">
                            <button type="button" class="btn btn-primary mx-2" @click="agregarProducto">Agregar</button>
                            <button type="button" class="btn btn-primary mx-2" @click="$emit('close')">regresar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
