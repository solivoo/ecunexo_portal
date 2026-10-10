import type { ReactElement } from 'react'
import { heroHighlights } from '../data/landingContent'
import styles from './LandingPage.module.css'

interface HeroProps {
  readonly onRequestDemo: () => void
}

const previewMenu = ['Inicio', 'Catálogo', 'Bodegas', 'Inventario', 'Compras', 'Facturación', 'Contabilidad', 'Tienda online']

const previewSteps = ['Firmada', 'Recibida por el SRI', 'Autorizada', 'RIDE enviado al cliente']

export function Hero({ onRequestDemo }: HeroProps): ReactElement {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.heroCopy}>
        <span className={styles.badge}>
          <i className="bx bx-map-pin" aria-hidden />
          Hecho en Guayaquil para empresas de Ecuador
        </span>
        <h1>
          Inventario, ventas y facturación SRI <span>en un solo sistema</span>
        </h1>
        <p>
          EcuNexo conecta tu catálogo, bodegas, compras, comprobantes electrónicos, contabilidad y
          tienda online. Menos digitación, menos errores y la información de tu negocio siempre a la
          mano.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryButton} onClick={onRequestDemo}>
            Solicitar una demo <i className="bx bx-right-arrow-alt" aria-hidden />
          </button>
          <a href="#modulos" className={styles.secondaryButton}>
            Ver módulos
          </a>
        </div>
        <ul className={styles.heroHighlights}>
          {heroHighlights.map((item) => (
            <li key={item.title}>
              <i className={`bx ${item.icon}`} aria-hidden />
              <span>
                <strong>{item.title}</strong>
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.preview} aria-hidden>
        <div className={styles.previewBar}>
          <span />
          <span />
          <span />
          <em>Vista de ejemplo</em>
        </div>
        <div className={styles.previewBody}>
          <ul className={styles.previewMenu}>
            {previewMenu.map((item) => (
              <li key={item} className={item === 'Facturación' ? styles.previewMenuActive : ''}>
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.previewMain}>
            <p className={styles.previewLabel}>Factura electrónica</p>
            <p className={styles.previewDoc}>001-001-000000123</p>
            <ol className={styles.previewSteps}>
              {previewSteps.map((step) => (
                <li key={step}>
                  <i className="bx bx-check" />
                  {step}
                </li>
              ))}
            </ol>
            <div className={styles.previewStock}>
              <i className="bx bx-package" />
              Egreso de inventario registrado en bodega
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
