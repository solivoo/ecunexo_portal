export interface Highlight {
  readonly icon: string
  readonly title: string
  readonly description: string
}

export interface ModuleFeature {
  readonly title: string
  readonly description: string
}

export interface ModuleGroup {
  readonly id: string
  readonly label: string
  readonly icon: string
  readonly headline: string
  readonly summary: string
  readonly features: readonly ModuleFeature[]
}

export interface Step {
  readonly title: string
  readonly description: string
}

export interface Faq {
  readonly question: string
  readonly answer: string
}

export const navLinks = [
  { href: '#modulos', label: 'Módulos' },
  { href: '#facturacion', label: 'Facturación SRI' },
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#sobre', label: 'Nosotros' },
  { href: '#faq', label: 'Preguntas' },
] as const

export const heroHighlights: readonly Highlight[] = [
  { icon: 'bx-receipt', title: 'Facturación SRI', description: 'Factura, nota de crédito y guía de remisión' },
  { icon: 'bx-package', title: 'Inventario real', description: 'Stock por bodega y kárdex de movimientos' },
  { icon: 'bx-buildings', title: 'Multiempresa', description: 'Varios RUC bajo una misma cuenta' },
]

export const painPoints: readonly Highlight[] = [
  {
    icon: 'bx-spreadsheet',
    title: 'Adiós a las hojas de cálculo sueltas',
    description: 'Productos, precios, stock, compras y ventas viven en un solo sistema. Lo que se vende se descuenta del inventario.',
  },
  {
    icon: 'bx-time-five',
    title: 'Menos tiempo digitando',
    description: 'Importa las facturas de tus proveedores desde el XML del SRI y recibe la mercadería en bodega sin volver a escribirla.',
  },
  {
    icon: 'bx-check-shield',
    title: 'Tranquilidad con el SRI',
    description: 'Emite comprobantes electrónicos firmados con el certificado de tu empresa y revisa su estado de autorización en un solo lugar.',
  },
]

export const moduleGroups: readonly ModuleGroup[] = [
  {
    id: 'inventario',
    label: 'Inventario',
    icon: 'bx-package',
    headline: 'Sabes qué tienes, dónde está y cuánto se movió',
    summary: 'Catálogo, bodegas y movimientos conectados para que el stock siempre cuadre.',
    features: [
      { title: 'Catálogo con variantes', description: 'Plantillas de producto y combinaciones de talla, color u otros atributos, con fotos por cada SKU.' },
      { title: 'Varias bodegas', description: 'Registra cada bodega o local y consulta el saldo de cada producto por ubicación.' },
      { title: 'Ingresos, egresos y traspasos', description: 'Documentos de inventario con aprobación para mover mercadería con respaldo.' },
      { title: 'Kárdex y stock mínimo', description: 'Historial completo de movimientos y saldos mínimos para saber qué reponer.' },
    ],
  },
  {
    id: 'ventas',
    label: 'Ventas y precios',
    icon: 'bx-purchase-tag',
    headline: 'Precios claros para cada cliente y cada temporada',
    summary: 'Define cómo vendes sin fórmulas en Excel ni cambios a mano producto por producto.',
    features: [
      { title: 'Listas de precios', description: 'Precios distintos por tipo de cliente o canal, con carga masiva.' },
      { title: 'Promociones y volumen', description: 'Descuentos por temporada y precios escalonados según la cantidad comprada.' },
      { title: 'Simulador e historial', description: 'Calcula el precio final antes de vender y revisa quién cambió qué y cuándo.' },
      { title: 'Directorio de clientes', description: 'Clientes clasificados por tipo, con validación de cédula y RUC.' },
    ],
  },
  {
    id: 'facturacion',
    label: 'Facturación SRI',
    icon: 'bx-receipt',
    headline: 'Comprobantes electrónicos sin salir del sistema',
    summary: 'Emites, firmas, envías al SRI y entregas el RIDE al cliente en el mismo flujo.',
    features: [
      { title: 'Factura, nota de crédito y guía', description: 'Emisión de comprobantes 01, 04 y 06 en ambiente de pruebas o producción.' },
      { title: 'Tu firma electrónica', description: 'Cada empresa carga su certificado .p12 y los documentos se firman automáticamente.' },
      { title: 'Monitoreo de estados SRI', description: 'Consulta qué comprobantes están recibidos, autorizados o con observaciones.' },
      { title: 'RIDE y correo automático', description: 'PDF con tu logo y envío al cliente cuando el SRI autoriza el comprobante.' },
    ],
  },
  {
    id: 'compras',
    label: 'Compras y contabilidad',
    icon: 'bx-calculator',
    headline: 'Compras ordenadas y números listos para tu contador',
    summary: 'Desde la factura del proveedor hasta los estados financieros.',
    features: [
      { title: 'Importación de XML', description: 'Sube la factura electrónica del proveedor y el sistema llena el documento de compra.' },
      { title: 'Proveedores y proformas', description: 'Cotizaciones de compra con aprobación antes de comprometer el gasto.' },
      { title: 'Plan de cuentas y asientos', description: 'Plan contable para Ecuador y asientos generados también desde las compras.' },
      { title: 'Balances y pre-declaración', description: 'Estados financieros y borrador de los formularios 104 y 103.' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'Tienda online',
    icon: 'bx-store',
    headline: 'Tu catálogo vendiendo en internet',
    summary: 'Una vitrina conectada al mismo inventario: lo que publicas es lo que tienes.',
    features: [
      { title: 'Vitrina en tu dominio', description: 'Publica productos en tu propia dirección web y elige cuáles mostrar.' },
      { title: 'Compra sin registro', description: 'El cliente compra como invitado y el stock queda reservado mientras confirma.' },
      { title: 'Pedidos de punta a punta', description: 'Confirma, prepara, despacha y entrega; vincula cada pedido a su factura.' },
      { title: 'Envíos configurables', description: 'Métodos, zonas y tarifas de envío según tu logística.' },
    ],
  },
  {
    id: 'admin',
    label: 'Administración',
    icon: 'bx-shield-quarter',
    headline: 'Cada persona ve solo lo que le corresponde',
    summary: 'Control de accesos y configuración por empresa, pensado para crecer.',
    features: [
      { title: 'Usuarios, roles y departamentos', description: 'Organiza a tu equipo y asigna permisos por función.' },
      { title: 'Permisos detallados', description: 'Decide quién puede ver, crear, aprobar o anular en cada módulo.' },
      { title: 'Varias empresas', description: 'Administra varios RUC desde una cuenta y cambia entre ellos en un clic.' },
      { title: 'Tu marca en todo', description: 'Logo, color y plantillas de correo propias para cada empresa.' },
    ],
  },
]

export const sriSteps: readonly Step[] = [
  { title: 'Emites', description: 'Creas la factura, nota de crédito o guía de remisión desde el sistema.' },
  { title: 'Se firma', description: 'El XML se firma con el certificado electrónico de tu empresa.' },
  { title: 'Se envía al SRI', description: 'El comprobante viaja a recepción y se consulta su autorización.' },
  { title: 'Llega al cliente', description: 'Se genera el RIDE en PDF y se envía por correo automáticamente.' },
  { title: 'Cuadra el inventario', description: 'La mercadería facturada se descuenta de la bodega.' },
]

export const solutions: readonly Highlight[] = [
  {
    icon: 'bx-store-alt',
    title: 'Comercios y cadenas',
    description: 'Varias bodegas o locales, precios por tipo de cliente y facturación electrónica en el mismo sistema.',
  },
  {
    icon: 'bx-wrench',
    title: 'Talleres y servicio técnico',
    description: 'Recibe lotes de equipos desde Excel, registra fotos y entrega actas de despacho con código QR verificable.',
  },
  {
    icon: 'bx-cart-alt',
    title: 'Negocios que venden en línea',
    description: 'Tienda web conectada a tu inventario, con pedidos, envíos y factura vinculada.',
  },
  {
    icon: 'bx-buildings',
    title: 'Grupos con varias empresas',
    description: 'Cada RUC con sus datos, certificado y marca, administrados desde una sola cuenta.',
  },
]

export const onboardingSteps: readonly Step[] = [
  { title: 'Conversamos', description: 'Revisamos cómo trabaja tu negocio y qué módulos necesitas.' },
  { title: 'Activamos tu cuenta', description: 'Recibes tu licencia con los módulos elegidos, sin pagar por lo que no usas.' },
  { title: 'Configuramos juntos', description: 'Empresa, firma electrónica, bodegas, catálogo y usuarios.' },
  { title: 'Empiezas a operar', description: 'Te acompañamos en los primeros comprobantes y movimientos.' },
]

export const reasons: readonly Highlight[] = [
  {
    icon: 'bx-map-pin',
    title: 'Hecho para Ecuador',
    description: 'Comprobantes del SRI, validación de cédula y RUC, y formularios 104 y 103 desde el diseño.',
  },
  {
    icon: 'bx-extension',
    title: 'Modular',
    description: 'Activa solo los módulos que tu negocio necesita hoy y suma otros cuando crezcas.',
  },
  {
    icon: 'bx-support',
    title: 'Equipo en Guayaquil',
    description: 'Hablas directamente con quienes construyen el sistema, sin intermediarios.',
  },
]

export const faqs: readonly Faq[] = [
  {
    question: '¿Qué comprobantes electrónicos puedo emitir?',
    answer: 'Facturas, notas de crédito y guías de remisión, firmadas con el certificado de tu empresa y enviadas al SRI en ambiente de pruebas o producción.',
  },
  {
    question: '¿Necesito firma electrónica?',
    answer: 'Sí. Cargas el archivo .p12 de tu empresa en la configuración y el sistema lo usa para firmar cada comprobante.',
  },
  {
    question: '¿Puedo manejar varias empresas?',
    answer: 'Sí. Puedes administrar varios RUC desde la misma cuenta; cada empresa tiene sus datos, su certificado, su logo y sus usuarios.',
  },
  {
    question: '¿Tengo que contratar todos los módulos?',
    answer: 'No. La licencia se arma por módulos: inventario, facturación, compras, contabilidad, tienda online y más. Activas lo que necesitas.',
  },
  {
    question: '¿Puedo cargar las compras de mis proveedores?',
    answer: 'Sí. Importas el XML de la factura electrónica del proveedor y el sistema crea el documento de compra para recibirlo en bodega.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer: 'Depende de los módulos, usuarios y empresas que necesites. Escríbenos y te enviamos una propuesta para tu caso.',
  },
]

export const contactInfo = {
  email: 'galvarado@ecunexo.com',
  phoneHref: 'tel:+593960889143',
  phoneLabel: '096 088 9143',
  whatsappNumber: '593960889143',
  city: 'Guayaquil, Ecuador',
} as const

export const whatsappLink = `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent('Hola EcuNexo, quiero más información.')}`
