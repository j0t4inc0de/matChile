<template>
  <div class="min-h-screen py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden transition-colors duration-500 bg-navy text-slate-light font-body">
    <!-- Background glows -->
    <div v-if="!isA11yMode" class="absolute top-0 left-1/4 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
    <div v-if="!isA11yMode" class="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-dim/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

    <!-- Navigation Bar -->
    <nav 
      class="max-w-3xl mx-auto mb-10 pb-5 border-b border-slate-200 dark:border-white/10 transition-colors duration-500"
      style="padding-top: 10px; padding-left: 0; padding-right: 0; display: flex; justify-content: space-between; align-items: center;"
    >
      <div class="nav-logo">
        MatChile
      </div>
      
      <div class="nav-cta flex gap-2 items-center">
        <button 
          @click="postulanteStore.toggleHighContrast()"
          class="btn-primary flex items-center gap-1.5 px-3 py-2 text-xs font-bold"
          :title="isA11yMode ? 'Modo Normal' : 'Alto Contraste'"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">contrast</span>
          <span class="hidden sm:inline">{{ isA11yMode ? 'Normal' : 'A11y' }}</span>
        </button>
        <button 
          @click="logout"
          class="btn-ghost flex items-center gap-1.5 px-3 py-2 text-xs font-bold"
          title="Volver al Inicio"
        >
          <span class="material-symbols-outlined text-sm sm:text-base">arrow_back</span>
          <span class="hidden sm:inline">Inicio</span>
        </button>
      </div>
    </nav>

    <!-- Main Form Box -->
    <div 
      class="max-w-3xl mx-auto p-6 sm:p-10 transition-all duration-500"
      :class="[
        isA11yMode 
          ? 'bg-transparent border-4 border-black text-black rounded-lg' 
          : 'glass-panel rounded-[30px]'
      ]"
    >
      <!-- Title Header -->
      <div class="mb-8 flex justify-between items-start">
        <div class="text-left">
          <span 
            class="text-label-caps font-label-caps font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
            :class="isA11yMode ? 'bg-black text-white' : 'bg-primary-container/10 text-primary'"
          >
            Fase de Registro
          </span>
          <h2 class="font-display text-headline-sm font-bold mt-3 leading-tight" :class="isA11yMode ? 'text-black' : 'text-on-surface'">
            Expediente de Relator
          </h2>
        </div>
        
        <!-- Live progress percentage indicator -->
        <div class="text-right select-none">
          <span class="font-label-caps text-[10px] font-bold text-slate uppercase block tracking-wider">Completado</span>
          <span class="font-display text-headline-sm font-bold text-primary-container" :class="{ 'text-black underline': isA11yMode }">
            {{ stepProgress }}%
          </span>
        </div>
      </div>

      <!-- Stepper Progress Line -->
      <div class="mb-10 flex justify-between items-center relative z-10 px-1">
        <div 
          v-for="step in 4" 
          :key="step"
          class="flex items-center"
          :class="{ 'flex-grow': step < 4 }"
        >
          <!-- Step circle -->
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all relative z-10"
            :class="[
              currentStep === step 
                ? (isA11yMode ? 'bg-black text-white border-2 border-black' : 'bg-primary text-white scale-110 shadow-lg shadow-primary/20')
                : (currentStep > step 
                    ? (isA11yMode ? 'bg-transparent text-black border-4 border-black font-black' : 'bg-primary-container/15 text-primary border border-primary-container/30')
                    : (isA11yMode ? 'bg-transparent text-slate border-2 border-slate-400' : 'bg-surface-container-high dark:bg-navy-mid text-slate')
                  )
            ]"
          >
            <svg v-if="currentStep > step" class="w-5 h-5 text-primary" :class="{ 'text-black': isA11yMode }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
            <span v-else>{{ step }}</span>
          </div>
          
          <!-- Connective line -->
          <div 
            v-if="step < 4" 
            class="h-[3px] flex-grow mx-2 rounded-full transition-all duration-300"
            :class="[
              currentStep > step 
                ? (isA11yMode ? 'bg-black' : 'bg-primary')
                : (isA11yMode ? 'bg-slate-300' : 'bg-surface-variant')
            ]"
          ></div>
        </div>
      </div>

      <!-- STEP 1: PERSONAL INFO -->
      <div v-show="currentStep === 1" class="space-y-6 text-left animate-in fade-in duration-300">
        <div class="border-b pb-3" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <h3 class="font-display text-lg font-bold">1. Datos Personales</h3>
          <p class="text-xs mt-0.5" :class="isA11yMode ? 'text-black' : 'text-slate'">Verificación de identidad y vías de contacto del profesional.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nombre Completo -->
          <div class="space-y-2">
            <label for="nombre-legal" class="block text-xs font-bold uppercase tracking-wider">Nombre Legal Completo</label>
            <input 
              id="nombre-legal"
              type="text" 
              v-model="form.nombre_legal"
              required
              placeholder="Juan Pablo Pérez Muñoz"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode 
                ? 'bg-white border-2 border-black text-black' 
                : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/15'"
            />
          </div>

          <!-- Nombre Social / Profesional -->
          <div class="space-y-2">
            <label for="nombre-social" class="block text-xs font-bold uppercase tracking-wider">Nombre Social / Profesional</label>
            <input 
              id="nombre-social"
              type="text" 
              v-model="form.nombre_social"
              placeholder="Juan Pérez"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode 
                ? 'bg-white border-2 border-black text-black' 
                : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/15'"
            />
            <p class="text-[10px] italic leading-normal" :class="isA11yMode ? 'text-black' : 'text-slate'">
              *Prioridad de Impresión: Reemplaza al nombre legal en búsquedas y en tu CV PDF.
            </p>
          </div>

          <!-- Nacionalidad -->
          <div class="space-y-2">
            <label for="nacionalidad" class="block text-xs font-bold uppercase tracking-wider">Nacionalidad</label>
            <select 
              id="nacionalidad"
              v-model="form.nacionalidad"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode 
                ? 'bg-white border-2 border-black text-black' 
                : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/15'"
            >
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
              <option value="Perú">Perú</option>
              <option value="Colombia">Colombia</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <!-- Nacionalidad Otra -->
          <div v-if="form.nacionalidad === 'Otro'" class="space-y-2 animate-in fade-in duration-200">
            <label for="nacionalidad-otra" class="block text-xs font-bold uppercase tracking-wider">Especificar Nacionalidad</label>
            <input 
              id="nacionalidad-otra"
              type="text" 
              v-model="form.nacionalidad_otra"
              placeholder="Ej: Venezolana, Española"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode 
                ? 'bg-white border-2 border-black text-black' 
                : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/15'"
            />
          </div>

          <!-- Fecha de Nacimiento -->
          <div class="space-y-2">
            <label for="fecha-nacimiento" class="block text-xs font-bold uppercase tracking-wider">Fecha de Nacimiento (DD/MM/AAAA)</label>
            <input 
              id="fecha-nacimiento"
              type="text" 
              v-model="fechaNacimientoMask"
              @input="applyBirthdateMask"
              maxlength="10"
              placeholder="19/05/1992"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode 
                ? 'bg-white border-2 border-black text-black' 
                : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary focus:ring-2 focus:ring-primary/15'"
            />
          </div>
        </div>

        <!-- Identidad de Género -->
        <div class="space-y-3">
          <span class="block text-xs font-bold uppercase tracking-wider">Identidad de Género</span>
          <div class="flex flex-wrap gap-2.5">
            <button
              type="button"
              v-for="genero in generos"
              :key="genero"
              @click="form.identidad_genero = genero"
              class="px-5 py-2.5 rounded-full text-xs font-bold border transition-all hover:scale-[1.02] active:scale-95"
              :class="form.identidad_genero === genero
                ? (isA11yMode ? 'bg-black text-white border-2 border-black' : 'bg-primary border-primary text-white shadow-md shadow-primary/10')
                : (isA11yMode ? 'bg-white text-black border-2 border-black hover:bg-slate-100' : 'bg-white border-outline-variant/60 text-on-surface-variant hover:border-outline')"
            >
              {{ genero }}
            </button>
            <button
              type="button"
              @click="form.identidad_genero = 'Otro'"
              class="px-5 py-2.5 rounded-full text-xs font-bold border transition-all hover:scale-[1.02] active:scale-95"
              :class="form.identidad_genero === 'Otro' || (form.identidad_genero && !generos.includes(form.identidad_genero) && form.identidad_genero !== 'Otro')
                ? (isA11yMode ? 'bg-black text-white border-2 border-black' : 'bg-primary border-primary text-white')
                : (isA11yMode ? 'bg-white text-black border-2 border-black' : 'bg-white border-outline-variant/60 text-on-surface-variant')"
            >
              Otro
            </button>
          </div>
          
          <div v-if="form.identidad_genero === 'Otro' || (form.identidad_genero && !generos.includes(form.identidad_genero))" class="pt-1 animate-in fade-in duration-200">
            <input 
              aria-label="Especificar identidad de género"
              type="text" 
              v-model="customGenero"
              @input="form.identidad_genero = customGenero"
              placeholder="Especificar género..."
              class="w-full max-w-xs px-5 py-2.5 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>
        </div>

        <!-- Contacto Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 border-t pt-6" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <!-- Whatsapp -->
          <div class="space-y-2">
            <label for="whatsapp" class="block text-xs font-bold uppercase tracking-wider">WhatsApp</label>
            <input 
              id="whatsapp"
              type="tel" 
              v-model="form.contacto.whatsapp"
              placeholder="+56912345678"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-xs font-bold uppercase tracking-wider">Email</label>
            <input 
              id="email"
              type="email" 
              v-model="form.contacto.email"
              placeholder="juan.perez@matchile.cl"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>

          <!-- LinkedIn -->
          <div class="space-y-2">
            <label for="linkedin" class="block text-xs font-bold uppercase tracking-wider">LinkedIn (Opcional)</label>
            <input 
              id="linkedin"
              type="url" 
              v-model="form.contacto.linkedin"
              placeholder="https://linkedin.com/in/..."
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>
        </div>
      </div>

      <!-- STEP 2: LOCATION -->
      <div v-show="currentStep === 2" class="space-y-6 text-left animate-in fade-in duration-300">
        <div class="border-b pb-3" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <h3 class="font-display text-lg font-bold">2. Ubicación y Movilidad</h3>
          <p class="text-xs mt-0.5" :class="isA11yMode ? 'text-black' : 'text-slate'">Detalla tu residencia y disponibilidad de traslado geográfico.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Región -->
          <div class="space-y-2">
            <label for="region" class="block text-xs font-bold uppercase tracking-wider">Región de Residencia</label>
            <select 
              id="region"
              v-model="form.ubicacion.region_residencia"
              @change="onRegionChange"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            >
              <option value="" disabled>Seleccione región...</option>
              <option 
                v-for="reg in regionesList" 
                :key="reg.nombre" 
                :value="reg.nombre"
              >
                {{ reg.nombre }}
              </option>
            </select>
          </div>

          <!-- Comuna -->
          <div v-if="form.ubicacion.region_residencia" class="space-y-2 animate-in fade-in duration-300">
            <label for="comuna" class="block text-xs font-bold uppercase tracking-wider">Comuna de Residencia</label>
            <select 
              id="comuna"
              v-model="form.ubicacion.comuna_residencia"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            >
              <option value="" disabled>Seleccione comuna...</option>
              <option 
                v-for="comuna in availableComunas" 
                :key="comuna" 
                :value="comuna"
              >
                {{ comuna }}
              </option>
            </select>
          </div>

          <!-- Comuna Otra -->
          <div v-if="form.ubicacion.comuna_residencia === 'Otra'" class="space-y-2 animate-in fade-in duration-200 md:col-span-2">
            <label for="comuna-otra" class="block text-xs font-bold uppercase tracking-wider">Especificar Comuna</label>
            <input 
              id="comuna-otra"
              type="text" 
              v-model="form.ubicacion.comuna_otra"
              placeholder="Especificar comuna rural o insular"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>
        </div>

        <!-- Disponibilidad Geográfica -->
        <div class="space-y-3 border-t pt-6" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <span class="block text-xs font-bold uppercase tracking-wider">Regiones de Movilidad (¿Dónde puedes trabajar?)</span>
          <p class="text-[10px]" :class="isA11yMode ? 'text-black' : 'text-slate'">Selecciona las regiones chilenas en las cuales estás dispuesto a prestar servicios.</p>
          <div class="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              v-for="reg in regionesList"
              :key="reg.nombre"
              @click="toggleMovilidad(reg.nombre)"
              class="px-3.5 py-2 rounded-full text-xs font-bold border transition-all flex items-center space-x-1.5 active:scale-95"
              :class="form.ubicacion.regiones_movilidad.includes(reg.nombre)
                ? (isA11yMode ? 'bg-black text-white border-2 border-black' : 'bg-primary border-primary text-white')
                : (isA11yMode ? 'bg-white text-black border-2 border-black hover:bg-slate-100' : 'bg-white border-outline-variant/60 text-on-surface-variant')"
            >
              <span>{{ reg.nombre }}</span>
              <svg v-if="form.ubicacion.regiones_movilidad.includes(reg.nombre)" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- STEP 3: FORMACIÓN Y EXPERIENCIA -->
      <div v-show="currentStep === 3" class="space-y-6 text-left animate-in fade-in duration-300">
        <div class="border-b pb-3" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <h3 class="font-display text-lg font-bold">3. Formación y Experiencia</h3>
          <p class="text-xs mt-0.5" :class="isA11yMode ? 'text-black' : 'text-slate'">Registra tus estudios, especialidad laboral e historial cronológico.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nivel de Estudios -->
          <div class="space-y-2">
            <label for="nivel-estudios" class="block text-xs font-bold uppercase tracking-wider">Nivel de Estudios</label>
            <select 
              id="nivel-estudios"
              v-model="form.formacion.nivel_estudios"
              @change="onNivelEstudiosChange"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            >
              <option value="" disabled>Seleccione nivel...</option>
              <option value="basica">Educación Básica</option>
              <option value="media">Educación Media</option>
              <option value="colegio-tecnico">Colegio Técnico</option>
              <option value="tecnico-profesional">Técnico Profesional Superior</option>
              <option value="universitario">Universitario</option>
            </select>
          </div>

          <!-- Especialidad / Área Laboral -->
          <div class="space-y-2">
            <label for="area-laboral" class="block text-xs font-bold uppercase tracking-wider">Especialidad / Área Laboral</label>
            <input 
              id="area-laboral"
              v-model="form.formacion.area_laboral"
              list="carreras-datalist"
              placeholder="Ej: Analista Programador, TENS"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
            <datalist id="carreras-datalist">
              <option 
                v-for="carrera in suggestedCarreras" 
                :key="carrera" 
                :value="carrera"
              />
            </datalist>
          </div>

          <!-- Experiencia Total (Años) -->
          <div class="space-y-2 md:col-span-2">
            <label for="experiencia-anos" class="block text-xs font-bold uppercase tracking-wider">Años Experiencia Total Acumulada</label>
            <input 
              id="experiencia-anos"
              type="number" 
              min="0"
              v-model.number="form.formacion.experiencia_laboral_total_anos"
              class="w-full px-5 py-3 rounded-full border text-sm outline-none transition-all"
              :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
            />
          </div>
        </div>

        <!-- 3 Bloques fijos de Experiencia Laboral -->
        <div class="space-y-5 border-t pt-6" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <div class="flex justify-between items-center flex-wrap gap-3">
            <span class="block text-xs font-bold uppercase tracking-wider text-on-surface">Historial de Experiencias (Últimos 3 Cargos)</span>
            <button
              type="button"
              @click="triggerVaritaHabilidades"
              class="px-5 py-2.5 rounded-full text-xs font-label-caps font-bold flex items-center space-x-1.5 transition-all shadow-md active:scale-95 hover:scale-[1.02]"
              :class="isA11yMode 
                ? 'bg-black text-white border-2 border-black' 
                : 'bg-gradient-to-r from-tertiary-container to-tertiary text-white shadow-tertiary-container/10'"
            >
              <Sparkles class="w-4 h-4 inline-block mr-1" />
              <span>Varita Habilidades Inclusiva</span>
            </button>
          </div>

          <div class="space-y-5">
            <div 
              v-for="(exp, index) in form.historial_laboral" 
              :key="index"
              class="p-6 rounded-[30px] border transition-all"
              :class="isA11yMode 
                ? 'border-black bg-transparent' 
                : 'border-outline-variant/40 bg-surface-container-low/40 hover:border-outline-variant/80'"
            >
              <div class="flex justify-between items-center mb-4">
                <span 
                  class="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                  :class="isA11yMode ? 'bg-black text-white' : 'bg-primary-container/10 text-primary border border-primary-container/20'"
                >
                  Experiencia {{ index + 1 }}
                </span>
                
                <button
                  type="button"
                  @click="triggerVaritaExperiencia(index)"
                  class="px-4 py-1.5 text-[10px] font-bold rounded-full border transition-all flex items-center space-x-1 active:scale-95 hover:scale-[1.02]"
                  :class="isA11yMode 
                    ? 'bg-white text-black border-2 border-black hover:bg-black hover:text-white' 
                    : 'bg-primary-container/10 border-primary-container/20 hover:bg-primary-container/20 text-primary'"
                >
                  <Wand2 class="w-3.5 h-3.5 inline-block mr-1" />
                  <span>Autocompletar Funciones</span>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Cargo -->
                <div class="space-y-1.5">
                  <label :for="'cargo-' + index" class="block text-[10px] font-bold uppercase tracking-wider text-slate" :class="{ 'text-black': isA11yMode }">Cargo Desempeñado</label>
                  <input 
                    :id="'cargo-' + index"
                    type="text" 
                    v-model="exp.cargo"
                    placeholder="Ej: Relator de Informática"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white text-on-surface border-outline-variant/60'"
                  />
                </div>

                <!-- Empresa -->
                <div class="space-y-1.5">
                  <label :for="'empresa-' + index" class="block text-[10px] font-bold uppercase tracking-wider text-slate" :class="{ 'text-black': isA11yMode }">Empresa o Institución</label>
                  <input 
                    :id="'empresa-' + index"
                    type="text" 
                    v-model="exp.empresa"
                    placeholder="Ej: OTEC Capacita Limitada"
                    class="w-full px-4 py-2.5 rounded-full border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white text-on-surface border-outline-variant/60'"
                  />
                </div>

                <!-- Funciones -->
                <div class="space-y-1.5 md:col-span-2">
                  <label :for="'funciones-' + index" class="block text-[10px] font-bold uppercase tracking-wider text-slate" :class="{ 'text-black': isA11yMode }">Funciones Realizadas</label>
                  <textarea 
                    :id="'funciones-' + index"
                    rows="3"
                    v-model="exp.funciones"
                    placeholder="Describe detalladamente tus responsabilidades y tareas..."
                    class="w-full px-4 py-3 rounded-2xl border text-xs outline-none focus:ring-1 focus:ring-primary"
                    :class="isA11yMode ? 'bg-white border-2 border-black text-black' : 'bg-white text-on-surface border-outline-variant/60'"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- STEP 4: CERTIFICACIONES E INCLUSIÓN -->
      <div v-show="currentStep === 4" class="space-y-6 text-left animate-in fade-in duration-300">
        <div class="border-b pb-3" :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'">
          <h3 class="font-display text-lg font-bold">4. Certificaciones e Inclusión</h3>
          <p class="text-xs mt-0.5" :class="isA11yMode ? 'text-black' : 'text-slate'">Declara tus credenciales oficiales y si te acoges a la Ley N° 21.015.</p>
        </div>

        <!-- Certificaciones -->
        <div class="space-y-2">
          <label for="certificaciones" class="block text-sm font-bold text-slate" :class="{ 'text-black': isA11yMode }">
            Certificaciones (Una por línea o separadas por comas)
          </label>
          <textarea 
            id="certificaciones"
            rows="4"
            v-model="form.formacion.certificaciones"
            placeholder="Ej: Curso IAAS 80 horas, Certificación Microsoft Azure, Licencia de Conducir Clase A5..."
            class="w-full px-5 py-3.5 rounded-[20px] border text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/10"
            :class="isA11yMode ? 'bg-white border-2 border-black text-black font-bold' : 'bg-white border-outline-variant/60 text-on-surface focus:border-primary'"
          ></textarea>
        </div>

        <!-- Ley N° 21.015 Inclusion Section -->
        <div 
          class="p-6 rounded-[30px] border transition-all duration-500 space-y-5"
          :class="[
            isA11yMode 
              ? 'border-black bg-transparent text-black font-black' 
              : 'border-outline-variant/40 bg-surface-container-low/40'
          ]"
        >
          <div class="flex justify-between items-center">
            <div class="space-y-1 pr-4">
              <span class="block text-sm font-extrabold uppercase tracking-wide text-on-surface">Ley de Inclusión Laboral N° 21.015</span>
              <p class="text-[10px] leading-normal" :class="isA11yMode ? 'text-black' : 'text-slate'">
                Declara si tienes credencial de discapacidad o pensión de invalidez para acceder a las ofertas exclusivas de inclusión.
              </p>
            </div>
            
            <!-- Inclusion Switch -->
            <label class="relative inline-flex items-center cursor-pointer select-none">
              <input 
                type="checkbox" 
                v-model="form.inclusion_ley_21015.activo" 
                class="sr-only peer"
              />
              <div 
                class="w-12 h-6 bg-slate-200 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-350 after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative"
                :class="isA11yMode ? 'border-2 border-black peer-checked:bg-black' : 'peer-checked:bg-primary'"
              ></div>
            </label>
          </div>

          <!-- Ajustes Razonables Section -->
          <div 
            v-if="form.inclusion_ley_21015.activo" 
            class="pt-5 border-t animate-in fade-in duration-300"
            :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'"
          >
            <span class="block text-xs font-bold uppercase tracking-wider mb-4 text-on-surface">Requerimiento de Ajustes Razonables</span>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label 
                v-for="ajuste in ajustesList" 
                :key="ajuste"
                class="relative flex items-center p-3.5 rounded-[20px] border hover:bg-slate-100/30 cursor-pointer select-none transition-all"
                :class="[
                  form.inclusion_ley_21015.ajustes_razonables.includes(ajuste)
                    ? (isA11yMode ? 'border-black bg-black/10' : 'border-primary bg-primary/5')
                    : (isA11yMode ? 'border-slate-400' : 'border-outline-variant bg-white')
                ]"
              >
                <input 
                  type="checkbox" 
                  :value="ajuste" 
                  v-model="form.inclusion_ley_21015.ajustes_razonables" 
                  class="rounded border-slate-400 text-primary focus:ring-primary mr-3 h-4.5 w-4.5 bg-white"
                />
                <span class="text-xs font-semibold leading-normal text-on-surface-variant">{{ ajuste }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div 
        class="mt-10 pt-6 border-t flex justify-between items-center"
        :class="isA11yMode ? 'border-black' : 'border-outline-variant/20'"
      >
        <button
          v-if="currentStep > 1"
          type="button"
          @click="currentStep--"
          class="px-6 py-2.5 text-xs font-label-caps font-bold rounded-full border transition-colors hover:scale-[1.02] active:scale-95"
          :class="isA11yMode 
            ? 'bg-white text-black border-2 border-black hover:bg-black hover:text-white' 
            : 'bg-white border-outline-variant text-on-surface-variant hover:bg-slate-50'"
        >
          Atrás
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < 4"
          type="button"
          :disabled="!isStepValid"
          @click="currentStep++"
          class="px-6 py-2.5 text-xs font-label-caps font-bold rounded-full text-white transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-primary-container/20"
          :class="[
            isA11yMode ? 'bg-black text-white hover:bg-navy-mid shadow-none' : 'bg-gradient-to-r from-primary-container to-primary',
            { 'opacity-50 cursor-not-allowed': !isStepValid }
          ]"
        >
          Siguiente
        </button>
        
        <!-- Guardar / Generar PDF Button (Step 4) -->
        <button
          v-else
          type="button"
          :disabled="postulanteStore.isLoading"
          @click="handleSubmit"
          class="px-8 py-3 text-xs font-label-caps font-bold rounded-full text-white transition-all shadow-lg flex items-center space-x-2 hover:scale-[1.02] active:scale-95"
          :class="[
            isA11yMode 
              ? 'bg-black text-white shadow-none hover:bg-navy-mid' 
              : 'bg-gradient-to-r from-primary-container to-primary shadow-primary-container/25',
            { 'opacity-60 cursor-wait': postulanteStore.isLoading }
          ]"
        >
          <svg v-if="postulanteStore.isLoading" class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Finalizar y Descargar CV</span>
        </button>
      </div>

    </div>

    <!-- SUCCESS MODAL -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
      
      <div 
        class="relative w-full max-w-md rounded-[30px] p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300"
        :class="isA11yMode ? 'bg-white text-black border-4 border-black' : 'bg-white text-on-surface border border-outline-variant'"
      >
        <div 
          class="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          :class="isA11yMode ? 'bg-black text-white' : 'bg-primary-container/10 text-primary animate-bounce'"
        >
          <span class="material-symbols-outlined text-3xl font-bold">check_circle</span>
        </div>

        <div class="space-y-2.5">
          <h3 class="font-display text-headline-sm font-bold">¡Felicidades, Registro Exitoso!</h3>
          <p class="text-sm text-slate" :class="{ 'text-black': isA11yMode }">
            Tu currículum vitae oficial de **MatChile** se ha generado y descargado localmente de forma exitosa.
          </p>
          <p class="text-xs text-primary font-bold" :class="{ 'text-black underline font-black': isA11yMode }">
            Ahora eres visible en los mazos de búsqueda de las OTECs y empresas contratantes chilenas.
          </p>
        </div>

        <button 
          @click="closeSuccessModal"
          class="w-full py-3 rounded-full text-xs font-label-caps font-bold text-white bg-gradient-to-r from-primary-container to-primary transition-all hover:scale-[1.02]"
          :class="isA11yMode ? 'bg-black text-white hover:bg-slate-850' : ''"
        >
          Ir al Panel Principal
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { usePostulanteStore } from '../store/postulante';
import { REGIONES, SECTORES } from '../data/chileData';
import { generateCandidatePDF } from '../services/pdfService';
import { Sparkles, Wand2 } from '@lucide/vue';

export default {
  name: 'RegisterPostulante',
  components: {
    Sparkles,
    Wand2
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const postulanteStore = usePostulanteStore();

    const currentStep = ref(1);
    const showSuccessModal = ref(false);
    const fechaNacimientoMask = ref('');
    const customGenero = ref('');

    const generos = ['Femenino', 'Masculino', 'No Binario', 'Prefiero no responder'];
    const ajustesList = [
      'Infraestructura / Acceso Silla de Ruedas',
      'Compatibilidad con Software Lector de Pantalla (Screen Readers)',
      'Intérprete de Lengua de Señas Chilena (LSCH)',
      'Apoyo Cognitivo (Formatos accesibles y textos en lenguaje claro)'
    ];

    const form = reactive({
      nombre_legal: '',
      nombre_social: '',
      nacionalidad: 'Chile',
      nacionalidad_otra: '',
      fecha_nacimiento: '',
      identidad_genero: '',
      contacto: { whatsapp: '', email: '', linkedin: '' },
      ubicacion: { region_residencia: '', comuna_residencia: '', comuna_otra: '', regiones_movilidad: [] },
      formacion: { nivel_estudios: '', area_laboral: '', experiencia_laboral_total_anos: 0, certificaciones: '' },
      historial_laboral: [
        { cargo: '', empresa: '', funciones: '' },
        { cargo: '', empresa: '', funciones: '' },
        { cargo: '', empresa: '', funciones: '' }
      ],
      inclusion_ley_21015: { activo: false, ajustes_razonables: [] }
    });

    onMounted(async () => {
      await postulanteStore.fetchProfile();
      if (postulanteStore.profile.nombre_legal) {
        Object.assign(form, JSON.parse(JSON.stringify(postulanteStore.profile)));
        if (form.fecha_nacimiento) {
          const parts = form.fecha_nacimiento.split('-');
          if (parts.length === 3) {
            fechaNacimientoMask.value = `${parts[2]}/${parts[1]}/${parts[0]}`;
          }
        }
      } else {
        if (authStore.user?.email) form.contacto.email = authStore.user.email;
        if (authStore.user?.name && !authStore.user?.email?.includes(authStore.user?.name)) {
          form.nombre_legal = authStore.user.name;
        }
      }
    });

    const isA11yMode = computed(() => postulanteStore.highContrastMode);
    const onRegionChange = () => {
      form.ubicacion.comuna_residencia = '';
      form.ubicacion.comuna_otra = '';
    };
    const onNivelEstudiosChange = () => { form.formacion.area_laboral = ''; };

    const availableComunas = computed(() => {
      const region = REGIONES.find(r => r.nombre === form.ubicacion.region_residencia);
      return region ? region.comunas : [];
    });

    const suggestedCarreras = computed(() => {
      const level = form.formacion.nivel_estudios;
      if (!level) return [];
      const list = [];
      SECTORES.forEach(sector => {
        if (sector.niveles[level]) {
          sector.niveles[level].forEach(c => { list.push(c.carrera); });
        }
      });
      return list;
    });

    const toggleMovilidad = (regionNombre) => {
      const index = form.ubicacion.regiones_movilidad.indexOf(regionNombre);
      if (index > -1) {
        form.ubicacion.regiones_movilidad.splice(index, 1);
      } else {
        form.ubicacion.regiones_movilidad.push(regionNombre);
      }
    };

    const applyBirthdateMask = (e) => {
      let value = e.target.value.replace(/\D/g, '');
      let formatted = '';
      if (value.length > 0) {
        formatted = value.substring(0, 2);
        if (value.length > 2) {
          formatted += '/' + value.substring(2, 4);
          if (value.length > 4) {
            formatted += '/' + value.substring(4, 8);
          }
        }
      }
      fechaNacimientoMask.value = formatted;
      if (formatted.length === 10) {
        const parts = formatted.split('/');
        form.fecha_nacimiento = `${parts[2]}-${parts[1]}-${parts[0]}`;
      } else {
        form.fecha_nacimiento = '';
      }
    };

    const triggerVaritaExperiencia = (index) => {
      const cargo = form.historial_laboral[index].cargo.toLowerCase().trim();
      if (!cargo) {
        alert('Por favor, introduce un nombre de cargo primero.');
        return;
      }
      let funcionesMock = '';
      if (cargo.includes('software') || cargo.includes('programador') || cargo.includes('desarrollador') || cargo.includes('analista')) {
        funcionesMock = 'Desarrollo de módulos lógicos de backend en Django, modelamiento de base de datos relacionales en PostgreSQL y construcción de interfaces dinámicas e interactivas utilizando Vue 3 con Tailwind CSS.';
      } else if (cargo.includes('enfermería') || cargo.includes('tens') || cargo.includes('salud') || cargo.includes('odontología')) {
        funcionesMock = 'Apoyo clínico y asistencia de enfermería, control riguroso de signos vitales, administración autorizada de medicamentos y cumplimiento de protocolos de higiene (IAAS).';
      } else if (cargo.includes('docente') || cargo.includes('profesor') || cargo.includes('relator') || cargo.includes('capacitador')) {
        funcionesMock = 'Planificación didáctica instruccional, impartición de clases teórico-prácticas orientadas a competencias laborales, y diseño y aplicación de instrumentos de evaluación del aprendizaje.';
      } else if (cargo.includes('seguridad') || cargo.includes('guardia') || cargo.includes('vigilante')) {
        funcionesMock = 'Control preventivo de accesos, vigilancia perimetral, respuesta ante incidentes críticos bajo norma OS-10 y confección de bitácoras diarias de seguridad.';
      } else {
        funcionesMock = `Ejecución de actividades operativas y de soporte técnico relacionadas con el cargo de ${form.historial_laboral[index].cargo}, trabajo colaborativo en equipos multidisciplinarios y cumplimiento de estándares de servicio.`;
      }
      form.historial_laboral[index].funciones = funcionesMock;
    };

    const triggerVaritaHabilidades = () => {
      const level = form.formacion.nivel_estudios;
      let promptHabilidades = '';
      if (level === 'basica' || level === 'media') {
        promptHabilidades = 'Alta capacidad de aprendizaje autónomo y ejecución práctica de tareas. Destacadas competencias interpersonales de trabajo colaborativo, puntualidad, adaptabilidad frente al cambio y orientación a la resolución de problemas en terreno de manera efectiva.';
      } else {
        promptHabilidades = 'Competencias analíticas avanzadas, orientación al logro de objetivos institucionales y proactividad metodológica. Habilidades comunicacionales sólidas para capacitaciones, liderazgo participativo de equipos y compromiso con la calidad técnica.';
      }
      if (form.formacion.certificaciones) {
        form.formacion.certificaciones += '\n\nHabilidades Destacadas (Sugeridas por IA):\n' + promptHabilidades;
      } else {
        form.formacion.certificaciones = 'Habilidades Destacadas (Sugeridas por IA):\n' + promptHabilidades;
      }
      alert('¡Habilidades inclusivas generadas en el panel de Certificaciones!');
    };

    const stepProgress = computed(() => {
      return Math.round((currentStep.value / 4) * 100);
    });

    const isStepValid = computed(() => {
      if (currentStep.value === 1) {
        return form.nombre_legal.trim().length > 3 && 
               form.identidad_genero !== '' && 
               form.contacto.email.trim().length > 3 &&
               form.contacto.whatsapp.trim().length > 3 &&
               form.fecha_nacimiento.length === 10;
      }
      if (currentStep.value === 2) {
        return form.ubicacion.region_residencia !== '' && 
               form.ubicacion.comuna_residencia !== '' &&
               (form.ubicacion.comuna_residencia !== 'Otra' || form.ubicacion.comuna_otra.trim().length > 0);
      }
      if (currentStep.value === 3) {
        return form.formacion.nivel_estudios !== '' && 
               form.formacion.area_laboral.trim().length > 2;
      }
      return true;
    });

    const handleSubmit = async () => {
      try {
        await postulanteStore.saveProfile(form);
        await generateCandidatePDF(form);
        showSuccessModal.value = true;
      } catch (err) {
        alert('Error al guardar perfil: ' + err.message);
      }
    };

    const closeSuccessModal = () => {
      showSuccessModal.value = false;
      router.push({ name: 'Home' });
    };

    const logout = () => {
      authStore.logout();
      router.push({ name: 'Home' });
    };

    return {
      currentStep,
      stepProgress,
      form,
      suggestedCarreras,
      regionesList: REGIONES,
      availableComunas,
      generos,
      ajustesList,
      fechaNacimientoMask,
      customGenero,
      showSuccessModal,
      isA11yMode,
      isStepValid,
      postulanteStore,
      applyBirthdateMask,
      triggerVaritaExperiencia,
      triggerVaritaHabilidades,
      onRegionChange,
      onNivelEstudiosChange,
      handleSubmit,
      closeSuccessModal,
      logout
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
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
