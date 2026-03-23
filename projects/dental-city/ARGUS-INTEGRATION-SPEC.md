# Especificación Técnica de Integración — Nebbia Solutions API

> **Cliente:** Centro Odontológico Aguas Zarcas S.A. (Dental City)
> **Para:** Grupo Argus (ventas@grupoargus.co.cr)
> **Fecha:** 23 de marzo, 2026
> **Estado:** Propuesta enviada, pendiente cotización

---

## Resumen Ejecutivo

La clínica necesita automatizar tres procesos administrativos que actualmente se realizan manualmente. La integración con la API de Nebbia Solutions permitiría eliminar tareas repetitivas y reducir errores humanos.

### Casos de Uso

| # | Caso de Uso | Tipo | Frecuencia | Prioridad |
|---|-------------|------|------------|-----------|
| 1 | Recepción de facturas electrónicas (XML) | Escritura | ~5-15/día | Alta |
| 2 | Consulta de citas programadas | Lectura | Cada 2-4 horas | Alta |
| 3 | Actualización de estado de citas | Escritura | ~10-20/día | Media |

---

## Caso de Uso #1: Recepción Automatizada de Facturas Electrónicas

### Problema Actual
El personal de recepción descarga manualmente archivos XML de facturas electrónicas desde Gmail, luego los sube uno por uno en Nebbia (Transacciones → Recepción de Documentos Electrónicos). Con 5-15 facturas diarias, esto consume tiempo significativo.

### Flujo Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│  SISTEMA INTERNO DE LA CLÍNICA                              │
│                                                             │
│  1. Monitoreo automático del correo (info@dentalcitycr.com) │
│     → Detecta correos con facturas electrónicas (XML)       │
│     → Extrae el archivo XML adjunto                         │
│                                                             │
│  2. Validación previa                                       │
│     → Verifica que el XML sea válido                        │
│     → Extrae metadatos: emisor, monto, número de factura    │
│                                                             │
│  3. Envío a Nebbia vía API                                  │
│     → POST al endpoint de recepción de documentos           │
│     → Incluye: archivo XML + identificador de organización  │
│       ("Centro Odontológico Aguas Zarcas")                  │
│                                                             │
│  4. Confirmación                                            │
│     → Recibe respuesta de Nebbia (éxito/error)              │
│     → Si éxito: marca correo como procesado                 │
│     → Si error: registra para revisión manual               │
│     → Genera log de transacción                             │
└─────────────────────────────────────────────────────────────┘
```

### Detalle Técnico

| Aspecto | Detalle |
|---------|---------|
| **Iniciador** | Automatización (sistema interno) |
| **Trigger** | Detección de nuevo correo con XML en Gmail |
| **Frecuencia** | Bajo demanda (~5-15 veces/día) |
| **Datos enviados** | Archivo XML de factura electrónica, ID de organización |
| **Respuesta esperada** | Código de estado (éxito/error), ID de documento registrado |
| **Autenticación** | API key o token (lo que Nebbia defina) |
| **Manejo de errores** | XML inválido → notificar personal. Timeout → reintentar 1 vez. Error de servidor → registrar y notificar. |
| **Volumen estimado** | 5-15 solicitudes/día (días laborales) |

### Endpoint Necesario

```
POST /api/documentos/recepcion
Content-Type: multipart/form-data

Campos:
- archivo: [archivo XML de factura electrónica]
- organizacion: "Centro Odontológico Aguas Zarcas"
- tipo_documento: "factura_electronica"

Respuesta esperada:
{
  "status": "success" | "error",
  "documento_id": "...",
  "mensaje": "Documento recibido correctamente"
}
```

---

## Caso de Uso #2: Consulta de Citas Programadas

### Problema Actual
El personal exporta manualmente un reporte diario desde Nebbia (Reportes → reportesdinamicosGenerales.aspx) como archivo .xls para ver la agenda del día. No hay vista consolidada accesible desde dispositivos móviles ni para múltiples usuarios simultáneamente.

### Flujo Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│  SISTEMA INTERNO DE LA CLÍNICA                              │
│                                                             │
│  1. Consulta programada (cada 2-4 horas, configurable)      │
│     → Solicita citas de Nebbia por rango de fecha           │
│     → Rango: fecha actual + próximos 7 días                 │
│                                                             │
│  2. Procesamiento de datos                                  │
│     → Almacena citas localmente para acceso rápido          │
│     → Organiza por doctor, fecha, hora                      │
│                                                             │
│  3. Presentación                                            │
│     → Panel web interno para el personal                    │
│     → Vista por doctor (cada doctor ve sus citas)           │
│     → Indicadores: citas confirmadas vs sin confirmar       │
│                                                             │
│  4. Acciones derivadas                                      │
│     → Enviar recordatorios a pacientes (WhatsApp/SMS)       │
│     → Alertar sobre citas sin confirmar                     │
│     → Detectar espacios libres en agenda                    │
└─────────────────────────────────────────────────────────────┘
```

### Detalle Técnico

| Aspecto | Detalle |
|---------|---------|
| **Iniciador** | Automatización (consulta programada) |
| **Trigger** | Cron/scheduler (cada 2-4 horas en horario laboral) |
| **Frecuencia** | 3-5 consultas/día |
| **Datos solicitados** | Citas por rango de fecha |
| **Campos necesarios** | fecha, hora_inicio, hora_fin, paciente_nombre, paciente_telefono, paciente_correo, doctor, estado_cita, motivo_cita, ubicacion, observaciones |
| **Filtros deseados** | Por fecha, por doctor, por estado |
| **Autenticación** | API key o token |
| **Manejo de errores** | API no disponible → usar última copia local. Datos incompletos → marcar campos faltantes. |
| **Volumen estimado** | 3-5 consultas/día, ~20-50 citas por consulta |

### Endpoint Necesario

```
GET /api/citas?fecha_inicio=2026-03-23&fecha_fin=2026-03-30&doctor=todos

Respuesta esperada:
{
  "citas": [
    {
      "id": 3078,
      "fecha": "2026-03-23",
      "hora_inicio": "09:00",
      "hora_fin": "09:15",
      "paciente": {
        "expediente": 3078,
        "nombre": "WILSON ALVARADO RODRIGUEZ",
        "telefono": "83642944",
        "correo": "walvaradorodriguez@gmail.com"
      },
      "doctor": "Dr. Francisco Rodríguez",
      "estado": "Sin Confirmar",
      "motivo": "CONTROL DE ORTODONCIA",
      "ubicacion": "Silla # 2",
      "observaciones": "confirmada, REGENERACION",
      "creado_por": "RECEPCIONCOAZ",
      "clinica": "Centro Odontológico Aguas Zarcas S.A"
    }
  ],
  "total": 25
}
```

---

## Caso de Uso #3: Actualización de Estado de Citas

### Problema Actual
Cuando el personal confirma una cita con el paciente (por teléfono o WhatsApp), debe entrar manualmente a Nebbia para cambiar el estado de "Sin Confirmar" a "Confirmada". Lo mismo aplica para cancelaciones.

### Flujo Propuesto

```
┌─────────────────────────────────────────────────────────────┐
│  SISTEMA INTERNO DE LA CLÍNICA                              │
│                                                             │
│  1. Acción del usuario en el panel web                      │
│     → Personal marca cita como "Confirmada" o "Cancelada"   │
│                                                             │
│  2. Actualización en Nebbia vía API                         │
│     → PATCH/PUT al endpoint de citas                        │
│     → Envía: ID de cita + nuevo estado                      │
│                                                             │
│  3. Confirmación                                            │
│     → Recibe respuesta de Nebbia                            │
│     → Actualiza panel local                                 │
│     → Registra cambio en log de auditoría                   │
└─────────────────────────────────────────────────────────────┘
```

### Detalle Técnico

| Aspecto | Detalle |
|---------|---------|
| **Iniciador** | Usuario (personal de recepción, vía panel web) |
| **Trigger** | Acción manual — clic en botón de confirmar/cancelar |
| **Frecuencia** | Bajo demanda (~10-20 actualizaciones/día) |
| **Datos enviados** | ID de cita, nuevo estado, timestamp |
| **Estados posibles** | Confirmada, Sin Confirmar, Cancelada |
| **Autenticación** | API key o token |
| **Manejo de errores** | API no disponible → cola local, reintentar. Cita no encontrada → notificar. Conflicto de estado → mostrar estado actual y pedir confirmación. |
| **Volumen estimado** | 10-20 solicitudes/día |

### Endpoint Necesario

```
PATCH /api/citas/{id}
Content-Type: application/json

{
  "estado": "Confirmada",
  "observaciones": "Confirmada por WhatsApp 23/03/2026"
}

Respuesta esperada:
{
  "status": "success",
  "cita_id": 3078,
  "estado_anterior": "Sin Confirmar",
  "estado_nuevo": "Confirmada"
}
```

---

## Resumen de Requerimientos de API

### Endpoints Solicitados

| # | Método | Endpoint | Descripción | Frecuencia |
|---|--------|----------|-------------|------------|
| 1 | POST | `/api/documentos/recepcion` | Enviar factura electrónica (XML) | ~5-15/día |
| 2 | GET | `/api/citas` | Consultar citas por rango de fecha | 3-5/día |
| 3 | PATCH | `/api/citas/{id}` | Actualizar estado de cita | ~10-20/día |

### Volumen Total Estimado

| Métrica | Valor |
|---------|-------|
| Solicitudes/día (promedio) | ~25-40 |
| Solicitudes/mes (estimado) | ~500-800 |
| Horario de uso | Lunes a Viernes, 7:00 AM - 6:00 PM (hora Costa Rica) |
| Picos de uso | 7:00-9:00 AM (consulta de agenda matutina) |

### Requisitos de Seguridad

- Autenticación por API key o token Bearer (lo que Nebbia defina)
- Comunicación exclusivamente por HTTPS
- Las credenciales se almacenarán de forma segura en variables de entorno del servidor
- El acceso será desde un solo servidor (IP fija si es necesario)
- Solo lectura para citas; escritura controlada para facturas y estados

### Requisitos de Disponibilidad

- Horario laboral: Lunes a Viernes 7 AM - 6 PM
- Tolerancia a indisponibilidad: el sistema interno tiene caché local y puede operar brevemente sin conexión a la API
- No se requiere uptime 24/7

---

## Información de Contacto

**Centro Odontológico Aguas Zarcas S.A.**
- Email: info@dentalcitycr.com
- Teléfono: +506 2474 0415
- WhatsApp: +506 8339 8833
