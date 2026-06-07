# Sistema de Temas y Paletas Dinámicas

Este documento explica cómo funciona la arquitectura de cambio de temas y paletas de colores implementada en **matChile**. 

## 1. Visión General
El proyecto originalmente utilizaba colores "harcodeados" (estáticos) en `tailwind.config.js`. Para permitir que toda la aplicación pueda cambiar de paleta de colores en tiempo real sin recargar la página, se migró toda la gestión de colores a **Variables CSS nativas**.

## 2. Configuración en Tailwind CSS
El archivo `tailwind.config.js` ya no contiene códigos hexadecimales como `#006591`. En su lugar, apunta a variables CSS.
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "brand-primary": "var(--color-brand-primary)",
        "navy": "var(--color-navy)",
        "teal": "var(--color-teal)",
        // ... (resto de colores)
      }
    }
  }
}
```
Esto permite seguir utilizando clases utilitarias de Tailwind como `bg-brand-primary` o `text-teal`, pero delegando el color final al motor de CSS en el navegador.

## 3. Variables en CSS y Atributo `data-theme`
En el archivo `src/style.css` se declaran los valores de cada variable dependiendo de un atributo en la etiqueta raíz (generalmente `<html>`).

El tema base (original) de tonos azules se encuentra así:
```css
:root, [data-theme="default"] {
  --color-brand-primary: #006591;
  --color-navy: #0B1628;
  --color-teal: #00C9A7;
  /* ... */
}
```

Para crear un nuevo tema (como el tema "emerald"), simplemente se crea un nuevo bloque CSS sobreescribiendo esas variables:
```css
[data-theme="emerald"] {
  --color-brand-primary: #059669; /* Verde esmeralda */
  --color-navy: #064e3b;          /* Verde muy oscuro */
  --color-teal: #34d399;
  /* ... */
}
```

## 4. ¿Cómo agregar un nuevo tema?
1. Abre `src/style.css`.
2. Ve al final de los bloques de variables (donde termina `[data-theme="emerald"]`).
3. Crea un bloque nuevo, por ejemplo `[data-theme="sunset"]`.
4. Copia las variables y asigna los nuevos valores hexadecimales que desees.
5. Usa JavaScript para añadir `document.documentElement.setAttribute('data-theme', 'sunset')`.

## 5. El Switcher en la Interfaz (App.vue)
Actualmente, existe un botón flotante en `App.vue` que gestiona el cambio dinámico.
El componente utiliza Vue 3 y modifica el atributo directamente en el DOM:

```javascript
import { ref, onMounted } from 'vue';

const currentTheme = ref('default');

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'default' ? 'emerald' : 'default';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
};
```

## 6. Transiciones Suaves
Se ha añadido una regla universal en `style.css` (o en `App.vue`) para animar el cambio de color de manera suave y no intrusiva:
```css
* {
  transition: background-color 0.4s ease, border-color 0.4s ease;
}
```
Esto asegura que la mutación del DOM dispare una transición visual de alto nivel.
