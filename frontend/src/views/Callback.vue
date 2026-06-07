<template>
  <div class="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
    <div class="space-y-4 text-center">
      <!-- Loading spinner -->
      <div class="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <h3 class="text-lg font-bold">Verificando Credenciales...</h3>
      <p class="text-xs text-slate">Conectando de forma segura con Auth0</p>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

export default {
  name: 'Callback',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(() => {
      // In a real Auth0 setup, the SDK handles token exchange on callback URL.
      // Here we simulate the redirect checking if Auth0 is used, or fallback.
      setTimeout(() => {
        if (authStore.isAuthenticated) {
          if (authStore.role === 'postulante') {
            router.push({ name: 'RegisterPostulante' });
          } else if (authStore.role === 'empresa') {
            router.push({ name: 'DashboardEmpresa' });
          } else {
            router.push({ name: 'Home' });
          }
        } else {
          // If no mock bypass or real auth found, send home
          router.push({ name: 'Home' });
        }
      }, 1000);
    });
  }
};
</script>
