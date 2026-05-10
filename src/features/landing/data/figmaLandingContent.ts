export interface FeatureItem {
  readonly title: string
  readonly description: string
  readonly tone: 'blue' | 'sky' | 'slate' | 'emerald'
}

export interface ServiceItem {
  readonly title: string
  readonly description: string
}

export interface ReasonItem {
  readonly title: string
  readonly description: string
}

export interface RecommendationItem {
  readonly title: string
  readonly description: string
}

export const dashboardImageUrl =
  'https://www.figma.com/api/mcp/asset/af621c1c-1bdb-41e2-aa15-4cd75ad1c6a1'
export const techImageUrl =
  'https://www.figma.com/api/mcp/asset/f75a83ec-32f6-488a-9fb8-912ff706e085'

export const moduleItems: readonly FeatureItem[] = [
  { title: 'Gestión de Bodegas', description: 'Control total de tu inventario con trazabilidad en tiempo real y auditoría Web3.', tone: 'blue' },
  { title: 'Facturación Electrónica', description: 'Emisión de facturas según normativas del SRI de Ecuador con respaldo verificable.', tone: 'sky' },
  { title: 'E-commerce', description: 'Tienda online integrada con tu sistema de inventario y pagos digitales modernos.', tone: 'slate' },
  { title: 'Multitenancy + Web3', description: 'Gestiona múltiples empresas desde una sola plataforma con seguridad blockchain.', tone: 'blue' },
  { title: 'Reportes y Analytics', description: 'Dashboards interactivos para la toma de decisiones.', tone: 'emerald' },
  { title: 'Control de Usuarios', description: 'Roles y permisos granulares para tu equipo.', tone: 'slate' },
]

export const serviceItems: readonly ServiceItem[] = [
  {
    title: 'Implementación Rápida',
    description: 'Comienza a usar el sistema en menos de 48 horas con nuestra configuración guiada.',
  },
  {
    title: 'Seguridad Web3',
    description: 'Protección avanzada con tecnología blockchain para tus datos críticos.',
  },
  {
    title: 'Soporte Dedicado',
    description: 'Equipo técnico disponible para resolver tus dudas de lunes a viernes.',
  },
  {
    title: 'Escalabilidad',
    description: 'Crece sin límites, nuestro sistema se adapta al tamaño de tu empresa.',
  },
]

export const reasons: readonly ReasonItem[] = [
  {
    title: 'MVP Orientado al Mercado',
    description: 'Comenzamos con funcionalidades esenciales y crecemos según las necesidades reales del mercado ecuatoriano.',
  },
  {
    title: 'Tecnología de Punta',
    description: 'Integramos mejores prácticas de desarrollo con infraestructura web3 para seguridad y escalabilidad.',
  },
  {
    title: 'Soporte Local',
    description: 'Equipo basado en Guayaquil que entiende las necesidades del mercado ecuatoriano.',
  },
]

export const recommendations: readonly RecommendationItem[] = [
  {
    title: 'Recomendado para cadenas con varias sucursales',
    description: 'Si tienes varias bodegas y necesitas control en tiempo real, este sistema reduce errores operativos rápidamente.',
  },
  {
    title: 'Ideal para negocios que quieren diferenciarse con Web3',
    description: 'Integra trazabilidad y confianza digital para mostrar innovación ante clientes e inversionistas.',
  },
  {
    title: 'Perfecto para equipos que escalan en menos de 6 meses',
    description: 'Arquitectura lista para crecer en usuarios, módulos y procesos sin rehacer la plataforma.',
  },
]
