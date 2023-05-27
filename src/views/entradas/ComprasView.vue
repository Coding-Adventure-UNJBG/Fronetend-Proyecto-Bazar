<script setup>
  import Navegacion from '../../components/Navegacion.vue'
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter()

  const isButtonDisabled = ref(true)

  function regresar(){
    router.push({ name: 'home' })
  }

  function goProveedores(){
    router.push({ name: 'proveedores' })
  }

  function newCompra(){
    isButtonDisabled.value = false
  }
</script>
<template>
  <Navegacion/>
  <h1 class="text-center custom-tittle my-3">REGISTRO DE COMPRA</h1>

  <div class="container-fluid d-flex justify-content-center align-items-center px-4">
    <div class="w-personalizado mx-auto">
      <div class="card shadow">
        <div class="row g-3 p-4">
          <div class="col-md-4">
            <label for="input00" class="form-label custom-tittle">Código de compra</label>
            <input type="text" class="form-control" id="input00" disabled>
          </div>
          <div class="col-md-2">
            <label for="input01" class="form-label custom-tittle">Fecha</label>
            <input type="date" class="form-control" id="input01" :disabled="isButtonDisabled">
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" @click="newCompra">
                <font-awesome-icon :icon="['fas', 'circle-plus']" />
                Agregar Registro
              </button>
              <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" @click="goProveedores" >
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                Proveedores
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <label for="input02" class="form-label custom-tittle">Número de Comprobante</label>
            <input type="text" class="form-control" id="input02" :disabled="isButtonDisabled">
          </div>
          <div class="col-md-8">
            <label for="input03" class="form-label custom-tittle">Descripción</label>
            <input type="text" class="form-control" id="input03" :disabled="isButtonDisabled">
          </div>
          <div class="col-md-3">
            <label for="input04" class="form-label custom-tittle">IGV</label>
            <div class="input-group mt-0 compact-input justify-content-end">
              <span class="input-group-text compact-span">S/.</span>
              <input type="text" id="input04" class="form-control text-end" :disabled="isButtonDisabled">
            </div>
          </div>
          <div class="col-md-3">
            <label for="input05" class="form-label custom-tittle">Coste Flete</label>
            <div class="input-group mt-0 compact-input justify-content-end">
              <span class="input-group-text compact-span">S/.</span>
              <input type="text" id="input05" class="form-control text-end" :disabled="isButtonDisabled">
            </div>
          </div>
          <div class="col-md-3">
            <label for="input06" class="form-label custom-tittle">Comosión de Banco</label>
            <div class="input-group mt-0 compact-input justify-content-end">
              <span class="input-group-text compact-span">S/.</span>
              <input type="text" id="input06" class="form-control text-end" :disabled="isButtonDisabled">
            </div>
          </div>
          <div class="col-md-3">
            <label for="input07" class="form-label custom-tittle">Importe Total</label>
            <div class="input-group mt-0 compact-input justify-content-end">
              <span class="input-group-text compact-span">S/.</span>
              <input type="text" id="input07" class="form-control text-end" :disabled="isButtonDisabled">
            </div>
          </div>
          <div class="col-12">
            <label for="input08" class="form-label custom-tittle">Comentario</label>
            <textarea class="form-control" id="input08" rows="2" :disabled="isButtonDisabled"></textarea>
          </div>
          <div v-if="isButtonDisabled != true" class="col-12 text-center">
            <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" >Generar Registro</button>
            <button type="button" class="btn btn-primary btn-lg custom-btn-color" id="inputbuscar" @click="regresar" >Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
