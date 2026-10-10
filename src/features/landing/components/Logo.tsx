import type { ReactElement } from 'react'
import styles from './LandingPage.module.css'

export function Logo(): ReactElement {
  return (
    <span className={styles.wordmark} aria-label="EcuNexo">
      <span className={styles.wordmarkName} aria-hidden>
        Ecu<strong>Ne<span className={styles.wordmarkX}>x</span>o</strong>
      </span>
    </span>
  )
}
