# Guía de Buenas Prácticas: Control de Contraste y Temas Dinámicos

Este documento recopila el estándar de desarrollo de **matChile** para la gestión de temas (Default vs. Alto Contraste) y previene errores futuros de textos invisibles o contrastes deficientes.

---

## 1. El Problema Raíz: Coexistencia de Temas y Sistema Operativo

Originalmente, Tailwind CSS viene configurado por defecto con la estrategia `media` para las clases `dark:`. Esto significa que si el sistema operativo o navegador del usuario está configurado en "Modo Oscuro", Tailwind activa automáticamente todos los prefijos `dark:...` en el DOM.

Esto causaba un grave conflicto en nuestra aplicación:
* **Tema Default**: Es una paleta corporativa clara (Fondo `#F8FAFC`, tarjetas `#FFFFFF`).
* **Comportamiento Fallido**: Un usuario con el sistema operativo en modo oscuro veía la tarjeta del buscador blanca (por el tema por defecto), pero con el texto blanco (`dark:text-white` se activaba por su sistema operativo). Como resultado, **el texto del título "Buscador Inteligente" y otros botones se volvían invisibles**.

---

## 2. La Solución Técnica Implementada

Para resolver esto de manera definitiva y evitar que los estilos del sistema interfieran con la lógica de temas de la aplicación, realizamos dos ajustes estructurales:

### A. Configuración de Tailwind (`tailwind.config.js`)
Configuramos de forma explícita la directiva `darkMode` para usar la estrategia de selector personalizado, vinculándola estrictamente a nuestro atributo global `data-theme="high-contrast"`:

```javascript
// tailwind.config.js
export default {
  darkMode: ['class', '[data-theme="high-contrast"]'],
  // ... resto de la configuración
}
```

**Resultado:** Los estilos que comiencen con `dark:` **únicamente** se activarán si la etiqueta `<html>` tiene el atributo `data-theme="high-contrast"`. Si el sistema del usuario está en modo oscuro, pero el tema activo de la app es el por defecto (claro), las clases `dark:` permanecerán inactivas, manteniendo los textos legibles.

### B. Mapeo de Colores Estándar y Variables de Cascada
* **Clases de Color**: Reemplazamos variantes de color no estándar (como `text-slate-550`, `text-slate-650` o `text-slate-450`) por clases nativas de Tailwind (`text-slate-500`, `text-slate-600`, etc.). Esto garantiza que los estilos se compilen correctamente en el CSS y no se ignoren por el navegador.
* **Variables Semánticas en Temas**: Definimos explícitamente `--color-text-main: #ffffff;` y `--color-border-main: #ffffff;` en el bloque `[data-theme="high-contrast"]`. Originalmente estas variables quedaban fijas en el valor claro `#111827`, lo que hacía que textos del Landing (como los títulos `h1`, `h2`, el logo `MatChile` o símbolos del strip `%, +, k`) se dibujaran oscuros sobre fondo negro. Al actualizarlas, toda la cascada de textos y bordes estructurales pasa a ser blanca de manera limpia y automática.

### C. Contraste en Botones y CTAs
Cuando un botón tiene un color de texto estático (como `color: #ffffff` en `.btn-hero-primary`) pero su color de fondo cambia dinámicamente según la variable de tema (como `--color-teal` que pasa a ser amarillo `#ffff00` en alto contraste), se genera un choque de contraste insalvable (**texto blanco sobre fondo amarillo**).
* **Solución**: Se crearon selectores específicos de sobreescritura (`[data-theme="high-contrast"] .btn-hero-primary`) para forzar el color de texto a negro (`#000000`) cuando el fondo pasa a amarillo accesible, y para dotar a los botones secundarios de un diseño clásico de borde y texto blancos.

---

## 3. Guía de Desarrollo para Nuevos Componentes

Sigue estas reglas de oro al crear o modificar componentes para asegurar el cumplimiento visual en ambos temas:

### Regla 1: Usa clases `dark:` para definir el aspecto en Alto Contraste
Dado que configuramos `dark:` ligado a `high-contrast`, puedes utilizar los utilitarios de Tailwind con la tranquilidad de que representan el tema de accesibilidad:

```vue
<!-- CORRECTO: Se verá negro con borde slate en tema claro, y fondo negro con texto/borde blanco en alto contraste -->
<div class="bg-white text-slate-900 border border-slate-200 dark:bg-navy dark:text-white dark:border-white/20">
  ...
</div>
```

### Regla 2: Evita colores no estándar
Usa únicamente la paleta estándar de Tailwind o las variables globales declaradas en `style.css`.
* **Incorrecto**: `text-slate-650`, `bg-navy-350` (Se compilan como texto sin valor y se renderizan invisibles).
* **Correcto**: `text-slate-600` (Nativo Tailwind) o `text-slate` (Variable de tema mapeada).

### Regla 3: Confía en las Variables CSS para transiciones globales
Para elementos generales del body (como títulos principales, textos planos o bordes divisores), no uses clases de colores estáticas. Usa las variables semánticas:

* **Textos Generales**: Usa `color: var(--text-main)` o la clase de utilidad `text-slate-light` (mapeada a la variable).
* **Bordes**: Usa `border-color: var(--border-main)`.
* **Fondo de Tarjetas**: Usa `background: var(--color-navy-mid)` o `var(--color-white)`.

> [!IMPORTANT]
> Siempre declara `color: var(--text-main);` en los contenedores de tarjetas o paneles principales (como `.glass-panel`). Esto fuerza a todos los textos internos que heredan color (como etiquetas `<label>`, subtítulos `h3`, etc.) a adoptar el tono del tema actual (oscuro en modo normal, blanco en alto contraste), en lugar de heredar el color `text-white` de los wrappers externos del layout.

Esto garantiza que al alternar el botón de contraste, la transición visual de 0.4s ocurra suavemente y en cascada a lo largo de todo el árbol DOM.

### D. Modales, Diálogos y Paneles Superpuestos (Lightboxes)
Los modales o lightboxes (como `OnboardingCarousel.vue`) que originalmente estaban diseñados para ser oscuros (`bg-navy` y `text-white`) se rompían en el nuevo tema claro al quedar con **texto blanco sobre fondo gris claro**.
* **Solución**: Se configuraron con selectores adaptables de Tailwind:
  * El contenedor usa `bg-white dark:bg-navy border-slate-200 dark:border-white/10`.
  * Los textos usan `text-slate-900 dark:text-white` y `text-slate-600 dark:text-slate`.
  * De esta forma, el modal se muestra como una tarjeta limpia y clara en el tema normal, y muta a una caja negra de alto contraste al activar la accesibilidad.
* **Norma**: **Nunca** uses clases fijas como `text-white` o `bg-slate-900` para fondos/textos generales dentro de modales; haz que siempre dependan de prefijos responsivos o variables semánticas.

### E. Solución de Raíz para Layouts y Componentes Reutilizables
Para evitar errores de textos invisibles heredados en cascada al desarrollar nuevas vistas, se establecieron dos estándares obligatorios:

1. **Evitar `text-white` en Layouts Wrappers**:
   Los contenedores de nivel de página (como la etiqueta raíz de `DashboardEmpresa.vue` o `RegisterPostulante.vue`) no deben tener la clase estática `text-white`. En su lugar, deben usar la clase de utilidad responsiva `text-slate-light` (que equivale a texto oscuro en el tema claro por defecto, y blanco en el tema de alto contraste).
   * **Incorrecto**: `<div class="min-h-screen bg-navy text-white">`
   * **Correcto**: `<div class="min-h-screen bg-navy text-slate-light">`

2. **Componentes Autocontenidos (`Self-Contained`)**:
   Los componentes o paneles reutilizables que posean un color de fondo propio (como el buscador `BuscadorEmpresa.vue` o el diálogo modal `CandidatoModal.vue` que usan `bg-white`) deben declarar **de forma explícita** sus propios colores de texto en su elemento contenedor raíz, en lugar de heredar los del layout padre.
   * **Norma**: Siempre agrega `text-slate-900 dark:text-white` a la clase del elemento raíz del componente para garantizar que sus etiquetas internas tengan el color de texto correcto en cualquier vista donde se inyecte.
