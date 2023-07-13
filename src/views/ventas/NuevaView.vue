<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const datosBusqueda = ref('')
const showResults = ref(false)
const dataBuscarProducto = ref('')
const productoSeccionado = ref('')

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
            <div class="col-sm-8">
              <div class="card shadow mb-3">
                <div class="card-body">
                  <form>
                    <div class="mb-2">
                      <span class="fw-bold">Datos del producto</span>
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
                        <div class="search-results" v-if="showResults && filtrarBusqueda.length > 0"
                          tabindex="0">
                          <ul class="list-group">
                            <li class="list-group-item" v-for="resultado in filtrarBusqueda" :key="resultado.id"
                              @click="seleccionarProducto(resultado)">
                              {{ resultado.nombre }} / {{ resultado.marca }} / {{ resultado.unidad }}
                            </li>
                          </ul>
                        </div>
                        <div class="search-results"
                          v-else-if="showResults && dataBuscarProducto.trim() != ''">
                          <ul class="list-group">
                            <li class="list-group-item">No se encontraron resultados</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Nombre</label>
                          <input type="text" class="form-control" v-model="productoSeccionado.nombre" disabled>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Marca</label>
                          <input type="text" class="form-control" v-model="productoSeccionado.marca" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">Unidad</label>
                          <input type="text" class="form-control" v-model="productoSeccionado.unidad" disabled>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">Stock</label>
                          <input type="text" class="form-control" v-model="productoSeccionado.stock" disabled>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="mb-2">
                          <label class="form-label">Estado</label>
                          <input type="text" class="form-control" v-model="productoSeccionado.estado" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Cantidad</label>
                          <input type="text" class="form-control">
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Precio venta</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center pt-2 mb-2">
                      <button type="button" class="btn btn-secondary me-3" :disabled="isButtonDisabled">Agregar</button>
                      <button type="button" class="btn btn-secondary">Cancelar</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="card shadow mb-3">
                <div class="card-body">
                  <form>
                    <div class="mb-2">
                      <span class="fw-bold">Detalles de la vents</span>
                    </div>
                    <div class="mb-2">
                      <label class="form-label"></label>
                      <input type="text" class="form-control">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="w-personalizado mx-auto">
      <p></p>
      <div class="card shadow" style="margin-bottom: 4%;">
        <div class="row g-0">
          <div class="col-xl-6">
            <div class="card-body">
              <h3 class="mb-3 mt-2  text-center custom-tittle">Nueva Venta</h3>

              <hr>
              <form>
                <span class="text-begin fw-bold">Datos del Producto</span>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <div class="input-group">
                      <input type="search" class="form-control input-sm" placeholder="Buscar producto"
                        v-model="databuscarProducto" @keypress.enter="buscarProducto" @search="limpiarBusqueda">
                      <button class="btn btn-primary" type="button" id="input01"
                        @click="buscarProducto"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                    </div>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label custom-tittle">Nombre</label>
                    <input type="text" class="form-control" disabled>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label custom-tittle">Marca</label>
                    <input type="text" class="form-control" disabled>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-4">
                    <label class="form-label custom-tittle">Medida</label>
                    <input type="text" class="form-control" disabled>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label custom-tittle">Tipo de unidad</label>
                    <input type="text" class="form-control" disabled>
                  </div>
                  <div class="col-md-4">
                    <label class="form-label custom-tittle">Stock</label>
                    <input type="text" class="form-control" disabled>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <label class="form-label custom-tittle">Cantidad a vender</label>
                    <input type="text" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label custom-tittle" for="input13">Precio Sugerido</label>
                    <div class="input-group">
                      <div class="input-group mb-0 mt-0 compact-input justify-content-end">
                        <span class="input-group-text compact-span custom-tittle">S./</span>
                        <input type="text" class="form-control text-end" id="input13" value="1000">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label custom-tittle">Comentario</label>
                  <textarea class="form-control" rows="1" :disabled="isButtonDisabled"></textarea>
                </div>
                <div class="d-flex justify-content-center pt-2 mb-2">
                  <button type="button" class="btn btn-secondary me-3" :disabled="isButtonDisabled">Agregar</button>
                  <button type="button" class="btn btn-secondary">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="input-group">
                    <div class="input-group mb-0 mt-2 compact-input justify-content-end">
                      <span class="input-group-text compact-span custom-tittle">VENTA #</span>
                      <input type="text" class="form-control text-end" disabled value="1000">
                    </div>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                  <thead>
                    <tr class="text-center align-middle">
                      <th width="17%" class="fw-bold">CANTIDAD</th>
                      <th width="41%" class="fw-bold">DESCRIPCIÓN</th>
                      <th width="17%" class="fw-bold">P. UNITARIO</th>
                      <th width="17%" class="fw-bold">IMPORTE</th>
                      <th width="8%" colspan="2" class="fw-bold">OPCIÓN</th>
                    </tr>
                    <tr>
                    <tr></tr>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="table-light">
                      <td colspan="100%">No se encontraron datos</td>
                    </tr>
                    <tr class="text-center align-middle">
                      <td>5</td>
                      <td>Detergente</td>
                      <td>17.50</td>
                      <td>87.50</td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Editar"><img alt="Vue logo" class="logo"
                            src="@/assets/pencil.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Eliminar"><img alt="Vue logo" class="logo"
                            src="@/assets/delete.svg" width="15" /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label custom-tittle">Tipo de pago</label>
                  <select class="form-select">
                    <option selected value="0">Efectivo</option>
                    <option value="1">Yape</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label custom-tittle">Importe total S/.</label>
                  <input type="text" class="form-control" disabled>
                </div>
              </div>

              <div class="mb-3">
                <div class="d-flex justify-content-end pt-2 mb-2">
                  <button type="button" class="btn btn-primary">Imprimir boleta</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center pt-2 mb-2">
          <button type="button" class="btn btn-primary me-3">Guardar</button>
          <button type="button" class="btn btn-primary" @click="regresar">Cancelar</button>
        </div>

      </div>
    </div>
  </div>

  <!-- fin mi creacion -->

  <section class="h-100 bg-light">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card card-registration my-3">
            <div class="row g-0">
              <div class="col-12 text-center">
                <h1 class="my-1 text-center custom-tittle">Registrar Nueva Venta</h1>
              </div>
              <div class="col-xl-6">

                <div class="card-body p-md-4 text-black">
                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input01">Buscar Producto</label>
                      <div class="input-group">
                        <input type="search" class="form-control input-sm" placeholder="Buscar producto"
                          v-model="databuscarProducto" @keypress.enter="buscarProducto" @search="limpiarBusqueda">
                        <button class="btn btn-primary" type="button" id="input01"
                          @click="buscarProducto"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input02">Buscar Cliente</label>
                      <div class="input-group">
                        <input type="search" class="form-control input-sm" placeholder="Buscar Cliente"
                          v-model="databuscarProducto" @keypress.enter="buscarProducto" @search="limpiarBusqueda">
                        <button class="btn btn-primary" type="button" id="input02"
                          @click="buscarProducto"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input03">DNI</label>
                      <input type="text" id="input03" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input04">Nombre Cliente</label>
                      <input type="text" id="input04" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input05">Dirección Cliente</label>
                      <input type="text" id="input05" class="form-control form-control-lg" />
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input06">Nombre Producto</label>
                      <input type="text" id="input06" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input07">Marca del Producto</label>
                      <input type="text" id="input07" class="form-control form-control-lg" />
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input08">Medida del Producto</label>
                      <input type="text" id="input08" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input10">Tipo de Unidad</label>
                      <input type="text" id="input10" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-4">
                      <label class="form-label custom-tittle" for="input11">Cantidad x Unidad</label>
                      <input type="text" id="input11" class="form-control form-control-lg" />
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input12">Canitdad a Vender</label>
                      <input type="text" id="input12" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input13">Precio Sugerido</label>
                      <div class="input-group">
                        <div class="input-group mb-0 mt-0 compact-input justify-content-end">
                          <span class="input-group-text compact-span custom-tittle">S./</span>
                          <input type="text" class="form-control form-control-lg text-end" id="input13" value="1000">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-outline mb-2">
                    <label for="input14" class="form-label custom-tittle">Comentario</label>
                    <textarea class="form-control" id="input14" rows="1" :disabled="isButtonDisabled"></textarea>
                  </div>

                  <div class="col-12 text-center">
                    <h5 class="text-black bg-info fw-bold p-2 mx-4"> mensaje de error</h5>
                    <button type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Agregar</button>
                    <button type="button" class="btn btn-primary custom-btn-color" id="inputcancelar"
                      @click="regresar">Cancelar</button>
                  </div>

                </div>
              </div>
              <div class="col-xl-6">
                <div class="card-body p-md-4 text-black">
                  <div class="col-md-6 p-2">
                    <div class="input-group">
                      <div class="input-group mb-2 mt-3 compact-input justify-content-end">
                        <span class="input-group-text compact-span custom-tittle">VENTA #</span>
                        <input type="text" class="form-control text-end" disabled value="1000">
                      </div>
                    </div>
                  </div>

                  <div class="table-responsive" style="height: 20rem;">
                    <!-- Tabla -->
                    <table class="table table-bordered" width="100%" cellspacing="0">
                      <thead>
                        <tr class="text-center align-middle">
                          <th width="3%" scope="col" class="fw-bold">N°</th>
                          <th width="17%" class="fw-bold">NOMBRE</th>
                          <th width="17%" class="fw-bold">SALIDA DEL PRODUCTO</th>
                          <th width="15%" class="fw-bold">IMPORTE DE VENTA</th>
                          <th width="3%" colspan="2" class="fw-bold">OPCIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="table-light">
                          <td colspan="100%">No se encontraron datos</td>
                        </tr>

                        <tr class="text-center align-middle">
                          <td>2222</td>
                          <td>2222</td>
                          <td>2222</td>
                          <td>2222</td>
                          <td>
                            <button class="btn" data-toggle="tooltip" title="Editar Producto">
                              <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" />
                            </button>
                          </td>
                          <td>
                            <button class="btn" data-toggle="tooltip" title="Retirar Propducto">
                              <img alt="Vue logo" class="logo" src="@/assets/delete.svg" width="15" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Fin tabla productos -->
                  </div>
                  <div class="card-body p-md-4 text-black">
                    <div class="row mb-2">
                      <div class="col-md-6">
                        <div class="input-group">
                          <div class="input-group mb-2 mt-3 compact-input justify-content-end">
                            <span class="input-group-text compact-span custom-tittle">Importe Total S./</span>
                            <input type="text" class="form-control text-end" disabled value="1000">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <button type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Imprimir
                          Boleta</button>
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
  </section>
</template>

<style>
.table-responsive {
  max-height: 30rem;
  overflow-y: auto;
}

.custom-text {
  color: blue;
  font-weight: bold;
}

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
