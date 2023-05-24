
<script>
import { ref } from 'vue';
import Modal from '../components/Modal.vue';
import Navegacion from '../components/Navegacion.vue'

export default {
  components: {
    Modal,
    Navegacion
  },
  setup() {
    const modalVisible = ref(false);
    const modalTitle = ref('Título del Modal');
    const modalData = ref('Datos para el Modal');

    const openModal = () => {
      modalVisible.value = true;
    };

    return {
      modalVisible,
      modalTitle,
      modalData,
      openModal
    };
  }
};
</script>
<template>
  <Navegacion />
  <div class="about">
    <h1>Vista de Entrada de productos</h1>
  <div>
    <!-- Uso del componente Modal -->
    <button @click="openModal">Abrir Modal</button>
    <Modal :title="modalTitle" :value="modalVisible" :data="modalData" @update:value="modalVisible = $event" />
  </div>
  </div>
</template>


<style>
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
</style>