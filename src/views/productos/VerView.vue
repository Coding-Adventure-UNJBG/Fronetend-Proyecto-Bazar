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
                      <label for="formNombre" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="formNombre" v-model="dataProductos.nombre" disabled>
                    </div>
                    <div class="mb-2">
                      <label for="formMarca" class="form-label">Marca</label>
                      <input type="text" class="form-control" id="formMarca" v-model="dataProductos.marca" disabled>
                    </div>
                    <div class="mb-2">
                      <label for="formMedida" class="form-label">Medida</label>
                      <input type="text" class="form-control" id="formMedida" v-model="dataProductos.medida" disabled>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formUnidad" class="form-label">Tipo de unidad</label>
                          <input type="text" class="form-control" id="formUnidad" v-model="dataProductos.tipo_unidad"
                            disabled>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formCantidad" class="form-label">Cantidad por unidad</label>
                          <input type="number" class="form-control" id="formCantidad"
                            v-model="dataProductos.cantidad_unidad" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formStock" class="form-label">Stock</label>
                          <input type="text" class="form-control" id="formStock" v-model="dataProductos.stock" disabled>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formEstado" class="form-label">Estado</label>
                          <input type="text" class="form-control" id="formEstado" v-model="dataProductos.estado" disabled>
                        </div>
                      </div>
                    </div>

                    <div v-if="msg" class="mb-4 text-center">
                      <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
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
                    <img v-bind:src="dataProductos.foto" alt="" class="img-fluid img-thumbnail"/>
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
