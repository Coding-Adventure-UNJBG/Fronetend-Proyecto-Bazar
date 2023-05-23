<script setup>
import Navegacion from '../../components/Navegacion.vue'

</script>

<template>
  <Navegacion />
  <section class="h-100 bg-light">
  <div class="container py-1 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <div class="card card-registration my-4">
          <div class="row g-0">
            <div class="col-xl-6">
              <div class="card-body p-md-5 text-black">
                <h3 class="mb-5 text-center custom-tittle">Nuevo Producto</h3>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formNombre">Nombre</label>
                  <input type="text" id="formNombre" class="form-control form-control-lg" />
                </div>

                <div class="form-outline mb-4">
                  <label for="inputbuscar" class="form-label custom-tittle">Proveedor</label>
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Ingrese el nombre para buscar..." >
                    <button class="btn btn-secondary" type="button" id="inputbuscar" ><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                  </div>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label custom-tittle" for="formMarca">Marca</label>
                  <input type="text" id="formMarca" class="form-control form-control-lg" />
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <label for="formMedida" class="form-label custom-tittle">Medida</label>
                    <input type="text" class="form-control" id="formMedida">
                  </div>
                  <div class="col-md-6">
                    <label for="formUnidad" class="form-label custom-tittle">Tipo Unidad</label>
                    <select id="formUnidad" class="form-select">
                      <option selected>Unidad</option>
                      <option>Paquete</option>
                    </select>
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
            <div class="col-xl-6 card-body p-md-5 d-flex justify-content-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo" class="img-fluid"
                style="border-radius: 3rem;" />
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
