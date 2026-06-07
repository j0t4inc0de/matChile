# Sistema de Temas y Paletas Dinámicas

Este documento explica cómo funciona la arquitectura de cambio de temas y paletas de colores implementada en **matChile**. 

## 1. Visión General
El proyecto originalmente utilizaba colores "harcodeados" (estáticos) en `tailwind.config.js`. Para permitir que toda la aplicación pueda cambiar de paleta de colores de manera global desde un solo punto, se migró toda la gestión de colores a **Variables CSS nativas**.

## 2. Configuración en Tailwind CSS
El archivo `tailwind.config.js` ya no contiene códigos hexadecimales directos como `#006591`. En su lugar, apunta a variables CSS.
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

## 3. Variables en CSS
En el archivo `src/style.css` se declaran los valores hexadecimales base:
```css
:root {
  --color-brand-primary: #006591;
  --color-navy: #0B1628;
  --color-teal: #00C9A7;
  /* ... */
}
```

## 4. ¿Cómo cambiar la paleta de toda la página?
Simplemente abre `src/style.css` y modifica los valores hexadecimales dentro de `:root`.
Al guardar el archivo, Tailwind (que está escuchando estas variables) actualizará automáticamente todas las clases `bg-navy`, `text-teal`, `border-brand-primary`, etc., en toda la aplicación. No necesitas tocar la estructura de Vue ni tocar múltiples archivos de configuración o componentes para cambiar el look and feel completo.
