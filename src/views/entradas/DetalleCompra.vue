<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Modal from './ModalProductos.vue'

const showModal = ref(false)

const router = useRouter()

function regresar() {
  router.push({ name: 'compras' })
}
</script>

<template>
  <Navegacion />

  <button id="show-modal" @click="showModal = true">Show Modal</button>
  <Modal :show="showModal" @close="showModal = false">

  </Modal>
  <!-- <Teleport to="body"> -->
  <!-- use the modal component, pass in the prop -->
  <!-- </Teleport> -->

  <div class="container__secondary">
    <div class="vista-tertiary">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow">
            <div class="card-body">
              <div class="text__principal">
                <h2>DETALLE DE COMPRA</h2>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <form>
                    <div class="mb-2">
                      <label class="form-label"></label>
                      <div class="search-container">
                        <div class="input-con-icono">
                          <input type="text" class="form-control" v-model="dataBuscar" placeholder="Buscar producto ..."
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
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Nombre del producto</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Marca del producto</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Medida del producto</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Tipo de unidad</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Cantidad por unidad</label>
                          <input type="text" class="form-control" disabled>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="mb-2">
                          <label class="form-label">Estado</label>
                          <input type="text" class="form-control" disabled>
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
                          <label class="form-label">Precio Unitario</label>
                          <input type="text" class="form-control">
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
                    <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
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
                        <tr class="text-center align-middle">
                          <td>DETERGENTE</td>
                          <td>AVAL</td>
                          <td>15</td>
                          <td>15.2</td>
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
                    <button type="button" class="btn btn-primary mx-2">Agregar</button>
                    <button type="button" class="btn btn-primary mx-2" @click="regresar">regresar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>