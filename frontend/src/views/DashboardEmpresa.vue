<template>
  <div class="min-h-screen bg-navy text-slate-light font-body flex flex-col justify-between relative overflow-hidden">
    
    <!-- Decorative Ambient Glow Backgrounds -->
    <div v-if="!postulanteStore.highContrastMode" class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
    <div v-if="!postulanteStore.highContrastMode" class="absolute bottom-0 left-10 w-[300px] h-[300px] bg-teal-dim/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

    <!-- Header (Navbar Kept Exactly As Original, only 2 CTA buttons on right, menu icon on left) -->
    <nav 
      class="h-[73px] px-4 sm:px-[5vw] flex justify-between items-center border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 bg-white/80 dark:bg-navy/80 backdrop-blur-md"
      :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#ffffff' } : {}"
    >
      <div class="nav-logo flex items-center gap-2 sm:gap-4">
        <!-- 3-Lines menu icon (Hamburger) -->
        <button 
          @click="showMatchesSidebar = !showMatchesSidebar"
          class="p-1.5 rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-navy-light/30 focus:outline-none flex items-center transition-colors"
          title="Menú de Navegación"
          :style="postulanteStore.highContrastMode ? { border: '1px solid #ffffff' } : {}"
        >
          <span class="material-symbols-outlined text-2xl font-bold">menu</span>
        </button>

        MatChile
        <span 
          class="text-[9px] uppercase font-extrabold tracking-widest text-teal border border-teal/20 px-2.5 py-0.5 rounded-full select-none" 
          style="font-family: var(--font-body); letter-spacing: 1px;"
          :style="postulanteStore.highContrastMode ? { color: '#ffff00', borderColor: '#ffff00' } : {}"
        > Empresa
        </span>
      </div>
      <div class="nav-cta flex gap-2 items-center">
        <!-- 1. Alto Contraste (A11y) -->
        <button 
          @click="postulanteStore.toggleHighContrast()"
          class="btn-primary flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold focus:outline-none"
          :title="postulanteStore.highContrastMode ? 'Modo Normal' : 'Alto Contraste'"
          :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffff00', color: '#000000' } : {}"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">contrast</span>
          <span class="hidden sm:inline">{{ postulanteStore.highContrastMode ? 'Normal' : 'A11y' }}</span>
        </button>
        <!-- 2. Salir -->
        <button 
          @click="logout" 
          class="btn-ghost flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold focus:outline-none"
          title="Cerrar Sesión"
          :style="postulanteStore.highContrastMode ? { borderColor: '#ffffff', color: '#ffffff' } : {}"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">logout</span>
          <span class="hidden sm:inline">Salir</span>
        </button>
      </div>
    </nav>

    <!-- Main Workspace -->
    <main class="flex-grow max-w-container-max w-full mx-auto px-4 lg:px-6 py-6 lg:py-10 flex flex-col lg:flex-row gap-8 items-start relative">
      
      <!-- Backdrop for drawer (Starts below the navbar) -->
      <div 
        v-if="showMatchesSidebar" 
        class="fixed inset-0 top-[73px] bg-slate-950/60 backdrop-blur-sm z-30"
        @click="showMatchesSidebar = false"
      ></div>

      <!-- Left Sidebar (Drawer below navbar) -->
      <div 
        class="fixed top-[73px] left-0 h-[calc(100vh-73px)] w-80 max-w-[80vw] z-40 p-6 flex flex-col space-y-5 bg-white dark:bg-navy border-r border-slate-200 dark:border-white/10 shadow-2xl transition-transform duration-300 lg:glass-panel lg:border-white/40"
        :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#ffffff' } : {}"
        :class="[
          showMatchesSidebar ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <!-- Close and title -->
        <div class="border-b border-outline-variant/20 pb-3 flex justify-between items-center">
          <div class="text-left">
            <h3 class="font-display text-sm font-extrabold text-primary flex items-center" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">
              <span class="material-symbols-outlined mr-2 text-xl">domain</span>
              NAVEGACIÓN
            </h3>
          </div>
          <!-- Close Button -->
          <button 
            @click="showMatchesSidebar = false" 
            class="p-1 rounded-full bg-slate-100 dark:bg-navy-mid hover:bg-slate-200 text-slate focus:outline-none"
          >
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <!-- 1. NAVIGATION TABS -->
        <div class="flex flex-col space-y-1.5 text-left w-full">
          <!-- Tab: Buscar Talentos -->
          <button 
            @click="activeTab = 'search'; showMatchesSidebar = false"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full focus:outline-none"
            :class="[
              activeTab === 'search' 
                ? (postulanteStore.highContrastMode ? 'bg-white text-black border-2 border-white' : 'bg-primary text-white shadow-md shadow-primary/10') 
                : 'text-slate hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-navy-light/30 border border-transparent'
            ]"
          >
            <span class="material-symbols-outlined text-base">search</span>
            <span>Buscar Talentos</span>
          </button>

          <!-- Tab: Conexiones Directas -->
          <button 
            @click="activeTab = 'connections'; showMatchesSidebar = false"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full focus:outline-none"
            :class="[
              activeTab === 'connections' 
                ? (postulanteStore.highContrastMode ? 'bg-white text-black border-2 border-white' : 'bg-primary text-white shadow-md shadow-primary/10') 
                : 'text-slate hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-navy-light/30 border border-transparent'
            ]"
          >
            <span class="material-symbols-outlined text-base">handshake</span>
            <span>Conexiones Directas</span>
          </button>

          <!-- Tab: Bandeja de Chats -->
          <button 
            @click="activeTab = 'chats'; showMatchesSidebar = false"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full focus:outline-none"
            :class="[
              activeTab === 'chats' 
                ? (postulanteStore.highContrastMode ? 'bg-white text-black border-2 border-white' : 'bg-primary text-white shadow-md shadow-primary/10') 
                : 'text-slate hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-navy-light/30 border border-transparent'
            ]"
          >
            <span class="material-symbols-outlined text-base">forum</span>
            <span>Bandeja de Chats</span>
          </button>

          <!-- Tab: Perfil Empresa -->
          <button 
            @click="activeTab = 'profile'; showMatchesSidebar = false"
            class="flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left w-full focus:outline-none"
            :class="[
              activeTab === 'profile' 
                ? (postulanteStore.highContrastMode ? 'bg-white text-black border-2 border-white' : 'bg-primary text-white shadow-md shadow-primary/10') 
                : 'text-slate hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-navy-light/30 border border-transparent'
            ]"
          >
            <span class="material-symbols-outlined text-base">domain</span>
            <span>Perfil Empresa</span>
          </button>
        </div>

        <div class="border-t border-outline-variant/10 my-1"></div>
        
        <!-- 2. QUICK CONNECTIONS LIST (Handshake icon) -->
        <div class="flex flex-col space-y-3 text-left w-full">
          <div class="flex justify-between items-center">
            <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Lista de Contacto</span>
          </div>
          
          <!-- Contacts list scroll -->
          <div class="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            <div 
              v-for="match in matchesList" 
              :key="match.id"
              @click="openChatWithCandidate(match); showMatchesSidebar = false"
              class="p-3 bg-white rounded-2xl border border-outline-variant/30 hover:border-primary/50 transition-colors flex items-center justify-between shadow-sm cursor-pointer"
              :class="[
                match.isSuperMatch 
                  ? (postulanteStore.highContrastMode ? 'border-2 border-sky-400 bg-black text-white' : 'bg-sky-50/70 border-sky-300 dark:bg-sky-950/20 dark:border-sky-850') 
                  : (postulanteStore.highContrastMode ? 'border-2 border-white bg-black text-white' : 'bg-white border-outline-variant/30 hover:border-outline-variant/60')
              ]"
            >
              <div class="space-y-0.5 truncate pr-2">
                <h4 class="text-[11px] font-black leading-tight flex items-center gap-1" :class="postulanteStore.highContrastMode ? 'text-white' : 'text-slate-900 dark:text-white'">
                  {{ match.nombre_social || match.nombre_legal }}
                  <span v-if="match.isSuperMatch" class="material-symbols-outlined text-[11px] text-sky-500 font-bold" title="Super Match">star</span>
                </h4>
                <p class="text-[9px] text-slate-500 truncate">{{ match.formacion.area_laboral }}</p>
              </div>
              
              <div class="text-right shrink-0">
                <span class="text-[8px] font-bold text-slate uppercase tracking-wider block">Afinidad</span>
                <span class="text-xs font-black text-primary" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">
                  {{ match.matchScore }}%
                </span>
              </div>
            </div>
            
            <div v-if="matchesList.length === 0" class="text-center py-6 text-[10px] text-slate">
              Sin conexiones registradas en el mazo.
            </div>
          </div>
        </div>
      </div>

      <!-- Center Space -->
      <div class="flex-grow w-full flex flex-col items-center space-y-6">
        
        <!-- 1. TAB: BUSCAR TALENTOS -->
        <div v-if="activeTab === 'search'" class="w-full flex flex-col items-center space-y-6">
          <!-- Stats summary panel -->
          <div 
            v-if="searchDone && !empresaStore.isLoading" 
            class="w-full max-w-sm grid grid-cols-3 gap-4 p-4 bg-white border border-outline-variant/30 rounded-2xl text-center select-none shadow-sm"
            :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#ffffff', color: '#ffffff' } : {}"
          >
            <div>
              <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Mazo</span>
              <span class="text-sm font-extrabold text-slate-800" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
                {{ empresaStore.candidates.length }} Perfiles
              </span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Afinidad Promedio</span>
              <span class="text-sm font-extrabold text-primary" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">
                {{ averageScore }}%
              </span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate uppercase tracking-wider block">Filtro SENCE</span>
              <span class="text-sm font-extrabold text-secondary" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">Activo</span>
            </div>
          </div>

          <!-- Buscador form -->
          <div v-if="!searchDone" class="w-full">
            <BuscadorEmpresa @search="handleSearch" />
          </div>

          <!-- Swipe interface -->
          <div v-else class="w-full flex flex-col items-center space-y-6">
            <div class="flex justify-between items-center w-full max-w-sm px-2">
              <button 
                @click="searchDone = false"
                class="text-xs font-bold text-slate-500 hover:text-primary flex items-center space-x-1.5 transition-colors group focus:outline-none"
                :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}"
              >
                <span class="material-symbols-outlined text-sm font-bold transform group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                <span>Nueva Búsqueda</span>
              </button>
              
              <div class="text-[10px] font-extrabold text-slate uppercase tracking-wider max-w-[200px] truncate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
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
              :can-undo="empresaStore.swipeHistory.length > 0"
              @swipe-left="handleSwipeLeft"
              @swipe-right="handleSwipeRight"
              @super-like="handleSuperLike"
              @undo="handleUndo"
              @expand="handleExpand"
            />
          </div>
        </div>

        <!-- 2. TAB: CONEXIONES DIRECTAS -->
        <div v-if="activeTab === 'connections'" class="w-full space-y-6">
          <div class="border-b pb-3 mb-6 text-left" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/20'">
            <h3 class="font-display text-lg font-bold">Conexiones Directas Establecidas</h3>
            <p class="text-xs mt-0.5 text-slate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
              Listado de postulantes vinculados. Puede abrir su chat directo o exportar el CV en formato oficial SENCE.
            </p>
          </div>

          <div v-if="matchesList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left w-full">
            <div 
              v-for="candidate in matchesList" 
              :key="candidate.id"
              class="rounded-3xl border p-5 flex flex-col justify-between shadow-md relative"
              :class="[
                candidate.isSuperMatch 
                  ? (postulanteStore.highContrastMode ? 'border-2 border-sky-400 bg-black' : 'bg-sky-50/70 border-sky-300 dark:bg-sky-950/20 dark:border-sky-900') 
                  : (postulanteStore.highContrastMode ? 'border-2 border-white bg-black' : 'bg-white border-outline-variant/30')
              ]"
            >
              <!-- Badge -->
              <div class="flex justify-between items-start mb-3">
                <span class="inline-flex items-center px-2.5 py-0.5 bg-primary-container/10 border border-primary-container/20 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider"
                      :style="postulanteStore.highContrastMode ? { color: '#ffff00', borderColor: '#ffff00' } : {}">
                  Afinidad {{ candidate.matchScore }}%
                </span>
                
                <span 
                  v-if="candidate.isSuperMatch"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-sky-500/10 text-sky-600 border border-sky-500/20 uppercase tracking-wider"
                  :style="postulanteStore.highContrastMode ? { color: '#38bdf8', borderColor: '#38bdf8' } : {}"
                >
                  Prioritario
                </span>
              </div>

              <!-- Information -->
              <div class="space-y-1.5 mb-6">
                <h4 class="text-base font-black text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
                  {{ candidate.nombre_social || candidate.nombre_legal }}
                  <span v-if="candidate.isSuperMatch" class="material-symbols-outlined text-[14px] text-sky-500 font-bold" title="Super Match">star</span>
                </h4>
                <p class="text-xs font-bold text-primary" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">
                  {{ candidate.formacion.area_laboral }}
                </p>
                <p class="text-xs text-slate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
                  {{ candidate.formacion.experiencia_laboral_total_anos }} años exp · {{ candidate.ubicacion.comuna_residencia }}, {{ candidate.ubicacion.region_residencia }}
                </p>
              </div>

              <!-- Actions -->
              <div class="grid grid-cols-3 gap-2 border-t pt-4" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-slate-100'">
                <!-- Open Chat -->
                <button 
                  @click="openChatWithCandidate(candidate)"
                  class="py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full flex flex-col items-center justify-center transition-all active:scale-95 focus:outline-none"
                  :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000' } : {}"
                  title="Abrir Chat"
                >
                  <span class="material-symbols-outlined text-base">forum</span>
                  <span class="text-[9px] font-bold mt-0.5">Chat</span>
                </button>

                <!-- Ver Detalle -->
                <button 
                  @click="handleExpand(candidate)"
                  class="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 focus:outline-none"
                  :style="postulanteStore.highContrastMode ? { border: '1px solid #ffffff', backgroundColor: '#000000', color: '#ffffff' } : {}"
                  title="Ver Detalles"
                >
                  <span class="material-symbols-outlined text-base">visibility</span>
                  <span class="text-[9px] font-bold mt-0.5">Detalle</span>
                </button>

                <!-- Exportar CV Sence PDF -->
                <button 
                  @click="downloadResume(candidate)"
                  class="py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 focus:outline-none"
                  :style="postulanteStore.highContrastMode ? { border: '1px solid #00ff00', backgroundColor: '#000000', color: '#00ff00' } : {}"
                  title="Descargar CV Sence"
                >
                  <span class="material-symbols-outlined text-base">file_download</span>
                  <span class="text-[9px] font-bold mt-0.5">CV Sence</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Placeholder Connections -->
          <div 
            v-else 
            class="rounded-3xl border border-dashed p-16 text-center max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 w-full"
            :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/50'"
          >
            <span class="material-symbols-outlined text-5xl text-slate-400">handshake</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-white">Sin Conexiones Activas</h4>
            <p class="text-xs text-slate max-w-sm leading-relaxed" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
              Aún no ha establecido vinculaciones. Vaya a la pestaña de <strong class="text-primary" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">"Buscar Talentos"</strong> y deslice perfiles.
            </p>
            <button 
              @click="activeTab = 'search'" 
              class="px-6 py-2.5 bg-primary text-white font-bold text-xs rounded-full transition-all active:scale-95 focus:outline-none"
              :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000' } : {}"
            >
              Comenzar Búsqueda
            </button>
          </div>
        </div>

        <!-- 3. TAB: BANDEJA DE CHATS -->
        <div v-if="activeTab === 'chats'" class="w-full flex-grow flex flex-col w-full">
          <div class="border-b pb-3 mb-6 text-left" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/20'">
            <h3 class="font-display text-lg font-bold">Bandeja de Chats Directos</h3>
            <p class="text-xs mt-0.5 text-slate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
              Espacio de mensajería y coordinación técnica con los relatores conectados.
            </p>
          </div>

          <div v-if="matchesList.length > 0" class="flex-grow flex border rounded-3xl overflow-hidden h-[480px] w-full" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/30'">
            <!-- List left contacts -->
            <div class="w-1/3 bg-slate-50 dark:bg-navy-mid border-r flex flex-col overflow-y-auto" :class="postulanteStore.highContrastMode ? 'border-white bg-black' : 'border-outline-variant/20'">
              <div 
                v-for="candidate in matchesList" 
                :key="candidate.id"
                @click="openChatWithCandidate(candidate)"
                class="p-4 border-b flex items-center justify-between cursor-pointer hover:bg-slate-100/50 dark:hover:bg-navy-light/20 transition-all text-left"
                :class="[
                  activeChatCandidate && activeChatCandidate.id === candidate.id 
                    ? (postulanteStore.highContrastMode ? 'bg-white text-black' : 'bg-primary/10 border-l-4 border-l-primary') 
                    : (postulanteStore.highContrastMode ? 'border-white bg-black text-white' : 'border-slate-100')
                ]"
              >
                <div class="space-y-1 truncate pr-2">
                  <h4 class="text-xs font-black leading-tight truncate" :class="activeChatCandidate && activeChatCandidate.id === candidate.id && postulanteStore.highContrastMode ? 'text-black' : 'text-slate-900 dark:text-white'">
                    {{ candidate.nombre_social || candidate.nombre_legal }}
                  </h4>
                  <p class="text-[10px] truncate" :class="activeChatCandidate && activeChatCandidate.id === candidate.id && postulanteStore.highContrastMode ? 'text-black/80' : 'text-slate-500'">
                    {{ candidate.formacion.area_laboral }}
                  </p>
                </div>
                <span class="text-[9px] font-bold shrink-0 text-primary" :style="activeChatCandidate && activeChatCandidate.id === candidate.id && postulanteStore.highContrastMode ? { color: '#000000' } : {}">
                  {{ candidate.matchScore }}%
                </span>
              </div>
            </div>

            <!-- Chat screen right side -->
            <div class="w-2/3 flex flex-col justify-between bg-white dark:bg-navy" :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000' } : {}">
              <template v-if="activeChatCandidate">
                <!-- Header chat -->
                <div class="p-4 border-b flex justify-between items-center text-left" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-slate-100'">
                  <div>
                    <h4 class="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      {{ activeChatCandidate.nombre_social || activeChatCandidate.nombre_legal }}
                      <span v-if="activeChatCandidate.isSuperMatch" class="material-symbols-outlined text-[12px] text-sky-500 font-bold" title="Super Match">star</span>
                    </h4>
                    <p class="text-[10px] text-slate-500">{{ activeChatCandidate.formacion.area_laboral }}</p>
                  </div>
                  
                  <button 
                    @click="handleExpand(activeChatCandidate)"
                    class="px-3 py-1 bg-slate-100 dark:bg-navy-mid hover:bg-slate-200 text-slate-700 dark:text-white rounded-full text-[10px] font-bold transition-all focus:outline-none"
                    :style="postulanteStore.highContrastMode ? { border: '1px solid #ffffff' } : {}"
                  >
                    Ver Expediente
                  </button>
                </div>

                <!-- Messages -->
                <div class="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col justify-start text-xs h-[320px]">
                  <div 
                    v-for="(msg, i) in getChatMessages(activeChatCandidate.id)" 
                    :key="i"
                    class="max-w-[75%] rounded-2xl p-3 text-left"
                    :class="[
                      msg.sender === 'system'
                        ? 'bg-slate-100 text-slate-500 self-center text-[10px] rounded-full px-4 py-1 text-center max-w-full'
                        : (msg.sender === 'empresa'
                            ? (postulanteStore.highContrastMode ? 'bg-white text-black border-2 border-white self-end' : 'bg-primary text-white self-end')
                            : (postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white self-start' : 'bg-slate-100 text-slate-800 self-start')
                          )
                    ]"
                    :style="msg.sender === 'system' && postulanteStore.highContrastMode ? { backgroundColor: '#000000', border: '1px dashed #ffffff', color: '#ffffff' } : {}"
                  >
                    <p class="leading-relaxed">{{ msg.text }}</p>
                    <span 
                      v-if="msg.time" 
                      class="text-[8px] mt-1 block text-right"
                      :class="msg.sender === 'empresa' ? 'text-white/70' : 'text-slate-400'"
                      :style="msg.sender === 'empresa' && postulanteStore.highContrastMode ? { color: '#000000' } : {}"
                    >
                      {{ msg.time }}
                    </span>
                  </div>
                </div>

                <!-- Message input footer -->
                <form @submit.prevent="handleSend" class="p-3 border-t flex gap-2" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-slate-100'">
                  <input 
                    type="text" 
                    v-model="chatInputText"
                    placeholder="Escriba un mensaje para coordinar..."
                    class="flex-grow px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white focus:ring-sky-400' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                  <button 
                    type="submit"
                    class="px-5 py-2.5 bg-primary text-white rounded-full font-bold text-xs transition-all active:scale-95 focus:outline-none"
                    :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000' } : {}"
                  >
                    Enviar
                  </button>
                </form>
              </template>

              <!-- Empty state chat -->
              <div v-else class="flex-grow flex flex-col items-center justify-center text-center p-8 space-y-3">
                <span class="material-symbols-outlined text-4xl text-slate-400">chat</span>
                <p class="text-xs text-slate font-bold" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
                  Selecciona un candidato de la lista de conexiones (columna izquierda o lista de contacto en el menú) para chatear.
                </p>
              </div>
            </div>
          </div>

          <!-- Empty chats list placeholder -->
          <div 
            v-else 
            class="rounded-3xl border border-dashed p-16 text-center max-w-lg mx-auto flex flex-col items-center justify-center space-y-4 w-full"
            :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/50'"
          >
            <span class="material-symbols-outlined text-5xl text-slate-400">chat_bubble</span>
            <h4 class="text-sm font-bold text-slate-800 dark:text-white">Sin Chats Activos</h4>
            <p class="text-xs text-slate max-w-sm leading-relaxed" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
              Para chatear, primero debe concretar una vinculación deslizando candidatos en la pestaña de <strong class="text-primary" :style="postulanteStore.highContrastMode ? { color: '#ffff00' } : {}">"Buscar Talentos"</strong>.
            </p>
          </div>
        </div>

        <!-- 4. TAB: PERFIL EMPRESA -->
        <div v-if="activeTab === 'profile'" class="w-full space-y-6">
          <div class="border-b pb-3 mb-6 text-left" :class="postulanteStore.highContrastMode ? 'border-white' : 'border-outline-variant/20'">
            <h3 class="font-display text-lg font-bold">Configuración del Perfil Institucional</h3>
            <p class="text-xs mt-0.5 text-slate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
              Modifique los datos institucionales de su OTEC o Empresa. Esta información se comparte en los chats.
            </p>
          </div>

          <!-- Edit Profile Box -->
          <div 
            class="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl border text-left w-full"
            :class="postulanteStore.highContrastMode ? 'border-white bg-black' : 'bg-white border-outline-variant/30 shadow-md'"
          >
            <!-- Save notification banner -->
            <div 
              v-if="showSaveAlert" 
              class="mb-6 p-4 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-2xl text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-300"
              :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#00ff00', color: '#00ff00' } : {}"
            >
              <span class="material-symbols-outlined text-lg">check_circle</span>
              <span>¡Perfil de empresa guardado exitosamente de manera local!</span>
            </div>

            <form @submit.prevent="saveProfileChanges" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <!-- Empresa Nombre -->
                <div class="space-y-1.5">
                  <label for="empresa-nombre" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Nombre de la Empresa</label>
                  <input 
                    id="empresa-nombre"
                    type="text" 
                    required
                    v-model="companyProfile.empresa_nombre"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                </div>

                <!-- RUT -->
                <div class="space-y-1.5">
                  <label for="empresa-rut" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">RUT Empresa</label>
                  <input 
                    id="empresa-rut"
                    type="text" 
                    v-model="companyProfile.rut"
                    placeholder="Ej: 76.123.456-7"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <label for="empresa-email" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Email de Contacto</label>
                  <input 
                    id="empresa-email"
                    type="email" 
                    required
                    v-model="companyProfile.email"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                </div>

                <!-- Fono -->
                <div class="space-y-1.5">
                  <label for="empresa-fono" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Fono / WhatsApp</label>
                  <input 
                    id="empresa-fono"
                    type="tel" 
                    v-model="companyProfile.contacto_fono"
                    placeholder="Ej: +56912345678"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                </div>

                <!-- Rubro -->
                <div class="space-y-1.5">
                  <label for="empresa-sector" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Sector / Rubro</label>
                  <select 
                    id="empresa-sector"
                    v-model="companyProfile.sector"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  >
                    <option value="Educación y Capacitación">Educación y Capacitación / OTEC</option>
                    <option value="Salud y Bienestar">Salud y Bienestar</option>
                    <option value="Tecnología y Telecomunicaciones">Tecnología y Telecomunicaciones</option>
                    <option value="Industrial y Energía">Industrial y Energía</option>
                    <option value="Minería">Minería y Recursos</option>
                    <option value="Construcción">Construcción</option>
                    <option value="Otro">Otro Rubro</option>
                  </select>
                </div>

                <!-- Sitio Web -->
                <div class="space-y-1.5">
                  <label for="empresa-web" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Sitio Web (URL)</label>
                  <input 
                    id="empresa-web"
                    type="url" 
                    v-model="companyProfile.web"
                    placeholder="https://..."
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                  />
                </div>
              </div>

              <!-- Desc -->
              <div class="space-y-1.5">
                <label for="empresa-desc" class="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate">Descripción de Actividad</label>
                <textarea 
                  id="empresa-desc"
                  rows="3" 
                  v-model="companyProfile.descripcion"
                  placeholder="Describa brevemente la OTEC o empresa..."
                  class="w-full px-4 py-3 rounded-2xl border text-xs outline-none focus:ring-1 focus:ring-primary"
                  :class="postulanteStore.highContrastMode ? 'bg-black text-white border-2 border-white' : 'bg-slate-50 text-slate-800 border-slate-200'"
                ></textarea>
              </div>

              <!-- Submit -->
              <div class="pt-2 flex justify-end">
                <button 
                  type="submit"
                  class="px-8 py-3 bg-primary text-white font-bold text-xs rounded-full transition-all hover:scale-[1.02] active:scale-95 focus:outline-none"
                  :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000' } : {}"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

    </main>

    <!-- Footer -->
    <footer 
      class="w-full py-6 text-center text-slate border-t border-outline-variant/10 text-xs px-6"
      :style="postulanteStore.highContrastMode ? { borderColor: '#ffffff', color: '#ffffff' } : {}"
    >
      MatChile &copy; 2026 · Ecosistema de Contratación Profesional Inclusiva
    </footer>

    <!-- Detailed Modal -->
    <CandidatoModal 
      v-if="selectedCandidate"
      :is-open="isModalOpen"
      :candidate="selectedCandidate"
      @close="isModalOpen = false"
    />

    <!-- MUTUAL CONNECTION CONGRATULATION POPUP (NO ROMANTIC/HEART ELEMENTS) -->
    <div v-if="showMatchModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" @click="showMatchModal = false"></div>
      
      <div 
        class="relative w-full max-w-md bg-white border border-outline-variant/60 rounded-[30px] p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300"
        :style="postulanteStore.highContrastMode ? { backgroundColor: '#000000', borderColor: '#ffffff', color: '#ffffff' } : {}"
      >
        <!-- Connection glowing icon (Handshake or Star) -->
        <div 
          class="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          :class="[
            matchedCandidate.isSuperMatch 
              ? 'bg-sky-500/10' 
              : 'bg-emerald-500/10'
          ]"
        >
          <div 
            class="absolute inset-0 rounded-full animate-ping"
            :class="[
              matchedCandidate.isSuperMatch 
                ? 'bg-sky-500/20' 
                : 'bg-emerald-500/20'
            ]"
          ></div>
          <span 
            class="material-symbols-outlined text-4xl animate-pulse"
            :class="[
              matchedCandidate.isSuperMatch 
                ? 'text-sky-500' 
                : 'text-emerald-600'
            ]"
          >
            {{ matchedCandidate.isSuperMatch ? 'star' : 'handshake' }}
          </span>
        </div>

        <div class="space-y-2.5">
          <h3 class="font-display text-headline-sm font-bold text-slate-900" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
            {{ matchedCandidate.isSuperMatch ? '¡Vinculación Prioritaria!' : '¡Nueva Vinculación Establecida!' }}
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
            Has conectado con el postulante <span class="font-black text-primary underline decoration-primary-container">{{ matchedCandidate.nombre_social || matchedCandidate.nombre_legal }}</span>.
          </p>
          <p class="text-xs text-slate" :style="postulanteStore.highContrastMode ? { color: '#ffffff' } : {}">
            Ambas partes comparten afinidad técnica y disponibilidad geográfica ({{ matchedCandidate.matchScore }}% afinidad). Puede iniciar la comunicación a continuación:
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
            class="py-3.5 px-4 bg-gradient-to-r from-primary-container to-primary hover:scale-[1.02] rounded-full text-xs font-extrabold text-white transition-colors flex items-center justify-center space-x-2 shadow-lg active:scale-95"
            :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000', backgroundImage: 'none' } : {}"
          >
            <span>Enviar Email</span>
          </a>
        </div>

        <div class="flex flex-col gap-2 pt-2">
          <button 
            @click="openChatWithCandidate(matchedCandidate)"
            class="w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-700 transition-all active:scale-95 focus:outline-none"
            :style="postulanteStore.highContrastMode ? { backgroundColor: '#ffffff', color: '#000000' } : {}"
          >
            Abrir Chat en Bandeja
          </button>

          <button 
            @click="showMatchModal = false"
            class="w-full py-2 border border-outline-variant hover:bg-slate-50 rounded-full text-xs font-bold text-slate-500 hover:text-slate-700 transition-all active:scale-95"
            :style="postulanteStore.highContrastMode ? { borderColor: '#ffffff', color: '#ffffff' } : {}"
          >
            Seguir Buscando
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useEmpresaStore } from '../store/empresa';
import { usePostulanteStore } from '../store/postulante';
import BuscadorEmpresa from '../components/BuscadorEmpresa.vue';
import SwipeCards from '../components/SwipeCards.vue';
import CandidatoModal from '../components/CandidatoModal.vue';
import { generateCandidatePDF } from '../services/pdfService';

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

    // Tab state: 'search' | 'connections' | 'chats' | 'profile'
    const activeTab = ref('search');
    
    // Search workflow states
    const searchDone = ref(false);
    const selectedCandidate = ref(null);
    const isModalOpen = ref(false);
    
    // Congratulation popup states
    const showMatchModal = ref(false);
    const matchedCandidate = ref(null);

    // Sidebar drawer visibility on mobile
    const showMatchesSidebar = ref(false);

    // Chat simulated inbox states
    const activeChatCandidate = ref(null);
    const chatInputText = ref('');
    const chatsData = ref({}); // Message logs indexed by Candidate ID

    // Profile editor states
    const showSaveAlert = ref(false);
    const companyProfile = ref({
      empresa_nombre: 'OTEC Capacita Chile Limitada',
      rut: '76.845.210-9',
      sector: 'Educación y Capacitación',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Providencia',
      contacto_fono: '+56987654321',
      email: 'contacto@capacitachile.cl',
      web: 'https://www.capacitachile.cl',
      descripcion: 'Institución líder en la formación y capacitación de profesionales en diversas áreas técnicas a nivel nacional.'
    });

    onMounted(() => {
      // Synchronize with authStore user if present
      if (authStore.user) {
        if (authStore.user.empresa_nombre) {
          companyProfile.value.empresa_nombre = authStore.user.empresa_nombre;
        }
        if (authStore.user.email) {
          companyProfile.value.email = authStore.user.email;
        }
        if (authStore.user.rut) {
          companyProfile.value.rut = authStore.user.rut;
        }
        if (authStore.user.sector) {
          companyProfile.value.sector = authStore.user.sector;
        }
        if (authStore.user.contacto_fono) {
          companyProfile.value.contacto_fono = authStore.user.contacto_fono;
        }
        if (authStore.user.web) {
          companyProfile.value.web = authStore.user.web;
        }
        if (authStore.user.descripcion) {
          companyProfile.value.descripcion = authStore.user.descripcion;
        }
      }
    });

    // Computed properties
    const matchesList = computed(() => empresaStore.matches);
    
    const averageScore = computed(() => {
      const candidates = empresaStore.candidates;
      if (!candidates.length) return 0;
      const sum = candidates.reduce((acc, curr) => acc + curr.matchScore, 0);
      return Math.round(sum / candidates.length);
    });

    const activeTabTitle = computed(() => {
      if (activeTab.value === 'search') return 'Búsqueda de Talentos';
      if (activeTab.value === 'connections') return 'Conexiones Establecidas';
      if (activeTab.value === 'chats') return 'Bandeja de Chats Directos';
      if (activeTab.value === 'profile') return 'Perfil de la Empresa';
      return 'Dashboard';
    });

    // Actions & Event Handlers
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

    const handleSuperLike = async () => {
      const candidate = empresaStore.currentCandidate;
      if (!candidate) return;
      matchedCandidate.value = candidate;
      await empresaStore.superLike();
      showMatchModal.value = true;
    };

    const handleUndo = () => {
      empresaStore.undoSwipe();
    };

    const handleExpand = (candidate) => {
      selectedCandidate.value = candidate;
      isModalOpen.value = true;
    };

    const logout = () => {
      authStore.logout();
      router.push({ name: 'Home' });
    };

    // Chat Workflow Functions
    const openChatWithCandidate = (candidate) => {
      activeChatCandidate.value = candidate;
      showMatchModal.value = false;
      activeTab.value = 'chats';
      
      const candidateId = candidate.id;
      if (!chatsData.value[candidateId]) {
        chatsData.value[candidateId] = [
          {
            sender: 'system',
            text: `Conexión directa establecida. Nivel de afinidad técnica de perfil: ${candidate.matchScore}%.`,
            time: ''
          },
          {
            sender: 'postulante',
            text: `Estimados de ${companyProfile.value.empresa_nombre}, agradezco mucho la vinculación. Mi expediente como ${candidate.formacion.area_laboral} cuenta con las certificaciones vigentes declaradas. Estoy atento a sus comentarios para coordinar.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      }
    };

    const getChatMessages = (candidateId) => {
      return chatsData.value[candidateId] || [];
    };

    const handleSend = () => {
      const text = chatInputText.value;
      if (!text.trim() || !activeChatCandidate.value) return;
      const candidateId = activeChatCandidate.value.id;
      
      if (!chatsData.value[candidateId]) {
        chatsData.value[candidateId] = [];
      }

      // Add company message
      chatsData.value[candidateId].push({
        sender: 'empresa',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      chatInputText.value = '';

      // Trigger automatic simulated candidate reply after 1.5s
      setTimeout(() => {
        let replyText = "";
        const profession = activeChatCandidate.value.formacion.area_laboral;
        
        if (text.toLowerCase().includes('hola') || text.toLowerCase().includes('buenos') || text.toLowerCase().includes('estimado')) {
          replyText = `¡Hola! Gracias por responder. Estoy muy interesado en prestar servicios como ${profession} en sus proyectos. ¿Cuáles serían los pasos a seguir?`;
        } else if (text.toLowerCase().includes('entrevista') || text.toLowerCase().includes('reunion') || text.toLowerCase().includes('coordinar') || text.toLowerCase().includes('hablar')) {
          replyText = `Me acomoda bastante coordinar una reunión. Tengo disponibilidad horaria amplia esta semana, preferentemente por la mañana. Quedo atento a la confirmación de la cita.`;
        } else if (text.toLowerCase().includes('cv') || text.toLowerCase().includes('documento') || text.toLowerCase().includes('sence') || text.toLowerCase().includes('certificado')) {
          replyText = `Perfecto, en mi perfil de MatChile puede descargar mi CV oficial estandarizado en formato Sence. De todas formas, puedo enviar mis certificados por esta vía o correo.`;
        } else {
          replyText = `Entendido. Agradezco la información y la transparencia en el proceso. Estaré muy atento a las notificaciones y al avance del requerimiento. ¡Saludos cordiales!`;
        }

        if (chatsData.value[candidateId]) {
          chatsData.value[candidateId].push({
            sender: 'postulante',
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
        }
      }, 1500);
    };

    // Download CV PDF
    const downloadResume = async (candidate) => {
      try {
        await generateCandidatePDF(candidate);
      } catch (err) {
        alert('Error al exportar currículum: ' + err.message);
      }
    };

    // Save profile changes locally and sync with Pinia store
    const saveProfileChanges = () => {
      authStore.setUser({
        ...authStore.user,
        empresa_nombre: companyProfile.value.empresa_nombre,
        email: companyProfile.value.email,
        ...companyProfile.value
      });
      showSaveAlert.value = true;
      setTimeout(() => {
        showSaveAlert.value = false;
      }, 3000);
    };

    return {
      activeTab,
      activeTabTitle,
      searchDone,
      selectedCandidate,
      isModalOpen,
      showMatchModal,
      matchedCandidate,
      matchesList,
      averageScore,
      empresaStore,
      postulanteStore,
      companyProfile,
      showSaveAlert,
      showMatchesSidebar,
      activeChatCandidate,
      chatInputText,
      handleSearch,
      handleSwipeLeft,
      handleSwipeRight,
      handleSuperLike,
      handleUndo,
      handleExpand,
      logout,
      openChatWithCandidate,
      getChatMessages,
      handleSend,
      downloadResume,
      saveProfileChanges
    };
  }
};
</script>

<style scoped>
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
