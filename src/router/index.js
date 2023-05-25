import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'
import HomeView from '../views/HomeView.vue'
import ComprasView from '../views/ComprasView.vue'
import ProductosView from '../views/productos/PrincipalView.vue'
import ProductoNuevoView from '../views/productos/NuevoView.vue'
import ProductoVerView from '../views/productos/VerView.vue'
import ReportesView from '../views/ReportesView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import VentasView from '../views/VentasView.vue'
import LoginView from '../views/LoginView.vue'
import Error404View from '../views/Error404View.vue'

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
        requiredAuh: true,
        requirePermiso: ['entradas']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['productos']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/productos/nuevo',
      name: 'productonuevo',
      component: ProductoNuevoView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['productos']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/productos/ver/:id',
      name: 'productover',
      component: ProductoVerView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['productos']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/reportes',
      name: 'reportes',
      component: ReportesView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['reportes']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['usuarios']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: VentasView,
      meta: {
        requiredAuh: true,
        requirePermiso: ['ventas']
      },
      beforeEnter: verificarAutenticacion
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: Error404View,
      beforeEnter: (to, from, next) => {
        // Redirigir a la ruta principal
        next('/');
      }
    }
  ]
})

function verificarAutenticacion(to, from, next) {
  const authStore = useAuthStore();
  const rutaProtegida = to.matched.some(record => record.meta.requiredAuh);
  const requiredPermissions = to.meta.requirePermiso;
  const usuarioAutenticado = authStore.getEstado;
  const usuarioPermisos = authStore.getPermisos;

  if (rutaProtegida && !usuarioAutenticado) {
    // Redirigir al usuario a la página de inicio de sesión u otra página adecuada
    next('/login');
  } else if (rutaProtegida && requiredPermissions && !requiredPermissions.every(permission => authStore.getPermisos[permission])) {
    // Redirigir a una página de acceso denegado si el usuario no tiene los permisos necesarios
    next('/');
  }else if (!rutaProtegida && usuarioAutenticado) {
    // El usuario autentificado no debe ingresar a la ruta LOGIN
    next('/');
  } else {
    // Permitir la navegación a la ruta solicitada
    next();
  }
}

export default router
