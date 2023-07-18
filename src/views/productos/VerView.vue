<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRoute()
const rutas = useRouter()
const limite = ref('')
const dataProductos = ref({ "id_producto": "", "nombre": "", "marca": "", "unidad": "", "estado": "", "stock": "", "foto": "", "comentario": "" })
const msg = ref('')

onMounted(() => {
  cargarData()
  totalProductos()
})

function cargarData() {
  const pId = router.params.id;
  fetch(`${import.meta.env.VITE_API_V1}/producto/${pId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        console.log(data)
        dataProductos.value = data[0]
        console.log(dataProductos.value)
        msg.value = ''
        if (dataProductos.value.foto == '')
          dataProductos.value.foto = 'http://localhost:3000/photos/test.png'
      }
    })
    .catch(error => {
      msg.value = data.error
    }
    )
}

async function totalProductos() {
  await fetch(`${import.meta.env.VITE_API_V1}/producto/obtener/id`, {
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

function regresar() {
  rutas.push({ name: 'productos' })
}

function siguienteProducto() {
  const tempId = parseInt(router.params.id)
  if (tempId < limite.value) {
    const pId = tempId + 1
    router.params.id = pId
    cargarData()
    rutas.replace({ name: 'productover', params: { id: pId } })
  }
}

function anteriorProducto() {
  const tempId = parseInt(router.params.id);
  if (tempId > 1) {
    const pId = tempId - 1;
    router.params.id = pId;
    cargarData();
    rutas.replace({ name: 'productover', params: { id: pId } })
  }
}

</script>

<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="row">
              <div class="col-md-7">
                <div class="card-body">
                  <div class="text__principal">
                    <h2>DETALLES DEL PRODUCTO (#{{ $route.params.id }})</h2>
                  </div>
                  <form>
                    <div class="mb-2">
                      <label class="form-label">Nombre</label>
                      <input type="text" class="form-control" v-model="dataProductos.nombre" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Marca</label>
                      <input type="text" class="form-control" v-model="dataProductos.marca" disabled>
                    </div>
                    <div class="mb-2">
                      <label class="form-label">Unidad</label>
                      <input type="text" class="form-control" v-model="dataProductos.unidad" disabled>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label class="form-label">Stock</label>
                          <input type="text" class="form-control" v-model="dataProductos.stock" disabled>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label class="form-label">Estado</label>
                          <input type="text" class="form-control" v-model="dataProductos.estado" disabled>
                        </div>
                      </div>
                    </div>

                    <div class="mb-2">
                      <label class="form-label">Comentario</label>
                      <textarea class="form-control" rows="1" style="max-height: 90px;"
                        v-model="dataProductos.comentario" disabled></textarea>
                    </div>

                    <div class="mb-2 mt-3">
                      <div v-if="msg" class="form-control alert alert-danger text-center fw-bold" role="alert">
                        {{ msg }}
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mt-3">
                      <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                        @click="regresar">Regresar</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5">
                <div class="card-body">
                  <h5 class="mb-4 mt-4 text-center">Imagen del producto</h5>
                  <div class="image__product">
                    <img v-bind:src="dataProductos.foto" alt="" class="img-fluid img-thumbnail" />
                  </div>

                  <div class="d-flex justify-content-center pt-4 mb-2">
                    <button type="button" class="btn btn-primary me-3" @click="anteriorProducto">
                      <font-awesome-icon :icon="['fas', 'circle-left']" />&nbsp;&nbsp;Anterior
                    </button>
                    <button type="button" class="btn btn-primary" @click="siguienteProducto">
                      Siguiente&nbsp;
                      <font-awesome-icon :icon="['fas', 'circle-right']" />
                    </button>
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
