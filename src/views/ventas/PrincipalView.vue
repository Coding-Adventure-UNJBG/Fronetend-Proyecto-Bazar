<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { ref, onMounted } from 'vue';

const router = useRouter()
const dataVenta = ref('')

onMounted(() => {
  cargarData()
})

async function cargarData() {
  await fetch(`${import.meta.env.VITE_API_V1}/venta`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(dataVenta.value)
      if (data.hasOwnProperty("error")) {
        dataVenta.value = ''
      } else
        dataVenta.value = data
    })
}

function nuevaVenta() {
  router.push({ name: 'ventanueva' })
}
</script>
<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="text__principal">
        <h1>VENTAS DEL DIA</h1>
      </div>
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <div class="row g-3">

                <div class="col-md-9 d-flex justify-content-start align-items-end">
                  <button type="button" class="btn btn-primary" @click="nuevaVenta">Nueva Venta</button>
                </div>

                <div class="col-md-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text ventas__fecha">FECHA</span>
                    </div>
                    <input type="date" class="form-control">
                  </div>
                </div>

              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                  <thead>
                    <tr class="text-center align-middle">
                      <th width="4%" scope="col" class="fw-bold">ID</th>
                      <th width="16%" class="fw-bold">BOLETA</th>
                      <th width="10%" class="fw-bold">ITEMS</th>
                      <th width="10%" class="fw-bold">FECHA</th>
                      <th width="10%" class="fw-bold">IMPORTE</th>
                      <th width="10%" class="fw-bold">PAGO</th>
                      <th width="30%" class="fw-bold">COMENTARIO</th>
                      <th width="10%" colspan="2" class="fw-bold">OPCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="dataVenta == ''">
                      <td colspan="100%">No se encontraron resultados</td>
                    </tr>
                    <tr v-else class="text-center align-middle" v-for="venta in dataVenta" :key="dataVenta.id">
                      <td>{{ venta.id_venta }}</td>
                      <td>{{ venta.serie }} - {{ venta.correlativo }}</td>
                      <td>{{ venta.items }}</td>
                      <td>{{ venta.fecha }}</td>
                      <td>S/. {{ venta.total_dinero }}</td>
                      <td>{{ venta.tipo_pago }}</td>
                      <td>{{ venta.comentario }}</td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Ver Factura"><img alt="Vue logo" class="logo"
                            src="@/assets/icons/ojo.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Editar"><img alt="Vue logo" class="logo"
                            src="@/assets/icons/pencil.svg" width="15" /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- <div class="row">
                <div class="col-md-4 d-flex justify-content-center justify-content-md-start">
                  <div class="input-group mb-2 mt-3 compact-input justify-content-start">
                    <span class="input-group-text compact-span">Total de Ventas</span>
                    <input type="text" class="form-control text-end" disabled value="124">
                  </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center">
                  <div class="input-group mb-2 mt-3 compact-input justify-content-center">
                    <span class="input-group-text compact-span">Unidades Vendidas</span>
                    <input type="text" class="form-control text-end" disabled value="50">
                  </div>
                </div>
                <div class="col-md-4 d-flex justify-content-center justify-content-md-end">
                  <div class="input-group mb-2 mt-3 compact-input justify-content-end">
                    <span class="input-group-text compact-span">Total Monetario S/.</span>
                    <input type="text" class="form-control text-end" disabled value="1000">
                  </div>
                </div>
              </div> -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
