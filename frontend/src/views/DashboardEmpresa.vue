<template>
  <div class="min-h-screen bg-navy text-slate-light font-body flex flex-col justify-between relative overflow-hidden">
    
    <!-- Decorative Ambient Glow Backgrounds -->
    <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
    <div class="absolute bottom-0 left-10 w-[300px] h-[300px] bg-teal-dim/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

    <!-- Header -->
    <nav class="px-4 sm:px-[5vw] py-4 sm:py-6 flex justify-between items-center border-b border-slate-200 dark:border-white/10">
      <div class="nav-logo flex items-center gap-2 sm:gap-4">
        MatChile
        <span class="text-[9px] uppercase font-extrabold tracking-widest text-teal border border-teal/20 px-2.5 py-0.5 rounded-full select-none" style="font-family: var(--font-body); letter-spacing: 1px;">
          Empresa / OTEC
        </span>
      </div>
      <div class="nav-cta flex gap-2 items-center">
        <button 
          v-if="matchesList.length > 0"
          @click="showMatchesSidebar = !showMatchesSidebar"
          class="btn-primary flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold"
          title="Mis Matches"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">favorite</span>
          <span class="hidden sm:inline">Matches</span>
          <span class="bg-navy text-teal text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black">
            {{ matchesList.length }}
          </span>
        </button>
        <button 
          @click="postulanteStore.toggleHighContrast()"
          class="btn-primary flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold"
          :title="postulanteStore.highContrastMode ? 'Modo Normal' : 'Alto Contraste'"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">contrast</span>
          <span class="hidden sm:inline">{{ postulanteStore.highContrastMode ? 'Normal' : 'A11y' }}</span>
        </button>
        <button 
          @click="logout" 
          class="btn-ghost flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold"
          title="Cerrar Sesión"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">logout</span>
          <span class="hidden sm:inline">Salir</span>
        </button>
      </div>
    </nav>

    <!-- Main Workspace -->
    <main class="flex-grow max-w-container-max w-full mx-auto px-4 lg:px-6 py-6 lg:py-10 flex flex-col lg:flex-row gap-8 items-start relative">
      
      <!-- Backdrop for mobile drawer -->
      <div 
        v-if="showMatchesSidebar" 
        class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-45 lg:hidden"
        @click="showMatchesSidebar = false"
      ></div>

      <!-- Drawer Sidebar for Matches -->
      <div 
        v-show="showMatchesSidebar || matchesList.length > 0" 
        class="fixed top-0 left-0 h-full w-80 max-w-[80vw] z-50 p-6 flex flex-col space-y-5 bg-white dark:bg-navy border-r border-slate-200 dark:border-white/10 shadow-2xl transition-transform duration-300 lg:static lg:h-auto lg:w-80 lg:max-w-none lg:border lg:rounded-[30px] lg:shadow-xl lg:translate-x-0 lg:glass-panel lg:border-white/40 lg:bg-transparent"
        :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#ffffff' } : {}"
        :class="[
          showMatchesSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="border-b border-outline-variant/20 pb-3 flex justify-between items-center">
          <div class="text-left">
            <h3 class="font-display text-sm font-extrabold text-primary flex items-center">
              <span class="material-symbols-outlined mr-2 animate-pulse text-xl">favorite</span>
              Canales de Match Mutuo
            </h3>
            <p class="text-[10px] text-slate mt-1">Conexión directa aprobada con candidatos.</p>
          </div>
          <!-- Mobile Close Button -->
          <button 
            @click="showMatchesSidebar = false" 
            class="p-1 rounded-full bg-slate-100 dark:bg-navy-mid hover:bg-slate-200 text-slate lg:hidden"
            aria-label="Cerrar panel"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
        
        <!-- Match Cards List -->
        <div class="space-y-3.5 max-h-[calc(100vh-140px)] lg:max-h-[380px] overflow-y-auto pr-1 text-left">
          <div 
            v-for="match in matchesList" 
            :key="match.id"
            class="p-4 bg-white rounded-2xl border border-outline-variant/30 hover:border-outline-variant/60 transition-colors flex items-center justify-between shadow-sm"
          >
            <div class="space-y-1">
              <h4 class="text-xs font-black text-slate-900 leading-tight">
                {{ match.nombre_social || match.nombre_legal }}
              </h4>
              <p class="text-[10px] text-slate-500 line-clamp-1">
                {{ match.formacion.area_laboral }}
              </p>
              
              <!-- Communication Links -->
              <div class="flex items-center space-x-2 pt-1.5">
                <a 
                  :href="'https://wa.me/' + match.contacto.whatsapp.replace('+', '')" 
                  target="_blank"
                  class="text-[10px] font-extrabold text-emerald-600 hover:text-emerald-500 transition-colors flex items-center"
                >
                  WhatsApp
                </a>
                <span class="text-slate-light">·</span>
                <a 
                  :href="'mailto:' + match.contacto.email"
                  class="text-[10px] font-extrabold text-primary hover:text-primary-container transition-colors flex items-center"
                >
                  Email
                </a>
              </div>
            </div>
            
            <div class="text-right shrink-0 ml-3">
              <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Score</span>
              <span class="text-sm font-black text-primary">{{ match.matchScore }}%</span>
            </div>
          </div>
          
          <div v-if="matchesList.length === 0" class="text-center py-8 text-xs text-slate">
            Desliza candidatos a la derecha para iniciar conexiones.
          </div>
        </div>
      </div>

      <!-- Center Space -->
      <div class="flex-grow w-full flex flex-col items-center space-y-6">
        
        <!-- Stats summary panel -->
        <div 
          v-if="searchDone && !empresaStore.isLoading" 
          class="w-full max-w-sm grid grid-cols-3 gap-4 p-4 bg-white border border-outline-variant/30 rounded-2xl text-center select-none shadow-sm"
        >
          <div>
            <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Mazo</span>
            <span class="text-sm font-extrabold text-slate-800">
              {{ empresaStore.candidates.length }} Perfiles
            </span>
          </div>
          <div>
            <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Score Promedio</span>
            <span class="text-sm font-extrabold text-primary">
              {{ averageScore }}%
            </span>
          </div>
          <div>
            <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Filtro SENCE</span>
            <span class="text-sm font-extrabold text-secondary">Activo</span>
          </div>
        </div>

        <!-- 1. Buscador form -->
        <div v-if="!searchDone" class="w-full">
          <BuscadorEmpresa @search="handleSearch" />
        </div>

        <!-- 2. Swipe interface -->
        <div v-else class="w-full flex flex-col items-center space-y-6">
          <div class="flex justify-between items-center w-full max-w-sm px-2">
            <button 
              @click="searchDone = false"
              class="text-xs font-bold text-slate-500 hover:text-primary flex items-center space-x-1.5 transition-colors group"
            >
              <span class="material-symbols-outlined text-sm font-bold transform group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              <span>Nueva Búsqueda</span>
            </button>
            
            <div class="text-[10px] font-extrabold text-slate uppercase tracking-wider max-w-[200px] truncate">
              {{ empresaStore.searchFilters.area_laboral }}
            </div>
          </div>

          <!-- Loading spinner -->
          <div v-if="empresaStore.isLoading" class="h-[400px] flex flex-col justify-center items-center space-y-4">
            <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p class="text-xs text-slate font-bold tracking-wider animate-pulse">Cargando Match Engine...</p>
          </div>

          <!-- Mazo Swipe Component -->
          <SwipeCards 
            v-else
            :candidates="empresaStore.candidates"
            :current-index="empresaStore.currentIndex"
            :modal-open="isModalOpen || showMatchModal"
            @swipe-left="handleSwipeLeft"
            @swipe-right="handleSwipeRight"
            @expand="handleExpand"
          />

        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer class="w-full py-6 text-center text-slate border-t border-outline-variant/10 text-xs px-6">
      MatChile &copy; 2026 · Ecosistema de Contratación Inteligente
    </footer>

    <!-- Detailed Modal -->
    <CandidatoModal 
      v-if="selectedCandidate"
      :is-open="isModalOpen"
      :candidate="selectedCandidate"
      @close="isModalOpen = false"
    />

    <!-- MUTUAL MATCH CONGRATULATION POPUP -->
    <div v-if="showMatchModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      
      <div class="relative w-full max-w-md bg-white border border-outline-variant/60 rounded-[30px] p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
        
        <!-- Match glowing icon -->
        <div class="relative w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mx-auto">
          <div class="absolute inset-0 rounded-full bg-primary-container/20 animate-ping"></div>
          <span class="material-symbols-outlined text-4xl text-primary animate-pulse">favorite</span>
        </div>

        <div class="space-y-2.5">
          <h3 class="font-display text-headline-sm font-bold text-slate-900">¡Ha Ocurrido un Match!</h3>
          <p class="text-sm text-slate-600 leading-relaxed">
            Has conectado con <span class="font-black text-primary underline decoration-primary-container">{{ matchedCandidate.nombre_social || matchedCandidate.nombre_legal }}</span>.
          </p>
          <p class="text-xs text-slate">
            Ambas partes comparten afinidad académica y laboral ({{ matchedCandidate.matchScore }}% score). Abre un canal directo a continuación:
          </p>
        </div>

        <!-- Contact Options Grid -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <!-- Whatsapp -->
          <a 
            :href="'https://wa.me/' + matchedCandidate.contacto.whatsapp.replace('+', '')" 
            target="_blank"
            class="py-3.5 px-4 bg-emerald-500 hover:bg-emerald-450 rounded-full text-xs font-extrabold text-white transition-colors flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <span>WhatsApp</span>
          </a>

          <!-- Email -->
          <a 
            :href="'mailto:' + matchedCandidate.contacto.email"
            class="py-3.5 px-4 bg-gradient-to-r from-primary-container to-primary hover:scale-[1.02] rounded-full text-xs font-extrabold text-white transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-primary-container/10 active:scale-95"
          >
            <span>Enviar Email</span>
          </a>
        </div>

        <button 
          @click="showMatchModal = false"
          class="w-full py-3 border border-outline-variant hover:bg-slate-50 rounded-full text-xs font-bold text-slate-600 hover:text-slate-800 transition-all active:scale-95"
        >
          Seguir Deslizando
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useEmpresaStore } from '../store/empresa';
import { usePostulanteStore } from '../store/postulante';
import BuscadorEmpresa from '../components/BuscadorEmpresa.vue';
import SwipeCards from '../components/SwipeCards.vue';
import CandidatoModal from '../components/CandidatoModal.vue';

export default {
  name: 'DashboardEmpresa',
  components: {
    BuscadorEmpresa,
    SwipeCards,
    CandidatoModal
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const empresaStore = useEmpresaStore();
    const postulanteStore = usePostulanteStore();

    const searchDone = ref(false);
    const selectedCandidate = ref(null);
    const isModalOpen = ref(false);
    
    const showMatchModal = ref(false);
    const matchedCandidate = ref(null);
    const showMatchesSidebar = ref(false);

    const matchesList = computed(() => empresaStore.matches);

    const averageScore = computed(() => {
      const candidates = empresaStore.candidates;
      if (!candidates.length) return 0;
      const sum = candidates.reduce((acc, curr) => acc + curr.matchScore, 0);
      return Math.round(sum / candidates.length);
    });

    const handleSearch = async (filters) => {
      empresaStore.setFilters(filters);
      searchDone.value = true;
      await empresaStore.runSearch();
    };

    const handleSwipeLeft = () => {
      empresaStore.swipeLeft();
    };

    const handleSwipeRight = async () => {
      const candidate = empresaStore.currentCandidate;
      if (!candidate) return;
      matchedCandidate.value = candidate;
      await empresaStore.swipeRight();
      showMatchModal.value = true;
    };

    const handleExpand = (candidate) => {
      selectedCandidate.value = candidate;
      isModalOpen.value = true;
    };

    const logout = () => {
      authStore.logout();
      router.push({ name: 'Home' });
    };

    return {
      searchDone,
      selectedCandidate,
      isModalOpen,
      showMatchModal,
      matchedCandidate,
      showMatchesSidebar,
      matchesList,
      averageScore,
      empresaStore,
      handleSearch,
      handleSwipeLeft,
      handleSwipeRight,
      handleExpand,
      logout,
      postulanteStore
    };
  }
};
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
.animate-in {
  animation: enter 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
