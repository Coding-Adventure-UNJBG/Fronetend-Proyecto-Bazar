<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRoute()
  const rutas = useRouter()

  const dataProductos = ref({"id_producto":"0","nombre":"","medida":"","marca":"","tipo_unidad":"","cantidad_unidad":"","foto":""})
  const msg = ref('')

  onMounted(() => {
    cargarData()
  })

  function cargarData(){
    const pId = router.params.id;
    fetch(`${import.meta.env.VITE_API_V1}/producto/${pId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if(data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        console.log(data)
        dataProductos.value = data[0]
        console.log(dataProductos.value)
        msg.value = ''
        if(dataProductos.value.foto == '')
          dataProductos.value.foto = 'http://localhost:3000/photos/test.png'
      }
    })
    .catch(error => {
        msg.value = data.error
      }
    )
  }

  function regresar(){
    rutas.push({ name: 'productos' })
  }

  function siguienteProducto() {
    const pId = parseInt(router.params.id) + 1
    router.params.id = parseInt(router.params.id) + 1;
    cargarData()
    rutas.replace({ name: 'productover', params: {id: pId} })
  }

  function anteriorProducto() {
    const pId = parseInt(router.params.id) - 1
    router.params.id = parseInt(router.params.id) - 1;
    cargarData()
    rutas.replace({ name: 'productover', params: {id: pId} })
  }

</script>

<template>
  <Navegacion />
  <section class="h-100 bg-light">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-3">
          <div class="row g-0">
            <div class="col-xl-7">
              <div class="card-body p-md-4 text-black">
                <h3 class="mb-5 text-center custom-tittle">Vista de los Datos del Producto : {{ $route.params.id }}</h3>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formNombre">Nombre {{ dataProductos.nombre }}</label>
                  <input type="text" id="formNombre" class="form-control form-control-lg" v-model="dataProductos.nombre" disabled/>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formMarca">Marca</label>
                  <input type="text" id="formMarca" class="form-control form-control-lg" v-model="dataProductos.marca" disabled />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formMedida">Medida</label>
                  <input type="text" id="formMedida" class="form-control form-control-lg" v-model="dataProductos.medida" disabled/>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo Unidad</label>
                    <input type="text" id="formUnidad" class="form-control" v-model="dataProductos.tipo_unidad" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formCantidad" class="form-label custom-tittle">Cantidad x Unidad</label>
                    <input type="number" class="form-control" id="formCantidad" v-model="dataProductos.cantidad_unidad" disabled>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formStock" class="form-label custom-tittle">Stock</label>
                    <input type="text" class="form-control" id="formStock" v-model="dataProductos.stock" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formEstado" class="form-label custom-tittle">Estado</label>
                    <input type="text" class="form-control" id="formEstado" v-model="dataProductos.estado" disabled>
                  </div>
                </div>

                <div v-if="msg != ''" class="form-outline mb-4 text-center">
                  <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                </div>

                <div class="d-flex justify-content-center pt-3">
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" @click="regresar">Regresar</button>
                </div>

              </div>
            </div>
            <div class="col-xl-5 card-body p-md-1 d-flex justify-content-center align-items-center">
              <div class="card-body p-md-4 text-black">
                <h3 class="mb-5 text-center custom-tittle">Imagen del Producto</h3>

                <div class="card-body d-flex justify-content-center align-items-center">
                  <img v-bind:src="dataProductos.foto"
                    alt="" class="img-fluid img-thumbnail"
                    style="background-color:gray; border-radius: 3rem; width: 100%" />
                </div>

                <div class="d-flex justify-content-center pt-3">
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" @click="anteriorProducto">
                    <font-awesome-icon :icon="['fas', 'circle-left']" />
                    Anterior
                  </button>
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" @click="siguienteProducto">
                    Siguiente
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
</section>
  </template>

  <style>
  </style>
