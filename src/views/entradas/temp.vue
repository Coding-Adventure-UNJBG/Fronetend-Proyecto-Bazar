<script setup>
import { useRouter } from 'vue-router';
import Navegacion from '../../components/Navegacion.vue'
import { onMounted, ref, computed } from 'vue';
import Modal from './ModalProductos.vue'

const router = useRouter()
const showDetails = ref(false)
const isButtonDisabled = ref(false)
const msg = ref('')
const datosCompra = ref({ "id_compra": "xxx", "id_proveedor": "", "numero_comprobante": "", "descripcion": "", "importe_total": "", "costo_flete": "", "comision_banco": "", "fecha": "", "comentario": "" })
const datosProveedor = ref('')
const dataProveedor = ref({ "nombre": "", "ruc": "", "razon_social": "" })

const showModal = ref(false)
const showResults = ref(false)
const dataBuscar = ref('')

onMounted(() => {
  obtenerIdCompra()
})

async function obtenerIdCompra() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/obtener/id`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      datosCompra.value.id_compra = parseInt(data[0].id, 10) + 1
    })
    .catch(error => {
      msg.value = "Error del servicio al obtener el último ID"
    })
}

// Busqueda de proveedor - START
function cargarProveedor() {
  fetch(`${import.meta.env.VITE_API_V1}/proveedor`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      datosProveedor.value = data
    })
}

const buscarProveedor = () => {
  if (dataBuscar.value.trim() === '') {
    showResults.value = false
    return
  } else {
    cargarProveedor()
  }

  showResults.value = true
  console.log('Buscando ...', dataBuscar.value)
}

const filtrarBusqueda = computed(() => {
  const search = dataBuscar.value.toLowerCase()
  const proveedores = Object.values(datosProveedor.value);
  return search ? proveedores.filter(proveedor => proveedor.nombre.toLowerCase().includes(search)) : [];
})

function guardarProveedor(proveedor) {
  showResults.value = false
  datosCompra.value.id_proveedor = proveedor.id_proveedor
  dataProveedor.value.nombre = proveedor.nombre
  dataProveedor.value.ruc = proveedor.ruc
  dataProveedor.value.razon_social = proveedor.razon_social
}
// Busqueda de proveedor - END

//Generar entrada - START
async function validarComprobante() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/comprobar?id_compra=${datosCompra.value.id_compra}&numero_comprobante=${datosCompra.value.numero_comprobante}`, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        msg.value = ''
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al verificar los datos"
    })
}

async function generarEntrada() {
  // console.log(datosCompra.value)
  msg.value = ''
  isButtonDisabled.value = true

  for (var clave in datosCompra.value) {
    if (datosCompra.value[clave] == '' && clave != "comentario" && clave != "descripcion") {
      msg.value += " " + clave + ","
    }
  }
  if (msg.value) {
    msg.value = "Error: campos requeridos -> " + msg.value
    isButtonDisabled.value = false
    return
  }

  await validarComprobante()
  if (msg.value != '') {
    isButtonDisabled.value = false
    return
  }

  await insertarCompra()
  isButtonDisabled.value = false
}

async function insertarCompra() {
  await fetch(`${import.meta.env.VITE_API_V1}/entrada/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosCompra.value)
  })
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty("message")) {
        msg.value = data.message
        // cancelar()
        showDetails.value = true
      } else {
        msg.value = data.error
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al guardar los datos"
    })
}

// function agregarProductos(eId) {
//   router.push({ name: 'detallecompra', params: { id: eId } })
// }

function agregarProductos() {
  showModal.value = true
}

function guardarEntrada() {
  //Falta implementar la logica para esta cosa
  router.push({ name: 'home' })
}

function cancelar() {
  fetch(`${import.meta.env.VITE_API_V1}/entrada/`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(datosCompra.value)
  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      if (data.hasOwnProperty("error")) {
        msg.value = data.error
      } else {
        msg.value = ''
      }
    })
    .catch(error => {
      msg.value = "Error del servicio al verificar los datos"
    })

  router.push({ name: 'home' })
}

</script>