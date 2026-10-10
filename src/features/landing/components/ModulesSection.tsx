import { OptionGroup } from 'glubox'
import { useState, type ReactElement } from 'react'
import { moduleGroups, painPoints } from '../data/landingContent'
import styles from './LandingPage.module.css'

export function ModulesSection(): ReactElement {
  const [activeId, setActiveId] = useState<string>(moduleGroups[0].id)
  const active = moduleGroups.find((group) => group.id === activeId) ?? moduleGroups[0]

  return (
    <>
      <section className={styles.section} aria-labelledby="pain-title">
        <p className={styles.eyebrow}>Por qué EcuNexo</p>
        <h2 id="pain-title">
          Tu negocio funcionando <span>como un solo equipo</span>
        </h2>
        <div className={styles.grid3}>
          {painPoints.map((item) => (
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

      <section className={styles.section} id="modulos" aria-labelledby="modules-title">
        <p className={styles.eyebrow}>Módulos</p>
        <h2 id="modules-title">
          Todo lo que tu operación necesita, <span>conectado</span>
        </h2>
        <p className={styles.subtitle}>
          Elige un área para ver lo que puedes hacer hoy con EcuNexo.
        </p>

        <div className={styles.tabs}>
          <OptionGroup
            layout="segmented"
            variant="outline"
            size="lg"
            options={moduleGroups.map((group) => ({ value: group.id, label: group.label }))}
            value={activeId}
            onChange={setActiveId}
            name="module-group"
          />
        </div>

        <div className={styles.modulePanel} key={active.id}>
          <div className={styles.modulePanelIntro}>
            <span className={`${styles.icon} ${styles.iconLarge}`}>
              <i className={`bx ${active.icon}`} aria-hidden />
            </span>
            <h3>{active.headline}</h3>
            <p>{active.summary}</p>
          </div>
          <ul className={styles.featureList}>
            {active.features.map((feature) => (
              <li key={feature.title}>
                <i className="bx bx-check-circle" aria-hidden />
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
