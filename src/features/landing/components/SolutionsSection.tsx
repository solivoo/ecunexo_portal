import type { ReactElement } from 'react'
import { onboardingSteps, solutions } from '../data/landingContent'
import styles from './LandingPage.module.css'

interface SolutionsSectionProps {
  readonly onRequestDemo: () => void
}

export function SolutionsSection({ onRequestDemo }: SolutionsSectionProps): ReactElement {
  return (
    <>
      <section className={styles.section} id="soluciones" aria-labelledby="solutions-title">
        <p className={styles.eyebrow}>Soluciones</p>
        <h2 id="solutions-title">
          Pensado para negocios <span>como el tuyo</span>
        </h2>
        <div className={styles.grid4}>
          {solutions.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={styles.icon}>
                <i className={`bx ${item.icon}`} aria-hidden />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="onboarding-title">
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerCopy}>
            <p className={styles.eyebrow}>Cómo empezamos</p>
            <h2 id="onboarding-title">Te acompañamos desde el primer día</h2>
          </div>
          <ol className={styles.steps}>
            {onboardingSteps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <button type="button" className={styles.lightButton} onClick={onRequestDemo}>
            Agendar una conversación
          </button>
        </div>
      </section>
    </>
  )
}
