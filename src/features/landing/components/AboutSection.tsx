import type { ReactElement } from 'react'
import { reasons } from '../data/landingContent'
import styles from './LandingPage.module.css'

export function AboutSection(): ReactElement {
  return (
    <section className={styles.section} id="sobre" aria-labelledby="about-title">
      <div className={styles.aboutSplit}>
        <div>
          <p className={`${styles.eyebrow} ${styles.left}`}>Quiénes somos</p>
          <h2 id="about-title" className={styles.left}>
            Una empresa ecuatoriana <span>que construye su propio software</span>
          </h2>
          <p className={styles.aboutText}>
            Somos un equipo tecnológico con sede en Guayaquil. Desarrollamos EcuNexo para que las
            empresas del país gestionen su operación y cumplan con el SRI desde una sola plataforma,
            con soporte de las mismas personas que la construyen.
          </p>
          <div className={styles.missionGrid}>
            <div>
              <h3>Misión</h3>
              <p>Llevar herramientas de gestión empresarial de calidad a negocios de todos los tamaños.</p>
            </div>
            <div>
              <h3>Visión</h3>
              <p>Ser la plataforma de gestión integral de referencia en la región.</p>
            </div>
          </div>
        </div>
        <ul className={styles.reasonList}>
          {reasons.map((item) => (
            <li key={item.title} className={styles.card}>
              <span className={styles.icon}>
                <i className={`bx ${item.icon}`} aria-hidden />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
