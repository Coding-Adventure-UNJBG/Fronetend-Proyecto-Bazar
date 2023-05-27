<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const router = useRouter()

  function regresar(){
    router.push({ name: 'compras' })
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
                <h1 class="my-1 text-center custom-tittle">Vista de Proveedores</h1>
              </div>
              <div class="col-xl-6">

                <div class="card-body p-md-4 text-black">
                  <div class="row mb-4">
                    <div class="col-md-6">
                    <label class="form-label custom-tittle" for="input01">Id de Proveedor</label>
                    <input type="text" id="input01" class="form-control form-control-lg" disabled />
                    </div>
                    <div class="col-md-6">
                    <label class="form-label custom-tittle" for="input02">Ruc</label>
                    <input type="text" id="input02" class="form-control form-control-lg" />
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label custom-tittle" for="input03">Razon Social / Nombre</label>
                    <input type="text" id="input03" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label custom-tittle" for="input04">Dirección</label>
                    <input type="text" id="input04" class="form-control form-control-lg" />
                  </div>

                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label for="input05" class="form-label custom-tittle">Fecha de Registro</label>
                      <input type="date" class="form-control" id="input05" >
                    </div>
                    <div class="col-md-6">
                      <label for="input06" class="form-label custom-tittle">Estado</label>
                      <select id="input06" class="form-select" >
                        <option selected value="0">Deshabilitado</option>
                        <option value="1">Habilitado</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <label for="input07" class="form-label custom-tittle">Comentario</label>
                    <textarea class="form-control" id="input07" rows="2" :disabled="isButtonDisabled"></textarea>
                  </div>

                </div>
              </div>
              <div class="col-xl-6">
                <div class="card-body p-md-4 text-black">

                  <div class="table-responsive" height="100%">
            <!-- Tabla -->
            <table class="table table-bordered" width="100%" cellspacing="0">
              <thead>
                <tr class="text-center align-middle">
                  <th width="3%" scope="col" class="fw-bold">N°</th>
                  <th width="25%" class="fw-bold">RUC</th>
                  <th width="17%" class="fw-bold">NOMBRE</th>
                  <th width="17%" class="fw-bold">DIRECCIÓN</th>
                  <th width="15%" class="fw-bold">FECHA</th>
                  <th width="15%" class="fw-bold">ESTADO</th>
                  <th width="3%" colspan="3" class="fw-bold">OPCIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-light">
                  <td colspan="100%">No se encontraron datos</td>
                </tr>

                <tr class="text-center align-middle" >
                  <td>1111</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Ver Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/ojo.svg" width="15" />
                      </button>
                  </td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Editar Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" />
                      </button>
                  </td>
                </tr>
                <tr class="text-center align-middle" >
                  <td>1111</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Ver Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/ojo.svg" width="15" />
                      </button>
                  </td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Editar Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" />
                      </button>
                  </td>
                </tr>
                <tr class="text-center align-middle" >
                  <td>1111</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>2222</td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Ver Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/ojo.svg" width="15" />
                      </button>
                  </td>
                  <td>
                    <button class="btn" data-toggle="tooltip" title="Editar Proveedor">
                      <img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" />
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
                <h5 class="text-black bg-info fw-bold p-1 mx-4"> mensaje de error</h5>
                <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" >Agregar</button>
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
