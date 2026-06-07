import { jsPDF } from 'jspdf';

/**
 * Generates and downloads a candidate resume PDF on the client side.
 * @param {Object} candidate - The candidate profile data
 * @returns {Promise<boolean>} Resolves to true when the PDF is downloaded.
 */
export const generateCandidatePDF = (candidate) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Colors & Styles
      const primaryColor = [79, 70, 229]; // Brand primary (Indigo)
      const textColor = [15, 23, 42]; // Brand dark (Slate 900)
      const lightTextColor = [100, 116, 139]; // Slate 500
      
      // Determine Display Name (Nombre Social has priority)
      const displayName = candidate.nombre_social?.trim() 
        ? candidate.nombre_social.trim() 
        : candidate.nombre_legal.trim();

      // --- PAGE HEADER ---
      // Decorative top bar
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 8, 'F');

      let yPos = 25;

      // Candidate Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(displayName, 20, yPos);
      yPos += 8;

      // Area Laboral / Carrera
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(candidate.formacion.area_laboral || 'Especialista', 20, yPos);
      yPos += 12;

      // Contact & Location Grid
      doc.setFontSize(10);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      
      const region = candidate.ubicacion.region_residencia;
      const comuna = candidate.ubicacion.comuna_residencia === 'Otra' && candidate.ubicacion.comuna_otra
        ? candidate.ubicacion.comuna_otra
        : candidate.ubicacion.comuna_residencia;

      const contactLine1 = `Email: ${candidate.contacto.email}  |  WhatsApp: ${candidate.contacto.whatsapp}`;
      const contactLine2 = `Ubicación: ${comuna}, ${region}  |  LinkedIn: ${candidate.contacto.linkedin || 'No especificado'}`;
      
      doc.text(contactLine1, 20, yPos);
      yPos += 5;
      doc.text(contactLine2, 20, yPos);
      yPos += 12;

      // Separator Line
      doc.setDrawColor(226, 232, 240); // Slate 200
      doc.line(20, yPos, 190, yPos);
      yPos += 10;

      // --- SECCIÓN: RESUMEN PROFESIONAL ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Resumen Académico y Laboral', 20, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      const nivelEstudiosMap = {
        'basica': 'Educación Básica',
        'media': 'Educación Media',
        'colegio-tecnico': 'Colegio Técnico',
        'tecnico-profesional': 'Técnico Profesional Superior',
        'universitario': 'Universitario'
      };
      
      const nivelText = nivelEstudiosMap[candidate.formacion.nivel_estudios] || candidate.formacion.nivel_estudios;
      const resumenText = `Profesional con formación de nivel ${nivelText}. Cuenta con una experiencia laboral total acumulada de ${candidate.formacion.experiencia_laboral_total_anos} años en el sector educativo o práctico.`;
      
      doc.text(resumenText, 20, yPos, { maxWidth: 170 });
      yPos += 14;

      // --- SECCIÓN CRÍTICA: CERTIFICACIONES ---
      // REGLA DE NOMENCLATURA CRÍTICA: Debe llamarse exactamente "Certificaciones"
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Certificaciones', 20, yPos);
      yPos += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      
      const certs = candidate.formacion.certificaciones?.trim() 
        ? candidate.formacion.certificaciones 
        : 'Sin certificaciones adicionales declaradas.';
      
      doc.text(certs, 20, yPos, { maxWidth: 170 });
      yPos += 16;

      // --- SECCIÓN: HISTORIAL LABORAL ---
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Experiencia Laboral', 20, yPos);
      yPos += 6;

      const experiences = candidate.historial_laboral || [];
      let expCount = 0;

      experiences.forEach((exp) => {
        if (!exp.cargo && !exp.empresa) return; // Skip empty blocks
        expCount++;
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.text(`${exp.cargo} en ${exp.empresa}`, 20, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
        doc.setFontSize(9.5);
        
        const funciones = exp.funciones?.trim() || 'Funciones y responsabilidades generales asociadas al cargo.';
        doc.text(funciones, 20, yPos, { maxWidth: 170 });
        
        // Dynamic offset calculation based on length of functions
        const textLines = doc.splitTextToSize(funciones, 170).length;
        yPos += (textLines * 4.5) + 6;
      });

      if (expCount === 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
        doc.text('Sin experiencias previas registradas.', 20, yPos);
        yPos += 8;
      }

      // --- SECCIÓN: INCLUSIÓN (Ley N° 21.015) ---
      if (candidate.inclusion_ley_21015?.activo) {
        yPos += 4;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text('Información de Inclusión (Ley N° 21.015)', 20, yPos);
        yPos += 5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        
        const ajustes = candidate.inclusion_ley_21015.ajustes_razonables || [];
        const ajustesText = ajustes.length > 0 
          ? `Ajustes razonables requeridos: ${ajustes.join(', ')}.` 
          : 'No requiere ajustes razonables de infraestructura o comunicación.';
        
        doc.text(`Candidato acogido a la Ley de Inclusión Laboral N° 21.015. ${ajustesText}`, 20, yPos, { maxWidth: 170 });
      }

      // Footer brand stamp
      doc.setFontSize(8);
      doc.setTextColor(lightTextColor[0], lightTextColor[1], lightTextColor[2]);
      doc.text('Documento generado automáticamente por MatChile - Motor de Match Laboral', 20, 287);

      // Save the PDF
      const fileName = `CV_MatChile_${displayName.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      resolve(true);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      reject(error);
    }
  });
};
