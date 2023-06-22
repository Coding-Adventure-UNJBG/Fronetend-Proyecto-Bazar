<script setup>
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRoute()
const rutas = useRouter()

const dataProductos = ref({ "id_producto": "0", "nombre": "", "medida": "", "marca": "", "tipo_unidad": "", "cantidad_unidad": "", "foto": "" })
const msg = ref('')

onMounted(() => {
  cargarData()
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

function regresar() {
  rutas.push({ name: 'productos' })
}

function siguienteProducto() {
  const pId = parseInt(router.params.id) + 1
  router.params.id = parseInt(router.params.id) + 1;
  cargarData()
  rutas.replace({ name: 'productover', params: { id: pId } })
}

function anteriorProducto() {
  // const pId = parseInt(router.params.id) - 1
  // router.params.id = parseInt(router.params.id) - 1;
  // cargarData()
  // rutas.replace({ name: 'productover', params: { id: pId } })
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

  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="w-personalizado mx-auto">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <div class="card shadow" style="margin-bottom: 4%;">
        <div class="row g-0">
          <div class="col-xl-7">
            <div class="card-body">
              <h3 class="mb-4 mt-4 text-center custom-tittle">Vista de los Datos del Producto: {{ $route.params.id }}
              </h3>
              <form>
                <div class="mb-3">
                  <label for="formNombre" class="form-label custom-tittle">Nombre</label>
                  <input type="text" class="form-control" id="formNombre" v-model="dataProductos.nombre" disabled>
                </div>
                <div class="mb-3">
                  <label for="formMarca" class="form-label custom-tittle">Marca</label>
                <input type="text" class="form-control" id="formMarca" v-model="dataProductos.marca" disabled>
              </div>
              <div class="mb-3">
                  <label for="formMedida" class="form-label custom-tittle">Medida</label>
                  <input type="text" class="form-control" id="formMedida" v-model="dataProductos.medida" disabled>
                </div>

                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo de unidad</label>
                    <input type="text" class="form-control" id="formUnidad" v-model="dataProductos.tipo_unidad" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formCantidad" class="form-label custom-tittle">Cantidad por unidad</label>
                    <input type="text" class="form-control" id="formCantidad" v-model="dataProductos.cantidad_unidad"
                      disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="formStock" class="form-label custom-tittle">Stock</label>
                    <input type="text" class="form-control" id="formStock" v-model="dataProductos.stock" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formEstado" class="form-label custom-tittle">Estado</label>
                    <input type="text" class="form-control" id="formEstado" v-model="dataProductos.estado" disabled>
                  </div>
                </div>

                <div v-if="msg" class="mb-4 text-center">
                  <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                </div>

                <div class="d-flex justify-content-center pt-2 mb-2">
                  <button type="button" class="btn btn-primary" @click="regresar">Regresar</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-xl-5">
            <div class="card-body">
              <h3 class="mb-4 mt-4 text-center custom-tittle">Imagen del producto</h3>
              <div class="d-flex justify-content-center align-content-center">
                <img v-bind:src="dataProductos.foto" alt="" class="img-fluid img-thumbnail image-custom" />

              </div>

              <div class="d-flex justify-content-center pt-4 mb-2">
                <div @keydown.left="anteriorProducto" @keydown.right="siguienteProducto">
                  <button type="button" class="btn btn-primary me-3" @click="anteriorProducto">
                    <font-awesome-icon :icon="['fas', 'circle-left']" />&nbsp;&nbsp;Anterior
                  </button>
                  <button type="button" class="btn btn-primary" @click="siguienteProducto">
                    Siguiente&nbsp;
                    <font-awesome-icon :icon="['fas', 'circle-right']" />
                  </button>
                </div>

                <!-- <button type="button" class="btn btn-primary me-3" @click="anteriorProducto">
                    <font-awesome-icon :icon="['fas', 'circle-left']" />&nbsp;&nbsp;Anterior</button>
                  <button type="button" class="btn btn-primary" @click="siguienteProducto">Siguiente&nbsp;
                    <font-awesome-icon :icon="['fas', 'circle-right']" /></button> -->
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-custom {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  transform: translate3d(0, -8px, 0);
  /* border-color: gray; border: 2rem; border-radius: 2rem;  */
  border-radius: 2rem;
  width: 80%;
}

.custom-text {
  color: blue;
  font-weight: bold;
}

@media (max-width: 768px) {
  .w-personalizado {
    width: 100%;
  }
}

/* Ancho al 75% para vista no movil */
@media (min-width: 769px) {
  .w-personalizado {
    width: 85%;
  }
}
</style>
