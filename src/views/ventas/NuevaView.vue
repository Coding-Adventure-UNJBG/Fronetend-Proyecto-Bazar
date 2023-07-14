<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const datosBusqueda = ref('')
const showResults = ref(false)
const dataBuscarProducto = ref('')
const productoSeccionado = ref('')
const detalleProducto = ref('')

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
  return search ? resultados.filter(resultado => resultado.nombre.toLowerCase().includes(search)) : [];
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
function regresar() {
  router.push({ name: 'ventas' })
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
                        <button type="button" class="btn btn-secondary" :disabled="isButtonDisabled">Agregar</button>
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
                        <input type="number" class="form-control">
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
                        <th width="4%" scope="col" class="fw-bold">N°</th>
                        <th width="52%" class="fw-bold">PRODUCTO</th>
                        <th width="10%" class="fw-bold">CANTIDAD</th>
                        <th width="12%" class="fw-bold">PRECIO U.</th>
                        <th width="12%" class="fw-bold">TOTAL</th>
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
                      <tr class="text-center align-middle">
                        <td>1</td>
                        <td class="text-start">PASTA DENTAL - DENTO - 75 ML</td>
                        <td>10</td>
                        <td>S/. 3.50</td>
                        <td>S/. 30.50</td>
                        <td>
                          <a href="#" data-toggle="tooltip" title="Editar"><img src="@/assets/icons/pencil.svg"
                              width="15" /></a>
                        </td>
                        <td>
                          <a href="#" data-toggle="tooltip" title="Eliminar"><img src="@/assets/icons/delete.svg"
                              width="15" /></a>
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
                        <input type="text" class="form-control text-center" value="001" disabled>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="mb-3">
                        <label class="form-label">N° Boleta</label>
                        <input type="text" class="form-control text-center" value="000260" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Tipo de pago</label>
                    <select class="form-select">
                      <option value="">Efectivo</option>
                      <option value="">Yape</option>
                    </select>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Comentario</label>
                    <textarea class="form-control" rows="1" style="max-height: 65px;"></textarea>
                  </div>
                  <div class="mb-2 mt-4">
                    <div class="row">
                      <div class="col-sm-6">
                        <label class="form-label">Subtotal</label>
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label">S/.</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <label class="form-label">IGV (18%)</label>
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label">S/.</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <label class="form-label">Total</label>
                      </div>
                      <div class="col-sm-6">
                        <label class="form-label">S/.</label>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center pt-2 mb-2">
                    <button type="button" class="btn btn-primary btn-report me-3"
                      :disabled="isButtonDisabled">Guardar</button>
                    <button type="button" class="btn btn-primary btn-report">Cancelar</button>
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


