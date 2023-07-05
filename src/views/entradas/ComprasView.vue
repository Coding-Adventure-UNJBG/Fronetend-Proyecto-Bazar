<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref, computed } from 'vue';
import Modal from './ModalProductos.vue'

const router = useRouter()
const showDetails = ref(false)
const isButtonDisabled = ref(false)
const msg = ref('')
const datosCompra = ref({ "id_compra": "xxx", "id_proveedor": "", "numero_comprobante": "", "descripcion": "", "importe_total": "", "costo_flete": "", "comision_banco": "", "fecha": "", "comentario": "" })
const datosProveedor = ref('')
const dataProveedor = ref({ "nombre": "", "ruc": "", "razon_social": "" })

const showModal = ref(false)
const showResults = ref(false)
const dataBuscar = ref('')

onMounted(() => {
  obtenerIdCompra()
})

async function obtenerIdCompra() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/obtener/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      datosCompra.value.id_compra = parseInt(data[0].id, 10) + 1
    })
    .catch(error => {
      msg.value = "Error del servicio al obtener el último ID"
    })
}

// Busqueda de proveedor - START
function cargarProveedor() {
  fetch(`${import.meta.env.VITE_API_V1}/proveedor`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      datosProveedor.value = data
    })
}

const buscarProveedor = () => {
  if (dataBuscar.value.trim() === '') {
    showResults.value = false
    return
  } else {
    cargarProveedor()
  }

  showResults.value = true
  console.log('Buscando ...', dataBuscar.value)
}

const filtrarBusqueda = computed(() => {
  const search = dataBuscar.value.toLowerCase()
  const proveedores = Object.values(datosProveedor.value);
  return search ? proveedores.filter(proveedor => proveedor.nombre.toLowerCase().includes(search)) : [];
})

function guardarProveedor(proveedor) {
  showResults.value = false
  datosCompra.value.id_proveedor = proveedor.id_proveedor
  dataProveedor.value.nombre = proveedor.nombre
  dataProveedor.value.ruc = proveedor.ruc
  dataProveedor.value.razon_social = proveedor.razon_social
}
// Busqueda de proveedor - END

//Generar entrada - START
async function validarComprobante() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/comprobar?id_compra=${datosCompra.value.id_compra}&numero_comprobante=${datosCompra.value.numero_comprobante}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        msg.value = ''
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al verificar los datos"
    })
}

async function generarEntrada() {
  // console.log(datosCompra.value)
  msg.value = ''
  isButtonDisabled.value = true

  for (var clave in datosCompra.value) {
    if (datosCompra.value[clave] == '' && clave != "comentario" && clave != "descripcion") {
      msg.value += " " + clave + ","
    }
  }
  if (msg.value) {
    msg.value = "Error: campos requeridos -> " + msg.value
    isButtonDisabled.value = false
    return
  }

  await validarComprobante()
  if (msg.value != '') {
    isButtonDisabled.value = false
    return
  }

  await insertarCompra()
  isButtonDisabled.value = false
}

async function insertarCompra() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosCompra.value)
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        msg.value = data.message
        // cancelar()
        showDetails.value = true
      } else {
        msg.value = data.error
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
}

// function agregarProductos(eId) {
//   router.push({ name: 'detallecompra', params: { id: eId } })
// }

function agregarProductos() {
  showModal.value = true
}

function guardarEntrada() {
  //Falta implementar la logica para esta cosa
  router.push({ name: 'home' })
}

function cancelar() {
  fetch(`${import.meta.env.VITE_API_V1}/entrada/`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosCompra.value)
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        msg.value = ''
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al verificar los datos"
    })

  router.push({ name: 'home' })
}

</script>
<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow">
            <div class="card-body">
              <div class="text__principal">
                <h2>REGISTRO DE COMPRA</h2>
              </div>
              <div class="row">
                <div class="col-sm-7">
                  <form>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Código de compra</label>
                          <input type="text" class="form-control" v-model="datosCompra.id_compra" disabled>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Número de comprobante</label>
                          <input type="text" class="form-control" v-model="datosCompra.numero_comprobante">
                        </div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Descripción</label>
                      <input type="text" class="form-control" v-model="datosCompra.descripcion">
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Costo de flete</label>
                          <div class="input-con-icono-izq">
                            <input type="number" class="form-control text-end" step="0.01"
                              v-model="datosCompra.costo_flete">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Comisión de banco</label>
                          <div class="input-con-icono-izq">
                            <input type="number" class="form-control text-end" step="0.01"
                              v-model="datosCompra.comision_banco">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="row">
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">Costo de flete</label>
                          <div class="input-con-icono-izq">
                            <input type="text" class="form-control text-end" v-model="datosCompra.costo_flete">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">Comisión de banco</label>
                          <div class="input-con-icono-izq">
                            <input type="text" class="form-control text-end" v-model="datosCompra.comision_banco">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">IGV</label>
                          <div class="input-con-icono-izq">
                            <input type="text" class="form-control text-end">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Importe total</label>
                          <div class="input-con-icono-izq">
                            <input type="number" class="form-control text-end" step="0.01"
                              v-model="datosCompra.importe_total">
                            <span class="icon-input-izq">S/.</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Fecha</label>
                          <input type="date" class="form-control" v-model="datosCompra.fecha">
                        </div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Comentario / Observación</label>
                      <textarea class="form-control" rows="1" style="max-height: 90px;"
                        v-model="datosCompra.comentario"></textarea>
                    </div>
                  </form>
                </div>
                <div class="col-sm-5">
                  <form>
                    <div class="mb-2">
                      <label class="form-label">Buscar proveedor</label>
                      <div class="search-container">
                        <div class="input-con-icono">
                          <input type="text" class="form-control" v-model="dataBuscar" placeholder="Buscar proveedor ..."
                            @keydown.enter="buscarProveedor">
                          <span class="icon-input">
                            <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
                          </span>
                        </div>
                        <div class="search-results" v-if="showResults && filtrarBusqueda.length > 0" tabindex="0">
                          <ul class="list-group">
                            <li class="list-group-item" v-for="proveedor in filtrarBusqueda" :key="proveedor.id"
                              @click="guardarProveedor(proveedor)">
                              {{ proveedor.nombre }}</li>
                          </ul>
                        </div>
                        <div class="search-results" v-else-if="showResults && dataBuscar.trim() !== ''">
                          <ul class="list-group">
                            <li class="list-group-item">No se encontraron resultados</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Nombre del proveedor</label>
                      <input type="text" class="form-control" disabled v-model="dataProveedor.nombre">
                    </div>
                    <div class="mb-2">
                      <label class="form-label">RUC</label>
                      <input type="text" class="form-control" disabled v-model="dataProveedor.ruc">
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Razón social</label>
                      <input type="text" class="form-control" disabled v-model="dataProveedor.razon_social">
                    </div>
                  </form>
                  <div v-if="showDetails" class="mt-4 mb-3 text-center">
                    <!-- <label class="form-label">Total de productos: 0</label> -->
                    <button type="button" class="btn btn-primary mx-5" @click="showModal = true">Ir a detalles</button>
                  </div>
                  <div v-else class="mt-4 mb-3 text-center">
                    <button type="button" class="btn btn-primary mx-5" @click="generarEntrada">Generar detalle</button>
                  </div>

                </div>

                <div class="col-md-12">
                  <div v-if="msg" class="alert alert-danger" role="alert">
                    {{ msg }}
                  </div>
                  <div class="d-flex justify-content-center mt-3">
                    <button type="button" class="btn btn-primary mx-2" @click="guardarEntrada">Guardar</button>
                    <button type="button" class="btn btn-primary mx-2" @click="cancelar">Cancelar</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :show="showModal" :indice_compra="datosCompra.id_compra" @close="showModal = false"></Modal>
</template>

