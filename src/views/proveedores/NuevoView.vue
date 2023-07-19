<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';
import swal from 'sweetalert';

const router = useRouter()
const msg = ref('')
const isButtonDisabled = ref(false)
const datosProveedor = ref({ "id_proveedor": "xxx", "nombre": "", "ruc": "", "razon_social": "", "direccion": "", "comentario": "" })

onMounted(() => {
  obtenerIdProveedor()
})

async function obtenerIdProveedor() {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor/obtener/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      datosProveedor.value.id_proveedor = parseInt(data[0].id, 10) + 1
    })
    .catch(error => {
      swal("Ups, algo salio mal", "Problemas internos con el servidor al obtener el último ID", "warning")
      // msg.value = "Error del servicio al obtener el último ID"
    })
}

 async function validarRUC() {
    await fetch(`${import.meta.env.VITE_API_V1}/proveedor/comprobar?id_proveedor=${datosProveedor.value.id_proveedor}&ruc=${datosProveedor.value.ruc}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.hasOwnProperty("error")) {
          swal("Ups, algo salio mal", data.error, "error")
          msg.value = data.error
        } else {
          msg.value = ''
        }
      })
      .catch(error => {
        swal("Ups, algo salio mal", "Problemas internos con el servidor", "warning")
        // msg.value = "v-Error del servicio al verificar los datos"
      })
}

async function registrarProveedor() {
  msg.value = ''
  isButtonDisabled.value = true

  for (var clave in datosProveedor.value) {
    if (datosProveedor.value[clave] == '' && clave != "comentario" && clave != "razon_social" && clave != "direccion") {
      msg.value += " " + clave + ","
    }
  }
  if (msg.value) {
    msg.value = ''
    swal("Ups, algo salio mal", "Por favor, completa todos los campos requeridos", "warning")
    // msg.value = "Error: campos requeridos -> " + msg.value
    isButtonDisabled.value = false
    return
  }

  if (((datosProveedor.value.ruc).toString()).length != 11) {
    swal("Ups, algo salio mal", "El RUC debe contener 11 dígitos", "error")
    // msg.value = 'El RUC debe contener 11 dígitos'
    isButtonDisabled.value = false
    return
  } else{
    await validarRUC()
    if (msg.value != ''){
      isButtonDisabled.value = false
      return
    } 
  }

  await insertarProveedor()
  isButtonDisabled.value = false
}

async function insertarProveedor() {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosProveedor.value)
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        swal("", "Proveedor registrado correctamente", "success")
        // msg.value = data.message
        cancelar()
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

function cancelar() {
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
                <h2>REGISTRO DE PROVEEDOR</h2>
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
                      <label class="form-label">RUC
                        <span style="color: red;">*</span>
                      </label>
                      <input type="number" class="form-control" v-model="datosProveedor.ruc" />
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label">Nombre de proveedor
                    <span style="color: red;">*</span>
                  </label>
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
                <div class="mb-2">
                  <label class="form-label">Comentario</label>
                  <textarea class="form-control" rows="1" style="max-height: 90px;"
                    v-model="datosProveedor.comentario"></textarea>
                </div>
              </form>
              <div class="col-md-12">
                <!-- <div v-if="msg" class="alert alert-danger" role="alert">
                  {{ msg }}
                </div> -->
                <div class="d-flex justify-content-center mt-3">
                  <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                    @click="registrarProveedor">Registrar</button>
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