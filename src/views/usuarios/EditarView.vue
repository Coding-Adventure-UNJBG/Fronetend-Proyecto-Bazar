<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const params = useRoute()
const isButtonDisabled = ref(false)
const showPw = ref(false)
const showPwD = ref(false)
const msg = ref('')
const datosUsuario = ref({ "id_usuario": "", "cuenta": "", "password": "", "id_rol": "", "dni": "", "nombres": "", "telefono": "", "direccion": "", "comentario": "", "estado": "" })

onMounted(() => {
  cargarData()
})

async function cargarData() {
  const uId = params.params.id;
  await fetch(`${import.meta.env.VITE_API_V1}/usuario/${uId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      datosUsuario.value = data[0];
      console.log(datosUsuario.value)
      if (datosUsuario.value.estado == "deshabilitado")
        datosUsuario.value.estado = 2
      else
        datosUsuario.value.estado = 1
    })
    .catch(error => {
      swal("Ups, algo salio mal", "Problemas internos con el servidor", "warning")
      // msg.value = "problemas con el servidor"
    })
}

function regresar() {
  router.push({ name: 'usuarios' })
}

async function guardarDatosUsuario() {
  msg.value = ''
  isButtonDisabled.value = true

  if (datosUsuario.value.password != datosUsuario.value.password2) {
    swal("Ups...", "Las contraseñas no coinciden", "error")
    isButtonDisabled.value = false
    return;
  }

  for (var clave in datosUsuario.value) {
    if (datosUsuario.value[clave] == '' && clave != "comentario" && clave != "telefono" && clave != "direccion")
      msg.value += " " + clave + ","
  }
  if (msg.value) {
    msg.value = ''
    swal("Ups, algo salio mal", "Por favor, completa todos los campos requeridos", "warning")
    // msg.value = "ERROR: Campos vacios ->" + msg.value
    isButtonDisabled.value = false
    //console.log(msg.value)
    return;
  } else {
    guardarDatos()
    isButtonDisabled.value = false
  }
}

async function guardarDatos() {
  await fetch(`${import.meta.env.VITE_API_V1}/usuario/`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosUsuario.value)
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("message")) {
        swal("", "Usuario actualizado correctamente", "success")
        // msg.value = data.message
        regresar()
      } else {
        swal("Ups, algo salio mal", data.error, "error")
        // msg.value = data.error
      }
    })
    .catch(error => {
      swal("Ups, algo salio mal", "Problemas internos con el servidor", "warning")
      // msg.value = "Error del servicio al guardar los datos"
    })
}

</script>

<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-body">
              <div class="text__principal">
                <h2>MODIFICAR USUARIO</h2>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <form>
                    <fieldset>
                      <legend>Información de cuenta</legend>
                      <div class="mb-2">
                        <label class="form-label" for="formId">Código de Usuario</label>
                        <input type="text" id="formId" class="form-control" v-model="datosUsuario.id_usuario" disabled />
                      </div>
                      <div class="mb-2">
                        <label class="form-label" for="formCuentaU">Nombre de Usuario
                          <span style="color: red;">*</span>
                        </label>
                        <input type="text" id="formCuentaU" class="form-control" v-model="datosUsuario.cuenta" disabled />
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label class="form-label" for="formPasswordU">Contraseña
                              <span style="color: red;">*</span>
                            </label>
                            <div class="input-con-icono">
                              <input :type="showPw === true ? 'text' : 'password'" id="formPasswordU" class="form-control"
                                v-model="datosUsuario.password" />
                              <span class="icon-input" @click="showPw = !showPw">
                                <font-awesome-icon class="password-icon" :icon="['fas', showPw ? 'eye' : 'eye-slash']" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label class="form-label" for="formPassword2">Repetir Contraseña
                              <span style="color: red;">*</span>
                            </label>
                            <div class="input-con-icono">
                              <input :type="showPwD === true ? 'text' : 'password'" required id="formPasswordU"
                                class="form-control" v-model="datosUsuario.password2" />
                              <span class="icon-input" @click="showPwD = !showPwD">
                                <font-awesome-icon class="password-icon" :icon="['fas', showPwD ? 'eye' : 'eye-slash']" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label for="formRol" class="form-label">Rol o Puesto</label>
                            <select id="formRol" class="form-select" v-model="datosUsuario.id_rol">
                              <option value="1">Administrador</option>
                              <option value="2">Inventario</option>
                              <option value="3">Vendedor</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label for="formEstado" class="form-label">Estado</label>
                            <select id="formEstado" class="form-select" v-model="datosUsuario.estado">
                              <option value="1">Habilitado</option>
                              <option value="2">Deshabilitado</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>

                <div class="col-md-6">
                  <form>
                    <fieldset>
                      <legend>Información personal</legend>
                      <div class="mb-2">
                        <label class="form-label" for="formNombres">Nombres y apellidos
                          <span style="color: red;">*</span>
                        </label>
                        <input type="text" id="formNombres" class="form-control" v-model="datosUsuario.nombres" />
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="mb-2">
                            <label class="form-label" for="formDNI">DNI
                              <span style="color: red;">*</span>
                            </label>
                            <input type="number" id="formDNI" class="form-control" v-model="datosUsuario.dni" disabled/>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-2">
                            <label class="form-label" for="formTelefono">Teléfono</label>
                            <input type="text" id="formTelefono" class="form-control" v-model="datosUsuario.telefono" />
                          </div>
                        </div>
                      </div>
                      <div class="mb-2">
                        <label class="form-label" for="formDirecc">Dirección</label>
                        <input type="text" id="formDirecc" class="form-control" v-model="datosUsuario.direccion" />
                      </div>
                      <div class="mb-2">
                        <label class="form-label">Comentario</label>
                        <input type="text" class="form-control" v-model="datosUsuario.comentario" />
                      </div>
                    </fieldset>
                  </form>
                </div>

                <div class="col-md-12">
                  <!-- <div v-if="msg" class="form-outline px-4 text-center">
                    <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                  </div> -->
                  <div class="d-flex justify-content-center mt-3">
                    <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                      @click="guardarDatosUsuario">Guardar</button>
                    <button type="button" class="btn btn-primary mx-2" @click="regresar">Cancelar</button>
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