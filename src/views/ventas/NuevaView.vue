<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const router = useRouter()

  function regresar(){
    router.push({ name: 'ventas' })
  }
</script>

<template>
  <Navegacion />
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
                        <button class="btn btn-primary" type="button" id="input01" @click="buscarProducto"><font-awesome-icon
                            :icon="['fas', 'magnifying-glass']" /></button>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input02">Buscar Cliente</label>
                      <div class="input-group">
                        <input type="search" class="form-control input-sm" placeholder="Buscar Cliente"
                          v-model="databuscarProducto" @keypress.enter="buscarProducto" @search="limpiarBusqueda">
                        <button class="btn btn-primary" type="button" id="input02" @click="buscarProducto"><font-awesome-icon
                            :icon="['fas', 'magnifying-glass']" /></button>
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
                    <button type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" >Agregar</button>
                    <button type="button" class="btn btn-primary custom-btn-color" id="inputcancelar" @click="regresar" >Cancelar</button>
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

                        <tr class="text-center align-middle" >
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
                        <button type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" >Imprimir Boleta</button>
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
</style>
