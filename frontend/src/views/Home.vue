<template>
  <div class="redesign-container relative">
    <div class="blob blob-1"></div>
<div class="blob blob-2"></div>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    MatChile
  </div>
  <div class="nav-links">
    <a href="#about">Qué es MatChile</a>
    <a href="#how-it-works">Cómo Funciona</a>
    <a href="#features">Características</a>
    <a href="#inclusion">Inclusión</a>
  </div>
  <div class="nav-cta">
    <button 
      @click="postulanteStore.toggleHighContrast()"
      class="btn-primary flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 text-xs font-bold"
      :title="postulanteStore.highContrastMode ? 'Modo Normal' : 'Alto Contraste'"
    >
      <span class="sm:hidden"><span class="material-symbols-outlined text-sm align-middle">contrast</span></span>
      <span class="hidden sm:inline">{{ postulanteStore.highContrastMode ? 'Quitar Alto Contraste' : 'Alto Contraste' }}</span>
    </button>
    <button class="btn-ghost hidden sm:inline" @click="openOnboarding()">Ingresar</button>
    <button class="btn-primary" @click="openOnboarding()">Comenzar →</button>
  </div>
</nav>

<!-- HERO -->
<div class="hero-wrapper">
  <div class="hero">
    <div class="hero-content">
      <h1>El <span class="accent">match laboral</span><br>que buscabas.</h1>
      <p class="hero-sub">
        Somos un motor de match inteligente diseñado para conectar de manera instantánea a empresas que necesitan cubrir una vacante, con personas de todos los rubros que cuentan con las competencias exactas.
      </p>
      <div class="hero-btns">
        <button class="btn-hero-primary" @click="openOnboarding('postulante')">Soy Postulante <span class="arrow">→</span></button>
        <button class="btn-hero-secondary" @click="openOnboarding('empresa')">Soy Empresa <Building class="inline-block w-5 h-5 ml-1" /></button>
      </div>
    </div>
  </div>
</div>

<!-- STATS STRIP -->
<div class="stats-strip">
  <div class="stat-item">
    <div class="stat-num"><span>98</span>%</div>
    <div class="stat-label">Match Exitoso</div>
  </div>
  <div class="stat-item">
    <div class="stat-num">+<span>2.5</span>k</div>
    <div class="stat-label">Personas Activas</div>
  </div>
  <div class="stat-item">
    <div class="stat-num"><span>150</span>+</div>
    <div class="stat-label">Empresas Registradas</div>
  </div>
  <div class="stat-item">
    <div class="stat-num"><span>24</span>h</div>
    <div class="stat-label">Tiempo Promedio</div>
  </div>
</div>

<!-- ABOUT MATCHILE -->
<section id="about" style="border-top: 1px solid color-mix(in srgb, var(--white) 6%, transparent);">
  <div style="max-width: 800px; margin: 0 auto; text-align: center;">
    <div class="section-eyebrow">Definición y Propósito</div>
    <h2 class="section-title">¿Qué es MatChile?</h2>
    <p class="section-sub" style="margin: 0 auto 32px auto; max-width: 100%; text-align: justify;">
      MatChile no es un portal de empleos tradicional ni un simple repositorio de currículums. Somos un <strong>motor de match inteligente</strong> diseñado para conectar de manera instantánea a empresas que necesitan cubrir una vacante, con personas de todos los rubros que cuentan con las competencias exactas, en el lugar preciso y la disponibilidad inmediata para el cargo.
    </p>
    <h3 style="font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 16px; color: var(--white);">Nuestra Finalidad</h3>
    <p class="section-sub" style="margin: 0 auto; max-width: 100%; text-align: justify;">
      Nuestro objetivo es <strong>eliminar la fricción y los tiempos muertos</strong> en el mundo laboral chileno. Entendemos que para una empresa, un puesto vacío significa pérdida de productividad; y para el talento, esperar semanas por una respuesta es frustrante. MatChile nace para que la oferta y la demanda laboral se encuentren de forma precisa, transparente y al instante.
    </p>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how-it-works">
  <div class="steps-header">
    <div class="section-eyebrow">Proceso</div>
    <h2 class="section-title">Vinculación en 3 pasos</h2>
    <p class="section-sub">Eliminamos las trabas de los portales de empleo tradicionales con flujos optimizados.</p>
  </div>
  <div class="steps-grid">
    <div class="step">
      <div class="step-num"><h1>01</h1></div>
      <div class="step-icon"><User class="w-8 h-8" /></div>
      <h3>Crea tu Cuenta</h3>
      <p>Regístrate en segundos con flujos dedicados según tu rol: postulante ó empresa de forma segura y eficiente.</p>
    </div>
    <div class="step">
      <div class="step-num"><h1>02</h1></div>
      <div class="step-icon"><Zap class="w-8 h-8" /></div>
      <h3>Motor de Match</h3>
      <p>El algoritmo calcula coincidencias por comunas, especialidades y filtros excluyentes para emparejar perfiles con precisión.</p>
    </div>
    <div class="step">
      <div class="step-num"><h1>03</h1></div>
      <div class="step-icon"><LinkIcon class="w-8 h-8" /></div>
      <h3>Conexión Inmediata</h3>
      <p>Match mutuo abre canales directos de comunicación y exportación de CVs en formato estándar al instante.</p>
    </div>
  </div>
</section>

<!-- FEATURES -->
<section id="features">
  <div class="features-layout">
    <div>
      <div class="section-eyebrow">Características</div>
      <h2 class="section-title">IA integrada en cada paso</h2>
      <p class="section-sub">Las "Varitas Mágicas" asisten a empresas para redactar perfiles sin sesgos y conectar con el talento correcto.</p>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feat-check">✓</div>
          <div class="feat-text">
            <h4>Generación automática de habilidades</h4>
            <p>IA sugiere competencias laborales en base al rol declarado, eliminando sesgos habituales.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feat-check">✓</div>
          <div class="feat-text">
            <h4>Redacción sin discriminación</h4>
            <p>El asistente reescribe descripciones para cumplir estándares de inclusión laboral chilenos.</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feat-check">✓</div>
          <div class="feat-text">
            <h4>4 filtros jerárquicos</h4>
            <p>Profesión u Oficio, geolocalización, remuneración, experiencia para matches 100% relevantes.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="features-cards">
      <div class="feat-card">
        <div class="feat-card-icon"><Wand2 class="w-8 h-8" /></div>
        <h4>Varita Mágica IA</h4>
        <p>Asistente contextual que estructura funciones laborales y optimiza cada perfil para maximizar la visibilidad ante reclutadores.</p>
      </div>
      <div class="feat-card">
        <div class="feat-card-icon"><FileText class="w-8 h-8" /></div>
        <h4>Exportación CV</h4>
        <p>Genera CVs en formato PDF estándar con un solo clic.</p>
        <!-- <div class="badge-sence">✓ Formato Sence Validado</div> -->
      </div>
      <div class="feat-card">
        <div class="feat-card-icon"><MapPin class="w-8 h-8" /></div>
        <h4>Geolocalización Inteligente</h4>
        <p>Filtrado por comunas y zonas para que las oportunidades sean realmente alcanzables para los postulantes.</p>
      </div>
    </div>
  </div>
</section>

<!-- INCLUSION -->
<section id="inclusion">
  <div class="inclusion-inner">
    <div>
      <div class="section-eyebrow">Accesibilidad e Inclusión</div>
      <h2 class="section-title">Ley N° 21.015 como estándar</h2>
      <p class="section-sub">
        MatChile promueve inclusión laboral genuina. El modo accesibilidad adapta la plataforma con contraste mejorado, espaciados amplios y compatibilidad total con lectores de pantalla.
      </p>
      <div class="wcag-badge"><span class="wcag-dot"></span>Certificado WCAG 2.1 AA</div>
    </div>
    <div class="inclusion-visual">
      <div class="a11y-row">
        <div class="a11y-icon"><Eye class="w-6 h-6" /></div>
        <div class="a11y-info">
          <h4>Contraste Mejorado</h4>
          <p>Paleta de alto contraste para personas con baja visión</p>
        </div>
      </div>
      <!-- <div class="a11y-row">
        <div class="a11y-icon"><Keyboard class="w-6 h-6" /></div>
        <div class="a11y-info">
          <h4>Navegación por Teclado</h4>
          <p>Flujo completo sin necesidad de ratón o pantalla táctil</p>
        </div>
      </div> -->
      <div class="a11y-row">
        <div class="a11y-icon"><Volume2 class="w-6 h-6" /></div>
        <div class="a11y-info">
          <h4>Screen Reader Friendly</h4>
          <p>Etiquetas ARIA y roles semánticos en toda la plataforma</p>
        </div>
      </div>
      <div class="a11y-row">
        <div class="a11y-icon"><Smartphone class="w-6 h-6" /></div>
        <div class="a11y-info">
          <h4>Responsive Universal</h4>
          <p>Diseño adaptable para cualquier dispositivo y tamaño</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA FINAL -->
<div class="cta-section">
  <div class="cta-glow"></div>
  <div class="section-eyebrow" style="margin-bottom:24px">Únete hoy</div>
  <h2>¿Listo para encontrar tu match perfecto?</h2>
  <p>Más de 2.500 personas ya encontraron oportunidades en menos de 24 horas.</p>
  <div class="cta-btns">
    <button class="btn-hero-primary" @click="openOnboarding('postulante')">Comenzar como Postulante <span class="arrow">→</span></button>
    <button class="btn-hero-secondary" @click="openOnboarding('empresa')">Registrar mi Empresa</button>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">MatChile</div>
  <div class="footer-links">
    <a href="#">Accesibilidad</a>
    <a href="#">Privacidad</a>
    <a href="#">Términos</a>
    <a href="#">Contacto</a>
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <span style="font-size:11px;font-weight:600;color:var(--teal);letter-spacing:.5px;border:1px solid rgba(0,201,167,0.25);padding:4px 10px;border-radius:99px">WCAG 2.1 AA</span>
    <div class="footer-copy">© 2026 MatChile. Todos los derechos reservados.</div>
  </div>
</footer>
    
    <!-- ONBOARDING DIALOG / LIGHTBOX MODAL -->
    <div v-if="showOnboardingModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-[#0B1628]/90 backdrop-blur-md" @click="closeOnboarding"></div>
      
      <div class="relative w-full max-w-lg z-10">
        <button 
          @click="closeOnboarding" 
          class="absolute -top-12 right-2 text-white/50 hover:text-white font-bold text-sm bg-white/5 border border-white/10 rounded-full p-2 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <OnboardingCarousel @roleSelected="handleRoleSelection" />
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { usePostulanteStore } from '../store/postulante';
import OnboardingCarousel from '../components/OnboardingCarousel.vue';
import { Building, User, Zap, Link as LinkIcon, Wand2, FileText, MapPin, Eye, Keyboard, Volume2, Smartphone } from '@lucide/vue';

export default {
  name: 'Home',
  components: {
    OnboardingCarousel,
    Building,
    User,
    Zap,
    LinkIcon,
    Wand2,
    FileText,
    MapPin,
    Eye,
    Keyboard,
    Volume2,
    Smartphone
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const postulanteStore = usePostulanteStore();

    const showOnboardingModal = ref(false);

    const openOnboarding = (role = null) => {
      if (role && typeof role === 'string') {
        handleRoleSelection(role);
      } else {
        showOnboardingModal.value = true;
      }
    };

    const closeOnboarding = () => {
      showOnboardingModal.value = false;
    };

    const handleRoleSelection = (role) => {
      authStore.loginAsDev(role);
      showOnboardingModal.value = false;
      
      if (role === 'postulante') {
        router.push({ name: 'RegisterPostulante' });
      } else {
        router.push({ name: 'DashboardEmpresa' });
      }
    };

    return {
      showOnboardingModal,
      openOnboarding,
      closeOnboarding,
      handleRoleSelection,
      postulanteStore
    };
  }
};
</script>

<style scoped>
.redesign-container {
  /* This ensures the container wraps everything correctly */
  min-height: 100vh;
}
</style>
