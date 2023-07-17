<script setup>
import { useRoute, useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';

const router = useRouter()
const route = useRoute()
const datosVenta = ref([{}])
const msg = ref('')

onMounted(() => {
  cargarData()
})

async function cargarData() {
  const vId = route.params.id
  await fetch(`${import.meta.env.VITE_API_V1}/venta/${vId}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        // console.log(data)
        datosVenta.value = data
        // console.log(datosVenta.value)
        msg.value = ''
      }
    })
    .catch(error => {
      msg.value = "Problemas con el servidor"
    })
}

function regresar() {
  router.push({ name: 'ventas' })
}


</script>

<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <!-- <div class="text__principal">
        <h1>VENTA CON ID: {{ datosVenta[0].id_venta }}</h1>
      </div> -->
      <div class="container__vista-principal">
        <div class="row">
          <div class="col-sm-9">
            <div class="card shadow mb-3">
              <div class="card-body">
                <div class="mb-2">
                  <span class="fw-bold">Vista previa de productos</span>
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                    <thead>
                      <tr class="text-center align-middle">
                        <!-- <th width="4%" scope="col" class="fw-bold">N°</th> -->
                        <th width="54%" class="fw-bold">DESCRIPCIÓN</th>
                        <th width="10%" class="fw-bold">CANTIDAD</th>
                        <th width="13%" class="fw-bold">PRECIO U.</th>
                        <th width="13%" class="fw-bold">TOTAL</th>
                        <!-- <th width="10%" colspan="2" class="fw-bold">OPCIÓN</th> -->
                      </tr>
                      <tr>
                      <tr></tr>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="detalleProducto == ''" class="table-light">
                        <td colspan="100%">No se encontraron datos</td>
                      </tr>
                      <!-- <tr v-else class="text-center align-middle" v-for="venta in detalleProducto" :key="detalleProducto.id"> -->
                      <tr v-else class="text-center align-middle" v-for="(venta, indice) in datosVenta"
                        :key="indice">
                        <!-- <td>{{ venta.id_producto }}</td> -->
                        <td class="text-start">{{ venta.nombre }} - {{ venta.marca }} - {{ venta.unidad }}</td>
                        <td>{{ venta.cantidad }}</td>
                        <td>S/. {{ venta.precio_venta }}</td>
                        <td>S/. {{ (venta.cantidad * venta.precio_venta).toFixed(2) }}</td>
                        <!-- <td>
                          <a href="#" data-toggle="tooltip" title="Editar" @click="editarProducto(indice, venta)"><img
                              src="@/assets/icons/pencil.svg" width="15" /></a>
                        </td>
                        <td>
                          <a href="#" data-toggle="tooltip" title="Eliminar" @click="eliminarProducto(indice)"><img
                              src="@/assets/icons/delete.svg" width="15" /></a>
                        </td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="card shadow mb-3">
              <div class="card-body">
                <form>
                  <div class="mb-2">
                    <span class="fw-bold">Detalles de la venta</span>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <div class="mb-3">
                        <label class="form-label">Serie</label>
                        <input type="text" class="form-control text-center" v-model="datosVenta[0].serie" disabled>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="mb-3">
                        <label class="form-label">N° Boleta</label>
                        <input type="text" class="form-control text-center" v-model="datosVenta[0].correlativo" disabled>
                      </div>
                    </div>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Tipo de pago</label>
                    <select class="form-select" v-model="datosVenta[0].tipo_pago" disabled>
                      <option value="EFECTIVO">Efectivo</option>
                      <option value="YAPE">Yape</option>
                    </select>
                  </div>
                  <div class="mb-2">
                    <label class="form-label">Comentario</label>
                    <textarea class="form-control" rows="1" style="max-height: 65px;"
                      v-model="datosVenta[0].comentario" disabled></textarea>
                  </div>
                  <div class="mb-2 mt-4">
                    <div class="row">
                      <!-- <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left; ">Subtotal</label>
                        <label class="form-label" style="float: right;">S/. 164.00</label>
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left;">IGV (18%)</label>
                        <label class="form-label" style="float: right;">S/. 36.00</label>
                      </div> -->
                      <div style="display: flex; justify-content: space-between;">
                        <label class="form-label" style="float: left; padding-left: 15px;">Total</label>
                        <label class="form-label" style="float: right; padding-right: 15px;">S/. {{
                          datosVenta[0].total_dinero }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center mb-2">
                    <button type="button" class="btn btn-primary btn-report" @click="regresar">Regresar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>