## Lógica del Motor de Match - Guía para el Desarrollador (Backend) 

Este documento describe la matemática y el flujo condicional para calcular el Porcentaje de Match entre lo que busca una Empresa y el perfil de un Candidato. 

El cálculo total es sobre 100 Puntos (100%), divididos en 4 filtros. 

## Filtro 1: Profesión (Filtro Excluyente) 

## Peso Total: 45 Puntos 

La plataforma compara el campo Profesión Solicitada (Empresa) vs Profesión (Candidato). 

- Caso A: Coincidencia exacta (Ej: Pide "TENS", Candidato es "TENS"). 

Acción: Sumar 45 Puntos. 

- Caso B: Coinciden en el "Sector" pero no en la profesión (Ej: Pide "TENS", Candidato es "Masoterapia" - Ambos son Salud). 

Acción: Sumar 22.5 Puntos. 

- Caso C: Sectores distintos. 

   - Acción: Sumar 0 Puntos. DESCARTAR INMEDIATAMENTE AL CANDIDATO (No seguir calculando, ocultarlo de la búsqueda). 

## Filtro 2: Experiencia Laboral 

## Peso Total: 30 Puntos 

La plataforma compara los Años solicitados (Empresa) vs Experiencia Total (Candidato). 

- Caso A: Candidato tiene igual o más años de los solicitados. 

Acción: Sumar 30 Puntos. 

- Caso B: Candidato tiene menos años de los solicitados. 

   - Acción: Calcular proporción. (Años del Candidato / Años Solicitados) * 30. 

   - *Ejemplo: Empresa pide 5 años, Candidato tiene 3 años. (3/5)30 = Sumar 18 Puntos. 

## Filtro 3: Región / Movilidad 

## Peso Total: 15 Puntos 

La plataforma compara la Región de la Oferta (Empresa) vs Región de Residencia o chips de Dónde puede trabajar (Candidato). 

- Caso A: La región solicitada existe en los datos del candidato. 

   - Acción: Sumar 15 Puntos. 

## Caso B: La región no coincide. 

- Acción: Sumar 0 Puntos. (Pero NO se descarta al candidato, puede tener alto puntaje en lo demás). 

## Filtro 4: Boosters Culturales (Puntos Extra) 

Peso Total: 10 Puntos 

La plataforma verifica los extras que la empresa solicita. 

- Sub-Filtro Inclusión: Si la Empresa solicita Ley N° 21.015 y el Candidato tiene activo el switch de Discapacidad. 

Acción: Sumar 5 Puntos. 

- Sub-Filtro Certificaciones: Si la Empresa valora certificaciones y el Candidato tiene el campo Certificaciones lleno con algún texto. 

Acción: Sumar 5 Puntos. 

## Decisión Final: El Mazo de Cartas 

1. Suma: El sistema suma los puntos obtenidos en los 4 filtros. 

2. Validación de Umbral: * Si el total es menor a 75 Puntos: El candidato NO se le muestra a la empresa. 

   - Si el total es mayor o igual a 75 Puntos: El candidato SE MUESTRA en el mazo de cartas de la empresa. 

3. Ordenamiento: Las tarjetas que verá la empresa deben ordenarse siempre de mayor a menor porcentaje de match (El de 98% aparece primero, el de 75% aparece al final). 

