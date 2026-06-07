import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

// Helper mock candidates list representing typical data from seed/master tables
const MOCK_CANDIDATES = [
  {
    id: 1,
    nombre_legal: "Catalina Ignacia Valenzuela Soto",
    nombre_social: "Cata Valenzuela",
    nacionalidad: "Chile",
    fecha_nacimiento: "1995-08-12",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56987654321",
      email: "cata.valenzuela@email.com",
      linkedin: "https://linkedin.com/in/cata-valenzuela-tens"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Providencia",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago", "Región de Valparaíso"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 4,
      certificaciones: "Curso IAAS 80 horas, Curso RCP Básico, Vacunatorio PNI"
    },
    historial_laboral: [
      { cargo: "TENS Urgencias", empresa: "Clínica Alemana", funciones: "Atención de pacientes críticos, categorización y administración de medicamentos." },
      { cargo: "TENS Hospitalización", empresa: "Hospital del Salvador", funciones: "Control de signos vitales, aseo y confort, y apoyo en curaciones." },
      { cargo: "Tens de Apoyo", empresa: "Centro Médico Providencia", funciones: "Toma de muestras y apoyo a médicos especialistas." }
    ],
    inclusion_ley_21015: {
      activo: true,
      ajustes_razonables: ["Compatibilidad Lector Pantalla"]
    }
  },
  {
    id: 2,
    nombre_legal: "Tomás Alejandro Silva Castro",
    nombre_social: "Tomás Silva",
    nacionalidad: "Chile",
    fecha_nacimiento: "1990-11-23",
    identidad_genero: "Masculino",
    contacto: {
      whatsapp: "+56955554444",
      email: "tomas.silva@email.com",
      linkedin: "https://linkedin.com/in/tomas-silva-dev"
    },
    ubicacion: {
      region_residencia: "Región del Biobío",
      comuna_residencia: "Concepción",
      comuna_otra: "",
      regiones_movilidad: ["Región del Biobío", "Región Metropolitana de Santiago", "Región de Ñuble"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Ingeniería / Analista Programador",
      experiencia_laboral_total_anos: 6,
      certificaciones: "AWS Certified Solutions Architect, Scrum Master (PSM I)"
    },
    historial_laboral: [
      { cargo: "Fullstack Developer", empresa: "SaaS Innovation Chile", funciones: "Diseño y desarrollo de APIs en Django REST Framework y frontend en Vue.js 3." },
      { cargo: "Analista Programador", empresa: "Banco de Chile", funciones: "Mantenimiento de sistemas transaccionales, consultas SQL avanzadas y optimización." },
      { cargo: "Software Engineer Intern", empresa: "Startup Inc", funciones: "Desarrollo de módulos frontend en Javascript e integración de pasarelas de pago." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 3,
    nombre_legal: "María José Orellana Rojas",
    nombre_social: "",
    nacionalidad: "Chile",
    fecha_nacimiento: "1988-04-05",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56966667777",
      email: "mj.orellana@email.com",
      linkedin: "https://linkedin.com/in/mj-orellana"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Santiago",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 8,
      certificaciones: "Curso IAAS 120 horas, RCP/BLS/ACLS AHA, Diplomado en Salud Familiar"
    },
    historial_laboral: [
      { cargo: "Enfermera Jefa de Turno", empresa: "Hospital Clínico UC", funciones: "Supervisión de personal TENS, gestión de camas, atención de alta complejidad y control de calidad." },
      { cargo: "Enfermera Clínica", empresa: "Clínica Las Condes", funciones: "Atención directa de pacientes en el servicio médico-quirúrgico." },
      { cargo: "Enfermera Universitaria", empresa: "CESFAM Santiago", funciones: "Control de pacientes crónicos, visitas domiciliarias y vacunatorios." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 4,
    nombre_legal: "Gabriel Esteban Muñoz Retamal",
    nombre_social: "Gabo Muñoz",
    nacionalidad: "Chile",
    fecha_nacimiento: "1996-01-30",
    identidad_genero: "No Binario",
    contacto: {
      whatsapp: "+56922228888",
      email: "gabo.munoz@email.com",
      linkedin: "https://linkedin.com/in/gabo-dev"
    },
    ubicacion: {
      region_residencia: "Región de Valparaíso",
      comuna_residencia: "Viña del Mar",
      comuna_otra: "",
      regiones_movilidad: ["Región de Valparaíso", "Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Analista Programador",
      experiencia_laboral_total_anos: 3,
      certificaciones: "React/NodeJS Certification"
    },
    historial_laboral: [
      { cargo: "Programador Frontend", empresa: "Agencia Digital Valpo", funciones: "Desarrollo de sitios web corporativos y paneles administrativos interactivos usando Vue y Tailwind CSS." },
      { cargo: "Desarrollador Junior", empresa: "Fintech Express", funciones: "Integración de componentes UI reutilizables y depuración de errores frontend." },
      { cargo: "Ayudante de Laboratorio Computación", empresa: "Duoc UC", funciones: "Apoyo a alumnos de primer año en asignaturas de programación básica y bases de datos." }
    ],
    inclusion_ley_21015: {
      activo: true,
      ajustes_razonables: ["Compatibilidad Lector Pantalla", "Apoyo Cognitivo"]
    }
  },
  {
    id: 5,
    nombre_legal: "Daniela Paz Carvajal Henríquez",
    nombre_social: "Dani Carvajal",
    nacionalidad: "Chile",
    fecha_nacimiento: "1993-07-15",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56999991111",
      email: "dani.carvajal@email.com",
      linkedin: "https://linkedin.com/in/dani-sec"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Maipú",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Ciberseguridad",
      experiencia_laboral_total_anos: 5,
      certificaciones: "CompTIA Security+, Certified Ethical Hacker (CEH)"
    },
    historial_laboral: [
      { cargo: "Analista de Ciberseguridad", empresa: "Entel Chile", funciones: "Monitoreo en SOC, detección de intrusiones, respuesta a incidentes y análisis de vulnerabilidades." },
      { cargo: "Ingeniero de Soporte TI y Redes", empresa: "Sonda", funciones: "Mantenimiento de firewalls corporativos, configuración de VPNs y soporte de infraestructura crítica." },
      { cargo: "Administrador de Sistemas", empresa: "Municipalidad de Maipú", funciones: "Administración de usuarios, políticas de contraseñas y auditoría de accesos." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  }
];

export const useEmpresaStore = defineStore('empresa', {
  state: () => ({
    searchFilters: {
      nivel_estudios: '', // 'universitario' | 'tecnico-profesional' | 'oficio'
      sector: '',         // e.g. 'Salud y Bienestar', 'Tecnología y Telecomunicaciones'
      area_laboral: '',   // Carrera específica, e.g. 'Técnico en Enfermería (TENS)'
      experiencia_solicitada: 0,
      region_oferta: '',
      exigir_ley_21015: false,
      valorar_certificaciones: false,
    },
    candidates: [],        // Candidates that match search & have score >= 75%
    currentIndex: 0,       // Current card index in swipe deck
    matches: [],           // List of matched profiles
    isLoading: false,
    error: null,
  }),
  getters: {
    currentCandidate: (state) => {
      if (state.currentIndex >= state.candidates.length) return null;
      return state.candidates[state.currentIndex];
    },
    hasMoreCandidates: (state) => {
      return state.currentIndex < state.candidates.length;
    }
  },
  actions: {
    setFilters(filters) {
      this.searchFilters = { ...this.searchFilters, ...filters };
    },
    async runSearch() {
      this.isLoading = true;
      this.currentIndex = 0;
      this.candidates = [];
      const authStore = useAuthStore();
      
      // If we are in dev mode, run the Match Engine algorithm client-side!
      if (authStore.isDevMode) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const results = [];
            const {
              nivel_estudios,
              sector,
              area_laboral,
              experiencia_solicitada,
              region_oferta,
              exigir_ley_21015,
              valorar_certificaciones
            } = this.searchFilters;

            MOCK_CANDIDATES.forEach(candidate => {
              let score = 0;
              
              // --- FILTRO 1: Profesión (Excluyente - 45 Pts) ---
              // Find candidates from the sector to check if they match.
              const candidateArea = candidate.formacion.area_laboral;
              const isSameProfession = candidateArea.toLowerCase().trim() === area_laboral.toLowerCase().trim();
              
              // Determine if same sector
              // We need to look up if the candidate's area belongs to the requested sector in our dataset
              // For simplicity, we can do direct checks or check if both candidate and search are in same sector
              // Cata Valenzuela, María José Orellana are "Salud y Bienestar"
              // Tomás Silva, Gabo Muñoz, Dani Carvajal are "Tecnología y Telecomunicaciones"
              let candidateSector = '';
              if (["Técnico en Enfermería (TENS)", "Enfermería (Universitaria)"].includes(candidateArea)) {
                candidateSector = "Salud y Bienestar";
              } else if (["Ingeniería / Analista Programador", "Analista Programador", "Ciberseguridad"].includes(candidateArea)) {
                candidateSector = "Tecnología y Telecomunicaciones";
              }
              
              const isSameSector = candidateSector === sector;

              if (isSameProfession) {
                score += 45;
              } else if (isSameSector) {
                score += 22.5;
              } else {
                // Sectores distintos -> DESCARTAR INMEDIATAMENTE
                return;
              }

              // --- FILTRO 2: Experiencia Laboral (30 Pts) ---
              const candExp = candidate.formacion.experiencia_laboral_total_anos;
              const reqExp = experiencia_solicitada;
              if (reqExp === 0) {
                score += 30; // No requirement is met automatically
              } else if (candExp >= reqExp) {
                score += 30;
              } else {
                score += (candExp / reqExp) * 30;
              }

              // --- FILTRO 3: Región / Movilidad (15 Pts) ---
              const matchesRegion = 
                candidate.ubicacion.region_residencia === region_oferta ||
                candidate.ubicacion.regiones_movilidad.includes(region_oferta);
              
              if (matchesRegion) {
                score += 15;
              }

              // --- FILTRO 4: Boosters Culturales (10 Pts) ---
              // Sub-filtro inclusión: if company requires Ley 21015 and candidate has disability active
              if (exigir_ley_21015 && candidate.inclusion_ley_21015.activo) {
                score += 5;
              }
              // Sub-filtro certificaciones: if company values certifications and candidate has text
              if (valorar_certificaciones && candidate.formacion.certificaciones.trim().length > 0) {
                score += 5;
              }

              const matchPercentage = Math.round(score);
              
              // Only include if score >= 75
              if (matchPercentage >= 75) {
                results.push({
                  ...candidate,
                  matchScore: matchPercentage
                });
              }
            });

            // Sort descending by match score
            results.sort((a, b) => b.matchScore - a.matchScore);
            this.candidates = results;
            this.isLoading = false;
            resolve(results);
          }, 800);
        });
      }
      
      // Real API Search
      try {
        const queryParams = new URLSearchParams({
          nivel_estudios: this.searchFilters.nivel_estudios,
          sector: this.searchFilters.sector,
          area_laboral: this.searchFilters.area_laboral,
          experiencia_solicitada: this.searchFilters.experiencia_solicitada.toString(),
          region_oferta: this.searchFilters.region_oferta,
          exigir_ley_21015: this.searchFilters.exigir_ley_21015.toString(),
          valorar_certificaciones: this.searchFilters.valorar_certificaciones.toString()
        });
        
        const response = await fetch(`/api/empresas/search/?${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          this.candidates = data.results || data;
        } else {
          throw new Error('Error al consultar candidatos matching');
        }
      } catch (err) {
        this.error = err.message;
        console.warn('Fallo de conexión backend, usando simulación local de Match Engine.');
        // Fallback to local filtering for robustness
        this.isLoading = false;
        await this.runSearchLocalDev();
      } finally {
        this.isLoading = false;
      }
    },
    
    // Internal helper to run local Match Engine when API fails
    async runSearchLocalDev() {
      // Logic identical to the dev mode simulation above
      const results = [];
      const {
        sector,
        area_laboral,
        experiencia_solicitada,
        region_oferta,
        exigir_ley_21015,
        valorar_certificaciones
      } = this.searchFilters;

      MOCK_CANDIDATES.forEach(candidate => {
        let score = 0;
        const candidateArea = candidate.formacion.area_laboral;
        const isSameProfession = candidateArea.toLowerCase().trim() === area_laboral.toLowerCase().trim();
        
        let candidateSector = '';
        if (["Técnico en Enfermería (TENS)", "Enfermería (Universitaria)"].includes(candidateArea)) {
          candidateSector = "Salud y Bienestar";
        } else if (["Ingeniería / Analista Programador", "Analista Programador", "Ciberseguridad"].includes(candidateArea)) {
          candidateSector = "Tecnología y Telecomunicaciones";
        }
        
        const isSameSector = candidateSector === sector;

        if (isSameProfession) {
          score += 45;
        } else if (isSameSector) {
          score += 22.5;
        } else {
          return;
        }

        const candExp = candidate.formacion.experiencia_laboral_total_anos;
        const reqExp = experiencia_solicitada;
        if (reqExp === 0) {
          score += 30;
        } else if (candExp >= reqExp) {
          score += 30;
        } else {
          score += (candExp / reqExp) * 30;
        }

        const matchesRegion = 
          candidate.ubicacion.region_residencia === region_oferta ||
          candidate.ubicacion.regiones_movilidad.includes(region_oferta);
        
        if (matchesRegion) {
          score += 15;
        }

        if (exigir_ley_21015 && candidate.inclusion_ley_21015.activo) {
          score += 5;
        }
        if (valorar_certificaciones && candidate.formacion.certificaciones.trim().length > 0) {
          score += 5;
        }

        const matchPercentage = Math.round(score);
        if (matchPercentage >= 75) {
          results.push({ ...candidate, matchScore: matchPercentage });
        }
      });

      results.sort((a, b) => b.matchScore - a.matchScore);
      this.candidates = results;
    },

    swipeLeft() {
      // Dislike candidate
      console.log(`Candidato ${this.currentCandidate.id} descartado`);
      this.currentIndex++;
    },

    async swipeRight() {
      // Like / Match Candidate
      const candidate = this.currentCandidate;
      console.log(`Match propuesto para: ${candidate.nombre_social || candidate.nombre_legal}`);
      
      // In this version, every Swipe Right is a Match (mutually accepted for simulation)
      this.matches.push(candidate);
      this.currentIndex++;
      
      // If we have API, notify backend
      const authStore = useAuthStore();
      if (!authStore.isDevMode) {
        try {
          await fetch('/api/matches/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ candidate_id: candidate.id })
          });
        } catch (err) {
          console.error('Error al reportar Match al servidor:', err);
        }
      }
      return true; // Match triggers popup animation
    }
  }
});
