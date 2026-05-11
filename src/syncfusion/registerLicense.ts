import { registerLicense } from '@syncfusion/ej2-base'

const rawKey = import.meta.env.VITE_SYNCFUSION_LICENSE
if (typeof rawKey === 'string' && rawKey.trim().length > 0) {
  registerLicense(rawKey.replace(/\s+/g, ''))
}
