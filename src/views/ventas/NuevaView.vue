<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { onMounted } from 'vue';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const datosBusqueda = ref('')
const showResults = ref(false)
const dataBuscarProducto = ref('')
const productoSeccionado = ref('')

const detalleProducto = ref([])
const datosVenta = ref({ "serie": "001", "correlativo": "", "tipo_pago": "EFECTIVO", "total_dinero": "0.00", "comentario": "" })
const showEdit = ref(false)
const idEditar = ref('')
const msg = ref('')

onMounted(() => {
  obtenerCorrelativo()
})

async function obtenerCorrelativo() {
  await fetch(`${import.meta.env.VITE_API_V1}/venta/correlativo`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let corr = parseInt(data[0].correlativo, 10) + 1
      datosVenta.value.correlativo = corr.toString().padStart(6, 0)
    })
    .catch(error => {
      msg.value = "Error del servicio al obtener el último ID"
    })
}

const totalProductos = computed(() => {
  const total = detalleProducto.value.reduce((total, venta) => {
    return total + (venta.cantidad * venta.precio_venta)
  }, 0)

  return total.toFixed(2)
})

//Busqueda de productos
function cargarBusqueda() {
  fetch(`${import.meta.env.VITE_API_V1}/producto`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      datosBusqueda.value = data
    })
}

const buscar = () => {
  cargarBusqueda()
  showResults.value = true
  console.log('Buscar: ', dataBuscarProducto.value)
}

const filtrarBusqueda = computed(() => {
  const search = dataBuscarProducto.value.toLowerCase()
  const resultados = Object.values(datosBusqueda.value);
  return search ? resultados.filter(resultado => resultado.nombre.toLowerCase().includes(search) && resultado.estado == 'DISPONIBLE') : [];
})

function buscarProducto() {
  // showResults.value = false
  if (dataBuscarProducto.value.trim() == '') {
    return
  } else {
    buscar()
  }
}

function seleccionarProducto(producto) {
  showResults.value = false
  productoSeccionado.value = producto
}

function agregarCarrito() {
  console.log(productoSeccionado.value)
  detalleProducto.value.push(productoSeccionado.value)
  productoSeccionado.value = ''
  console.log(detalleProducto.value)
}

function editarProducto(id, producto) {
  // productoSeccionado.value = producto
  showEdit.value = true
  productoSeccionado.value = { ...producto}
  idEditar.value = id
  console.log('Id es: ', id)
}

function finEditarProducto() {
  console.log(productoSeccionado.value)
  detalleProducto.value[idEditar.value] = productoSeccionado.value
  productoSeccionado.value = ''
  idEditar.value = ''
  showEdit.value = false
}

function eliminarProducto(id) {
  console.log('Id es: ', id)
  detalleProducto.value.splice(id, 1)

  console.log(detalleProducto.value)
}

function regresar() {
  router.push({ name: 'ventas' })
}

function GuardarVenta() {
  datosVenta.value.total_dinero = totalProductos
  // Unir las dos variables
  datosVenta.value = {
    ...datosVenta.value,
    detalleVenta: detalleProducto.value
  }
  console.log(datosVenta.value)
  insertarVenta()
}

function insertarVenta() {
  fetch(`${import.meta.env.VITE_API_V1}/venta`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosVenta.value)
  })
  .then(response => response.json())
  .then(data => {
    if (data.hasOwnProperty("message")) {
        msg.value = data.message
        regresar()
      } else {
        msg.value = data.error
      }
  })
  .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
}
</script>

<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="text__principal">
        <h1>REGISTRO DE VENTA</h1>
      </div>
      <div class="container__vista-principal">
        <div class="row">
          <div class="col-sm-9">
            <div class="card shadow mb-3">
              <div class="card-body">
                <form>
                  <div class="mb-2">
                    <span class="fw-bold">Datos del producto</span>
                  </div>
                  <div class="row">
                    <div class="col-sm-10">
                      <div class="mb-2">
                        <div class="search-container">
                          <div class="input-con-icono">
                            <input type="text" class="form-control" v-model="dataBuscarProducto"
                              placeholder="Buscar producto ..." @keydown.enter="buscarProducto">
                            <span class="icon-input">
                              <font-awesome-icon class="search-icon" :icon="['fas', 'search']" />
                            </span>
                          </div>
                          <div class="search-results" v-if="showResults && filtrarBusqueda.length > 0" tabindex="0">
                            <ul class="list-group">
                              <li class="list-group-item" v-for="resultado in filtrarBusqueda" :key="resultado.id"
                                @click="seleccionarProducto(resultado)">
                                {{ resultado.nombre }} / {{ resultado.marca }} / {{ resultado.unidad }}
                              </li>
                            </ul>
                          </div>
                          <div class="search-results" v-else-if="showResults && dataBuscarProducto.trim() != ''">
                            <ul class="list-group">
                              <li class="list-group-item">No se encontraron resultados</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="mb-2 d-grid gap-2 mx-auto">
                        <button v-if="showEdit" type="button" class="btn btn-secondary" :disabled="isButtonDisabled"
                          @click="finEditarProducto">Guardar</button>
                        <button v-else type="button" class="btn btn-secondary" :disabled="isButtonDisabled"
                          @click="agregarCarrito">Agregar</button>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Producto</label>
                    <textarea class="form-control" rows="1" style="max-height: 65px;"
                      disabled>{{ productoSeccionado.nombre }} - {{ productoSeccionado.marca }} - {{ productoSeccionado.unidad }}</textarea>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="mb-2">
                        <label class="form-label">Stock</label>
                        <input type="text" class="form-control" v-model="productoSeccionado.stock" disabled>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mb-2">
                        <label class="form-label">Precio unitario</label>
                        <input type="text" class="form-control" v-model="productoSeccionado.precio_venta" disabled>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mb-2">
                        <label class="form-label">Cantidad</label>
                        <input type="number" class="form-control" v-model="productoSeccionado.cantidad">
                      </div>
                    </div>
                  </div>
                </form>
                <div class="mb-2">
                  <span class="fw-bold">Vista previa de productos</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                    <thead>
                      <tr class="text-center align-middle">
                        <!-- <th width="4%" scope="col" class="fw-bold">N°</th> -->
                        <th width="54%" class="fw-bold">DESCRIPCIÓN</th>
                        <th width="10%" class="fw-bold">CANTIDAD</th>
                        <th width="13%" class="fw-bold">PRECIO U.</th>
                        <th width="13%" class="fw-bold">TOTAL</th>
                        <th width="10%" colspan="2" class="fw-bold">OPCIÓN</th>
                      </tr>
                      <tr>
                      <tr></tr>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="detalleProducto == ''" class="table-light">
                        <td colspan="100%">No se encontraron datos</td>
                      </tr>
                      <!-- <tr v-else class="text-center align-middle" v-for="venta in detalleProducto" :key="detalleProducto.id"> -->
                      <tr v-else class="text-center align-middle" v-for="(venta, indice) in detalleProducto" :key="indice">
                        <!-- <td>{{ venta.id_producto }}</td> -->
                        <td class="text-start">{{ venta.nombre }} - {{ venta.marca }} - {{ venta.unidad }}</td>
                        <td>{{ venta.cantidad }}</td>
                        <td>S/. {{ venta.precio_venta }}</td>
                        <td>S/. {{ (venta.cantidad * venta.precio_venta).toFixed(2) }}</td>
                        <td>
                          <a href="#" data-toggle="tooltip" title="Editar" @click="editarProducto(indice, venta)"><img src="@/assets/icons/pencil.svg"
                              width="15" /></a>
                        </td>
                        <td>
                          <a href="#" data-toggle="tooltip" title="Eliminar" @click="eliminarProducto(indice)"><img
                              src="@/assets/icons/delete.svg" width="15" /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card shadow mb-3">
              <div class="card-body">
                <form>
                  <div class="mb-2">
                    <span class="fw-bold">Detalles de la venta</span>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label class="form-label">Serie</label>
                        <input type="text" class="form-control text-center" v-model="datosVenta.serie" disabled>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="mb-3">
                        <label class="form-label">N° Boleta</label>
                        <!-- value="000260" -->
                        <input type="text" class="form-control text-center" v-model="datosVenta.correlativo" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Tipo de pago</label>
                    <select class="form-select" v-model="datosVenta.tipo_pago">
                      <option value="EFECTIVO">Efectivo</option>
                      <option value="YAPE">Yape</option>
                    </select>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Comentario</label>
                    <textarea class="form-control" rows="1" style="max-height: 65px;"
                      v-model="datosVenta.comentario"></textarea>
                  </div>
                  <div class="mb-2 mt-4">
                    <div class="row">
                      <!-- <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left; ">Subtotal</label>
                        <label class="form-label" style="float: right;">S/. 164.00</label>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left;">IGV (18%)</label>
                        <label class="form-label" style="float: right;">S/. 36.00</label>
                      </div> -->
                      <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left; padding-left: 15px;">Total</label>
                        <label class="form-label" style="float: right; padding-right: 15px;">S/. {{
                          totalProductos }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mb-2">
                    <button type="button" class="btn btn-primary btn-report me-3"
                      :disabled="isButtonDisabled" @click="GuardarVenta">Guardar</button>
                    <button type="button" class="btn btn-primary btn-report" @click="regresar">Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


