<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal Container -->
    <div class="relative w-full max-w-2xl bg-white dark:bg-navy text-slate-900 dark:text-white rounded-[30px] overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-300">
      
      <!-- Top banner -->
      <div class="h-2.5 bg-gradient-to-r from-primary-container to-primary"></div>
      
      <!-- Header -->
      <div class="p-6 border-b border-slate-100 flex justify-between items-start text-left">
        <div>
          <!-- Badges -->
          <div class="flex items-center space-x-2 mb-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-container/10 text-primary">
              Match {{ candidate.matchScore }}%
            </span>
            <span v-if="candidate.inclusion_ley_21015?.activo" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600">
              Ley N° 21.015
            </span>
          </div>
          
          <h2 class="font-display text-headline-sm font-bold text-slate-900 leading-tight">
            {{ candidate.nombre_social || candidate.nombre_legal }}
          </h2>
          <p class="text-xs font-semibold text-slate mt-1">
            {{ candidate.formacion.area_laboral }}
          </p>
        </div>
        
        <button @click="close" class="p-1.5 rounded-full bg-slate-100 text-slate hover:bg-slate-200 transition-colors">
          <span class="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
      
      <!-- Content (Scrollable) -->
      <div class="p-6 overflow-y-auto space-y-6 text-left">
        
        <!-- Contact & Basic Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-container-low/40 p-5 rounded-2xl">
          <div>
            <h4 class="text-xs font-bold text-slate uppercase tracking-wider">Ubicación</h4>
            <p class="text-sm text-slate-800 font-semibold mt-1">
              {{ candidate.ubicacion.comuna_residencia === 'Otra' && candidate.ubicacion.comuna_otra ? candidate.ubicacion.comuna_otra : candidate.ubicacion.comuna_residencia }},
              {{ candidate.ubicacion.region_residencia }}
            </p>
          </div>
          
          <div>
            <h4 class="text-xs font-bold text-slate uppercase tracking-wider">Experiencia Total</h4>
            <p class="text-sm text-slate-800 font-semibold mt-1">
              {{ candidate.formacion.experiencia_laboral_total_anos }} años acumulados
            </p>
          </div>
          
          <div>
            <h4 class="text-xs font-bold text-slate uppercase tracking-wider">Nivel de Estudios</h4>
            <p class="text-sm text-slate-800 font-semibold mt-1 capitalize">
              {{ candidate.formacion.nivel_estudios.replace('-', ' ') }}
            </p>
          </div>
          
          <div>
            <h4 class="text-xs font-bold text-slate uppercase tracking-wider">Contacto Directo</h4>
            <div class="flex items-center space-x-3 mt-1">
              <!-- Whatsapp -->
              <a :href="'https://wa.me/' + candidate.contacto.whatsapp.replace('+', '')" target="_blank" class="text-emerald-600 hover:text-emerald-500 font-bold text-xs">
                WhatsApp
              </a>
              <span class="text-slate-light">|</span>
              <!-- Email -->
              <a :href="'mailto:' + candidate.contacto.email" class="text-primary hover:text-primary-container font-bold text-xs">
                Email
              </a>
              <span v-if="candidate.contacto.linkedin" class="text-slate-light">|</span>
              <!-- Linkedin -->
              <a v-if="candidate.contacto.linkedin" :href="candidate.contacto.linkedin" target="_blank" class="text-sky-600 hover:text-sky-500 font-bold text-xs">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <!-- Certificaciones -->
        <div class="space-y-2">
          <h3 class="font-display text-sm font-bold text-slate-900 flex items-center">
            <span class="material-symbols-outlined mr-2 text-primary text-xl">verified</span>
            Certificaciones
          </h3>
          <p class="text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line leading-relaxed">
            {{ candidate.formacion.certificaciones || 'El postulante no ha ingresado certificaciones específicas.' }}
          </p>
        </div>

        <!-- Historial Laboral -->
        <div class="space-y-4">
          <h3 class="font-display text-sm font-bold text-slate-900 flex items-center">
            <span class="material-symbols-outlined mr-2 text-primary text-xl">work</span>
            Historial de Experiencia
          </h3>
          
          <div class="space-y-4">
            <div 
              v-for="(exp, index) in activeExperiences" 
              :key="index"
              class="p-5 bg-white border border-outline-variant/35 rounded-2xl shadow-sm relative"
            >
              <h4 class="text-sm font-bold text-slate-950">{{ exp.cargo }}</h4>
              <p class="text-[10px] font-bold text-primary mt-0.5 uppercase tracking-wide">{{ exp.empresa }}</p>
              
              <p class="text-xs text-slate-600 mt-3 leading-relaxed whitespace-pre-line border-t border-slate-50 pt-2">
                {{ exp.funciones }}
              </p>
            </div>
            
            <div v-if="activeExperiences.length === 0" class="text-center py-6 text-xs text-slate">
              Sin historial laboral registrado.
            </div>
          </div>
        </div>

        <!-- Inclusión Detalles -->
        <div v-if="candidate.inclusion_ley_21015?.activo" class="bg-emerald-50/50 border border-emerald-100 p-5 rounded-[20px]">
          <h3 class="text-xs font-bold text-emerald-800 flex items-center mb-2">
            <span class="material-symbols-outlined mr-2 text-emerald-600">check_circle</span>
            Beneficiario Ley N° 21.015 (Inclusión Laboral)
          </h3>
          <p class="text-[10px] text-emerald-700 leading-relaxed">
            Este postulante está acogido a la ley de inclusión laboral en Chile.
          </p>
          <div class="mt-4">
            <h4 class="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider mb-2">Ajustes Razonables Requeridos:</h4>
            <div class="flex flex-wrap gap-1.5">
              <span 
                v-for="ajuste in candidate.inclusion_ley_21015.ajustes_razonables" 
                :key="ajuste" 
                class="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold"
              >
                {{ ajuste }}
              </span>
              <span v-if="!candidate.inclusion_ley_21015.ajustes_razonables?.length" class="text-xs text-emerald-600/70">
                Ninguno especificado.
              </span>
            </div>
          </div>
        </div>

      </div>
      
      <!-- Footer Actions -->
      <div class="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <span class="text-[10px] font-bold text-slate uppercase tracking-widest">
          ID: {{ candidate.id || candidate.auth0_id }}
        </span>
        <button 
          @click="close" 
          class="px-6 py-2.5 bg-gradient-to-r from-primary-container to-primary text-white text-xs font-bold rounded-full transition-all shadow-md shadow-primary-container/10 active:scale-95"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'CandidatoModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    candidate: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close');
    };

    const activeExperiences = computed(() => {
      if (!props.candidate?.historial_laboral) return [];
      return props.candidate.historial_laboral.filter(
        exp => exp.cargo?.trim() || exp.empresa?.trim()
      );
    });

    return {
      close,
      activeExperiences
    };
  }
};
</script>
