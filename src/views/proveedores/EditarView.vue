<script setup>
import { useRoute, useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';

const router = useRouter()
const params = useRoute()
const isButtonDisabled = ref(false)
const msg = ref('')
const datosProveedor = ref({ "id_proveedor": "", "nombre": "", "ruc": "", "razon_social": "", "direccion": "", "estado": "", "fecha_registro": "", "comentario": ""})

onMounted(() => {
    cargarData()
})

async function cargarData(){
    const uId = params.params.id
    await fetch(`${import.meta.env.VITE_API_V1}/proveedor/${uId}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        datosProveedor.value = data[0]
        console.log(datosProveedor.value)
    })
    .catch(error => {
      msg.value = "Problemas con el servidor"
    })
}

async function validarRUC() {
    await fetch(`${import.meta.env.VITE_API_V1}/proveedor/comprobar?id_proveedor=${datosProveedor.value.id_proveedor}&ruc=${datosProveedor.value.ruc}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data.hasOwnProperty("error")) {
          msg.value = data.error
          //console.log("1 error")
        } else {
          msg.value = ''
          //console.log("2 error")
        }
      })
      .catch(error => {
        msg.value = "Error del servicio al verificar los datos"
      })
}

async function preUpdateProveedor() {
  console.log(datosProveedor.value)
    msg.value = ''
    isButtonDisabled.value = true

    if ((datosProveedor.value.ruc).toString().length != 11){
        msg.value = 'El RUC debe contener 11 dígitos'
        isButtonDisabled.value = false
        return
    } else{
      await validarRUC()
      if (msg.value != ''){
          isButtonDisabled.value = false
          return
      }

    }

    for (var clave in datosProveedor.value) {
        if (datosProveedor.value[clave] == '' && clave != "comentario" && clave != "razon_social" && clave != "direccion" ){
            msg.value += " " + clave + ","
        }
    }
    if (msg.value){
        msg.value = "Error: campos requeridos -> " + msg.value
        isButtonDisabled.value = false
        return
    } else {

      await updateProveedor()
      isButtonDisabled.value = false
    }
  }

async function updateProveedor() {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosProveedor.value)
  })  
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        msg.value = data.message
        cancelar()
      } else{
        msg.value = data.error
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al actualizar los datos"
    })
}


function cancelar(){
    router.push({ name: 'proveedores' })
}

</script>

<template>
    <Navegacion />

    <div class="container__secondary">
    <div class="vista-secondary">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-body">
              <div class="text__principal">
                <h2>EDITAR PROVEEDOR</h2>
              </div>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-2">
                      <label class="form-label">Codigo de Proveedor</label>
                      <input type="text" class="form-control" v-model="datosProveedor.id_proveedor" disabled />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-2">
                      <label class="form-label">RUC</label>
                      <input type="number" class="form-control" v-model="datosProveedor.ruc" />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label">Nombre de proveedor</label>
                  <input type="text" class="form-control" v-model="datosProveedor.nombre" />
                </div>
                <div class="mb-2">
                  <label class="form-label">Razon social</label>
                  <input type="text" class="form-control" v-model="datosProveedor.razon_social" />
                </div>
                <div class="mb-2">
                  <label class="form-label">Dirección</label>
                  <input type="text" class="form-control" v-model="datosProveedor.direccion" />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-2">
                      <label class="form-label">Estado</label>
                      <input type="text" class="form-control" v-model="datosProveedor.estado" disabled />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-2">
                      <label class="form-label">Fecha de registro</label>
                      <input type="text" class="form-control" v-model="datosProveedor.fecha_registro" disabled />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label">Comentario</label>
                  <textarea class="form-control" rows="1" style="max-height: 90px;"
                    v-model="datosProveedor.comentario"></textarea>
                </div>
              </form>
              <div class="col-md-12">
                <div v-if="msg" class="alert alert-danger" role="alert">
                  {{ msg }}
                </div>
                <!-- <div v-if="msg" class="form-outline px-4 text-center">
                  <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                </div> -->
                <div class="d-flex justify-content-center mt-3">
                  <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                    @click="preUpdateProveedor">Guardar</button>
                  <button type="button" class="btn btn-primary mx-2" @click="cancelar">Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>