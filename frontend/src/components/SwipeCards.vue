<template>
  <div class="relative w-full max-w-sm mx-auto flex flex-col h-[520px] justify-between items-center select-none">
    
    <!-- Cards Container -->
    <div class="relative w-full flex-1 flex items-center justify-center">
      <div 
        v-if="candidates.length > 0 && currentIndex < candidates.length"
        class="relative w-full h-[400px]"
      >
        <!-- Stack of Cards (Render 2 cards for depth effect) -->
        <div 
          v-for="(candidate, index) in visibleStack" 
          :key="candidate.id"
          @mousedown="index === 0 && startDrag($event)"
          @touchstart="index === 0 && startDrag($event)"
          class="absolute w-full h-full p-6 shadow-2xl flex flex-col justify-between cursor-grab active:cursor-grabbing border select-none"
          :style="index === 0 ? cardStyle : {}"
          :class="[
            index === 0 
              ? 'z-20 scale-100 glass-panel rounded-[30px] border-white/60' 
              : 'z-10 scale-95 translate-y-4 opacity-50 pointer-events-none bg-white/70 border-white/30 rounded-[30px]'
          ]"
        >
          <!-- Tinder stamp indicators -->
          <div 
            v-if="index === 0 && isDragging && dragX > 20 && Math.abs(dragX) > Math.abs(dragY)" 
            class="absolute top-8 left-8 border-4 border-emerald-500 text-emerald-500 font-display uppercase tracking-widest text-lg font-black px-4 py-1.5 rounded rotate-[-12deg] select-none pointer-events-none z-35 bg-black/5 backdrop-blur-xs"
            :style="{ opacity: Math.min(dragX / 100, 1) }"
          >
            CONECTAR
          </div>
          <div 
            v-if="index === 0 && isDragging && dragX < -20 && Math.abs(dragX) > Math.abs(dragY)" 
            class="absolute top-8 right-8 border-4 border-rose-500 text-rose-500 font-display uppercase tracking-widest text-lg font-black px-4 py-1.5 rounded rotate-[12deg] select-none pointer-events-none z-35 bg-black/5 backdrop-blur-xs"
            :style="{ opacity: Math.min(-dragX / 100, 1) }"
          >
            DESCARTAR
          </div>
          <div 
            v-if="index === 0 && isDragging && dragY < -20 && Math.abs(dragY) > Math.abs(dragX)" 
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-sky-500 text-sky-500 font-display uppercase tracking-widest text-lg font-black px-6 py-2.5 rounded select-none pointer-events-none z-35 bg-black/5 backdrop-blur-xs text-center"
            :style="{ opacity: Math.min(-dragY / 100, 1) }"
          >
            PRIORITARIO
          </div>

          <!-- Card Header -->
          <div class="flex justify-between items-start pointer-events-none">
            <span class="inline-flex items-center px-3 py-1 bg-primary-container/10 border border-primary-container/20 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
              Afinidad {{ candidate.matchScore }}%
            </span>
            <span 
              v-if="candidate.inclusion_ley_21015?.activo"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase tracking-wider animate-pulse"
            >
              Ley N° 21.015
            </span>
          </div>

          <!-- Avatar & Details -->
          <div class="flex flex-col items-center text-center my-4 pointer-events-none">
            <!-- Initial Circle with Glow -->
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-container to-primary text-white font-display text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary-container/10 mb-4 select-none relative">
              {{ getInitials(candidate.nombre_social || candidate.nombre_legal) }}
              <div class="absolute inset-0 rounded-full bg-primary-container/10 animate-ping pointer-events-none -z-10"></div>
            </div>
            
            <!-- Name (Social name has priority) -->
            <h3 class="font-display text-lg font-bold text-slate-900 tracking-tight line-clamp-1">
              {{ candidate.nombre_social || candidate.nombre_legal }}
            </h3>
            
            <!-- Area Laboral -->
            <p class="text-xs text-primary font-bold mt-1 line-clamp-1 uppercase tracking-wider">
              {{ candidate.formacion.area_laboral }}
            </p>
            
            <!-- Location and Experiencia -->
            <p class="text-xs text-slate mt-2.5 leading-relaxed max-w-[280px]">
              {{ candidate.formacion.experiencia_laboral_total_anos }} años exp · Reside en {{ candidate.ubicacion.comuna_residencia }}
            </p>
          </div>

          <!-- Actions Footer -->
          <div class="flex justify-between items-center border-t border-slate-100 pt-4">
            <div class="text-left pointer-events-none">
              <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Certificaciones</span>
              <span class="text-xs font-semibold text-slate-700">
                {{ getCertCount(candidate) }} registradas
              </span>
            </div>
            
            <!-- Expand Button (Stop propagation to prevent drag trigger) -->
            <button 
              @click.stop="expandCandidate(candidate)"
              @touchstart.stop
              class="text-xs font-bold text-primary hover:text-primary-container transition-colors flex items-center space-x-1"
            >
              <span>Ver Detalle</span>
              <span class="material-symbols-outlined text-sm">visibility</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- No more cards message -->
      <div 
        v-else 
        class="glass-panel border border-white/40 rounded-[30px] p-8 shadow-2xl text-center flex flex-col justify-center items-center h-[380px] w-full"
      >
        <div class="w-16 h-16 rounded-2xl bg-white border border-outline-variant/30 text-slate flex items-center justify-center mb-4 shadow-sm">
          <span class="material-symbols-outlined text-3xl">inbox</span>
        </div>
        <h3 class="font-display text-lg font-bold text-slate-800">Fin del Mazo</h3>
        <p class="text-xs text-slate mt-2 max-w-[220px] leading-relaxed">
          No hay más candidatos que cumplan con el perfil solicitado.
        </p>
      </div>
    </div>

    <!-- Bottom Action Buttons (Tinder Style) -->
    <div 
      v-if="candidates.length > 0 && currentIndex < candidates.length"
      class="flex justify-center items-center space-x-4 w-full mt-6"
    >
      <!-- Rewind / Undo Button -->
      <button 
        @click="$emit('undo')"
        :disabled="!canUndo"
        class="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/50 text-amber-500 hover:bg-amber-100 flex items-center justify-center shadow-md transition-all active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-50"
        aria-label="Deshacer último deslizamiento"
        title="Deshacer (Teclas: Backspace / Flecha Abajo)"
      >
        <span class="material-symbols-outlined text-3xl font-bold">undo</span>
      </button>

      <!-- Dislike Button -->
      <button 
        @click="triggerSwipe('left')"
        class="w-16 h-16 rounded-full bg-rose-50 border border-rose-200/50 text-rose-500 hover:bg-rose-100 flex items-center justify-center shadow-lg transition-transform duration-150 active:scale-90"
        aria-label="Rechazar candidato"
        title="Descartar (Flecha Izquierda)"
      >
        <span class="material-symbols-outlined text-3xl font-bold">close</span>
      </button>

      <!-- Super Like Button -->
      <button 
        @click="triggerSwipe('up')"
        class="w-16 h-16 rounded-full bg-sky-50 border border-sky-200/50 text-sky-500 hover:bg-sky-100 flex items-center justify-center shadow-md transition-all active:scale-90"
        aria-label="Super Match candidato"
        title="Super Match (Flecha Arriba)"
      >
        <span class="material-symbols-outlined text-3xl font-bold">star</span>
      </button>

      <!-- Like / Match Button -->
      <button 
        @click="triggerSwipe('right')"
        class="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-500 hover:bg-emerald-100 flex items-center justify-center shadow-lg transition-transform duration-150 active:scale-90"
        aria-label="Aceptar / Conectar candidato"
        title="Conectar (Flecha Derecha)"
      >
        <span class="material-symbols-outlined text-3xl font-bold">check</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'SwipeCards',
  props: {
    candidates: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    modalOpen: {
      type: Boolean,
      default: false
    },
    canUndo: {
      type: Boolean,
      default: false
    }
  },
  emits: ['swipe-left', 'swipe-right', 'super-like', 'undo', 'expand'],
  setup(props, { emit }) {
    const swipeDirection = ref(null);
    
    // Drag variables
    const dragStartX = ref(0);
    const dragStartY = ref(0);
    const dragX = ref(0);
    const dragY = ref(0);
    const isDragging = ref(false);

    const visibleStack = computed(() => {
      const start = props.currentIndex;
      if (start >= props.candidates.length) return [];
      return props.candidates.slice(start, start + 2);
    });

    const getInitials = (name) => {
      if (!name) return 'U';
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    };

    const getCertCount = (candidate) => {
      const certs = candidate.formacion.certificaciones;
      if (!certs?.trim()) return 0;
      return certs.split(/[,;]/).filter(c => c.trim().length > 0).length;
    };

    const expandCandidate = (candidate) => {
      emit('expand', candidate);
    };

    const triggerSwipe = (direction) => {
      if (swipeDirection.value) return;
      swipeDirection.value = direction;
      
      setTimeout(() => {
        if (direction === 'left') {
          emit('swipe-left');
        } else if (direction === 'right') {
          emit('swipe-right');
        } else if (direction === 'up') {
          emit('super-like');
        }
        swipeDirection.value = null;
        dragX.value = 0;
        dragY.value = 0;
      }, 400);
    };

    // Card styling binding to handle smooth translation / rotations dynamically
    const cardStyle = computed(() => {
      if (swipeDirection.value === 'left') {
        return {
          transform: 'translateX(-150%) rotate(-20deg)',
          opacity: '0',
          transition: 'all 0.4s ease-in-out'
        };
      }
      if (swipeDirection.value === 'right') {
        return {
          transform: 'translateX(150%) rotate(20deg)',
          opacity: '0',
          transition: 'all 0.4s ease-in-out'
        };
      }
      if (swipeDirection.value === 'up') {
        return {
          transform: 'translateY(-150%) scale(0.95)',
          opacity: '0',
          transition: 'all 0.4s ease-in-out'
        };
      }
      if (isDragging.value) {
        const rotate = dragX.value * 0.05;
        return {
          transform: `translate3d(${dragX.value}px, ${dragY.value}px, 0) rotate(${rotate}deg)`,
          transition: 'none',
          cursor: 'grabbing'
        };
      }
      return {
        transform: 'translate3d(0, 0, 0) rotate(0deg)',
        transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      };
    });

    // Drag-to-swipe Touch and Mouse event handlers
    const startDrag = (event) => {
      if (swipeDirection.value) return;
      isDragging.value = true;
      
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      
      dragStartX.value = clientX;
      dragStartY.value = clientY;
      dragX.value = 0;
      dragY.value = 0;
      
      if (event.touches) {
        window.addEventListener('touchmove', handleDragMove, { passive: false });
        window.addEventListener('touchend', handleDragEnd);
      } else {
        window.addEventListener('mousemove', handleDragMove);
        window.addEventListener('mouseup', handleDragEnd);
      }
    };

    const handleDragMove = (event) => {
      if (!isDragging.value) return;
      
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;
      
      dragX.value = clientX - dragStartX.value;
      dragY.value = clientY - dragStartY.value;

      // Prevent page scrolling on mobile only if swiping or dragging
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    const handleDragEnd = () => {
      if (!isDragging.value) return;
      isDragging.value = false;
      
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
      
      const threshold = 120; // Drag threshold in px
      if (dragY.value < -threshold && Math.abs(dragY.value) > Math.abs(dragX.value)) {
        triggerSwipe('up');
      } else if (dragX.value > threshold) {
        triggerSwipe('right');
      } else if (dragX.value < -threshold) {
        triggerSwipe('left');
      } else {
        dragX.value = 0;
        dragY.value = 0;
      }
    };

    const handleKeyDown = (event) => {
      if (props.modalOpen) return;
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }
      if (event.key === 'ArrowLeft') {
        triggerSwipe('left');
      } else if (event.key === 'ArrowRight') {
        triggerSwipe('right');
      } else if (event.key === 'ArrowUp') {
        triggerSwipe('up');
      } else if (event.key === 'Backspace' || event.key === 'ArrowDown') {
        emit('undo');
      }
    };

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    });

    return {
      visibleStack,
      swipeDirection,
      dragX,
      dragY,
      isDragging,
      cardStyle,
      getInitials,
      getCertCount,
      expandCandidate,
      triggerSwipe,
      startDrag
    };
  }
};
</script>
