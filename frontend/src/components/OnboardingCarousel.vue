<template>
  <div class="relative w-full max-w-lg mx-auto bg-white dark:bg-navy text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col h-[600px] justify-between p-8">
    
    <!-- Header Indicator -->
    <div class="flex justify-between items-center w-full">
      <!-- App Name / Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-brand-primary animate-pulse"></div>
        <span class="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
          Mat<span class="text-brand-primary">Chile</span>
        </span>
      </div>
      
      <!-- Slide Indicators -->
      <div class="flex space-x-1.5" v-if="currentSlide < 4">
        <span 
          v-for="i in 4" 
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="currentSlide === i ? 'w-6 bg-brand-primary' : 'w-2 bg-slate-200 dark:bg-slate-700'"
        ></span>
      </div>
    </div>

    <!-- Main Content Container with transition -->
    <div class="flex-1 flex flex-col justify-center items-center my-6 overflow-hidden relative">
      
      <!-- Slide 1: Propósito -->
      <Transition name="slide">
        <div v-if="currentSlide === 1" class="flex flex-col items-center text-center space-y-6">
          <div class="relative w-36 h-36 flex items-center justify-center bg-slate-50 dark:bg-navy-mid/50 rounded-full border border-slate-200 dark:border-white/10">
            <div class="absolute inset-0 rounded-full bg-brand-primary/10 animate-ping"></div>
            <!-- Logo Visual -->
            <svg class="w-16 h-16 text-brand-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div class="space-y-3 px-4">
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">El Motor de Match Inteligente</h2>
            <p class="text-slate-600 dark:text-slate text-base leading-relaxed">
              El primer ecosistema de vinculación laboral en tiempo real para relatores, OTECs y empresas chilenas.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Slide 2: Precisión (Radar Visual) -->
      <Transition name="slide">
        <div v-if="currentSlide === 2" class="flex flex-col items-center text-center space-y-6">
          <div class="relative w-36 h-36 flex items-center justify-center">
            <!-- Radar rings -->
            <div class="absolute w-36 h-36 rounded-full border border-brand-secondary/20 animate-ping" style="animation-duration: 3s"></div>
            <div class="absolute w-28 h-28 rounded-full border border-brand-secondary/30 animate-ping" style="animation-duration: 2s"></div>
            <div class="absolute w-20 h-20 bg-brand-secondary/10 rounded-full border border-brand-secondary/50 flex items-center justify-center">
              <svg class="w-10 h-10 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-3 px-4">
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">Encuentros Precisos y Cercanos</h2>
            <p class="text-slate-600 dark:text-slate text-base leading-relaxed">
              Búsquedas georreferenciadas y filtros automatizados que unen el talento idóneo con la oferta exacta.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Slide 3: Velocidad (Reloj transformándose en Rayo) -->
      <Transition name="slide">
        <div v-if="currentSlide === 3" class="flex flex-col items-center text-center space-y-6">
          <div class="relative w-36 h-36 flex items-center justify-center bg-slate-50 dark:bg-navy-mid/50 rounded-full border border-slate-200 dark:border-white/10">
            <!-- Clock/Rayo icon container -->
            <div class="absolute inset-0 rounded-full bg-amber-500/10 animate-pulse"></div>
            <svg class="w-16 h-16 text-amber-500 transition-transform duration-700 hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <!-- Animated custom path representing speed / timer -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="absolute -top-1 -right-1 bg-amber-500 text-slate-900 rounded-full p-1.5 animate-bounce">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path>
              </svg>
            </div>
          </div>
          <div class="space-y-3 px-4">
            <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">Directo a lo Importante</h2>
            <p class="text-slate-600 dark:text-slate text-base leading-relaxed">
              Sin fricción. Sin burocracia. Contacto inmediato y validado en tiempo récord para comenzar a operar.
            </p>
          </div>
        </div>
      </Transition>

      <!-- Slide 4: Bifurcación (CTA) -->
      <Transition name="slide">
        <div v-if="currentSlide === 4" class="flex flex-col items-center text-center space-y-6 w-full">
          <div class="space-y-1.5 px-4 mb-2">
            <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">¿Cómo deseas ingresar?</h2>
            <p class="text-slate-600 dark:text-slate text-sm">Selecciona tu perfil para acceder a la plataforma.</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 w-full px-2">
            <!-- Empresa Card -->
            <button 
              @click="selectRole('empresa')"
              class="group relative flex flex-col items-center text-center p-5 bg-slate-50 hover:bg-slate-100 dark:bg-navy-mid/60 dark:hover:bg-navy-mid rounded-2xl border border-slate-200 dark:border-white/20 hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              <div class="w-12 h-12 rounded-xl bg-brand-primary/10 group-hover:bg-brand-primary/20 text-brand-primary flex items-center justify-center mb-4 transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white text-base mb-1">Soy Empresa</h3>
              <p class="text-slate-600 dark:text-slate text-xs leading-normal">
                Busco relatores y personal calificado para capacitaciones.
              </p>
              <div class="mt-4 px-4 py-1.5 bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold rounded-lg shadow-md transition-colors w-full">
                Buscar Talento
              </div>
            </button>
            
            <!-- Postulante Card -->
            <button 
              @click="selectRole('postulante')"
              class="group relative flex flex-col items-center text-center p-5 bg-slate-50 hover:bg-slate-100 dark:bg-navy-mid/60 dark:hover:bg-navy-mid rounded-2xl border border-slate-200 dark:border-white/20 hover:border-brand-secondary transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              <div class="w-12 h-12 rounded-xl bg-brand-secondary/10 group-hover:bg-brand-secondary/20 text-brand-secondary flex items-center justify-center mb-4 transition-all">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-slate-900 dark:text-white text-base mb-1">Soy Postulante</h3>
              <p class="text-slate-600 dark:text-slate text-xs leading-normal">
                Quiero postular como relator o capacitador a ofertas.
              </p>
              <div class="mt-4 px-4 py-1.5 bg-brand-secondary hover:bg-brand-secondaryHover text-white text-xs font-semibold rounded-lg shadow-md transition-colors w-full">
                Ofrecer Talento
              </div>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navigation Controls Footer -->
    <div class="flex justify-between items-center w-full mt-4">
      <button 
        v-if="currentSlide < 4" 
        @click="skipOnboarding"
        class="text-slate-500 hover:text-slate-900 dark:text-slate dark:hover:text-white text-sm font-medium transition-colors"
      >
        Omitir
      </button>
      <div v-else class="w-full text-center text-slate-500 dark:text-slate text-xs">
        MatChile &copy; 2026 - Conexión inclusiva
      </div>

      <button 
        v-if="currentSlide < 4"
        @click="nextSlide"
        class="flex items-center space-x-1.5 px-5 py-2.5 bg-brand-primary hover:bg-brand-primaryHover text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30"
      >
        <span>Siguiente</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'OnboardingCarousel',
  emits: ['roleSelected'],
  setup(props, { emit }) {
    const currentSlide = ref(1);

    const nextSlide = () => {
      if (currentSlide.value < 4) {
        currentSlide.value++;
      }
    };

    const skipOnboarding = () => {
      currentSlide.value = 4;
    };

    const selectRole = (role) => {
      emit('roleSelected', role);
    };

    return {
      currentSlide,
      nextSlide,
      skipOnboarding,
      selectRole
    };
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
