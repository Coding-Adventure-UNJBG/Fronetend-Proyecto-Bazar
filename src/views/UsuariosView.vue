<script setup>
import { useRouter, useRoute } from 'vue-router';
import Navegacion from '../components/Navegacion.vue'
import { ref } from 'vue'
</script>


<template>
  <Navegacion />

  <h1 class="text-center custom-tittle">VISTA DE USUARIOS</h1>

  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="w-personalizado mx-auto">


      <div class="card shadow">

        <div class="card-header py-3">
          <div class="row g-3">

            <div class="col-md-3">
              <div class="input-group">
                <input type="search" class="form-control input-sm" placeholder="Buscar usuario">
                <button class="btn btn-primary" type="button" id="inputbuscar"><font-awesome-icon
                    :icon="['fas', 'magnifying-glass']" /></button>
              </div>
            </div>
            <div class="col-md-9 d-flex justify-content-start align-items-end">
              <button type="button" class="btn btn-primary">Nuevo usuario</button>
            </div>

          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" width="100%" cellspacing="0">
              <thead>
                <tr class="text-center align-middle">
                  <th width="4%" scope="col" class="fw-bold">N°</th>
                  <th width="10.2%" class="fw-bold">USUARIO</th>
                  <th width="10.2%" class="fw-bold">CONTRASEÑA</th>
                  <th width="10.2%" class="fw-bold">ROL</th>
                  <th width="10.2%" class="fw-bold">ESTADO</th>
                  <th width="10.2%" class="fw-bold">FECHA</th>
                  <th width="35%" class="fw-bold">COMENTARIO</th>
                  <th width="10%" colspan="2" class="fw-bold">OPCIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center align-middle">
                  <td>1</td>
                  <td>admin</td>
                  <td>admin</td>
                  <td>Administrador</td>
                  <td>Habilitado</td>
                  <td>20/05/2023</td>
                  <td></td>
                  <td>
                    <a href="#" data-toggle="tooltip" title="Editar"><img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" /></a>
                  </td>
                  <td>
                    <a href="#" data-toggle="tooltip" title="Eliminar"><img alt="Vue logo" class="logo" src="@/assets/delete.svg" width="15" /></a>
                  </td>
                </tr>
                <tr class="text-center align-middle">
                  <td>2</td>
                  <td>user</td>
                  <td>123456</td>
                  <td>Vendedor</td>
                  <td>Habilitado</td>
                  <td>21/05/2023</td>
                  <td></td>
                  <td>
                    <a href="#"><img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" /></a>
                  </td>
                  <td>
                    <a href="#"><img alt="Vue logo" class="logo" src="@/assets/delete.svg" width="15" /></a>
                  </td>
                </tr>
                <tr class="text-center align-middle">
                  <td>3</td>
                  <td>codex</td>
                  <td>user122</td>
                  <td>Inventario</td>
                  <td>Habilitado</td>
                  <td>10/05/2023</td>
                  <td></td>
                  <td>
                    <a href="#" ><img alt="Vue logo" class="logo" src="@/assets/pencil.svg" width="15" /></a>
                  </td>
                  <td>
                    <a href="#"><img alt="Vue logo" class="logo" src="@/assets/delete.svg" width="15" /></a>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-tittle {
  margin: 50px
}

.card-header .btn-primary {
  margin-left: 0.5rem;
}

/* Ancho completo en la vista móvil */
@media (max-width: 768px) {
  .w-personalizado {
    width: 100%;
  }
}

/* Ancho al 75% para vista no movil */
@media (min-width: 769px) {
  .w-personalizado {
    width: 75%;
  }
}
</style>
