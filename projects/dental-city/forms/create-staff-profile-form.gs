/**
 * Dental City Costa Rica — Formulario de Perfil del Equipo
 *
 * Each team member fills this out individually.
 * One form — multiple responses, each from a different team member.
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire script
 * 4. Click Run -> createStaffProfileForm
 * 5. Authorize when prompted
 * 6. Check your Google Drive — the form will be there
 * 7. Share the form link with each team member
 *
 * AFTER CREATION:
 * Apply Sagemind theme manually (see docs/standards/google-forms-theme.md):
 *   - Header image: brand/sagemind-form-header.png
 *   - Header font: Times New Roman, 24
 *   - Question font: Roboto, 12
 *   - Text font: Arial, 12
 *   - Theme color: Bright cyan (#08f1c7)
 *   - Background: Light steel blue/grey
 */

function createStaffProfileForm() {
  var form = FormApp.create('Dental City Costa Rica — Perfil del Equipo');
  form.setDescription(
    'Hola! Estamos actualizando el sitio web de Dental City Costa Rica y queremos ' +
    'presentar a cada miembro del equipo de la mejor manera posible.\n\n' +
    'Por favor complete este formulario con su informacion profesional. ' +
    'La informacion se usara para crear su perfil en el sitio web.\n\n' +
    'Tomara aproximadamente 5-10 minutos. Gracias!'
  );
  form.setConfirmationMessage(
    'Gracias por completar su perfil! La informacion se usara para el nuevo sitio web de Dental City. ' +
    'Si necesita hacer cambios, puede editar su respuesta.'
  );
  form.setAllowResponseEdits(true);

  // ===== SECCION 1: Informacion Personal =====
  form.addSectionHeaderItem()
    .setTitle('Informacion Personal')
    .setHelpText('Informacion basica para su perfil en el sitio web.');

  form.addTextItem()
    .setTitle('Nombre completo')
    .setHelpText('Como quiere que aparezca en el sitio web. Ejemplo: Dr. Francisco Rodriguez Chaves')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Titulo profesional')
    .setHelpText('Ejemplo: Doctor en Odontologia y Cirugia Oral, Asistente Dental, Coordinador de Pacientes, etc.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Cargo en Dental City')
    .setHelpText('Ejemplo: Fundador y CEO, Periodoncista, Cirujano Dental, Asistente Dental, Gerente General, etc.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('En cual ubicacion trabaja principalmente?')
    .setChoiceValues([
      'Aguas Zarcas',
      'La Virgen, Sarapiqui',
      'Ambas ubicaciones'
    ])
    .setRequired(true);

  // ===== SECCION 2: Formacion y Credenciales =====
  form.addSectionHeaderItem()
    .setTitle('Formacion y Credenciales')
    .setHelpText('Su formacion academica y profesional.');

  form.addTextItem()
    .setTitle('Especialidad')
    .setHelpText('Ejemplo: Ortodoncia y Ortopedia Dentofacial, Implantes Dentales, Odontologia General, etc. Si no aplica, escriba "N/A".')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Educacion y formacion academica')
    .setHelpText(
      'Liste sus titulos, universidad(es), y ano de graduacion.\n\n' +
      'Ejemplo:\n' +
      '• Licenciatura en Odontologia — Universidad de Costa Rica (UCR), 2008\n' +
      '• Especialidad en Ortodoncia — Universidad Latina, 2012'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Cursos, diplomados o certificaciones adicionales')
    .setHelpText(
      'Cursos de educacion continua, certificaciones de equipos especificos, congresos, etc.\n' +
      'Dejar vacio si no aplica.'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Membresias profesionales')
    .setHelpText(
      'Ejemplo:\n' +
      '• Colegio de Cirujanos Dentistas de Costa Rica\n' +
      '• Asociacion de Ortodoncia de Costa Rica\n' +
      'Dejar vacio si no aplica.'
    )
    .setRequired(false);

  // ===== SECCION 3: Experiencia =====
  form.addSectionHeaderItem()
    .setTitle('Experiencia Profesional')
    .setHelpText('Ayudenos a comunicar su experiencia a los pacientes.');

  form.addTextItem()
    .setTitle('Anos de experiencia profesional')
    .setHelpText('Total de anos ejerciendo su profesion. Ejemplo: 15')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Anos en Dental City')
    .setHelpText('Cuantos anos lleva trabajando en Dental City? Ejemplo: 11')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Logros profesionales destacados')
    .setHelpText(
      'Datos que impresionen a los pacientes.\n\n' +
      'Ejemplo:\n' +
      '• Mas de 1,500 casos de ortodoncia completados\n' +
      '• 11 anos dedicados exclusivamente a la ortodoncia\n' +
      '• Capacitacion en el sistema de escaneo 3Shape TRIOS'
    )
    .setRequired(false);

  // ===== SECCION 4: Biografia =====
  form.addSectionHeaderItem()
    .setTitle('Su Biografia')
    .setHelpText('Esto aparecera en su perfil del sitio web.');

  form.addParagraphTextItem()
    .setTitle('Biografia profesional (3-5 oraciones)')
    .setHelpText(
      'Escriba en tercera persona sobre usted. Si prefiere, puede escribir ideas sueltas ' +
      'y nosotros la redactamos.\n\n' +
      'Ejemplo: "El Dr. Rodriguez Chaves es graduado de la Universidad de Costa Rica con mas de 15 anos ' +
      'de experiencia. Ha completado mas de 1,500 casos de ortodoncia y lidera Dental City con un ' +
      'compromiso con la precision, las tecnicas modernas y los planes de tratamiento personalizados."'
    )
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Prefiere que nosotros escribamos/editemos su biografia basandonos en la informacion que nos dio?')
    .setChoiceValues([
      'Si, por favor escribanla/editenla',
      'No, quiero usar exactamente lo que escribi'
    ])
    .setRequired(true);

  // ===== SECCION 5: Idiomas =====
  form.addSectionHeaderItem()
    .setTitle('Idiomas');

  form.addCheckboxItem()
    .setTitle('Que idiomas habla?')
    .setChoiceValues([
      'Espanol — Nativo',
      'Espanol — Avanzado',
      'Ingles — Nativo',
      'Ingles — Avanzado',
      'Ingles — Intermedio',
      'Ingles — Basico',
      'Portugues',
      'Frances',
      'Otro (especifique abajo)'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Otro idioma')
    .setRequired(false);

  // ===== SECCION 6: Foto =====
  form.addSectionHeaderItem()
    .setTitle('Foto Profesional')
    .setHelpText(
      'Una buena foto profesional genera confianza en los pacientes. ' +
      'Idealmente una foto clara del rostro, con buena iluminacion y fondo limpio.'
    );

  form.addMultipleChoiceItem()
    .setTitle('Tiene una foto profesional que quiera usar para el sitio web?')
    .setChoiceValues([
      'Si, la subire aqui',
      'Si, pero la enviare por WhatsApp o correo',
      'No tengo una foto profesional',
      'Prefiero usar la que ya tienen en el sitio'
    ])
    .setRequired(true);

  form.addFileUploadItem()
    .setTitle('Suba su foto profesional aqui')
    .setHelpText(
      'Requisitos:\n' +
      '• Foto clara de su rostro (headshot)\n' +
      '• Buena iluminacion\n' +
      '• Formato: JPG o PNG\n' +
      '• Tamano minimo recomendado: 500x500 pixeles\n\n' +
      'Si prefiere enviarla por otro medio, puede dejar esto en blanco.'
    )
    .setRequired(false);

  // ===== SECCION 7: Toque Personal (Opcional) =====
  form.addSectionHeaderItem()
    .setTitle('Toque Personal (Opcional)')
    .setHelpText(
      'Estas preguntas son opcionales pero ayudan a que los pacientes los conozcan ' +
      'como personas, no solo como profesionales.'
    );

  form.addTextItem()
    .setTitle('Un dato curioso o interesante sobre usted')
    .setHelpText('Ejemplo: "Le encanta el senderismo y ha visitado todos los volcanes de Costa Rica"')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Que es lo que mas disfruta de su trabajo en Dental City?')
    .setHelpText('Ejemplo: "Ver la sonrisa de satisfaccion de mis pacientes al terminar su tratamiento"')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Pasatiempos o intereses fuera del trabajo')
    .setHelpText('Ejemplo: Fotografia, cocina, deportes, voluntariado, etc.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Un mensaje para los pacientes que visiten el sitio web')
    .setHelpText(
      'Opcional — un mensaje corto y personal.\n' +
      'Ejemplo: "Mi compromiso es que cada paciente se sienta escuchado y atendido con el mayor cuidado posible. ' +
      'Su sonrisa es mi mayor recompensa."'
    )
    .setRequired(false);

  // Log the form URL
  Logger.log('Formulario creado! URL de edicion: ' + form.getEditUrl());
  Logger.log('Comparta este enlace con cada miembro del equipo: ' + form.getPublishedUrl());

  return form.getPublishedUrl();
}
