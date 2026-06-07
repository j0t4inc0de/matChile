## Diagramas de Flujo de Usuario (User Journey) - MatChile 

Este documento detalla la ruta secuencial exacta que sigue cada tipo de usuario dentro de la plataforma, desde que ingresa a la aplicación hasta que logra su objetivo principal (Generar el perfil / Generar el Match). 

## 1. Flujo del Postulante (Candidato) 

El objetivo de este flujo es la recolección exhaustiva de datos sin fricción, finalizando con la generación de un CV en PDF y la inserción del perfil en la base de datos de "candidatos disponibles". 

flowchart TD %% Estilos classDef startEnd fill:#0f172a,stroke:#0f172a,color:#fff,font-weight:bold,bord classDef action fill:#0ea5e9,stroke:#0284c7,color:#fff,font-weight:bold; classDef formStep fill:#f8fafc,stroke:#cbd5e1,color:#334155; classDef aiStep fill:#e0f2fe,stroke:#38bdf8,color:#0369a1,font-style:italic; %% Nodos A([Pantalla de Inicio]) ::: startEnd B{¿Qué rol asume?} C[Selecciona: Soy Postulante] ::: action %% Pasos del Formulario D1[Paso 1: Datos Personales\nNombre, Identidad Género, Nacimiento, Contacto] D2[Paso 2: Ubicación\nRegión, Comuna, Movilidad Geográfica] ::: formStep D3[Paso 3: Formación\nNivel, Área, Certificaciones] ::: formStep 

D4[Paso 4: Experiencia Laboral\nAños totales y 3 Bloques Cronológicos] ::: fo IA1[[Asistente IA: Redacción de Funciones por Cargo]] ::: aiStep 

D5[Paso 5: Habilidades] ::: formStep IA2[[Asistente IA: Habilidades según Nivel Académico]] ::: aiStep 

D6[Paso 6: Preferencias\nOficios prioritarios, Modalidad] ::: formStep D7[Paso 7: Inclusión (Ley 21.015)\nInterruptor Discapacidad -> Ajustes Razonab 

%% Finalización E[Click: Guardar Perfil y Generar CV] ::: action F[(Generación PDF Client-Side)] G([Modal Éxito: ¡Perfil Registrado!]) ::: startEnd %% Conexiones A -->|Click en Comenzar| B B --> C C --> D1 --> D2 --> D3 --> D4 D4 -.->|Si usa Varita Mágica| IA1 -.-> D4 D4 --> D5 D5 -.->|Si usa Varita Mágica| IA2 -.-> D5 D5 --> D6 --> D7 

D7 --> E E --> F F --> G 

## 2. Flujo de la Institución (Empresa / OTEC) 

El objetivo de este flujo es guiar al reclutador a través de un embudo de 3 dimensiones para obtener candidatos altamente calificados y realizar un Match efectivo. 

flowchart TD %% Estilos classDef startEnd fill:#0f172a,stroke:#0f172a,color:#fff,font-weight:bold,bord classDef action fill:#0ea5e9,stroke:#0284c7,color:#fff,font-weight:bold; classDef filter fill:#f8fafc,stroke:#cbd5e1,color:#334155; classDef match fill:#10b981,stroke:#047857,color:#fff,font-weight:bold; classDef reject fill:#ef4444,stroke:#b91c1c,color:#fff,font-weight:bold; %% Nodos A([Pantalla de Inicio]) ::: startEnd B{¿Qué rol asume?} C[Selecciona: Institución] ::: action %% Buscador 3D F1[Dimensión 1: Técnica\nNivel -> Sector -> Profesión] ::: filter F2[Dimensión 2: Condiciones\nModalidad -> Rango Salarial] ::: filter F3[Dimensión 3: Cultura\nChips: Ley 21.015, Flexibilidad, Salud, etc.] ::: fi %% Ejecución E[Click: Generar Match Perfecto] ::: action DB[(Match Engine\nCalcula % Compatibilidad)] %% Resultados R[Dashboard de Resultados\nMazo de Tarjetas Ordenado por %] ::: filter %% Acciones Swipe S{Evaluar Tarjeta\nAcción Swipe o Teclado} S_Left[Swipe Izquierda\nRechazar Perfil] ::: reject S_Right[Swipe Derecha\nAceptar Perfil / Match!] ::: match %% Siguientes Pasos Chat([Apertura de Chat / Negociación]) ::: startEnd Next[Siguiente Tarjeta] ::: filter %% Conexiones A -->|Click en Comenzar| B B --> C C --> F1 F1 -->|Desbloquea| F2 F2 -->|Desbloquea| F3 F3 --> E E --> DB DB --> R 

R --> S 

S -->|Rechazo| S_Left S_Left --> Next Next --> S S -->|Aceptación| S_Right S_Right --> Chat 

## 3. Flujo de Convergencia (Cómo ocurre el Match en la Base de Datos) 

Para que el desarrollador comprenda el cruce de variables: 

1. La Institución lanza la petición ( Generar Match Perfecto ). 

2. El Algoritmo de Base de Datos evalúa: 

   - Filtro Estricto: Busca todos los postulantes cuya Profesión (Paso 3 del postulante) coincida con la Profesión solicitada (Dimensión 1 de la empresa). 

   - Cálculo de Afinidad: 

      - Suma puntos si la Modalidad de la empresa coincide con las Preferencias del postulante. 

      - Suma puntos si la empresa pide Inclusión y el postulante tiene activo el switch de la Ley 21.015. 

3. Salida: Se inyecta la lista ordenada en la vista de la Institución y se esperan los "Swipes". Si la 

