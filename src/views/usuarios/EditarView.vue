<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter()
  const params = useRoute()
  const isButtonDisabled = ref(false)
  const msg = ref('')
  const datosUsuario = ref({"id_usuario": "","cuenta": "","password": "","id_rol": "","dni": "","nombres": "","telefono": "","direccion": "", "estado": ""})

  onMounted(() => {
    cargarData()
  })

  async function cargarData(){
    const uId = params.params.id;
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/${uId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        datosUsuario.value = data[0];
        //console.log(datosUsuario.value)
        if(datosUsuario.value.estado == "deshabilitado")
          datosUsuario.value.estado = 2
        else
          datosUsuario.value.estado = 1
      })
    .catch(error => {
      msg.value = "problemas con el servidor"
    })
  }

  function regresar(){
    router.push({ name: 'usuarios' })
  }

  async function guardarDatosUsuario() {
    msg.value = ''
    isButtonDisabled.value = true
    //console.log(datosUsuario.value)

    for (var clave in datosUsuario.value){
      if(datosUsuario.value[clave] == '' && clave != "comentario")
        msg.value += " "+ clave+","
    }
    if(msg.value){
      msg.value = "ERROR: Campos vacios->" + msg.value
      isButtonDisabled.value = false
      //console.log(msg.value)
      return;
    }else{
      guardarDatos()
      isButtonDisabled.value = false
    }
  }

  async function guardarDatos() {
    await fetch(`${import.meta.env.VITE_API_V1}/usuario/`,{
    method: 'PATCH',
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
              <h1 class=" text-center custom-tittle2">Editar Cuenta de Usuario</h1>
            </div>

            <div class="col-xl-6">
              <div class="card-body px-4 text-black" style="padding:0;">

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formId">Código de Usuario</label>
                  <input type="text" id="formId" class="form-control form-control-lg" v-model="datosUsuario.id_usuario" disabled/>
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formCuentaU">Nombre de Cuenta</label>
                  <input type="text" id="formCuentaU" class="form-control form-control-lg" v-model="datosUsuario.cuenta" disabled />
                </div>

                <div class="form-outline mb-2">
                  <label class="form-label custom-tittle2" for="formPasswordU">Contraseña</label>
                  <input type="password" id="formPasswordU" class="form-control form-control-lg" v-model="datosUsuario.password"/>
                </div>

                <div class="form-outline mb-2">
                  <label for="formRol" class="form-label custom-tittle2">Rol o Puesto</label>
                    <select id="formRol" class="form-select" v-model="datosUsuario.id_rol">
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
                  <input type="text" id="formDNI" class="form-control form-control-lg" v-model="datosUsuario.dni" disabled/>
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
                <button  type="button" class="btn btn-primary custom-btn-color2" id="inputbuscar" :disabled="isButtonDisabled" @click="guardarDatosUsuario">Guardar</button>
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
