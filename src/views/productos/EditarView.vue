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
const datosProducto = ref({ "id_producto": "", "nombre": "", "marca": "", "unidad": "", "estado": "", "stock": "", "foto": "", "comentario": "" })

onMounted(() => {
  cargarData()
})

function cargarData() {
  const pId = params.params.id;
  fetch(`${import.meta.env.VITE_API_V1}/producto/${pId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        //console.log(data)
        datosProducto.value = data[0];

        if (datosProducto.value.tipo_unidad == 'unidad')
          datosProducto.value.tipo_unidad = 2
        else
          datosProducto.value.tipo_unidad = 1

        if (datosProducto.value.foto == '') {
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
  // console.log(fileInput.value)
  // console.log(fileInput.value.name.split('.').pop())
}

function cancelar() {
  router.push({ name: 'productos' })
}

async function guardarProductos() {
  isButtonDisabled.value = true
  const unixTimestamp = Date.now();
  //console.log(unixTimestamp)
  if (fileInput.value) {// solo guardaremos una imagen si el usuario intenta cargar una
    // console.log(fileInput.value.name.split('.').pop())
    datosProducto.value.foto = fileInput.value.name.split('.').pop()
    datosProducto.value.foto = `${import.meta.env.VITE_API}/photos/op-producto-${unixTimestamp}.${datosProducto.value.foto}`
    // console.log(datosProducto.value.foto)
    await guardarImagen(unixTimestamp)
  }

  //console.log(datosProducto.value)
  await guardarDatos()
  isButtonDisabled.value = false
}

async function guardarDatos() {
  await fetch(`${import.meta.env.VITE_API_V1}/producto/${datosProducto.value.id_producto}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosProducto.value)
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("message")) {
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
  await fetch(import.meta.env.VITE_API_V1 + `/producto/imagen?unixTimestamp=${unixTimestamp}`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
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

  <div class="container__principal">
    <div class="vista-principal">
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="row">
              <div class="col-md-7">
                <div class="card-body">
                  <div class="text__principal">
                    <h2>EDITAR PRODUCTO (#{{ $route.params.id }})</h2>
                  </div>
                  <form>
                    <div class="mb-2">
                      <label for="formNombre" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="formNombre" v-model="datosProducto.nombre">
                    </div>
                    <div class="mb-2">
                      <label for="formMarca" class="form-label">Marca</label>
                      <input type="text" class="form-control" id="formMarca" v-model="datosProducto.marca">
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formMedida" class="form-label">Unidad</label>
                          <input type="text" class="form-control" id="formMedida" v-model="datosProducto.unidad">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formImg" class="form-label">Subir imagen</label>
                          <input type="file" class="form-control" id="formImg" accept=".jpg, .png" @change="filechange">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formStock" class="form-label">Stock</label>
                          <input type="text" class="form-control" id="formStock" v-model="datosProducto.stock" disabled>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mb-2">
                          <label for="formEstado" class="form-label">Estado</label>
                          <input type="text" class="form-control" id="formEstado" v-model="datosProducto.estado" disabled>
                        </div>
                      </div>
                    </div>

                    <div class="mb-2">
                      <label class="form-label">Comentario</label>
                      <textarea class="form-control" rows="1" style="max-height: 90px;"
                        v-model="datosProducto.comentario"></textarea>
                    </div>

                    <div class="mb-2 mt-3">
                      <div v-if="msg" class="form-control alert alert-danger text-center fw-bold" role="alert">
                        {{ msg }}
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mt-3">
                      <button type="button" class="btn btn-primary mx-2" :disabled="isButtonDisabled"
                        @click="guardarProductos">Guardar</button>
                      <button type="button" class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-5">
                <div class="image__product card-body">
                  <img v-bind:src="imagen" alt="" class="img-fluid img-thumbnail" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
