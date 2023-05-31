<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter()
  const params = useRoute()
  const isButtonDisabled = ref(false)
  const imagen = ref('/src/assets/test.png')
  const fileInput = ref('')
  const msg = ref('')
  const datosProducto = ref({"id_producto":"0","nombre":"","medida":"","marca":"","tipo_unidad":"","cantidad_unidad":"","foto":""})

  onMounted(() => {
    cargarData()
  })

  function cargarData(){
    const pId = params.params.id;
    fetch(`${import.meta.env.VITE_API_V1}/producto/${pId}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if(data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        //console.log(data)
        datosProducto.value = data[0];

        if(datosProducto.value.tipo_unidad == 'unidad')
          datosProducto.value.tipo_unidad = 2
        else
        datosProducto.value.tipo_unidad = 1

        if(datosProducto.value.foto == ''){
          datosProducto.value.foto = 'http://localhost:3000/photos/test.png';
          imagen.value = datosProducto.value.foto;
        } else {
          imagen.value = datosProducto.value.foto;
        }
        msg.value = ''
      }
    })
    .catch(error => {
        msg.value = "problemas con el servidor"
      }
    )
  }

  function filechange(archivo) {
    fileInput.value = archivo.target.files[0]
    imagen.value = URL.createObjectURL(fileInput.value)
    console.log(fileInput.value)
    console.log(fileInput.value.name.split('.').pop() )
  }

  function cancelar(){
    router.push({ name: 'productos' })
  }

  async function guardarProductos() {
    isButtonDisabled.value = true
    const unixTimestamp = Date.now();
    //console.log(unixTimestamp)
    if(fileInput.value){// solo guardaremos una imagen si el usuario intenta cargar una
      console.log(fileInput.value.name.split('.').pop() )
      datosProducto.value.foto = fileInput.value.name.split('.').pop()
      datosProducto.value.foto = `${import.meta.env.VITE_API}/photos/op-producto-${unixTimestamp}.${datosProducto.value.foto}`
      console.log(datosProducto.value.foto)
      await guardarImagen(unixTimestamp)
    }

    //console.log(datosProducto.value)
    await guardarDatos()
    isButtonDisabled.value = false
  }

  async function guardarDatos () {
    await fetch(`${import.meta.env.VITE_API_V1}/producto/${datosProducto.value.id_producto}`,{
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosProducto.value)
    })
    .then(response => response.json() )
    .then(data => {
      //console.log(data)
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
    //console.log("guardando imagen del producto")

    const formData = new FormData();
    //console.log(fileInput.value)
    formData.append('imagen', fileInput.value);

    //console.log(formData)
    await fetch(import.meta.env.VITE_API_V1+`/producto/imagen?unixTimestamp=${unixTimestamp}`,{
    method: 'POST',
    body: formData,
    })
    .then(response => response.json() )
    .then(data => {
      //console.log(data)
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

  <div class="container-fluid d-flex justify-content-center align-items-center">
    <div class="w-personalizado mx-auto">
      <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <div class="card shadow" style="margin-bottom: 40px;">
        <div class="row g-0">
          <div class="col-xl-7">
            <div class="card-body">
              <h3 class="mb-4 mt-4 text-center custom-tittle">Actualizar Datos del Producto: {{ $route.params.id }}</h3>
              <form>
                <div class="mb-3">
                  <label for="formNombre" class="form-label custom-tittle">Nombre</label>
                  <input type="text" class="form-control" id="formNombre" v-model="datosProducto.nombre">
                </div>
                <div class="mb-3">
                  <label for="formMarca" class="form-label custom-tittle">Marca</label>
                  <input type="text" class="form-control" id="formMarca" v-model="datosProducto.marca">
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="formMedida" class="form-label custom-tittle">Medida</label>
                    <input type="text" class="form-control" id="formMedida" v-model="datosProducto.medida">
                  </div>
                  <div class="col-md-6">
                    <label for="formImg" class="form-label custom-tittle">Subir imagen</label>
                    <input type="file" class="form-control" id="formImg" accept=".jpg, .png" @change="filechange">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo de unidad</label>
                    <select class="form-select" id="formUnidad" v-model="datosProducto.tipo_unidad">
                      <option value="2">Unidad</option>
                      <option value="1">Paquete</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="formCantidad" class="form-label custom-tittle">Cantidad por unidad</label>
                    <input type="number" class="form-control" id="formCantidad" min="1" max="350" step="1"
                      v-model="datosProducto.cantidad_unidad">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="formStock" class="form-label custom-tittle">Stock</label>
                    <input type="text" class="form-control" id="formStock" v-model="datosProducto.stock" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="formEstado" class="form-label custom-tittle">Estado</label>
                    <input type="text" class="form-control" id="formEstado" v-model="datosProducto.estado" disabled>
                  </div>
                </div>

                <div v-if="msg" class="mb-4 text-center">
                  <h5 class="text-black bg-info fw-bold p-2"> {{ msg }}</h5>
                </div>

                <div class="d-flex justify-content-center pt-2 mb-2">
                  <button type="button" class="btn btn-primary me-3" :disabled="isButtonDisabled"
                    @click="guardarProductos">Guardar</button>
                  <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-xl-5 pt-4 card-body d-flex justify-content-center align-items-center">
            <img v-bind:src="imagen" alt="" class="img-fluid img-thumbnail image-custom" />
          </div>
        </div>
      </div>
    </div>
  </div>  
  </template>

  <style>

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
