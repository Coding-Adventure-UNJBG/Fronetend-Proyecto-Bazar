<script >
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '../../components/ModalImagen.vue'
import Navegacion from '../../components/Navegacion.vue'

export default {
  components: {
    Modal,
    Navegacion
  },
  setup() {
    //modal
    const modalVisible = ref(false);
    const modalTitle = ref('Título del Modal');
    const modalData = ref('Imagen del Modal');
    //principal
    const router = useRouter()
    const dataProductos = ref('')
    const databuscarProducto = ref('')

    const openModal = (nombre, marca, foto) => {
      modalTitle.value = `${nombre} / ${marca}`
      if (foto == '')
        modalData.value = 'http://localhost:3000/photos/test.png'
      else
        modalData.value = foto
      modalVisible.value = true;
    };

    onMounted(() => {
      fetch(import.meta.env.VITE_API_V1 + "/producto", {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          dataProductos.value = data
        })
    })

    function buscarProducto() {
      //console.log("Buscar Producto")
      fetch(import.meta.env.VITE_API_V1 + `/producto?nombre=${databuscarProducto.value}`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.hasOwnProperty("error")) {
            dataProductos.value = ''
          } else
            dataProductos.value = data
        })
    }

    function nuevoProducto() {
      router.push({ name: 'productonuevo' })
    }

    function verProducto(pId) {
      router.push({ name: 'productover', params: { id: pId } })
    }

    function editarProducto(pId) {
      router.push({ name: 'productoedit', params: { id: pId } })
    }

    return {
      // modal
      modalVisible,
      modalTitle,
      modalData,
      openModal,
      //principal
      dataProductos,
      databuscarProducto,
      buscarProducto,
      nuevoProducto,
      verProducto,
      editarProducto
    };
  }
}
</script>
<template>
  <Navegacion />

  <div class="container__principal">
    <div class="vista-principal">
      <div class="text__principal">
        <h1>VISTA DE PRODUCTOS</h1>
      </div>
      <div class="container__vista-principal">
        <div class="col-sm-12">
          <div class="card shadow mb-3">
            <div class="card-header py-3">
              <div class="row g-3">

                <div class="col-md-3">
                  <div class="input-group">
                    <input type="search" class="form-control input-sm" placeholder="Buscar producto"
                      v-model="databuscarProducto" @keypress.enter="buscarProducto" @search="limpiarBusqueda">
                    <button class="btn btn-primary" type="button" id="inputbuscar"
                      @click="buscarProducto"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
                  </div>
                </div>
                <div class="col-md-9 d-flex justify-content-start align-items-end">
                  <button type="button" class="btn btn-primary" @click="nuevoProducto">Nuevo producto</button>
                </div>

              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-hover" width="100%" cellspacing="0" style="font-size: 14px">
                  <thead>
                    <tr class="text-center align-middle">
                      <th width="4%" scope="col" class="fw-bold">N°</th>
                      <th width="22%" class="fw-bold">NOMBRE</th>
                      <th width="13%" class="fw-bold">MARCA</th>
                      <th width="13%" class="fw-bold">MEDIDA</th>
                      <th width="13%" class="fw-bold">UNIDAD</th>
                      <th width="13%" class="fw-bold">STOCK</th>
                      <th width="13%" class="fw-bold">ESTADO</th>
                      <th width="9%" colspan="3" class="fw-bold">OPCIÓN</th>
                    </tr>
                    <tr>
                    <tr></tr>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="dataProductos == ''" class="table-light">
                      <td colspan="100%">No se encontraron datos</td>
                    </tr>
                    <tr v-else class="text-center align-middle" v-for="item in dataProductos" :key="dataProductos.id">
                      <td>{{ item.id_producto }}</td>
                      <td>{{ item.nombre }}</td>
                      <td>{{ item.marca }}</td>
                      <td>{{ item.medida }}</td>
                      <td>{{ item.tipo_unidad }}</td>
                      <td>{{ item.stock }}</td>
                      <td>{{ item.estado }}</td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="ver Imagen"
                          @click="openModal(item.nombre, item.marca, item.foto)"><img alt="Vue logo" class="logo"
                            src="@/assets/icons/image.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Ver Producto" @click="verProducto(item.id_producto)"><img
                            alt="Vue logo" class="logo" src="@/assets/icons/ojo.svg" width="15" /></a>
                      </td>
                      <td>
                        <a href="#" data-toggle="tooltip" title="Editar" @click="editarProducto(item.id_producto)"><img
                            alt="Vue logo" class="logo" src="@/assets/icons/pencil.svg" width="15" /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal :title="modalTitle" :value="modalVisible" :data="modalData" @update:value="modalVisible = $event" />
</template>


