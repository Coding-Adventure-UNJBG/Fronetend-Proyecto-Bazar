<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref } from 'vue';

const router = useRouter()

</script>

<template>
    <Navegacion />

    <div class="container__principal">
        <div class="vista-principal">
            <div class="container__vista-principal">
                <div class="col-sm-12">
                    <div class="card shadow mb-3">
                        <div class="card-body">
                            <div class="text__principal">
                                <h2>EDITAR PROVEEDOR</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>