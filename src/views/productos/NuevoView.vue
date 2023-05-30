<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { ref } from 'vue'
import { useRouter } from 'vue-router';

  const router = useRouter()
  const isButtonDisabled = ref(false)
  const imagen = ref('/src/assets/test.png')
  const fileInput = ref('')
  const msg = ref('')
  const datosProducto = ref({"nombre":"","medida":"","marca":"","tipo_unidad":2,"cantidad_unidad":1,"foto":""})

  function filechange(archivo) {
    fileInput.value = archivo.target.files[0]
    imagen.value = URL.createObjectURL(fileInput.value)
    console.log(fileInput.value)
  }
  function cancelar(){
    router.push({ name: 'productos' })
  }

  async function guardarProductos() {
    isButtonDisabled.value = true
    const unixTimestamp = Date.now();
    //console.log(unixTimestamp)
    if(fileInput.value){// solo guardaremos una imagen si el usuario intenta cargar una
      console.log(fileInput.value.type.split('.').pop() )
      datosProducto.value.foto = fileInput.value.type.split('.').pop()
      datosProducto.value.foto = `${import.meta.env.VITE_API}/photos/op-producto-${unixTimestamp}.${datosProducto.value.foto}`
      await guardarImagen(unixTimestamp)
    }

    console.log(datosProducto.value)
    await guardarDatos()
    isButtonDisabled.value = false
  }

  async function guardarDatos () {
    console.log("datos del producto")
    console.log(JSON.stringify(datosProducto.value))
    await fetch(import.meta.env.VITE_API_V1+`/producto/`,{
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosProducto.value)
    })
    .then(response => response.json() )
    .then(data => {
      console.log(data)
      if(data.hasOwnProperty("message")) {
        msg.value = data.message
        router.push({ name: 'productos' })
      } else
        msg.value = data.error
    })
    .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
  }

  async function guardarImagen(unixTimestamp) {
    console.log("guardando imagen del producto")

    const formData = new FormData();
    console.log(fileInput.value)
    formData.append('imagen', fileInput.value);

    console.log(formData)
    await fetch(import.meta.env.VITE_API_V1+`/producto/imagen?unixTimestamp=${unixTimestamp}`,{
    method: 'POST',
    body: formData,
    })
    .then(response => response.json() )
    .then(data => {
      console.log(data)
    })
    .catch((error) => {
        // Manejar el error de carga de la imagen
        console.error('Error al cargar la imagen:', error);
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
          <div class="row g-0">
            <div class="col-xl-7">
              <div class="card-body p-md-4 text-black">
                <h3 class="mb-5 text-center custom-tittle">Nuevo Producto</h3>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formNombre">Nombre</label>
                  <input type="text" id="formNombre" class="form-control form-control-lg" v-model="datosProducto.nombre" />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formMarca">Marca</label>
                  <input type="text" id="formMarca" class="form-control form-control-lg" v-model="datosProducto.marca"/>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formMedida" class="form-label custom-tittle">Medida</label>
                  <input type="text" id="formMedida" class="form-control form-control-lg" v-model="datosProducto.medida"/>
                  </div>
                  <div class="col-md-6">
                    <label for="formImg" class="form-label custom-tittle">Imagen del Producto</label>
                    <input type="file" class="form-control" id="formImg" accept=".jpg, .png" @change="filechange">
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo Unidad</label>
                    <select id="formUnidad" class="form-select" v-model="datosProducto.tipo_unidad">
                      <option selected value="2">Unidad</option>
                      <option value="1">Paquete</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="formCantidad" class="form-label custom-tittle">Cantidad x Unidad</label>
                    <input type="number" class="form-control" id="formCantidad" min="1" max="350" step="1" v-model="datosProducto.cantidad_unidad">
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formStock" class="form-label custom-tittle">Stock</label>
                    <input type="text" class="form-control" id="formStock" value="0" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formEstado" class="form-label custom-tittle">Estado</label>
                    <input type="text" class="form-control" id="formEstado" value="no-disponible" disabled>
                  </div>
                </div>

                <div v-if="msg" class="form-outline mb-4 text-center">
                  <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                </div>

                <div class="d-flex justify-content-center pt-3">
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" :disabled="isButtonDisabled" @click="guardarProductos">Guardar</button>
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar" @click="cancelar">Cancelar</button>
                </div>

              </div>
            </div>
            <div class="col-xl-5 card-body p-md-5 d-flex justify-content-center align-items-center">
              <img v-bind:src="imagen"
                alt="" class="img-fluid img-thumbnail"
                style="background-color:gray; border-radius: 3rem; width: 100%" />
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
