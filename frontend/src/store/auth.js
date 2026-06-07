import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null, // 'postulante' | 'empresa' | null
    isDevMode: localStorage.getItem('dev_mode') === 'true' || false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserName: (state) => {
      if (!state.user) return '';
      return state.user.nombre_social || state.user.nombre_legal || state.user.name || state.user.email;
    }
  },
  actions: {
    setUser(user) {
      this.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setRole(role) {
      this.role = role;
      if (role) {
        localStorage.setItem('role', role);
      } else {
        localStorage.removeItem('role');
      }
    },
    setDevMode(active) {
      this.isDevMode = active;
      localStorage.setItem('dev_mode', active ? 'true' : 'false');
    },
    loginAsDev(role) {
      this.setDevMode(true);
      this.setRole(role);
      
      const mockUser = role === 'postulante' 
        ? {
            sub: 'auth0|mock_postulante_123',
            name: 'Juan Pérez (Dev)',
            email: 'juan.perez@matchile.cl',
            nombre_social: 'Juan Pérez',
            nombre_legal: 'Juan Pablo Pérez Muñoz',
            fecha_nacimiento: '1992-05-19',
            identidad_genero: 'Masculino',
            contacto: {
              whatsapp: '+56912345678',
              email: 'juan.perez@matchile.cl',
              linkedin: 'https://linkedin.com/in/juan-perez-academic'
            },
            ubicacion: {
              region_residencia: 'Biobío',
              comuna_residencia: 'Los Ángeles',
              comuna_otra: '',
              regiones_movilidad: ['Biobío', 'Ñuble', 'La Araucanía']
            },
            formacion: {
              nivel_estudios: 'tecnico-profesional',
              area_laboral: 'Analista Programador',
              experiencia_laboral_total_anos: 6,
              certificaciones: 'Certificación AWS Cloud Practitioner, CCNA R&S'
            },
            historial_laboral: [
              { cargo: 'Instructor de Software', empresa: 'INACAP', funciones: 'Docencia en asignaturas de desarrollo...' },
              { cargo: 'Programador Senior', empresa: 'SaaS Startup', funciones: 'Modelamiento de base de datos y optimización...' },
              { cargo: 'Relator de Capacitación', empresa: 'OTEC Chile', funciones: 'Dictación de cursos SENCE en código de desarrollo...' }
            ],
            inclusion_ley_21015: {
              activo: true,
              ajustes_razonables: ['Compatibilidad Lector Pantalla', 'Apoyo Cognitivo']
            }
          }
        : {
            sub: 'auth0|mock_empresa_456',
            name: 'OTEC Capacita Chile (Dev)',
            email: 'contacto@capacitachile.cl',
            empresa_nombre: 'OTEC Capacita Chile Limitada'
          };
          
      this.setUser(mockUser);
      this.setToken('mock-jwt-token-for-dev-testing');
    },
    logout() {
      this.setUser(null);
      this.setToken(null);
      this.setRole(null);
      this.setDevMode(false);
      localStorage.removeItem('dev_mode');
    }
  }
});
