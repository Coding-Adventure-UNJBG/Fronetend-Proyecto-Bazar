<script setup>
  import { useRouter, useRoute } from 'vue-router';
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';

  const router = useRouter()
  const dataUsuarios = ref('')
  const databuscar = ref('')

  onMounted(() => {
    cargarData();
  })

  async function cargarData(){
    await fetch(`${import.meta.env.VITE_API_V1}/usuario`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      dataUsuarios.value = data
    })
  }

  async function deshabilitarUsuario(idUser, estado) {
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/${idUser}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({"estado":`${estado}`})
    })
    .then(response => response.json())
    .then(data => {
      cargarData()
    })
  }

  function buscarUsuarios() {
    console.log(databuscar.value)
    fetch(`${import.meta.env.VITE_API_V1}/usuario?nombre=${databuscar.value}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.hasOwnProperty("error")) {
          dataUsuarios.value = ''
        } else
          dataUsuarios.value = data
      })
  }
  function nuevoUsuario() {
    router.push({ name: 'usuarionuevo' })
  }

  function editarUsuario(uId) {
    router.push({ name: 'usuarioeditar', params: {id: uId} })
  }
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
                <input type="search" class="form-control input-sm" placeholder="Buscar usuario" @keypress.enter="buscarUsuarios" v-model="databuscar">
                <button class="btn btn-primary" type="button" id="inputbuscar" @click="buscarUsuarios"><font-awesome-icon
                    :icon="['fas', 'magnifying-glass']" /></button>
              </div>
            </div>
            <div class="col-md-9 d-flex justify-content-start align-items-end">
              <button type="button" class="btn btn-primary" @click="nuevoUsuario">Nuevo usuario</button>
            </div>

          </div>
        </div>

        <div class="card-body">
          <!-- style="height: 25rem;" -->
          <div class="table-responsive">
            <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
              <thead>
                <tr class="text-center align-middle">
                  <th width="4%" scope="col" class="fw-bold">N°</th>
                  <th width="10.2%" class="fw-bold">USUARIO</th>
                  <th width="10.2%" class="fw-bold">CONTRASEÑA</th>
                  <th width="10.2%" class="fw-bold">ROL</th>
                  <th width="10.2%" class="fw-bold">ESTADO</th>
                  <th width="13.2%" class="fw-bold">INGRESO</th>
                  <th width="32%" class="fw-bold">COMENTARIO</th>
                  <th width="10%" colspan="2" class="fw-bold">OPCIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="dataUsuarios == ''" class="table-light">
                  <td colspan="100%">No se encontraron datos</td>
                </tr>
                <tr v-else class="align-middle" v-for="item in dataUsuarios" :key="dataUsuarios.id">
                  <td class="text-center">{{ item.id_usuario }}</td>
                  <td class="text-center">{{ item.cuenta }}</td>
                  <td class="text-center">*******</td>
                  <td class="text-center">{{ item.tipo }}</td>
                  <td class="text-center">{{ item.estado }}</td>
                  <td class="text-center">{{ item.fecha_registro }}</td>
                  <td class="text-left">{{ item.comentario }}</td>
                  <td class="text-center">
                    <a href="#" data-toggle="tooltip" title="Editar" @click="editarUsuario(item.id_usuario)" ><img alt="Vue logo" class="logo"
                        src="@/assets/pencil.svg" width="15" /></a>
                  </td>
                  <td class="text-center">
                    <a href="#" data-toggle="tooltip" title="Deshabilitar" @click="deshabilitarUsuario(item.id_usuario, 'deshabilitado')"><img alt="Vue logo" class="logo"
                        src="@/assets/delete.svg" width="15" /></a>
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
.table-responsive {
  max-height: 24rem;
  overflow-y: auto;
}

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
