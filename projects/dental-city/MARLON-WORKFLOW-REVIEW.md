# Dental City — Flujos de Trabajo Actuales de Marlón (Para Revisión)

> **Google Doc:** [Ver en Google Docs](https://docs.google.com/document/d/1l7aVS-YmOcSy72cZN-rk6XkESv5wDNkHuNIQPaEVNeo/edit)
> **Fecha:** 22 de marzo, 2026
> **Estado:** Pendiente de revisión por Marlón

---

Marlón, este documento describe los procesos que usted realiza diariamente según lo que nos mostró en los videos y audio de WhatsApp del 19 de marzo. Por favor revise cada flujo de trabajo y confirme si es correcto, o indique qué pasos faltan o necesitan corrección.

Al final de cada sección hay preguntas específicas que necesitamos que responda para poder automatizar estos procesos correctamente.

---

## Flujo de Trabajo #1: Procesamiento de Facturas Electrónicas

**Descripción:** Cada día, Marlón procesa las facturas electrónicas que llegan por correo a info@dentalcitycr.com, descargando los archivos XML y subiéndolos manualmente al sistema Nebbia Solutions.

### Proceso Actual (Paso a Paso)

**Paso 1: Abrir Gmail**
→ Iniciar sesión en info@dentalcitycr.com
→ Revisar la bandeja de entrada

**Paso 2: Identificar correos de facturas**
→ Buscar correos que contengan facturas electrónicas
→ Estos correos traen archivos XML adjuntos

**Paso 3: Descargar el archivo XML**
→ Abrir el correo de la factura
→ Descargar el archivo XML adjunto a la computadora

**Paso 4: Iniciar sesión en Nebbia Solutions**
→ Ir a sistema.nebbiasolutions.com
→ Usuario: RECEPCIONCOAZ

**Paso 5: Navegar al módulo de facturas**
→ Ir a Transacciones
→ Seleccionar "Recepción de Documentos Electrónicos"

**Paso 6: Subir el archivo XML**
→ Seleccionar el archivo XML descargado
→ Elegir "Centro Odontológico" como organización
→ Hacer clic en "Enviar documento"

**Paso 7: Repetir**
→ Volver a Gmail
→ Repetir los pasos 2-6 para cada factura pendiente

### Diagrama de Flujo

```
Gmail (info@dentalcitycr.com)
    │
    ▼
¿Hay correos con facturas electrónicas (XML)?
    │                    │
   SÍ                   NO → Fin
    │
    ▼
Descargar archivo XML del correo
    │
    ▼
Abrir Nebbia Solutions (sistema.nebbiasolutions.com)
    │
    ▼
Transacciones → Recepción de Documentos Electrónicos
    │
    ▼
Subir XML → Seleccionar "Centro Odontológico" → "Enviar documento"
    │
    ▼
¿Hay más facturas pendientes?
    │                    │
   SÍ → Volver a Gmail  NO → Fin
```

### Proveedores Conocidos que Envían Facturas

- Cajeta Express (Enrique Ramírez Vargas)
- ETimbers
- Laboratorio Dental
- globaldebitcard (procesador de pagos)
- Mediclean
- Blano Studio
- Refraccionaria
- Corporación de Supermercados Unidos S.R.L.

### Lo Que Proponemos Automatizar

El sistema detectará automáticamente los correos con facturas electrónicas, descargará los archivos XML, y los subirá a Nebbia Solutions sin intervención manual. Marlón solo tendría que revisar un resumen diario de las facturas procesadas.

**Flujo propuesto:**
1. El sistema monitorea Gmail automáticamente
2. Detecta correos con "Factura Electrónica" o archivos XML
3. Descarga el XML automáticamente
4. Sube el XML a Nebbia Solutions (vía API o automatización web)
5. Marca el correo como procesado en Gmail (etiqueta "Factura Procesada")
6. Genera un registro/log con: fecha, remitente, monto, número de factura
7. Envía un resumen diario a Marlón

### Preguntas para Marlón — Flujo #1

- [ ] 1. ¿Aproximadamente cuántas facturas electrónicas recibe por día?
- [ ] 2. ¿Hay facturas que requieren un tratamiento especial o diferente? (Por ejemplo, ¿algún proveedor que necesite revisión antes de subir?)
- [ ] 3. ¿Verifica los montos o detalles de la factura antes de subirla a Nebbia, o simplemente sube todas las que llegan?
- [ ] 4. ¿Hay otros proveedores que envían facturas además de los listados arriba?
- [ ] 5. ¿Después de subir la factura a Nebbia, hace algo más con el correo? (¿Lo archiva, le pone etiqueta, lo deja en la bandeja?)
- [ ] 6. ¿Alguna vez Nebbia rechaza una factura? Si sí, ¿qué hace en ese caso?
- [ ] 7. ¿La lista de proveedores es completa o faltan algunos?

---

## Flujo de Trabajo #2: Clasificación y Filtrado de Correos

**Descripción:** Marlón lee todos los correos entrantes a info@dentalcitycr.com y los clasifica manualmente en carpetas/etiquetas de Gmail, reenviando los importantes a los doctores.

### Proceso Actual (Paso a Paso)

**Paso 1: Revisar bandeja de entrada**
→ Abrir Gmail (info@dentalcitycr.com)
→ Revisar todos los correos nuevos

**Paso 2: Leer cada correo**
→ Determinar de quién es y qué tipo de contenido tiene

**Paso 3: Clasificar según categoría**

| Tipo de Correo | Acción |
|----------------|--------|
| **Factura Electrónica** | Procesar según Flujo #1 (subir XML a Nebbia) |
| **Gobierno** (Hacienda / Ministerio de Salud / CCSS) | Clasificar en carpeta + reenviar a doctores |
| **Banco / Financiero** | Clasificar en carpeta + marcar si requiere acción |
| **Contrato / Pago** | Clasificar en carpeta + seguimiento si necesario |
| **Informativo / Boletín** | Reenviar a doctores si relevante + clasificar |
| **Consulta de Paciente** | Responder o gestionar según corresponda |

**Paso 4: Aplicar etiqueta/carpeta en Gmail**
→ Mover el correo a la carpeta correcta en la barra lateral izquierda

**Paso 5: Reenviar si es necesario**
→ Si el correo contiene información que los doctores necesitan ver, reenviarlo

### Diagrama de Flujo

```
Correo nuevo en info@dentalcitycr.com
    │
    ▼
Leer y determinar tipo de correo
    │
    ├── Factura Electrónica (XML) ────→ Flujo #1 (Subir a Nebbia)
    │
    ├── Gobierno (Hacienda/Salud/CCSS) → Etiquetar + Reenviar a doctores
    │
    ├── Banco / Financiero ───────────→ Etiquetar + Marcar si requiere acción
    │
    ├── Contrato / Pago ──────────────→ Etiquetar + Seguimiento si necesario
    │
    ├── Informativo / Boletín ────────→ Etiquetar + Reenviar a doctores (si relevante)
    │
    └── Consulta de paciente ─────────→ Responder / Gestionar
```

### Lo Que Proponemos Automatizar

Un sistema de inteligencia artificial leerá cada correo entrante, lo clasificará automáticamente en la categoría correcta, aplicará la etiqueta de Gmail correspondiente, y reenviará los correos urgentes a las personas indicadas. Marlón solo tendría que revisar los correos que el sistema no pueda clasificar con certeza.

**Flujo propuesto:**
1. El sistema monitorea Gmail continuamente
2. AI clasifica cada correo automáticamente en categorías
3. Aplica etiquetas de Gmail automáticamente
4. Reenvía correos urgentes/importantes al personal correspondiente
5. Las facturas electrónicas pasan directo al Flujo #1 automatizado
6. Correos que no se pueden clasificar con certeza se marcan para revisión manual de Marlón

### Preguntas para Marlón — Flujo #2

- [ ] 1. ¿Cuáles son los nombres EXACTOS de las carpetas/etiquetas que usa en Gmail? (Por favor liste todas las carpetas de la barra lateral izquierda)
- [ ] 2. ¿A cuáles doctores reenvía los correos? ¿Todos reciben lo mismo o cada doctor recibe un tipo diferente?
- [ ] 3. ¿Cuáles correos considera URGENTES que necesitan atención inmediata?
- [ ] 4. ¿Hay correos que simplemente elimina o ignora? (spam, publicidad, etc.)
- [ ] 5. ¿Aproximadamente cuántos correos nuevos llegan por día a info@dentalcitycr.com?
- [ ] 6. ¿Hay alguna regla especial que aplique? Por ejemplo: "Si es de Hacienda, siempre reenviarlo a Dr. Francisco"
- [ ] 7. ¿Usa alguna carpeta para correos que ya procesó o los deja en la bandeja?
- [ ] 8. ¿Hay otros tipos de correos que no mencionamos aquí?

---

## Flujo de Trabajo #3: Gestión de Agenda y Citas

**Descripción:** Marlón exporta el reporte diario de citas desde Nebbia Solutions para tener una vista general de la agenda del día, y gestiona las confirmaciones de citas.

### Proceso Actual (Paso a Paso)

**Paso 1: Iniciar sesión en Nebbia Solutions**
→ Ir a sistema.nebbiasolutions.com
→ Usuario: RECEPCIONCOAZ

**Paso 2: Navegar a Reportes**
→ Ir al módulo de Reportes
→ Abrir reportesdinamicosGenerales.aspx

**Paso 3: Exportar el reporte del día**
→ Seleccionar el rango de fechas
→ Exportar como archivo (Reporte.xls)
→ El archivo contiene la agenda completa del día

**Paso 4: Revisar la agenda**
→ Abrir el archivo exportado
→ Revisar las citas programadas para el día
→ Información disponible por cada cita:
  - Fecha y hora (inicio y fin)
  - Nombre del paciente
  - Número de expediente
  - Doctor asignado
  - Estado de la cita (Sin Confirmar / Confirmada)
  - Motivo de la cita (tipo de tratamiento)
  - Teléfono y correo del paciente
  - Ubicación / Silla asignada
  - Observaciones y comentarios

**Paso 5: Gestionar confirmaciones**
→ Contactar pacientes con citas sin confirmar
→ Actualizar estados en el sistema

### Diagrama de Flujo

```
Inicio del día
    │
    ▼
Iniciar sesión en Nebbia Solutions
    │
    ▼
Reportes → reportesdinamicosGenerales.aspx
    │
    ▼
Exportar reporte del día (Reporte.xls)
    │
    ▼
Revisar agenda: ¿Hay citas sin confirmar?
    │                    │
   SÍ                   NO → Agenda lista
    │
    ▼
Contactar paciente (¿por teléfono? ¿WhatsApp?)
    │
    ▼
¿Paciente confirma?
    │           │
   SÍ          NO
    │           │
    ▼           ▼
Marcar como    Reagendar o
"Confirmada"   cancelar cita
    │           │
    ▼           ▼
Actualizar en Nebbia
    │
    ▼
¿Más citas sin confirmar? → SÍ → Volver a contactar
    │
   NO → Agenda del día completa
```

### Campos del Reporte de Citas (Reporte.xls)

El archivo que Nebbia exporta contiene los siguientes campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| Fecha | Fecha de la cita | 20/03/2026 |
| Hora | Hora de inicio | 09:00:00 a. m. |
| horafin | Hora de fin | 09:15:00 a. m. |
| Id | Número de identificación de la cita | 3078 |
| No. Expediente | Número de expediente del paciente | 3078 |
| Nombre | Nombre completo del paciente | WILSON ALVARADO RODRIGUEZ |
| Doctor | Doctor asignado | Dr. Francisco Rodríguez |
| estadocita | Estado | Sin Confirmar / Confirmada |
| Comentario | Comentarios adicionales | (texto libre) |
| Observaciones | Notas | "confirmada, REGENERACION" |
| Ubicación | Consultorio / Silla | "Dr. Francisco Rodríguez / Silla # 2" |
| motivocita | Motivo de la cita | "CONTROL DE ORTODONCIA" |
| Tels | Teléfono del paciente | tel: 83642944 |
| Correo | Correo electrónico | walvaradorodriguez@gmail.com |
| Clínica | Clínica | Centro Odontológico Aguas Zarcas S.A |
| creadopor | Quién creó la cita | RECEPCIONCOAZ / drrodriguez |
| OrigenCita | Origen de la cita | Sistema |

### Lo Que Proponemos Automatizar

El sistema exportará automáticamente la agenda diaria de Nebbia, la presentará en un panel web fácil de usar (en clients.dentalcitycr.com), y podrá enviar recordatorios automáticos a los pacientes por WhatsApp.

**Flujo propuesto:**
1. Exportación automática diaria de la agenda desde Nebbia
2. Datos presentados en un panel web accesible desde cualquier dispositivo
3. Vista por doctor: cada doctor ve solo sus citas del día
4. Recordatorios automáticos por WhatsApp a pacientes con citas próximas
5. Seguimiento de pacientes que no se presentaron (no-shows)
6. Marlón puede ver y gestionar todo desde el panel sin necesidad de exportar archivos

### Preguntas para Marlón — Flujo #3

- [ ] 1. ¿Con qué frecuencia exporta el reporte? (¿Una vez al día? ¿Varias veces?)
- [ ] 2. ¿Cómo confirma las citas con los pacientes? (¿Llamada telefónica? ¿WhatsApp? ¿Ambos?)
- [ ] 3. ¿Cuánto tiempo antes de la cita contacta al paciente para confirmar? (¿Un día antes? ¿Dos días?)
- [ ] 4. ¿Actualiza el estado de la cita en Nebbia después de confirmar? (¿Cambia "Sin Confirmar" a "Confirmada"?)
- [ ] 5. ¿Qué hace cuando un paciente no confirma o cancela?
- [ ] 6. ¿Los doctores también ven este reporte o solo Marlón lo maneja?
- [ ] 7. ¿Hay algo más que haga con la agenda además de confirmar citas? (¿Reorganizar horarios? ¿Notificar a doctores de cambios?)
- [ ] 8. ¿Usa el reporte solo para el día actual o también revisa días futuros?

---

## Resumen: Los Tres Flujos

| Flujo | Proceso | Prioridad de Automatización |
|-------|---------|----------------------------|
| **#1: Facturas** | Gmail → XML → Nebbia | Alta |
| **#2: Correos** | Gmail → Clasificar → Etiquetar → Reenviar | Alta |
| **#3: Agenda** | Nebbia → Reporte → Confirmar citas | Media (depende de acceso API Nebbia) |

---

## Instrucciones para Marlón

Marlón, por favor:

1. **Lea** cada flujo de trabajo cuidadosamente
2. **Confirme** si los pasos descritos son correctos
3. Si **falta algún paso** o hay un error, por favor anótelo
4. **Responda las preguntas** al final de cada sección (puede escribir directamente en este documento o enviarnos las respuestas por WhatsApp)
5. Si hay **otros procesos diarios** que realiza y que no están incluidos aquí, por favor descríbalos

Sus respuestas son MUY importantes para que podamos automatizar estos procesos correctamente y ahorrarle tiempo.

**Si tiene preguntas, contacte a:**
- Adriana — adriana@sagemindai.io
- WhatsApp: info@dentalcitycr.com (canal existente)
