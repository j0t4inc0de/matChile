# Arquitectura del Backend: MatChile

Basado en el análisis exhaustivo de la documentación técnica del proyecto, a continuación se presenta la arquitectura propuesta para el backend de MatChile, el motor de match inteligente para el mercado laboral chileno.

## 1. Stack Tecnológico Core

El backend estará construido bajo un enfoque de **API REST Stateless**, permitiendo escalabilidad y desacoplamiento total del frontend (Vue 3).

*   **Framework Principal:** Django + Django REST Framework (DRF).
*   **Base de Datos Relacional:** PostgreSQL (Ideal para consultas estructuradas del motor de match).
*   **Autenticación y Gestión de Identidad:** Auth0 (Soporte nativo para separación de roles y JWT).
*   **Caché y Tareas en Segundo Plano:** Redis + Celery (Para generación de reportes y llamadas a APIs de IA).
*   **Integración de IA:** OpenAI API o Gemini API (Para las "Varitas Mágicas" de redacción).
*   **Pasarela de Pagos (Futuro):** Fintoc o Mercado Pago vía Webhooks.

---

## 2. Gestión de Usuarios y Autenticación (Auth0)

Para manejar la creación de cuentas inspirada en plataformas como LinkedIn o Tinder, se delegará la autenticación a **Auth0**. 

### Flujo de Registro / Login:
1. El usuario se registra a través del widget de Auth0.
2. Durante el *onboarding*, el frontend pregunta: **"¿Soy Empresa?"** o **"¿Soy Postulante?"**.
3. Al completar el primer paso, el frontend envía el token JWT a Django.
4. Django verifica el JWT (usando JWKS de Auth0) y registra al usuario en su base de datos bajo el modelo correspondiente (`Postulante` o `Empresa`), vinculándolos mediante el `auth0_id`.

---

## 3. Modelado de Datos (PostgreSQL)

La estructura de base de datos se divide en "Tablas Maestras" (gestionadas por el Django Admin) y "Entidades de Usuario".

### Tablas Maestras (Catálogos)
*   **Sector:** (Ej. Salud y Bienestar, Tecnología).
*   **Profesion:** Relacionada a un sector (Ej. TENS, Analista Programador).
*   **Certificacion:** Catálogo de certificaciones válidas.

### Entidad: Postulante (El Talento)
*   `auth0_id` (Unique ID).
*   `nombre_legal` y `nombre_social`.
*   `datos_demograficos` (Fecha nacimiento, género).
*   `contacto` (Email, WhatsApp, LinkedIn).
*   `ubicacion` (Región y comuna de residencia, array de `regiones_movilidad`).
*   `formacion` (Nivel de estudios, Área laboral/Profesión).
*   `experiencia_total_anos` (Integer).
*   `certificaciones` (Texto libre para parsing).
*   `inclusion_ley_21015` (Boolean) y `ajustes_razonables` (Array).
*   **Relación 1:N -> ExperienciaLaboral** (Mínimo 3 bloques cronológicos: Cargo, Empresa, Funciones).

### Entidad: Empresa (El Reclutador)
*   `auth0_id` (Unique ID).
*   `nombre_empresa`, `rut_empresa`.
*   `suscripcion_activa` / `tokens_disponibles`.
*   **Relación 1:N -> OfertaLaboral** (Perfil buscado, años de exp, región requerida, si valora certificaciones o requiere Ley 21.015).

---

## 4. Lógica del Motor de Match (El "Tinder" Laboral)

El corazón de la aplicación. Cuando una Empresa busca un perfil, Django ejecutará un servicio (Match Engine) que evaluará a todos los postulantes activos mediante un sistema de puntaje sobre **100 Puntos (100%)**.

1.  **Filtro 1: Profesión (Max 45 pts - Excluyente)**
    *   Coincidencia exacta: 45 pts.
    *   Mismo sector, distinta profesión: 22.5 pts.
    *   *Sector distinto: 0 pts -> DESCARTADO INMEDIATAMENTE.*
2.  **Filtro 2: Experiencia Laboral (Max 30 pts)**
    *   Si los años del candidato $\ge$ años solicitados: 30 pts.
    *   Si son menores: Proporción lineal `(Años Candidato / Años Solicitados) * 30`.
3.  **Filtro 3: Región / Movilidad (Max 15 pts)**
    *   Si la región de la oferta está en su residencia o `regiones_movilidad`: 15 pts.
    *   Si no: 0 pts (pero NO descarta al candidato).
4.  **Filtro 4: Boosters Culturales (Max 10 pts)**
    *   Activo en Ley N° 21.015 (y es requerido): +5 pts.
    *   Tiene Certificaciones (y son valoradas): +5 pts.

**Salida del Endpoint:** Devolverá una lista paginada de candidatos ordenada descendentemente por `% de Match`. Solo se incluirán candidatos con **$\ge$ 75%**.

---

## 5. Arquitectura de Endpoints (DRF)

Se recomienda estructurar la API REST en los siguientes módulos:

*   `POST /api/v1/auth/register-role` (Asocia auth0_id con Empresa/Postulante).
*   `GET/PUT /api/v1/postulantes/me` (CRUD del perfil del postulante).
*   `POST /api/v1/ai/magic-wand` (Endpoint asíncrono para generar descripciones con LLM).
*   `GET /api/v1/match/search` (Ejecuta el Motor de Match y devuelve el mazo de cartas para la empresa).
*   `POST /api/v1/match/swipe` (Registra la acción de la empresa: `left` descartar, `right` match).

---

## 6. Trabajos en Segundo Plano y "Varitas Mágicas" (Celery + Redis)

El backend no debe bloquearse procesando algoritmos pesados o esperando a la IA. 
Se utilizará **Celery + Redis** para:

1.  **"Varitas Mágicas" (IA):** Cuando un postulante usa la varita para redactar sus funciones, Django envía la tarea a Celery, consulta a OpenAI/Gemini (mitigando sesgos académicos) y devuelve el texto enriquecido al frontend.
2.  **Reportes Estadísticos Mensuales (Gamificación & ROI):** Un *cron job* de Celery correrá el día 1 de cada mes.
    *   *Para Postulantes:* Calculará "Vistas de tu tarjeta", "Tasa de Swipe Right" y "Ranking".
    *   *Para Empresas:* Calculará "Eficiencia de Reclutamiento" y "Reporte Ley 21.015".
    Generará un reporte en PDF y lo enviará vía email.

---

## 7. Suscripciones y Pagos (Webhooks)

Para monetizar la plataforma, el backend deberá integrarse con una pasarela como **Fintoc** o **Mercado Pago**.

1.  La empresa inicia el pago desde el frontend.
2.  Se redirige a la pasarela externa.
3.  Django expone un endpoint seguro (Ej: `POST /api/v1/webhooks/payments`).
4.  Una vez aprobado el pago por el banco, la pasarela notifica al Webhook.
5.  Django verifica la firma de seguridad y actualiza automáticamente la cuenta de la Empresa (otorgando tokens o un plan Premium).
