import type { ReactElement } from 'react'
import styles from './LandingPage.module.css'

interface LogoProps {
  readonly showTagline?: boolean
}

export function Logo({ showTagline = true }: LogoProps): ReactElement {
  return (
    <span className={styles.wordmark} aria-label="EcuNexo">
      <span className={styles.wordmarkName} aria-hidden>
        Ecu<strong>Ne<span className={styles.wordmarkX}>x</span>o</strong>
      </span>
      {showTagline ? (
        <span className={styles.wordmarkTagline} aria-hidden>
          Sistemas de integración empresarial
        </span>
      ) : null}
    </span>
  )
}
