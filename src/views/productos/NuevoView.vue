<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { ref } from 'vue'

  const imagen = ref('/src/assets/test.png')

  function filechange(archivo) {
    const file = archivo.target.files[0]
    imagen.value = URL.createObjectURL(file)
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
                  <input type="text" id="formNombre" class="form-control form-control-lg" />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formMarca">Marca</label>
                  <input type="text" id="formMarca" class="form-control form-control-lg" />
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formMedida" class="form-label custom-tittle">Medida</label>
                  <input type="text" id="formMedida" class="form-control form-control-lg" />
                  </div>
                  <div class="col-md-6">
                    <label for="formImg" class="form-label custom-tittle">Imagen del Producto</label>
                    <input type="file" class="form-control" id="formImg" accept=".jpg, .jpeg, .png" @change="filechange">
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo Unidad</label>
                    <select id="formUnidad" class="form-select">
                      <option selected>Unidad</option>
                      <option>Paquete</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="formCantidad" class="form-label custom-tittle">Cantidad x Unidad</label>
                    <input type="number" class="form-control" id="formCantidad" value="1" min="1" max="350" step="1">
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

                <div class="d-flex justify-content-center pt-3">
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Guardar</button>
                  <button  type="button" class="btn btn-primary custom-btn-color" id="inputbuscar">Cancelar</button>
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
