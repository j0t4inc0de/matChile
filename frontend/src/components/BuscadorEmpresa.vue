<template>
  <div class="bg-white dark:bg-navy text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-xl w-full max-w-xl mx-auto">
    
    <div class="flex items-center space-x-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-brand-primary/10 dark:bg-teal/10 flex items-center justify-center">
        <svg class="w-5 h-5 text-brand-primary dark:text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <div>
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white font-sans">Buscador Inteligente</h2>
        <p class="text-xs text-slate dark:text-slate">Configura los parámetros para el Match.</p>
      </div>
    </div>

    <form @submit.prevent="submitSearch" class="space-y-6">
      
      <!-- Paso 1: Nivel de Formación -->
      <div class="space-y-2.5">
        <label class="block text-sm font-bold text-slate-700 dark:text-slate-light">
          1. Nivel de Formación
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            type="button"
            v-for="nivel in niveles"
            :key="nivel.value"
            @click="selectNivel(nivel.value)"
            class="py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center space-y-1.5"
            :class="filters.nivel_estudios === nivel.value
              ? 'bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/10'
              : 'bg-white dark:bg-navy-mid border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-light hover:border-slate-300 dark:hover:border-slate-600'"
          >
            <span class="capitalize">{{ nivel.label }}</span>
          </button>
        </div>
      </div>

      <!-- Paso 2: Sector de Especialidad (Dynamic based on step 1) -->
      <Transition name="fade">
        <div v-if="filters.nivel_estudios" class="space-y-2.5">
          <label for="sector-select" class="block text-sm font-bold text-slate-700 dark:text-slate-light">
            2. Sector de Especialidad
          </label>
          <select
            id="sector-select"
            v-model="filters.sector"
            @change="onSectorChange"
            class="w-full px-4 py-3 bg-slate-50 dark:bg-navy-mid border border-slate-200 dark:border-white/20 rounded-xl text-sm text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
          >
            <option value="" disabled>Seleccione un sector...</option>
            <option 
              v-for="sector in availableSectores" 
              :key="sector.nombre" 
              :value="sector.nombre"
            >
              {{ sector.nombre }}
            </option>
          </select>
        </div>
      </Transition>

      <!-- Paso 3: Profesión Específica (Dynamic based on step 2) -->
      <Transition name="fade">
        <div v-if="filters.nivel_estudios && filters.sector" class="space-y-2.5">
          <label id="profesion-label" class="block text-sm font-bold text-slate-700 dark:text-slate-light">
            3. Profesión / Oficio Específico
          </label>
          <select
            aria-labelledby="profesion-label"
            v-model="filters.area_laboral"
            class="w-full px-4 py-3 bg-slate-50 dark:bg-navy-mid border border-slate-200 dark:border-white/20 rounded-xl text-sm text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-colors"
          >
            <option value="" disabled>Seleccione una carrera...</option>
            <option 
              v-for="carrera in availableCarreras" 
              :key="carrera.carrera" 
              :value="carrera.carrera"
            >
              {{ carrera.carrera }}
            </option>
          </select>
        </div>
      </Transition>

      <!-- Parámetros Avanzados / Filtros Adicionales (Collapsible) -->
      <Transition name="fade">
        <div v-if="isStep3Complete" class="space-y-5 pt-2 border-t border-slate-100 dark:border-white/10">
          
          <div class="flex justify-between items-center">
            <h3 class="text-xs font-bold text-slate dark:text-slate uppercase tracking-wider">Filtros Avanzados</h3>
            <button 
              type="button" 
              @click="showAdvanced = !showAdvanced"
              class="text-xs font-semibold text-brand-primary hover:text-brand-primaryHover"
            >
              {{ showAdvanced ? 'Ocultar' : 'Configurar' }}
            </button>
          </div>

          <!-- Advanced Panel Content -->
          <div v-show="showAdvanced" class="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <!-- Ubicación de Oferta (Regiones de Chile) -->
            <div class="space-y-2">
              <label for="region-select" class="block text-xs font-bold text-slate-600 dark:text-slate">
                Región de la Oferta Laboral
              </label>
              <select
                id="region-select"
                v-model="filters.region_oferta"
                class="w-full px-4 py-2.5 bg-slate-50 dark:bg-navy-mid border border-slate-200 dark:border-white/20 rounded-xl text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
              >
                <option value="">Cualquier región de Chile (Remoto / Traslado)</option>
                <option 
                  v-for="region in regiones" 
                  :key="region.nombre" 
                  :value="region.nombre"
                >
                  {{ region.nombre }}
                </option>
              </select>
            </div>

            <!-- Años de Experiencia Requerida -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label for="experiencia-slider" class="block text-xs font-bold text-slate-600 dark:text-slate">
                  Experiencia Requerida
                </label>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-light">
                  {{ filters.experiencia_solicitada === 0 ? 'Sin mínimo' : `${filters.experiencia_solicitada} años o más` }}
                </span>
              </div>
              <input
                id="experiencia-slider"
                type="range"
                min="0"
                max="10"
                v-model.number="filters.experiencia_solicitada"
                class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
            </div>

            <!-- Boosters switches -->
            <div class="grid grid-cols-1 gap-2.5 pt-1">
              <!-- Ley 21015 Inclusion -->
              <label class="relative flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-navy-mid/40 cursor-pointer select-none">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-850 dark:text-white">Ley N° 21.015 (Inclusión)</span>
                  <span class="text-[10px] text-slate">Prioriza candidatos con discapacidad (+5 pts)</span>
                </div>
                <input
                  type="checkbox"
                  v-model="filters.exigir_ley_21015"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[8px] after:right-[15px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-500 relative"></div>
              </label>

              <!-- Certificaciones -->
              <label class="relative flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-navy-mid/40 cursor-pointer select-none">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-slate-850 dark:text-white">Valorar Certificaciones</span>
                  <span class="text-[10px] text-slate">Puntaje adicional si cuenta con certificaciones (+5 pts)</span>
                </div>
                <input
                  type="checkbox"
                  v-model="filters.valorar_certificaciones"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[8px] after:right-[15px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-brand-primary relative"></div>
              </label>
            </div>

          </div>

          <!-- Buscar CTA Button -->
          <button
            type="submit"
            :disabled="!isSearchValid"
            class="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-brand-primary hover:bg-brand-primaryHover disabled:bg-slate-200 dark:disabled:bg-navy-mid disabled:text-slate dark:disabled:text-slate-600 transition-all shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20 flex items-center justify-center space-x-2"
          >
            <span>Buscar Candidatos</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>

        </div>
      </Transition>

    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { REGIONES, SECTORES } from '../data/chileData';

export default {
  name: 'BuscadorEmpresa',
  emits: ['search'],
  setup(props, { emit }) {
    const showAdvanced = ref(true);
    
    const niveles = [
      { value: 'universitario', label: 'universitario' },
      { value: 'tecnico-profesional', label: 'técnico prof.' },
      { value: 'oficio', label: 'oficio / ocupación' }
    ];

    const filters = reactive({
      nivel_estudios: '',
      sector: '',
      area_laboral: '',
      experiencia_solicitada: 0,
      region_oferta: '',
      exigir_ley_21015: false,
      valorar_certificaciones: false
    });

    const selectNivel = (nivel) => {
      filters.nivel_estudios = nivel;
      filters.sector = '';
      filters.area_laboral = '';
    };

    const onSectorChange = () => {
      filters.area_laboral = '';
    };

    // Filter sectors containing courses/professions in selected level
    const availableSectores = computed(() => {
      if (!filters.nivel_estudios) return [];
      return SECTORES.filter(sector => {
        return sector.niveles[filters.nivel_estudios] !== undefined;
      });
    });

    // Filter professions based on level and sector selected
    const availableCarreras = computed(() => {
      if (!filters.nivel_estudios || !filters.sector) return [];
      const sectorObj = SECTORES.find(s => s.nombre === filters.sector);
      if (!sectorObj || !sectorObj.niveles[filters.nivel_estudios]) return [];
      return sectorObj.niveles[filters.nivel_estudios];
    });

    const isStep3Complete = computed(() => {
      return !!filters.nivel_estudios && !!filters.sector && !!filters.area_laboral;
    });

    const isSearchValid = computed(() => {
      return isStep3Complete.value;
    });

    const submitSearch = () => {
      if (!isSearchValid.value) return;
      emit('search', { ...filters });
    };

    return {
      niveles,
      filters,
      regiones: REGIONES,
      availableSectores,
      availableCarreras,
      showAdvanced,
      selectNivel,
      onSectorChange,
      isStep3Complete,
      isSearchValid,
      submitSearch
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
