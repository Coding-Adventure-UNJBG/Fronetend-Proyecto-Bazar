<script setup>
import swal from 'sweetalert';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isButtonDisabled = ref(false)
const msg = ref('')
const showPw = ref(false)
const showPwD = ref(false)
const datosUsuario = ref({ "id_usuario": "xxx", "cuenta": "", "password": "", "password2": "", "rol": "1", "dni": "", "nombres": "", "telefono": "", "direccion": "", "comentario": "", "estado": "1" })

onMounted(() => {
  obtenerIDCuenta()
})

async function obtenerIDCuenta() {
  await fetch(`${import.meta.env.VITE_API_V1}/usuario/obtener/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      datosUsuario.value.id_usuario = parseInt(data[0].id, 10) + 1
    })
    .catch(error => {
      swal("Ups, algo salio mal", "Problemas internos con el servidor al obtener el último ID", "warning")
      // msg.value = "Error del servicio al obtener el último ID"
    })
}

async function verificarDatosCuenta() {
  await fetch(`${import.meta.env.VITE_API_V1}/usuario/comprobar?cuenta=${datosUsuario.value.cuenta}&dni=${datosUsuario.value.dni}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("error")) {
        swal("Ups, algo salio mal", data.error, "error")
        msg.value = "error existen datos"
      } else {
        msg.value = ''
      }
    })
    .catch(error => {
      swal("Ups, algo salio mal", "Problemas internos con el servidor", "warning")
      // msg.value = "v-Error del servicio al verificar los datos"
    })
}

function regresar() {
  router.push({ name: 'usuarios' })
}

async function guardarProductos() {
  msg.value = ''
  isButtonDisabled.value = true
  //console.log(datosUsuario.value)
  if (datosUsuario.value.password != datosUsuario.value.password2) {
    swal("Ups...", "Las contraseñas no coinciden", "error")
    // msg.value = "ERROR: Las contraseñas son distintas."
    isButtonDisabled.value = false
    //console.log(msg.value)
    return;
  }

  for (var clave in datosUsuario.value) {
    if (datosUsuario.value[clave] == '' && clave != "comentario" && clave != "telefono" && clave != "direccion")
      msg.value += " " + clave + ","
  }
  if (msg.value) {
    msg.value = ''
    swal("Ups, algo salio mal", "Por favor, completa todos los campos requeridos", "warning")
    // msg.value = "ERROR: Campos requeridos->" + msg.value
    isButtonDisabled.value = false
    //console.log(msg.value)
    return;
  }

  await verificarDatosCuenta()
  if (msg.value != '') {
    isButtonDisabled.value = false
    return;
  } else {
    guardarDatos()
    swal("", "Problemas internos con el servidor", "success")
  }

  isButtonDisabled.value = false
}

async function guardarDatos() {
  //console.log("datos del usuario")
  //console.log(JSON.stringify(datosUsuario.value))
  await fetch(`${import.meta.env.VITE_API_V1}/usuario/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosUsuario.value)
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("message")) {
        swal("", "Usuario registrado correctamente", "success")
        // msg.value = data.message
        regresar()
      } else
        swal("Ups, algo salio mal", data.error, "warning")
        // msg.value = data.error
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
                <h2>REGISTRO DE USUARIO</h2>
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
                        <input type="text" id="formCuentaU" class="form-control" v-model="datosUsuario.cuenta" />
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label class="form-label">Contraseña
                              <span style="color: red;">*</span>
                            </label>
                            <div class="input-con-icono">
                              <input :type="showPw === true ? 'text' : 'password'" class="form-control"
                                v-model="datosUsuario.password" />
                              <span class="icon-input" @click="showPw = !showPw">
                                <font-awesome-icon class="password-icon" :icon="['fas', showPw ? 'eye' : 'eye-slash']" />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label class="form-label">Repetir Contraseña
                              <span style="color: red;">*</span>
                            </label>
                            <div class="input-con-icono">
                              <input :type="showPwD === true ? 'text' : 'password'" class="form-control"
                                v-model="datosUsuario.password2" />
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
                            <select id="formRol" class="form-select" v-model="datosUsuario.rol">
                              <option selected value="1">Administrador</option>
                              <option value="2">Inventario</option>
                              <option value="3">Vendedor</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-sm-6">
                          <div class="mb-2">
                            <label for="formEstado" class="form-label">Estado</label>
                            <select id="formEstado" class="form-select" v-model="datosUsuario.estado">
                              <option selected value="1">Habilitado</option>
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
                            <input type="number" id="formDNI" class="form-control" v-model="datosUsuario.dni" />
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
                        <input type="text" class="form-control" v-model="datosUsuario.comentario">
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
                      @click="guardarProductos">Registrar</button>
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
