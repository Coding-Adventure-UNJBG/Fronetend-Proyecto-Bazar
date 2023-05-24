<script>
import { ref } from 'vue';

export default {
  props: {
    title: String,
    value: {
      type: Boolean,
      required: true
    },
    data: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const close = () => {
      emit('update:value', false);
    };

    const save = () => {
      // Lógica para guardar o realizar alguna acción
    };

    return {
      close,
      save
    };
  }
};
</script>
<template>
  <teleport to="body" v-if="value">
    <transition name="modal">
    <div class="modal" tabindex="-1" role="dialog" :class="{ show: value }">
      <div class="modal-overlay" @click="close"></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
          </div>
          <div class="modal-body">
            <!-- Renderizar datos recibidos en el componente -->
            <p>{{ data }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Cerrar</button>
            <button type="button" class="btn btn-primary" @click.stop="save">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </teleport>
</template>

<style scoped>
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal.fade .modal-dialog {
    transform: translate(0, -25%);
  }

  .modal .modal-content {
    position: relative;
    border: none;
    border-radius: 0;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(32, 31, 31, 0.205); /* Color de fondo opaco */
    z-index: -1;
  }

  .modal-header {
    border-bottom: none;
  }

  .modal-footer {
    border-top: none;
  }
</style>