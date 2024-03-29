<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref, computed } from 'vue';
import swal from 'sweetalert';

const router = useRouter()
const isButtonDisabled = ref(false)
const showProducto = ref(false)
const showProveedor = ref(false)
const showResults = ref(false)
const msg = ref('')

const datosCompra = ref({ "id_proveedor": "", "id_producto": "", "descripcion": "", "cantidad": "", "precio_compra": "", "costo_operacion": "0" })
const datosBusqueda = ref('')
const queBuscar = ref('')
const dataBuscarProducto = ref('')
const dataBuscarProveedor = ref('')
const productoSeccionado = ref('')
const proveedorSeccionado = ref('')

const totalCompra = computed(() => {
  const cantidad = Number(datosCompra.value.cantidad);
  const precio = Number(datosCompra.value.precio_compra);
  return (cantidad * precio).toFixed(2)
})

//Busqueda generalizada
function cargarBusqueda() {
  fetch(`${import.meta.env.VITE_API_V1}/${queBuscar.value}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      datosBusqueda.value = data
    })
}

const buscar = () => {
  cargarBusqueda()
  showResults.value = true
  console.log('Buscando en', queBuscar.value, ' => ', queBuscar.value === 'producto' ? dataBuscarProducto.value : dataBuscarProveedor.value)
}

const filtrarBusqueda = computed(() => {
  const search = queBuscar.value === 'producto' ? dataBuscarProducto.value.toLowerCase() : dataBuscarProveedor.value.toLowerCase()
  const resultados = Object.values(datosBusqueda.value)
  return search ? resultados.filter(resultado => resultado.nombre.toLowerCase().includes(search) && resultado.estado != 'DESHABILITADO') : [];
})

//Buscar proveedor
function buscarProveedor() {
  showProducto.value = false
  showProveedor.value = true
  // showResults.value = false
  if (dataBuscarProveedor.value.trim() == '') {
    return
  } else {
    queBuscar.value = 'proveedor'
    buscar()
  }
}

function seleccionarProveedor(proveedor) {
  showProveedor.value = false
  showResults.value = false
  proveedorSeccionado.value = proveedor
  datosCompra.value.id_proveedor = proveedor.id_proveedor
  // console.log(datosCompra.value)
}

//Buscar producto
function buscarProducto() {
  showProveedor.value = false
  showProducto.value = true
  // showResults.value = false
  if (dataBuscarProducto.value.trim() == '') {
    return
  } else {
    queBuscar.value = 'producto'
    buscar()
  }
}

function seleccionarProducto(producto) {
  showProducto.value = false
  showResults.value = false
  productoSeccionado.value = producto
  datosCompra.value.id_producto = producto.id_producto
  // console.log(datosCompra.value)
}

//Validacion de campos
async function guardarEntrada() {
  msg.value = ''
  isButtonDisabled.value = true

  for (var clave in datosCompra.value) {
    if (datosCompra.value[clave] == '' && clave != "descripcion" && clave != "costo_operacion") {
      msg.value += " " + clave + ","
    }
  }
  if (msg.value) {
    msg.value = ''
    swal("Ups, algo salio mal", "Por favor, completa todos los campos requeridos", "warning")
    // msg.value = "Error: campos requeridos -> " + msg.value
    isButtonDisabled.value = false
    return
  }

  if (datosCompra.value.cantidad <= 0) {
    swal("Ups, algo salio mal", "La cantidad de productos no puede ser negativa o cero", "error")
    isButtonDisabled.value = false
    return
  }

  if (datosCompra.value.precio_compra <= 0) {
    swal("Ups, algo salio mal", "El precio del producto no puede ser negativa o cero", "error")
    isButtonDisabled.value = false
    return
  }

  if (datosCompra.value.costo_operacion < 0) {
    swal("Ups, algo salio mal", "El costo de operación no puede ser negativa", "error")
    isButtonDisabled.value = false
    return
  }

  await insertarCompra()
  isButtonDisabled.value = false
}

function insertarCompra() {
  fetch(`${import.meta.env.VITE_API_V1}/entrada`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosCompra.value)
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        swal("", "La compra fue registrada correctamente", "success")
        msg.value = data.message
        cancelar()
      } else {
        swal("Ups, algo salio mal", data.error, "error")
        msg.value = data.error
      }
    })
}

function cancelar() {
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
                <div class="col-sm-4">
                  <form>
                    <div class="mb-2">
                      <span class="fw-bold">Datos del producto
                        <span style="color: red;">*</span>
                      </span>
                    </div>
                    <div class="mb-2">
                      <div class="search-container">
                        <div class="input-con-icono">
                          <input type="text" class="form-control" v-model="dataBuscarProducto"
                            placeholder="Buscar producto ..." @keydown.enter="buscarProducto">
                          <span class="icon-input">
                            <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
                          </span>
                        </div>
                        <div class="search-results" v-if="showResults && showProducto && filtrarBusqueda.length > 0"
                          tabindex="0">
                          <ul class="list-group">
                            <li class="list-group-item" v-for="resultado in filtrarBusqueda" :key="resultado.id"
                              @click="seleccionarProducto(resultado)">
                              {{ resultado.nombre }} / {{ resultado.marca }} / {{ resultado.unidad }}
                            </li>
                          </ul>
                        </div>
                        <div class="search-results"
                          v-else-if="showResults && showProducto && dataBuscarProducto.trim() != ''">
                          <ul class="list-group">
                            <li class="list-group-item">No se encontraron resultados</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-control" v-model="productoSeccionado.nombre" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Marca</label>
                      <input type="text" class="form-control" v-model="productoSeccionado.marca" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Unidad</label>
                      <input type="text" class="form-control" v-model="productoSeccionado.unidad" disabled>
                    </div>
                  </form>
                </div>
                <div class="col-sm-4">
                  <form>
                    <div class="mb-2">
                      <span class="fw-bold">Datos del proveedor
                        <span style="color: red;">*</span>
                      </span>
                    </div>
                    <div class="mb-2">
                      <div class="search-container">
                        <div class="input-con-icono">
                          <input type="text" class="form-control" v-model="dataBuscarProveedor"
                            placeholder="Buscar proveedor ..." @keydown.enter="buscarProveedor">
                          <span class="icon-input">
                            <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
                          </span>
                        </div>
                        <div class="search-results" v-if="showResults && showProveedor && filtrarBusqueda.length > 0"
                          tabindex="0">
                          <ul class="list-group">
                            <li class="list-group-item" v-for="resultado in filtrarBusqueda" :key="resultado.id"
                              @click="seleccionarProveedor(resultado)">
                              {{ resultado.nombre }}</li>
                          </ul>
                        </div>
                        <div class="search-results"
                          v-else-if="showResults && showProveedor && dataBuscarProveedor.trim() !== ''">
                          <ul class="list-group">
                            <li class="list-group-item">No se encontraron resultados</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-control" v-model="proveedorSeccionado.nombre" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">RUC</label>
                      <input type="text" class="form-control" v-model="proveedorSeccionado.ruc" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Razón social</label>
                      <input type="text" class="form-control" v-model="proveedorSeccionado.razon_social" disabled>
                    </div>
                  </form>
                </div>

                <div class="col-sm-4">
                  <div class="mb-2">
                    <span class="fw-bold">Datos de la compra</span>
                  </div>
                  <div class="mb-2">
                    <textarea class="form-control" placeholder="Descripción de la compra (opcional)" rows="1"
                      style="max-height: 65px;" v-model="datosCompra.descripcion"></textarea>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="mb-2">
                        <label class="form-label">Cantidad
                          <span style="color: red;">*</span>
                        </label>
                        <input type="number" class="form-control" placeholder="0" min="0" v-model="datosCompra.cantidad">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="mb-2">
                        <label class="form-label">Precio unitario
                          <span style="color: red;">*</span>
                        </label>
                        <div class="input-con-icono-izq">
                          <input type="number" class="form-control text-end" placeholder="0.00" step="0.01" min="0"
                            v-model="datosCompra.precio_compra">
                          <span class="icon-input-izq">S/.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Importe total
                      <span style="color: red;">*</span>
                    </label>
                    <div class="input-con-icono-izq">
                      <input type="number" class="form-control text-end"
                        :value="totalCompra" disabled>
                      <span class="icon-input-izq">S/.</span>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Costo de operación (opcional)</label>
                    <div class="input-con-icono-izq">
                      <input type="number" class="form-control text-end" placeholder="0.00" step="0.01" min="0"
                        v-model="datosCompra.costo_operacion">
                      <span class="icon-input-izq">S/.</span>
                    </div>
                  </div>

                </div>

                <div class="col-md-12">
                  <!-- <div v-if="msg" class="alert alert-danger" role="alert">
                    {{ msg }}
                  </div> -->
                  <div class="d-flex justify-content-center mt-3">
                    <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                      @click="guardarEntrada">Guardar</button>
                    <button type="button" class="btn btn-primary mx-2" @click="cancelar">Cancelar</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></template>

