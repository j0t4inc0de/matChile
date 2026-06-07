## **Documento de Especificaciones Técnicas: MatChile** 

Blueprint Arquitectónico y Funcional para el Desarrollo Profesional de la Aplicación (Web/Mobile) 

**ESPECIFICACIÓN DE PRODUCCIÓN - V1.0** 

## **1. Introducción y Propósito del Sistema** 

El presente documento contiene la especificación formal de requerimientos de software y la arquitectura del prototipo **MatChile** . El sistema está concebido como una solución tecnológica B2B SaaS enfocada en el sector EdTech y de capacitación laboral chileno (OTECs, Centros de Formación Técnica, Instituciones de Educación Superior y Empresas). Su propósito principal es conectar de forma fluida, inclusiva y en tiempo real el talento de relatores e instructores académicos con las demandas operativas de las instituciones contratantes. 

Este documento sirve como hoja de ruta definitiva para el equipo de desarrollo técnico / informático. Detalla los flujos lógicos, las estructuras jerárquicas de base de datos, las restricciones de UI/UX relativas a accesibilidad universal (WCAG 2.1) e inclusión legal, así como las integraciones algorítmicas requeridas para la puesta en marcha profesional del producto. 

## **2. Arquitectura General y Módulos Core** 

La aplicación se estructura bajo un modelo de arquitectura limpia, desacoplada y con un Front-End altamente reactivo para optimizar la interacción en dispositivos móviles. El sistema se divide de manera nativa en dos grandes perfiles operativos aislados por roles: 

1. **Módulo del Postulante (Relator / Profesional / Técnico):** Enfocado en la captura rica de datos de perfil, historial cronológico ordenado, habilidades asistidas por Inteligencia Artificial y descarga automatizada de documentos curriculares estandarizados. 

2. **Módulo de la Institución (Empresa / OTEC):** Enfocado en el reclutamiento inteligente mediante un buscador dinámico parametrizado y una interfaz de emparejamiento interactiva basada en porcentajes de concordancia (Match Engine). 

## **3. Especificación del Módulo 1: Registro del Postulante** 

Este módulo captura la información del postulante mediante un formulario secuencial optimizado. Contiene reglas de negocio estrictas para preservar la privacidad, pertinencia laboral e inclusión de identidad. 

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 1 de 7 

## **3.1. Campos de Información y Tipos de Datos** 

|**Sección / Campo**|**Tipo de Dato**|**Validación /**<br>**Máscara**|**Regla de Negocio /**<br>**Comportamiento UI**|
|---|---|---|---|
|**Nombre Completo**|VARCHAR(150)|Obligatorio|Nombre legal del usuario para<br>efectos contractuales.|
|**Nombre Social /**<br>**Profesional**|VARCHAR(150)|Opcional|**Prioridad de Impresión:**Si está<br>presente, debe reemplazar al nombre<br>legal en las visualizaciones públicas<br>de las empresas y encabezar el PDF<br>descargable.|
|**Nacionalidad**|ENUM / VARCHAR|Obligatorio|Selector con lista precargada (Chile,<br>Argentina, Perú, Colombia). Si<br>selecciona "Otro", despliega<br>dinámicamente un campo de texto<br>libre.|
|**Fecha de Nacimiento**|DATE|`DD / MM / AAAA`|UI con máscara de entrada<br>automática. Bloquea caracteres no<br>numéricos e inyecta los slashes (/) de<br>forma fuida al escribir.|
|**Identidad de Género**|ENUM|Obligatorio|Opciones por Chips interactivos:<br>Femenino, Masculino, No Binario,<br>Prefero no responder, Otro<br>(Despliega input de especifcación<br>manual).|
|**Contacto**|VARCHAR|WhatsApp, Email,<br>URL|Campos validados mediante<br>expresiones regulares (Regex) para<br>formato de email y URLs válidas de<br>LinkedIn.|



## **3.2. Lógica Dinámica de Ubicación y Movilidad Regional** 

El sistema rompe con el modelo clásico de dropdowns planos aislados e implementa una relación de dependencia jerárquica estricta basada en la división político-administrativa de Chile (16 regiones y sus comunas): 

- **Región de Residencia:** Menú desplegable que renderiza de manera nativa las 16 regiones oficiales de Chile. 

- **Comuna de Residencia:** Campo supeditado que permanece oculto hasta que se seleccione una región. Carga dinámicamente de forma exclusiva las comunas pertenecientes a dicha región. Incluye la opción "Otra", la cual despliega un input de texto libre para comunas de difícil acceso o territorios insulares. 

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 2 de 7 

- **Disponibilidad Geográfica (¿Dónde puedes trabajar?):** Se debe presentar en la interfaz como un mazo 

de _chips multipreferencia_ que contiene las 16 regiones del país. Permite al postulante seleccionar múltiples regiones de manera simultánea para denotar su movilidad laboral. 

## **4. Especificación del Módulo 2: Formación y Nueva Sección Laboral** 

Para garantizar la máxima limpieza y coherencia cognitiva en el llenado de datos, la recopilación del background técnico-profesional se ha estructurado en secciones completamente independientes. 

## **4.1. Sección: Formación Académica** 

Contiene el selector del **Nivel de Estudios** (Básica, Media, Colegio Técnico, Técnico Profesional Superior, Universitario). El campo **Área Laboral / Especialidad** se comporta como un buscador inteligente híbrido. Se 

debe implementar mediante un elemento `<input>` enlazado a un `<datalist>` optimizado, permitiendo al usuario tanto ver todo el listado como escribir caracteres para un filtrado en tiempo real (autocompletado predictivo). 

La base de datos indexada en este componente debe cargar rigurosamente el listado técnico estructurado en el archivo del proyecto: 

- `Colegio Técnico / Técnico Profesional Superior:` 

- `Salud Técnico: Enfermería (TENS), Farmacia (Técnico), Odontología / Higienista Dental, Radiología, Laboratorio Clínico, Masoterapia.` 

```
  * Tecnología y Telecomunicaciones: Analista Programador, Ciberseguridad, Conectividad y
Redes, Data Science, Telecomunicaciones.
```

```
  * Industrial, Energía y Minería: Electricidad y Energías Renovables, Mecánica Industrial,
Minería y Metalurgia.
```

```
  * Logística, Construcción, Administración, Gastronomía y Turismo.
```

```
- Universitario:
```

```
  * Educación: Pedagogías (Parvularia, Básica, Diferencial, Media, Educación Física).
```

- `Negocios y Economía: Ingeniería Comercial, Contador Auditor, Control de Gestión.` 

```
  * Arquitectura, Diseño y Cine y Artes Audiovisuales.
```

## **4.2. Nueva Sección Independiente: Experiencia Laboral** 

Ubicada de forma autónoma después de la sección de formación. Recopila las métricas cuantitativas y cualitativas de la trayectoria del relator: 

1. **Experiencia Laboral Total (Años):** Campo numérico puro ( `type="number"` ) con límite mínimo en cero. Permite cuantificar de forma aislada el seniority global del postulante. 

2. **Historial de Experiencias (Estructura de 3 Bloques Cronológicos):** Se configuran de manera estricta exactamente 3 bloques fijos de entrada de datos para registrar las últimas experiencias del usuario (desde la más reciente a la más antigua). Cada bloque consta de tres campos independientes según la matriz funcional: 

   - **Cargo:** Campo de texto para la designación del puesto (Ej: Asistente Administrativo, Docente). 

   - **Empresa o Institución:** Campo para registrar la entidad empleadora. 

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 3 de 7 

- **Funciones Realizadas:** Área de texto multilínea ( `textarea` ) para el desglose cualitativo de las responsabilidades asumidas. 

## **5. Accesibilidad Universal, Inclusión y Reglas SENCE** 

## **5.1. Implementación de la Ley N° 21.015 (Inclusión Laboral)** 

El componente de declaración de la Ley N° 21.015 se comporta como un interruptor dinámico controlado por el estado del frontend. Se deben seguir las siguientes directrices de diseño y accesibilidad digital: 

_"Diseño Transparente A11y: Al activarse el switch de inclusión, el contenedor debe remover fondos oscuros y mutar hacia un formato de fondo completamente transparente, con bordes y tipografía en color negro sólido (#000000). Esto asegura un contraste de color impecable (mínimo 4.5:1 exigido por WCAG 2.1) apto para personas con baja visión y evita distractores cromáticos."_ 

Al estar activo, despliega inmediatamente la sección de **Requerimiento de Ajustes Razonables** , guardando en base de datos un arreglo de booleanos mapeado a los siguientes elementos técnicos de apoyo: 

- Infraestructura / Acceso Silla de Ruedas. 

- Compatibilidad con Software Lector de Pantalla (Screen Readers). 

- Intérprete de Lengua de Señas Chilena (LSCH). 

- Apoyo Cognitivo (Formatos accesibles y textos en lenguaje claro). 

## **5.2. Glosario y Terminología Unificada** 

**REGLA DE NOMENCLATURA CRÍTICA PARA EL DESARROLLADOR:** Queda estrictamente prohibido utilizar el término "Certificaciones Críticas" en cualquier componente del código fuente, interfaces de usuario, comentarios o capas de persistencia. El campo debe llamarse única y exclusivamente **"Certificaciones"** . Esta unificación debe mantenerse sincronizada tanto en el formulario web como en las cabeceras de los reportes y documentos exportables. 

## **5.3. Asistentes de Inteligencia Artificial ("Varitas Mágicas" )** 

El backend o los servicios de IA integrados en el frontend actúan en cuatro puntos específicos mediante llamadas asíncronas a un LLM (mediante prompts contextuales estructurados): 

- **Varitas de Experiencia (Bloques 1, 2 y 3):** Botón integrado junto al input de "Cargo". Al seleccionarse, lee el string del cargo e inyecta automáticamente en el campo "Funciones" un texto redactado formalmente que resume las tareas típicas de dicha posición en el contexto educativo chileno. 

- **Varita de Habilidades Inclusiva:** Botón que procesa las habilidades del usuario. El prompt del sistema debe analizar de forma obligatoria el "Nivel de Estudios" del postulante. Si el nivel detectado es "Básica" o "Media", la IA aplica un filtro de mitigación de sesgos académicos para generar descripciones profesionales altamente competitivas y equilibradas, destacando competencias blandas, operativas y de ejecución práctica. 

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 4 de 7 

## **6. Módulo de la Institución: Flujo de Búsqueda y Coincidencias** 

Este módulo abstrae la complejidad logística de la búsqueda de relatores convirtiéndola en un embudo dinámico de alta velocidad. 

## **6.1. Embudo de Búsqueda Progresiva** 

La interfaz de búsqueda corporativa oculta los parámetros avanzados inicialmente para evitar la sobrecarga visual. El usuario avanza linealmente de la siguiente manera: 

1. Se presenta el paso **1. Nivel de Formación** (Filtro por Universitario o Técnico). 

2. Al seleccionar una opción, el DOM se actualiza y abre dinámicamente el paso **2. Sector de Especialidad** (Cargando únicamente los sectores de la planilla asociados a ese nivel). 

3. Una vez escogido el sector, se abre el paso **3. Profesión Específica** , poblando el selector con las carreras finales de la planilla. El flujo culmina habilitando un botón prominente con la etiqueta **"Buscar"** . 

## **6.2. Motor de Coincidencias (Match Engine) y Fichas de Candidatos** 

Al presionar "Buscar", el algoritmo procesa la base de datos de postulantes activos y renderiza una vista de resultados  ordenada  de  manera  descendente  mediante  un  ordenamiento  de  burbuja  o  algoritmo  de ordenación estándar según el porcentaje de concordancia técnica (desde 100% Match hasta el menor porcentaje compatible). 

Cada registro se representa mediante una **Ficha de Candidato** optimizada: 

- **Estructura Visual de la Ficha:** Muestra los datos esenciales (Iniciales del nombre o avatar, Nombre Social preferente, Profesión base, porcentaje destacado de Match, y una etiqueta/badge visual si el candidato se encuentra bajo el resguardo de la Ley N° 21.015). 

- **Botón de Expansión Detallada:** Cada ficha incorpora un botón de acción rápida que, al ser accionado, despliega un cuadro modal o una vista expandida con el detalle minucioso de la persona (habilidades completas, los 3 bloques de experiencia cronológica y sus certificaciones). 

## **6.3. Interfaz de Deslizamiento (Swipe UI) y Atajos de Teclado Accesibles** 

Para la vista de reclutamiento masivo, se incorpora una mecánica interactiva estilo *Swipe* (tarjetas apilables en  mazo).  Para  cumplir  con  los  criterios  de  accesibilidad  motora  y  universal,  se  deben  codificar  dos alternativas de control simultáneas: 

1. **Botones Táctiles Macizos:** Botones de gran dimensión ubicados en la parte inferior de la tarjeta (X para rechazar, Check para dar Match) con estados `:active` definidos para evitar la fatiga asociada al gesto físico de arrastrar la pantalla. 

2. **Navegación Nativa por Teclado:** Se debe implementar un escucha de eventos global (`Event Listener`) para capturar las pulsaciones del teclado cuando esta pantalla se encuentre activa: 

   - Tecla Flecha Izquierda ( `ArrowLeft` / ←): Dispara automáticamente la animación de descarte de la tarjeta hacia la izquierda (Acción Rechazar). 

   - Tecla Flecha Derecha ( `ArrowRight` / →): Dispara la animación de aceptación y conexión de la tarjeta hacia la derecha (Acción Match). 

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 5 de 7 

## **7. Especificaciones Técnicas de Salida e Integración** 

## **7.1. Generación de Documentos Locales (Client-Side PDF)** 

El sistema no consume recursos de renderizado en el servidor para la creación de currículums. Se utiliza la librería `jsPDF` para procesar el documento directamente en el navegador del cliente. La función encargada debe cumplir los siguientes requerimientos algorítmicos: 

- Debe verificar la presencia del string `Nombre Social` . Si existe, este dato sustituye al nombre legal en el rótulo principal del documento. 

- Debe renderizar la sección de credenciales utilizando de forma estricta el string literal **"Certificaciones"** como encabezado. 

- Una vez finalizado el guardado del archivo binario (`.pdf`) en el almacenamiento local del dispositivo, el hilo de ejecución principal debe remover la clase de ocultamiento (`.hidden`) del **Cuadro Modal de Felicitaciones** , mostrando el mensaje interactivo de confirmación de registro exitoso en la comunidad. 

## **7.2. Estructura del Objeto de Datos (JSON Schema Referencial)** 

Para  la  comunicación  de  datos  entre  los  formularios  y  la  capa  de  persistencia,  el  informático  deberá implementar el siguiente formato de transferencia: 

```
{
```

```
  "postulante": {
    "nombre_legal": "Juan Pablo Pérez Muñoz",
    "nombre_social": "Juan Pérez",
    "fecha_nacimiento": "1992-05-19",
    "identidad_genero": "Masculino",
    "contacto": {
      "whatsapp": "+56912345678",
      "email": "juan.perez@matchile.cl",
      "linkedin": "https://linkedin.com/in/juan-perez-academic"
    },
    "ubicacion": {
      "region_residencia": "Biobío",
      "comuna_residencia": "Los Ángeles",
      "comuna_otra": "",
      "regiones_movilidad": ["Biobío", "Ñuble", "La Araucanía"]
    },
    "formacion": {
      "nivel_estudios": "tecnico-profesional",
      "area_laboral": "Analista Programador: Desarrollo de aplicaciones",
      "experiencia_laboral_total_anos": 6,
      "certificaciones": "Certificación AWS Cloud Practitioner, CCNA R&S"
    },
    "historial_laboral": [
      { "cargo": "Instructor de Software", "empresa": "INACAP", "funciones": "Docencia en
asignaturas de desarrollo..." },
      { "cargo": "Programador Senior", "empresa": "SaaS Startup", "funciones": "Modelamiento de
base de datos y optimización..." },
      { "cargo": "Relator de Capacitación", "empresa": "OTEC Chile", "funciones": "Dictación de
cursos SENCE en código de desarrollo..." }
```

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 6 de 7 

```
    ],
    "inclusion_ley_21015": {
      "activo": true,
      "ajustes_razonables": ["Compatibilidad Lector Pantalla", "Apoyo Cognitivo"]
    }
  }
}
```

MatChile SaaS - Documento de Requerimientos Técnicos (PRD) 

Página 7 de 7 

