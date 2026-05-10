/** Genera fecha/hora sugerida: dentro de 7 días a las 10:00 (hora local). */
function suggestedReunionRange(): { start: Date; end: Date } {
  const start = new Date()
  start.setDate(start.getDate() + 7)
  start.setHours(10, 0, 0, 0)
  const end = new Date(start.getTime() + 60 * 60 * 1000)
  return { start, end }
}

/** Formato iCalendar UTC (basic date / floating time). */
function formatIcsUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

/**
 * Plegado RFC 5545 (máx. 75 octets por segmento). Mejora compatibilidad con Outlook.
 */
function foldIcsLine(line: string): string {
  const encoder = new TextEncoder()
  const segments: string[] = []
  let rest = line

  while (rest.length > 0) {
    let take = rest.length
    while (take > 0 && encoder.encode(rest.slice(0, take)).length > 75) {
      take -= 1
    }
    if (take === 0) {
      take = 1
    }
    segments.push(rest.slice(0, take))
    rest = rest.slice(take)
    if (rest.length > 0) {
      rest = ` ${rest}`
    }
  }

  return segments.join('\r\n')
}

function buildLine(name: string, value: string): string {
  return foldIcsLine(`${name}:${value}`)
}

function newEventUid(): string {
  const base =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now()}${Math.random().toString(36).slice(2, 10)}`
  return `${base}@ecunexo.com`
}

/**
 * URL de Google Calendar (plantilla) como respaldo si el .ics no importa bien en Outlook.
 */
export function buildGoogleCalendarReunionUrl(): string {
  const { start, end } = suggestedReunionRange()
  const toGoogleDate = (d: Date): string =>
    d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
  const dates = `${toGoogleDate(start)}/${toGoogleDate(end)}`
  const text = encodeURIComponent('Videollamada con EcuNexo')
  const details = encodeURIComponent(
    'Solicitud desde ecunexo.com. Puedes ajustar la hora aquí. Contacto: galvarado@ecunexo.com | 096 088 9143',
  )
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}`
}

/**
 * Descarga un .ics para añadir la reunión al calendario (Outlook, Apple, Thunderbird, etc.).
 */
export function downloadReunionCalendarInvite(): void {
  const { start, end } = suggestedReunionRange()
  const uid = newEventUid()
  const now = new Date()

  const description = escapeIcsText(
    [
      'Videollamada solicitada desde ecunexo.com.',
      'Puedes cambiar fecha y hora al importar.',
      'Contacto: galvarado@ecunexo.com | 096 088 9143',
    ].join('\n'),
  )

  const rawLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EcuNexo//Landing//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    buildLine('UID', uid),
    buildLine('DTSTAMP', formatIcsUtc(now)),
    buildLine('DTSTART', formatIcsUtc(start)),
    buildLine('DTEND', formatIcsUtc(end)),
    buildLine('SUMMARY', escapeIcsText('Videollamada con EcuNexo')),
    buildLine('DESCRIPTION', description),
    buildLine('LOCATION', escapeIcsText('Enlace por confirmar')),
    'SEQUENCE:0',
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'CLASS:PUBLIC',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio EcuNexo',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const ics = `${rawLines.join('\r\n')}\r\n`
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'reunion-ecunexo.ics'
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1500)
}
