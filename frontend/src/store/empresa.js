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
  },
  {
    id: 6,
    nombre_legal: "Francisca Elena Rojas Pinto",
    nombre_social: "Fran Rojas",
    nacionalidad: "Chile",
    fecha_nacimiento: "1994-06-15",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56988887777",
      email: "fran.rojas@email.com",
      linkedin: "https://linkedin.com/in/fran-rojas-enfermera"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Las Condes",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago", "Región de Valparaíso"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 5,
      certificaciones: "Curso IAAS (Infecciones Asoc. a la Atención en Salud), RCP/BLS/ACLS (AHA)"
    },
    historial_laboral: [
      { cargo: "Enfermera Clínica", empresa: "Clínica Indisa", funciones: "Atención y cuidado integral de pacientes en servicios médico-quirúrgicos." },
      { cargo: "Enfermera Universitaria", empresa: "Hospital San Borja Arriarán", funciones: "Gestión de turnos de personal técnico y apoyo clínico directo." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 7,
    nombre_legal: "Nicolás Ignacio Jara Toledo",
    nombre_social: "Nico Jara",
    nacionalidad: "Chile",
    fecha_nacimiento: "1997-03-22",
    identidad_genero: "Masculino",
    contacto: {
      whatsapp: "+56977776666",
      email: "nico.jara@email.com",
      linkedin: "https://linkedin.com/in/nico-jara-tens"
    },
    ubicacion: {
      region_residencia: "Región de Valparaíso",
      comuna_residencia: "Valparaíso",
      comuna_otra: "",
      regiones_movilidad: ["Región de Valparaíso", "Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 3,
      certificaciones: "Curso IAAS, Toma de Muestras, Vacunatorio PNI (MINSAL)"
    },
    historial_laboral: [
      { cargo: "TENS de Urgencias", empresa: "Hospital Carlos Van Buren", funciones: "Asistencia directa en box de reanimación y categorización de pacientes." },
      { cargo: "Tens Toma de Muestras", empresa: "Laboratorio Clínico Valparaíso", funciones: "Punción venosa y toma de muestras sanguíneas." }
    ],
    inclusion_ley_21015: {
      activo: true,
      ajustes_razonables: ["Infraestructura / Acceso Silla de Ruedas"]
    }
  },
  {
    id: 8,
    nombre_legal: "Camila Belén Henríquez Araya",
    nombre_social: "",
    nacionalidad: "Chile",
    fecha_nacimiento: "1991-09-08",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56966665555",
      email: "camila.henriquez@email.com",
      linkedin: ""
    },
    ubicacion: {
      region_residencia: "Región del Biobío",
      comuna_residencia: "Los Ángeles",
      comuna_otra: "",
      regiones_movilidad: ["Región del Biobío", "Región de Ñuble"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 7,
      certificaciones: "Diplomado en Salud Familiar, RCP/BLS/ACLS (AHA)"
    },
    historial_laboral: [
      { cargo: "Enfermera Coordinadora", empresa: "CESFAM Los Ángeles", funciones: "Gestión de programas de salud familiar y visitas domiciliarias." },
      { cargo: "Enfermera Clínica", empresa: "Clínica Los Andes", funciones: "Atención de pacientes hospitalizados de complejidad media." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 9,
    nombre_legal: "Matías Andrés Morales Venegas",
    nombre_social: "Mati Morales",
    nacionalidad: "Chile",
    fecha_nacimiento: "1998-12-05",
    identidad_genero: "Masculino",
    contacto: {
      whatsapp: "+56955556666",
      email: "matias.morales@email.com",
      linkedin: "https://linkedin.com/in/matias-morales-tens"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Maipú",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 2,
      certificaciones: "Curso IAAS, Curso RCP Básico"
    },
    historial_laboral: [
      { cargo: "TENS en Domicilio", empresa: "Acuidad Salud Chile", funciones: "Cuidado clínico de pacientes con hospitalización domiciliaria." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 10,
    nombre_legal: "Valentina Sofía Castro Muñoz",
    nombre_social: "Vale Castro",
    nacionalidad: "Chile",
    fecha_nacimiento: "1992-07-28",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56944443333",
      email: "vale.castro@email.com",
      linkedin: "https://linkedin.com/in/valentina-castro-enfermeria"
    },
    ubicacion: {
      region_residencia: "Región de la Araucanía",
      comuna_residencia: "Temuco",
      comuna_otra: "",
      regiones_movilidad: ["Región de la Araucanía", "Región de Los Ríos"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 6,
      certificaciones: "Manejo de Heridas y Ostomías, Curso IAAS (Infecciones Asoc. a la Atención en Salud), RCP/BLS/ACLS (AHA)"
    },
    historial_laboral: [
      { cargo: "Enfermera Universitaria", empresa: "Hospital Hernán Henríquez Aravena", funciones: "Atención de urgencias pediátricas, curación avanzada y cateterismo." },
      { cargo: "Enfermera de Calidad", empresa: "Clínica Alemana Temuco", funciones: "Supervisión de protocolos de seguridad clínica y acreditación." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 11,
    nombre_legal: "Javiera Paz Espinoza Garrido",
    nombre_social: "Javi Espinoza",
    nacionalidad: "Chile",
    fecha_nacimiento: "1995-10-12",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56933332222",
      email: "javi.espinoza@email.com",
      linkedin: "https://linkedin.com/in/javi-espinoza-tens"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Puente Alto",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 4,
      certificaciones: "Curso IAAS, Esterilización, Toma de Muestras"
    },
    historial_laboral: [
      { cargo: "TENS Esterilización", empresa: "Hospital Sótero del Río", funciones: "Esterilización de instrumental quirúrgico, empaque y distribución." },
      { cargo: "TENS en Consultorio", empresa: "CESFAM Puente Alto", funciones: "Vacunación, control de salud infantil y registro digital de fichas." }
    ],
    inclusion_ley_21015: {
      activo: true,
      ajustes_razonables: ["Apoyo Cognitivo (Formatos accesibles y textos en lenguaje claro)"]
    }
  },
  {
    id: 12,
    nombre_legal: "Diego Alonso Tapia Silva",
    nombre_social: "Diego Tapia",
    nacionalidad: "Chile",
    fecha_nacimiento: "1993-02-14",
    identidad_genero: "Masculino",
    contacto: {
      whatsapp: "+56922221111",
      email: "diego.tapia@email.com",
      linkedin: ""
    },
    ubicacion: {
      region_residencia: "Región de Coquimbo",
      comuna_residencia: "La Serena",
      comuna_otra: "",
      regiones_movilidad: ["Región de Coquimbo", "Región de Valparaíso"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 4,
      certificaciones: "RCP/BLS/ACLS (AHA), Curso IAAS (Infecciones Asoc. a la Atención en Salud)"
    },
    historial_laboral: [
      { cargo: "Enfermero de Pabellón", empresa: "Clínica Elqui", funciones: "Asistencia directa en pabellón de cirugía general y control de insumos quirúrgicos." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 13,
    nombre_legal: "Bárbara Nicole Vergara Fuentes",
    nombre_social: "Barby Vergara",
    nacionalidad: "Chile",
    fecha_nacimiento: "1990-05-30",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56911112222",
      email: "barbara.vergara@email.com",
      linkedin: "https://linkedin.com/in/barbara-vergara-tens"
    },
    ubicacion: {
      region_residencia: "Región del Maule",
      comuna_residencia: "Talca",
      comuna_otra: "",
      regiones_movilidad: ["Región del Maule", "Región del Biobío", "Región de Ñuble"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 8,
      certificaciones: "Curso IAAS, Vacunatorio PNI (MINSAL), Esterilización"
    },
    historial_laboral: [
      { cargo: "TENS Coordinadora de Vacunatorio", empresa: "Clínica del Maule", funciones: "Gestión de vacunas contra COVID e influenza, cadena de frío y reportes MINSAL." },
      { cargo: "TENS de Apoyo", empresa: "Hospital Regional de Talca", funciones: "Monitoreo de signos vitales, confort e higiene de pacientes post-operatorios." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 14,
    nombre_legal: "Sebastián Enrique Ortiz Loyola",
    nombre_social: "Sebas Ortiz",
    nacionalidad: "Chile",
    fecha_nacimiento: "1989-11-04",
    identidad_genero: "Masculino",
    contacto: {
      whatsapp: "+56999888877",
      email: "sebas.ortiz@email.com",
      linkedin: "https://linkedin.com/in/sebastián-ortiz-enfermería"
    },
    ubicacion: {
      region_residencia: "Región Metropolitana de Santiago",
      comuna_residencia: "Providencia",
      comuna_otra: "",
      regiones_movilidad: ["Región Metropolitana de Santiago"]
    },
    formacion: {
      nivel_estudios: "universitario",
      area_laboral: "Enfermería (Universitaria)",
      experiencia_laboral_total_anos: 8,
      certificaciones: "Diplomado en Salud Familiar, Manejo de Heridas y Ostomías, RCP/BLS/ACLS (AHA)"
    },
    historial_laboral: [
      { cargo: "Enfermero Clínico de Emergencias", empresa: "Clínica Santa María", funciones: "Evaluación inicial de urgencias, estabilización de pacientes críticos y administración de fármacos intravenosos." },
      { cargo: "Enfermero Consultor", empresa: "Sence Salud Capacitaciones", funciones: "Docencia en cursos de primeros auxilios y de prevención de infecciones IAAS para OTECs." }
    ],
    inclusion_ley_21015: {
      activo: false,
      ajustes_razonables: []
    }
  },
  {
    id: 15,
    nombre_legal: "Constanza Belén Flores Sanhueza",
    nombre_social: "Conny Flores",
    nacionalidad: "Chile",
    fecha_nacimiento: "1993-08-11",
    identidad_genero: "Femenino",
    contacto: {
      whatsapp: "+56988889999",
      email: "constanza.flores@email.com",
      linkedin: "https://linkedin.com/in/conny-flores-tens"
    },
    ubicacion: {
      region_residencia: "Región de Ñuble",
      comuna_residencia: "Chillán",
      comuna_otra: "",
      regiones_movilidad: ["Región de Ñuble", "Región del Biobío"]
    },
    formacion: {
      nivel_estudios: "tecnico-profesional",
      area_laboral: "Técnico en Enfermería (TENS)",
      experiencia_laboral_total_anos: 5,
      certificaciones: "Curso IAAS, Curso RCP Básico, Toma de Muestras"
    },
    historial_laboral: [
      { cargo: "TENS Ambulatorio", empresa: "Centro Médico Chillán", funciones: "Preparación de box de atención, asistencia a médicos y curación menor." }
    ],
    inclusion_ley_21015: {
      activo: true,
      ajustes_razonables: ["Compatibilidad con Software Lector de Pantalla (Screen Readers)"]
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
    swipeHistory: [],      // History of swiped cards for Undo / Rewind feature
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
      this.swipeHistory = [];
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
      if (!this.currentCandidate) return;
      const candidate = this.currentCandidate;
      console.log(`Candidato ${candidate.id} descartado`);
      this.swipeHistory.push({ id: candidate.id, action: 'dislike' });
      this.currentIndex++;
    },

    async swipeRight() {
      // Like / Match Candidate
      if (!this.currentCandidate) return;
      const candidate = this.currentCandidate;
      console.log(`Match propuesto para: ${candidate.nombre_social || candidate.nombre_legal}`);
      
      // In this version, every Swipe Right is a Match (mutually accepted for simulation)
      this.matches.push(candidate);
      this.swipeHistory.push({ id: candidate.id, action: 'like' });
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
    },

    async superLike() {
      // Super Like / Special Match Candidate
      if (!this.currentCandidate) return;
      const candidate = this.currentCandidate;
      console.log(`Super Match propuesto para: ${candidate.nombre_social || candidate.nombre_legal}`);
      
      const candidateClone = { ...candidate, isSuperMatch: true };
      this.matches.push(candidateClone);
      this.swipeHistory.push({ id: candidate.id, action: 'superlike' });
      this.currentIndex++;
      
      // If we have API, notify backend
      const authStore = useAuthStore();
      if (!authStore.isDevMode) {
        try {
          await fetch('/api/matches/', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json',
              'is_super_like': 'true'
            },
            body: JSON.stringify({ candidate_id: candidate.id })
          });
        } catch (err) {
          console.error('Error al reportar Match al servidor:', err);
        }
      }
      return true;
    },

    undoSwipe() {
      if (this.swipeHistory.length === 0) return;
      const lastSwipe = this.swipeHistory.pop();
      this.currentIndex--;
      if (lastSwipe.action === 'like' || lastSwipe.action === 'superlike') {
        this.matches = this.matches.filter(m => m.id !== lastSwipe.id);
      }
      console.log(`Deshecho el deslizamiento del candidato ${lastSwipe.id}`);
    }
  }
});
