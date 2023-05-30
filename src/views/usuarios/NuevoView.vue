<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const isButtonDisabled = ref(false)
  const msg = ref('')
  const datosUsuario = ref({"id_usuario": "xxx","cuenta": "","password": "","password2": "","rol": "1","dni": "","nombres": "","telefono": "","direccion": "","comentario": "","estado": "1"})

  onMounted(() => {
    obtenerIDCuenta()
  })

  async function obtenerIDCuenta(){
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/obtener/id`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        datosUsuario.value.id_usuario = parseInt(data[0].id, 10) + 1
      })
    .catch(error => {
      msg.value = "Error del servicio al obtener el último ID"
    })
  }

  async function verificarDatosCuenta(){
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/comprobar?cuenta=${datosUsuario.value.cuenta}&dni=${datosUsuario.value.dni}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        if(data.hasOwnProperty("error")){
          msg.value = data.error
          //console.log("1 error")
        }else{
          msg.value = ''
          //console.log("2 error")
        }
      })
    .catch(error => {
      msg.value = "v-Error del servicio al verificar los datos"
    })
  }

  function regresar(){
    router.push({ name: 'usuarios' })
  }

  async function guardarProductos() {
    msg.value = ''
    isButtonDisabled.value = true
    //console.log(datosUsuario.value)
    if(datosUsuario.value.password != datosUsuario.value.password2){
      msg.value = "ERROR: Las contraseñas son distintas."
      isButtonDisabled.value = false
      //console.log(msg.value)
      return;
    }

    for (var clave in datosUsuario.value){
      if(datosUsuario.value[clave] == '' && clave != "comentario")
        msg.value += " "+ clave+","
    }
    if(msg.value){
      msg.value = "ERROR: Campos vacios->" + msg.value
      isButtonDisabled.value = false
      //console.log(msg.value)
      return;
    }

    await verificarDatosCuenta()
    if(msg.value != ''){
      isButtonDisabled.value = false
      //console.log("1t")

      return;
    }else{
      //console.log("2t")
      await obtenerIDCuenta();
      guardarDatos()
    }

    isButtonDisabled.value = false
  }

  async function guardarDatos () {
    //console.log("datos del usuario")
    //console.log(JSON.stringify(datosUsuario.value))
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/`,{
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosUsuario.value)
    })
    .then(response => response.json() )
    .then(data => {
      //console.log(data)
      if(data.hasOwnProperty("message")) {
        msg.value = data.message
        regresar()
      } else
        msg.value = data.error
    })
    .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
  }

</script>

<template>
  <Navegacion />
  <section class="h-100 bg-light">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-3">
          <div class="row g-0 custom-color rounded-3">

            <div class="col-xl-12 text-center py-3">
              <h1 class=" text-center custom-tittle2">Crear Cuenta nueva</h1>
            </div>

            <div class="col-xl-6">
              <div class="card-body px-4 text-black" style="padding:0;">

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formId">Código de Usuario</label>
                  <input type="text" id="formId" class="form-control form-control-lg" v-model="datosUsuario.id_usuario" disabled/>
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formCuentaU">Nombre de Cuenta</label>
                  <input type="text" id="formCuentaU" class="form-control form-control-lg" v-model="datosUsuario.cuenta" />
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formPasswordU">Contraseña</label>
                  <input type="password" id="formPasswordU" class="form-control form-control-lg" v-model="datosUsuario.password"/>
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formPassword2">Repetir Contraseña</label>
                  <input type="password" id="formPassword2" class="form-control form-control-lg" v-model="datosUsuario.password2" />
                </div>

                <div class="form-outline mb-2">
                  <label for="formRol" class="form-label custom-tittle2">Rol o Puesto</label>
                    <select id="formRol" class="form-select" v-model="datosUsuario.rol">
                      <option selected value="1">Admin</option>
                      <option value="2">Inventario</option>
                      <option value="3">Vendedor</option>
                      <option value="4">Reporte</option>
                    </select>
                </div>

              </div>
            </div>

            <div class="col-xl-6">
              <div class="card-body px-4 text-black" style="padding:0;">

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formDNI">DNI</label>
                  <input type="text" id="formDNI" class="form-control form-control-lg" v-model="datosUsuario.dni"/>
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formNombres">Nombres</label>
                  <input type="text" id="formNombres" class="form-control form-control-lg" v-model="datosUsuario.nombres" />
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formTelefono">Teléfono</label>
                  <input type="text" id="formTelefono" class="form-control form-control-lg" v-model="datosUsuario.telefono" />
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formDirecc">Dirección</label>
                  <input type="text" id="formDirecc" class="form-control form-control-lg" v-model="datosUsuario.direccion" />
                </div>

                <div class="form-outline mb-2">
                  <label for="formEstado" class="form-label custom-tittle2">Estado</label>
                    <select id="formEstado" class="form-select" v-model="datosUsuario.estado">
                      <option selected value="1">Habilitado</option>
                      <option value="2">Deshabilitado</option>
                    </select>
                </div>

              </div>
            </div>

            <div class="col-xl-12 text-center py-2">
              <div v-if="msg" class="form-outline px-4 text-center">
                <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
              </div>
              <div class="d-flex justify-content-center">
                <button  type="button" class="btn btn-primary custom-btn-color2" id="inputbuscar" :disabled="isButtonDisabled" @click="guardarProductos">Crear</button>
                <button  type="button" class="btn btn-primary custom-btn-color2" id="inputbuscar" @click="regresar">Cancelar</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style setup>
.custom-color{
  background-color: var(--text-color-tittle);
}
</style>
