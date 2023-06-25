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
              <div class="card-header color__card-modal">
                <span>{{ title }}</span>
              </div>
              <div class="card-body">
                <div class="modal-img">
                  <img v-bind:src="data" alt="" class="card-img-top">
                </div>
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="close">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
