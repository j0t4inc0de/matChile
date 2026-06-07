import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

// Load Auth0 if configuration exists
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Auth0 Configuration from environment variables
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

if (auth0Domain && auth0ClientId) {
  console.log('Inicializando Auth0 con credenciales:', auth0Domain);
  app.use(
    createAuth0({
      domain: auth0Domain,
      client_id: auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback',
        audience: import.meta.env.VITE_AUTH0_AUDIENCE || ''
      }
    })
  );
} else {
  console.warn('Auth0 no configurado. VITE_AUTH0_DOMAIN y VITE_AUTH0_CLIENT_ID faltan en el entorno. Se habilitará el modo bypass de desarrollo.');
}

app.mount('#app');
