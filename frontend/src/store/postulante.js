import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const usePostulanteStore = defineStore('postulante', {
  state: () => {
    const isHC = typeof window !== 'undefined' && localStorage.getItem('highContrastMode') === 'true';
    if (isHC && typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
    }
    return {
      profile: {
        nombre_legal: '',
        nombre_social: '',
        nacionalidad: 'Chile',
        fecha_nacimiento: '',
        identidad_genero: '',
        contacto: {
          whatsapp: '',
          email: '',
          linkedin: ''
        },
        ubicacion: {
          region_residencia: '',
          comuna_residencia: '',
          comuna_otra: '',
          regiones_movilidad: []
        },
        formacion: {
          nivel_estudios: '',
          area_laboral: '',
          experiencia_laboral_total_anos: 0,
          certificaciones: ''
        },
        historial_laboral: [
          { cargo: '', empresa: '', funciones: '' },
          { cargo: '', empresa: '', funciones: '' },
          { cargo: '', empresa: '', funciones: '' }
        ],
        inclusion_ley_21015: {
          activo: false,
          ajustes_razonables: []
        }
      },
      isLoading: false,
      error: null,
      highContrastMode: isHC,
    };
  },
  actions: {
    toggleHighContrast() {
      this.highContrastMode = !this.highContrastMode;
      document.documentElement.setAttribute('data-theme', this.highContrastMode ? 'high-contrast' : 'default');
      localStorage.setItem('highContrastMode', this.highContrastMode ? 'true' : 'false');
    },
    setProfile(data) {
      this.profile = { ...this.profile, ...data };
    },
    resetProfile() {
      this.profile = {
        nombre_legal: '',
        nombre_social: '',
        nacionalidad: 'Chile',
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
      };
    },
    async fetchProfile() {
      const authStore = useAuthStore();
      if (authStore.isDevMode) {
        if (authStore.user) {
          this.profile = JSON.parse(JSON.stringify(authStore.user));
        }
        return;
      }
      
      this.isLoading = true;
      try {
        const response = await fetch('/api/postulantes/me/', {
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.profile = data;
        } else {
          throw new Error('Error al obtener perfil');
        }
      } catch (err) {
        this.error = err.message;
        console.warn('Usando datos locales por fallo de conexión API:', err);
      } finally {
        this.isLoading = false;
      }
    },
    async saveProfile(profileData) {
      const authStore = useAuthStore();
      this.isLoading = true;
      this.error = null;
      
      // If we are in dev mode, simulate API save and update local storage
      if (authStore.isDevMode) {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.profile = { ...profileData };
            authStore.setUser({ ...authStore.user, ...profileData });
            this.isLoading = false;
            resolve(true);
          }, 800);
        });
      }
      
      try {
        const response = await fetch('/api/postulantes/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authStore.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postulante: profileData })
        });
        
        if (response.ok) {
          const data = await response.json();
          this.profile = data.postulante || data;
          authStore.setUser({ ...authStore.user, ...this.profile });
          return true;
        } else {
          const errData = await response.json();
          throw new Error(errData.detail || 'Error al guardar el perfil');
        }
      } catch (err) {
        this.error = err.message;
        this.isLoading = false;
        throw err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
