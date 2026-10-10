import type { ReactElement } from 'react'
import { faqs } from '../data/landingContent'
import styles from './LandingPage.module.css'

export function FaqSection(): ReactElement {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <p className={styles.eyebrow}>Preguntas frecuentes</p>
      <h2 id="faq-title">
        Lo que suelen <span>preguntarnos</span>
      </h2>
      <div className={styles.faqList}>
        {faqs.map((faq) => (
          <details key={faq.question} className={styles.faqItem}>
            <summary>
              {faq.question}
              <i className="bx bx-chevron-down" aria-hidden />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
