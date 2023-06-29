<script setup>
import { useRoute, useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';

const router = useRoute()
const rutas = useRouter()
const msg = ref('')
const limite = ref('')
const datosProveedor = ref({ "id_proveedor": "", "nombre": "", "ruc": "", "razon_social": "", "direccion": "", "estado": "", "fecha_registro": "", "comentario": ""})

onMounted(() => {
    cargarData()
    totalProveedor()
})

async function totalProveedor() {
  await fetch(`${import.meta.env.VITE_API_V1}/proveedor/obtener/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
        limite.value = parseInt(data[0].id, 10)
        // console.log(limite.value)
    })
    .catch(error => {
      msg.value = "Error del servicio al obtener el último ID"
    })
}

async function cargarData(){
    const pId = router.params.id
    await fetch(`${import.meta.env.VITE_API_V1}/proveedor/${pId}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty("error")) {
            msg.value = data.error
        } else {
            datosProveedor.value = data[0]
            console.log(datosProveedor.value)
            msg.value = ''
        }
    })
    .catch(error => {
      msg.value = "Problemas con el servidor"
    })
}

function siguiente() {
    const tempId = parseInt(router.params.id)
    if (tempId < limite.value) {
        const pId = tempId + 1
        router.params.id = pId
        cargarData()
        rutas.replace({ name: 'proveedorver', params: { id: pId }})
    }
}

function anterior(uId) {
    const tempId = parseInt(router.params.id)
    if (tempId > 1) {
        const pId = tempId - 1
        router.params.id = pId
        cargarData()
        rutas.replace({ name: 'proveedorver', params: { id: pId }})
    }
}

function volver(){
    rutas.push({ name: 'proveedores' })
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
                <h2>VER PROVEEDOR</h2>
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
                      <input type="text" class="form-control" v-model="datosProveedor.ruc" disabled/>
                    </div>
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label">Nombre de proveedor</label>
                  <input type="text" class="form-control" v-model="datosProveedor.nombre" disabled/>
                </div>
                <div class="mb-2">
                  <label class="form-label">Razon social</label>
                  <input type="text" class="form-control" v-model="datosProveedor.razon_social" disabled/>
                </div>
                <div class="mb-2">
                  <label class="form-label">Dirección</label>
                  <input type="text" class="form-control" v-model="datosProveedor.direccion" disabled/>
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
                    v-model="datosProveedor.comentario" disabled></textarea>
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
                  <button type="button" class="btn btn-primary mx-2"
                    @click="anterior">Anterior</button>
                    <button type="button" class="btn btn-secondary mx-2" @click="volver">volver</button>
                    <button type="button" class="btn btn-primary mx-2"
                      @click="siguiente">Siguiente</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>