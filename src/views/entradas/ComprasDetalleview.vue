<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const router = useRouter()

  function regresar(){
    router.push({ name: 'home' })
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
                <h1 class="my-1 text-center custom-tittle">Detalle de la Compra</h1>
              </div>
              <div class="col-xl-6">

                <div class="card-body p-md-4 text-black">
                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input00">Comprobante</label>
                      <input type="text" id="input00" class="form-control form-control-lg" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input01">Buscar Producto</label>
                      <div class="input-group">
                        <input type="text" class="form-control form-control-lg" placeholder="Buscar producto">
                        <button class="btn btn-primary" type="button" id="input01">
                          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                          </button>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input02">Nombre de Producto</label>
                      <input type="text" id="input02" class="form-control" disabled/>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input03">Medida de producto</label>
                      <input type="text" id="input03" class="form-control" disabled/>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input04">Marca de Producto</label>
                      <input type="text" id="input04" class="form-control" disabled/>
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input05">Tipo de unidad del producto</label>
                      <input type="text" id="input05" class="form-control" disabled/>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input06">Cantidad x Unidad del Producto</label>
                      <input type="text" id="input06" class="form-control" disabled/>
                    </div>
                    <div class="col-md-6">
                      <label for="input07" class="form-label  custom-tittle">Estado</label>
                      <input type="text" id="input07" class="form-control" disabled/>
                    </div>
                  </div>

                  <div class="row mb-2">
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input08">Cantidad</label>
                      <input type="text" id="input08" class="form-control" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label custom-tittle" for="input09">Precio Unitario</label>
                      <input type="text" id="input09" class="form-control" />
                    </div>
                  </div>

                </div>
              </div>
              <div class="col-xl-6">
                <div class="card-body p-md-4 text-black">
                  <div class="col-md-6 p-2">
                    <div class="input-group mt-0 compact-input justify-content-end">
                      <span class="input-group-text compact-span custom-tittle">#ID Compra</span>
                      <input type="text" class="form-control text-end" disabled>
                    </div>
                  </div>

                  <div class="table-responsive" style="height: 20rem;">
                    <!-- Tabla -->
                    <table class="table table-bordered" width="100%" cellspacing="0">
                      <thead>
                        <tr class="text-center align-middle">
                          <th width="3%" scope="col" class="fw-bold">N°</th>
                          <th width="17%" class="fw-bold">PRODUCTO</th>
                          <th width="17%" class="fw-bold">CANTIDAD</th>
                          <th width="15%" class="fw-bold">PRECIO U.</th>
                          <th width="15%" class="fw-bold">PRECIO TOTAL</th>
                          <th width="3%" colspan="3" class="fw-bold">OPCIÓN</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="table-light">
                          <td colspan="100%">No se encontraron datos</td>
                        </tr>

                        <tr class="text-center align-middle" >
                          <td>1</td>
                          <td>2222</td>
                          <td>3333</td>
                          <td>4444</td>
                          <td>5555</td>
                          <td>
                            <button class="btn" data-toggle="tooltip" title="Editar Producto">
                              <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" />
                              </button>
                          </td>
                          <td>
                            <button class="btn" data-toggle="tooltip" title="Retirar Producto">
                              <img alt="Vue logo" class="logo" src="@/assets/delete.svg" width="15" />
                              </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Fin tabla productos -->
                  </div>

                </div>
              </div>
              <div class="col-12 text-center">
                <h5 class="text-black bg-info fw-bold p-2 mx-4"> mensaje de error</h5>
                <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" >
                  <font-awesome-icon :icon="['fas', 'circle-plus']" />
                  Agregar
                  </button>
                <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputTerminar" >Terminar</button>
                <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputcancelar" @click="regresar" >Cancelar</button>
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
