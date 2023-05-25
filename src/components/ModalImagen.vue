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

    return {
      close
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
          <div class="card text-center">
            <div class="card-header">
              <h1>{{ title }}</h1>
            </div>
            <div class="card-body">
              <img v-bind:src="data" alt="" class="card-img-top">
            </div>
            <div class="card-footer text-body-secondary">
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="close">Cerrar</button>
              </div>
            </div>
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