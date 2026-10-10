import type { ReactElement } from 'react'
import { sriSteps } from '../data/landingContent'
import styles from './LandingPage.module.css'

export function SriSection(): ReactElement {
  return (
    <section className={`${styles.section} ${styles.band}`} id="facturacion" aria-labelledby="sri-title">
      <p className={styles.eyebrow}>Facturación electrónica</p>
      <h2 id="sri-title">
        Del clic al comprobante autorizado, <span>en un solo flujo</span>
      </h2>
      <p className={styles.subtitle}>
        Sin portales externos ni archivos que pasar de un programa a otro. EcuNexo trabaja con el
        esquema offline del SRI.
      </p>
      <ol className={styles.timeline}>
        {sriSteps.map((step, index) => (
          <li key={step.title}>
            <span className={styles.timelineNumber}>{index + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <div className={styles.docTypes}>
        <span><i className="bx bx-file" aria-hidden />Factura</span>
        <span><i className="bx bx-undo" aria-hidden />Nota de crédito</span>
        <span><i className="bx bx-car" aria-hidden />Guía de remisión</span>
      </div>
    </section>
  )
}
