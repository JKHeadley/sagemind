/**
 * Dental City Costa Rica — Formulario de Informacion de la Clinica
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire script
 * 4. Click Run -> createBusinessInfoForm
 * 5. Authorize when prompted
 * 6. Check your Google Drive — the form will be there
 * 7. Share the form link with the client
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

function createBusinessInfoForm() {
  var form = FormApp.create('Dental City Costa Rica — Informacion para el Sitio Web');
  form.setDescription(
    'Hola! Estamos construyendo el nuevo sitio web de Dental City Costa Rica.\n\n' +
    'Ya tenemos bastante informacion de su sitio actual y listados publicos. ' +
    'Este formulario nos ayuda a confirmar algunos datos y llenar los espacios faltantes.\n\n' +
    'Tomara aproximadamente 10-15 minutos. Gracias!'
  );
  form.setConfirmationMessage(
    'Gracias! Tenemos todo lo que necesitamos para continuar. ' +
    'Nos pondremos en contacto pronto si tenemos alguna pregunta adicional.'
  );
  form.setAllowResponseEdits(true);

  // ===== SECCION 1: Datos Basicos del Negocio =====
  form.addSectionHeaderItem()
    .setTitle('Datos Basicos del Negocio')
    .setHelpText('Encontramos esta informacion en linea — por favor confirme o corrija.');

  form.addTextItem()
    .setTitle('Nombre oficial del negocio')
    .setHelpText('Tenemos: Dental City Costa Rica')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Correo electronico principal de la clinica')
    .setHelpText('Tenemos: 3dradiologico@gmail.com (Aguas Zarcas) y dentalcitycostarica@gmail.com (Sarapiqui)')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Numero de WhatsApp principal para el sitio web')
    .setHelpText('Tenemos: +506 8339 8833')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algo de lo anterior que necesite correccion?')
    .setRequired(false);

  // ===== SECCION 2: Horarios - Aguas Zarcas =====
  form.addSectionHeaderItem()
    .setTitle('Horarios de Atencion — Aguas Zarcas')
    .setHelpText(
      'Encontramos estos horarios en su pagina de Facebook. Por favor confirme o corrija.\n\n' +
      'Horarios que tenemos:\n' +
      'Lunes / Martes / Miercoles / Viernes: 7:30AM - 6:00PM\n' +
      'Jueves: 8:00AM - 6:00PM\n' +
      'Sabado: 7:00AM - 1:00PM\n' +
      'Domingo: Cerrado'
    );

  var diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  var horariosAZ = ['7:30AM - 6:00PM', '7:30AM - 6:00PM', '7:30AM - 6:00PM', '8:00AM - 6:00PM', '7:30AM - 6:00PM', '7:00AM - 1:00PM', 'Cerrado'];

  for (var i = 0; i < diasSemana.length; i++) {
    form.addTextItem()
      .setTitle(diasSemana[i] + ' — Aguas Zarcas')
      .setHelpText('Tenemos: ' + horariosAZ[i])
      .setRequired(false);
  }

  form.addMultipleChoiceItem()
    .setTitle('Atienden solo con cita, o tambien sin cita?')
    .setChoiceValues([
      'Solo con cita previa',
      'Se aceptan pacientes sin cita',
      'Ambos — preferimos cita pero aceptamos sin cita'
    ])
    .setRequired(true);

  // ===== SECCION 3: Horarios - Sarapiqui =====
  form.addSectionHeaderItem()
    .setTitle('Horarios de Atencion — La Virgen, Sarapiqui')
    .setHelpText('No encontramos horarios para esta ubicacion. Por favor proporcionelos.');

  for (var j = 0; j < diasSemana.length; j++) {
    form.addTextItem()
      .setTitle(diasSemana[j] + ' — La Virgen, Sarapiqui')
      .setHelpText('Ejemplo: 8:00AM - 5:00PM  o  Cerrado')
      .setRequired(true);
  }

  form.addMultipleChoiceItem()
    .setTitle('El horario de Sarapiqui, es el mismo sistema de citas que Aguas Zarcas?')
    .setChoiceValues([
      'Si, mismo sistema',
      'No, es diferente (explique abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Si es diferente, como funciona la atencion en Sarapiqui?')
    .setRequired(false);

  // ===== SECCION 4: Redes Sociales =====
  form.addSectionHeaderItem()
    .setTitle('Redes Sociales')
    .setHelpText(
      'Encontramos sus paginas de Facebook:\n' +
      '• facebook.com/dentalcityaz (Aguas Zarcas)\n' +
      '• facebook.com/dentalcitysarapiqui (Sarapiqui)\n\n' +
      'Tienen otras redes sociales que quieran mostrar en el sitio web?'
    );

  form.addTextItem()
    .setTitle('Instagram')
    .setHelpText('Enlace completo o nombre de usuario. Dejar vacio si no tienen.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('TikTok')
    .setHelpText('Enlace completo o nombre de usuario. Dejar vacio si no tienen.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('YouTube')
    .setHelpText('Enlace del canal. Dejar vacio si no tienen.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Otra red social')
    .setHelpText('Cualquier otra plataforma que usen (LinkedIn, X/Twitter, etc.)')
    .setRequired(false);

  // ===== SECCION 5: Servicios =====
  form.addSectionHeaderItem()
    .setTitle('Servicios')
    .setHelpText(
      'Ya tenemos estos servicios listados en el sitio web:\n\n' +
      '• Implantes Dentales\n' +
      '• Rellenos / Calzas\n' +
      '• Coronas Dentales\n' +
      '• Puentes Dentales\n' +
      '• Carillas / Veneers\n' +
      '• Endodoncia (Root Canal)\n' +
      '• All-on-Four\n' +
      '• Ortodoncia\n' +
      '• Periodoncia\n' +
      '• Radiografias y TAC Dental\n' +
      '• Cirugia Oral\n' +
      '• Protesis Dentales\n' +
      '• Blanqueamiento Dental (BEYOND POLUS)\n\n' +
      'Hay algun servicio que falte o que ya no ofrezcan?'
    );

  form.addMultipleChoiceItem()
    .setTitle('La lista de servicios anterior esta correcta?')
    .setChoiceValues([
      'Si, esta correcta',
      'Casi correcta — cambios menores (ver abajo)',
      'Necesita cambios significativos (ver abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Servicios para agregar, eliminar, o modificar')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Ofrecen los mismos servicios en ambas ubicaciones?')
    .setChoiceValues([
      'Si, los mismos servicios en ambas',
      'No, algunos servicios solo estan en una ubicacion (explique abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Si es diferente, cuales servicios estan en cada ubicacion?')
    .setRequired(false);

  // ===== SECCION 6: Precios =====
  form.addSectionHeaderItem()
    .setTitle('Informacion de Precios')
    .setHelpText('Muchos pacientes internacionales buscan precios antes de contactar. Esto ayuda a generar confianza.');

  form.addMultipleChoiceItem()
    .setTitle('Quieren mostrar precios en el sitio web?')
    .setChoiceValues([
      'Si, precios exactos',
      'Si, pero solo rangos de precios (ej: "desde $200")',
      'No, preferimos que nos contacten para cotizacion',
      'Solo para algunos servicios (especifique abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Si quieren mostrar precios, por favor listelos aqui')
    .setHelpText(
      'Formato sugerido:\n' +
      'Servicio — Precio (o rango)\n' +
      'Ejemplo: Implante dental — desde $600\n' +
      'Blanqueamiento — $250'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('En que moneda prefieren mostrar los precios?')
    .setChoiceValues([
      'Dolares (USD)',
      'Colones (CRC)',
      'Ambos (USD y CRC)'
    ])
    .setRequired(false);

  // ===== SECCION 7: Pagos y Seguros =====
  form.addSectionHeaderItem()
    .setTitle('Metodos de Pago y Seguros')
    .setHelpText('Los pacientes quieren saber como pueden pagar antes de agendar.');

  form.addCheckboxItem()
    .setTitle('Que metodos de pago aceptan?')
    .setChoiceValues([
      'Efectivo (colones)',
      'Efectivo (dolares)',
      'Tarjeta de credito',
      'Tarjeta de debito',
      'SINPE Movil',
      'Transferencia bancaria',
      'Otro (especifique abajo)'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Otro metodo de pago')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Aceptan seguros dentales?')
    .setChoiceValues([
      'Si',
      'No',
      'Algunos (especifique abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Si aceptan seguros, cuales?')
    .setHelpText('Ejemplo: INS, CCSS, seguros privados especificos, etc.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Ofrecen planes de pago o financiamiento?')
    .setChoiceValues([
      'Si',
      'No',
      'Depende del tratamiento (explique abajo)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Detalles sobre planes de pago')
    .setRequired(false);

  // ===== SECCION 8: Ubicaciones y Transporte =====
  form.addSectionHeaderItem()
    .setTitle('Ubicaciones y Acceso')
    .setHelpText('Especialmente importante para pacientes internacionales de turismo dental.');

  form.addTextItem()
    .setTitle('Enlace de Google Maps — Aguas Zarcas')
    .setHelpText(
      'Abra Google Maps, busque su clinica, haga clic en "Compartir" y pegue el enlace aqui.\n' +
      'Direccion que tenemos: Edificio Dental City, 300 oeste del CTP, Aguas Zarcas'
    )
    .setRequired(true);

  form.addTextItem()
    .setTitle('Enlace de Google Maps — La Virgen, Sarapiqui')
    .setHelpText(
      'Abra Google Maps, busque su clinica, haga clic en "Compartir" y pegue el enlace aqui.\n' +
      'Direccion que tenemos: Edificio Dental City Frente a la Plaza de Deportes, La Virgen, Sarapiqui'
    )
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Tienen estacionamiento para pacientes?')
    .setChoiceValues([
      'Si, estacionamiento propio',
      'Si, estacionamiento cercano gratuito',
      'Hay estacionamiento de pago cerca',
      'No hay estacionamiento dedicado'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Informacion adicional sobre como llegar')
    .setHelpText(
      'Puntos de referencia, distancia desde el aeropuerto mas cercano, ' +
      'si ofrecen transporte o coordinacion de transporte para pacientes internacionales, etc.'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Ofrecen servicio de transporte para pacientes internacionales?')
    .setChoiceValues([
      'Si, ofrecemos transporte',
      'No, pero podemos recomendar opciones',
      'No'
    ])
    .setRequired(true);

  // ===== SECCION 9: Idiomas =====
  form.addSectionHeaderItem()
    .setTitle('Idiomas')
    .setHelpText('Importante para pacientes internacionales de turismo dental.');

  form.addCheckboxItem()
    .setTitle('Que idiomas habla el equipo de la clinica?')
    .setChoiceValues([
      'Espanol',
      'Ingles',
      'Portugues',
      'Frances',
      'Otro (especifique abajo)'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('Otro idioma')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Pueden atender pacientes que solo hablan ingles (sin espanol)?')
    .setChoiceValues([
      'Si, sin problema',
      'Si, pero con limitaciones',
      'No, necesitarian un traductor'
    ])
    .setRequired(true);

  // ===== SECCION 10: Certificaciones =====
  form.addSectionHeaderItem()
    .setTitle('Certificaciones y Acreditaciones')
    .setHelpText('Genera confianza mostrar certificaciones en el sitio web.');

  form.addParagraphTextItem()
    .setTitle('Tienen certificaciones o acreditaciones que quieran destacar?')
    .setHelpText(
      'Ejemplos:\n' +
      '• Colegio de Cirujanos Dentistas de Costa Rica\n' +
      '• Certificaciones internacionales\n' +
      '• Cursos de especializacion\n' +
      '• Premios o reconocimientos\n' +
      '• Membresia a asociaciones profesionales'
    )
    .setRequired(false);

  // ===== SECCION 11: Mision y Vision =====
  form.addSectionHeaderItem()
    .setTitle('Mision, Vision y Valores')
    .setHelpText('Esto nos ayuda a comunicar la esencia de Dental City en el sitio web.');

  form.addParagraphTextItem()
    .setTitle('Declaracion de mision')
    .setHelpText(
      'Cual es el proposito principal de Dental City? Por que hacen lo que hacen?\n' +
      'Ejemplo: "Nuestra mision es brindar atencion dental de alta calidad y accesible para todos, ' +
      'combinando tecnologia moderna con un trato humano y cercano."'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Declaracion de vision')
    .setHelpText(
      'Que quieren lograr a futuro?\n' +
      'Ejemplo: "Ser la clinica dental de referencia en la Zona Norte de Costa Rica, ' +
      'reconocida por la excelencia clinica y la satisfaccion de nuestros pacientes."'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Valores principales')
    .setHelpText('Liste 3-5 valores que definen a Dental City. Ejemplo: Excelencia, Calidez humana, Innovacion, Accesibilidad')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Hay algo especial sobre la historia de Dental City que quieran compartir?')
    .setHelpText(
      'Ya tenemos: fundada por dos graduados de la UCR, ' +
      'Dr. Francisco Rodriguez Chaves y Dra. Zaidy Mariela Hernandez Bonilla, mas de 20 anos de experiencia. ' +
      'Hay algo mas que quieran agregar?'
    )
    .setRequired(false);

  // ===== SECCION 12: Testimonios =====
  form.addSectionHeaderItem()
    .setTitle('Testimonios de Pacientes')
    .setHelpText(
      'Ya tenemos 3 testimonios en el sitio web. ' +
      'Tienen mas testimonios que quieran destacar?'
    );

  form.addParagraphTextItem()
    .setTitle('Testimonios adicionales')
    .setHelpText(
      'Formato:\n' +
      'Nombre del paciente: [nombre]\n' +
      'Testimonio: [texto]\n\n' +
      'Tambien pueden compartir el enlace a su pagina de Google Reviews si prefieren.'
    )
    .setRequired(false);

  form.addTextItem()
    .setTitle('Enlace a sus Google Reviews')
    .setHelpText('Si tienen un perfil de Google Business, pegue el enlace aqui.')
    .setRequired(false);

  // ===== SECCION 13: Fotos y Marca =====
  form.addSectionHeaderItem()
    .setTitle('Fotos y Marca')
    .setHelpText('Buenas fotos son lo que mas atrae pacientes nuevos.');

  form.addCheckboxItem()
    .setTitle('Que material adicional pueden proporcionar?')
    .setChoiceValues([
      'Fotos profesionales de los doctores (individuales)',
      'Fotos adicionales de la clinica',
      'Mas fotos de antes y despues de tratamientos',
      'Videos de la clinica o procedimientos',
      'Logo en alta resolucion (PNG o SVG)',
      'Manual de marca o guia de colores',
      'Ya tenemos suficiente material con lo que ya enviamos'
    ])
    .setRequired(true);

  // ===== SECCION 14: Turismo Dental =====
  form.addSectionHeaderItem()
    .setTitle('Turismo Dental')
    .setHelpText(
      'Queremos desarrollar bien esta seccion para atraer pacientes internacionales.'
    );

  form.addMultipleChoiceItem()
    .setTitle('Que tan importante es el turismo dental para su clinica?')
    .setChoiceValues([
      'Muy importante — queremos atraer mas pacientes internacionales',
      'Algo importante — recibimos algunos pero no es prioridad',
      'No es una prioridad por ahora'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Ofrecen paquetes especiales para pacientes internacionales?')
    .setHelpText('Ejemplo: coordinacion de hospedaje, transporte del aeropuerto, presupuesto completo por email/WhatsApp, etc.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Que ventajas de precio tienen respecto a EE.UU. o Europa?')
    .setHelpText('Ejemplo: "Un implante dental que cuesta $3,000-$5,000 en EE.UU. cuesta $600-$900 en nuestra clinica."')
    .setRequired(false);

  // ===== SECCION 15: Funcionalidades del Sitio Web =====
  form.addSectionHeaderItem()
    .setTitle('Funcionalidades Adicionales para el Sitio Web')
    .setHelpText('Opcional — diganos si alguna de estas les interesa.');

  form.addCheckboxItem()
    .setTitle('Cuales de estas funcionalidades les interesa?')
    .setChoiceValues([
      'Seccion de blog / consejos dentales',
      'Formulario de contacto en el sitio web',
      'Seccion de preguntas frecuentes (FAQ)',
      'Seccion de turismo dental (para pacientes internacionales)',
      'Formulario de citas en linea',
      'Seccion de promociones o descuentos',
      'Galeria de videos',
      'Mapa interactivo con ambas ubicaciones',
      'Ninguna de estas'
    ])
    .setRequired(false);

  // ===== SECCION 16: Para Finalizar =====
  form.addSectionHeaderItem()
    .setTitle('Para Finalizar');

  form.addParagraphTextItem()
    .setTitle('Hay algo que definitivamente quieran cambiar o mejorar del sitio actual?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Algo mas que quieran agregar?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Mejor forma de contactarlos para preguntas de seguimiento')
    .setHelpText('Telefono, WhatsApp, correo, etc.')
    .setRequired(true);

  // Log the form URL
  Logger.log('Formulario creado! URL de edicion: ' + form.getEditUrl());
  Logger.log('Comparta este enlace con el cliente: ' + form.getPublishedUrl());

  return form.getPublishedUrl();
}
