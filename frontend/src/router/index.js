import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Home from '../views/Home.vue';
import RegisterPostulante from '../views/RegisterPostulante.vue';
import DashboardEmpresa from '../views/DashboardEmpresa.vue';
import Callback from '../views/Callback.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/postulante/registro',
    name: 'RegisterPostulante',
    component: RegisterPostulante,
    meta: { requiresAuth: true, role: 'postulante' }
  },
  {
    path: '/empresa/dashboard',
    name: 'DashboardEmpresa',
    component: DashboardEmpresa,
    meta: { requiresAuth: true, role: 'empresa' }
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  },
  // Catch all redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route Guard to check authentication and roles
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // User not authenticated, redirect to Home
      next({ name: 'Home' });
    } else if (to.meta.role && authStore.role !== to.meta.role) {
      // Role mismatch, redirect to appropriate view or home
      if (authStore.role === 'postulante') {
        next({ name: 'RegisterPostulante' });
      } else if (authStore.role === 'empresa') {
        next({ name: 'DashboardEmpresa' });
      } else {
        next({ name: 'Home' });
      }
    } else {
      next();
    }
  } else {
    // If authenticated user goes to Home, redirect to their role page
    if (to.name === 'Home' && authStore.isAuthenticated) {
      if (authStore.role === 'postulante') {
        next({ name: 'RegisterPostulante' });
      } else if (authStore.role === 'empresa') {
        next({ name: 'DashboardEmpresa' });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;
