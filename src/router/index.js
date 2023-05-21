import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import HomeView from '../views/HomeView.vue'
import ComprasView from '../views/ComprasView.vue'
import ProductosView from '../views/ProductosView.vue'
import ReportesView from '../views/ReportesView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import VentasView from '../views/VentasView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiredAuh: false
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/compras',
      name: 'compras',
      component: ComprasView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: ReportesView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: VentasView,
      meta: {
        requiredAuh: true
      },
      beforeEnter: verificarAutenticacion
    }
  ]
})

function verificarAutenticacion(to, from, next) {
  const authStore = useAuthStore();
  const rutaProtegida = to.matched.some(record => record.meta.requiredAuh);
  const usuarioAutenticado = authStore.getEstado;

  if (rutaProtegida && !usuarioAutenticado) {
    // Redirigir al usuario a la página de inicio de sesión u otra página adecuada
    next('/login');
  } else if (!rutaProtegida && usuarioAutenticado) {
    // El usuario autentificado no debe ingresar a la ruta LOGIN
    next('/');
  } else {
    // Permitir la navegación a la ruta solicitada
    next();
  }
}

export default router
