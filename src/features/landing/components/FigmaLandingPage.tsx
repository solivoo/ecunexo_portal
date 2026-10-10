import dashboardImage from '../../../assets/dashboard-analytics.png'
import techImage from '../../../assets/tech-modern.png'
import logoDark from '../../../assets/solo_logo_ecunexo_dark.svg'
import logoLight from '../../../assets/solo_logo_ecunexo_light.svg'
import { useEffect, useState, type ReactElement } from 'react'
import {
  moduleItems,
  recommendations,
  reasons,
  serviceItems,
  type RecommendationItem,
} from '../data/figmaLandingContent'
import { useContactForm } from '../../../hooks/useContactForm'
import { ContactForm } from './ContactForm'
import {
  buildGoogleCalendarReunionUrl,
  downloadReunionCalendarInvite,
} from '../../../utils/reunionCalendar'
import styles from './FigmaLandingPage.module.css'

const toneClassName = {
  blue: styles.toneBlue,
  sky: styles.toneSky,
  slate: styles.toneSlate,
  emerald: styles.toneEmerald,
}

const scrollToContact = (): void => {
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function FigmaLandingPage(): ReactElement {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const { control, handleSubmit, errors, isSubmitting, submitState, onSubmit } = useContactForm()

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const whatsappNumber = '593960889143'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola EcuNexo, quiero más información.')}`

  return (
    <div className={`${styles.page} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#inicio" className={styles.logo}>
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="EcuNexo"
              className={styles.logoImage}
              width={156}
              height={40}
            />
          </a>
          <nav aria-label="Principal">
            <a href="#inicio">Inicio</a>
            <a href="#modulos">Módulos</a>
            <a href="#servicios">Servicios</a>
            <a href="#sobre">Quiénes Somos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <button
            className={styles.themeToggle}
            type="button"
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            onClick={() => setIsDarkMode((currentValue) => !currentValue)}
          >
            <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} aria-hidden />
          </button>
        </div>
      </header>

      <section className={styles.hero} id="inicio">
        <div>
          <span className={styles.badge}>
            <i className="bx bx-bolt-circle" aria-hidden />
            Tecnología Web3 · Ecuador
          </span>
          <h1>
            Gestión de Inventario <span>Inteligente</span>
          </h1>
          <p>
            Sistema multitenancy con bodegas, facturación y comercio electrónico. Comienza tu
            transformación digital en Guayaquil.
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={scrollToContact}>
              Comenzar ahora <i className="bx bx-right-arrow-alt" aria-hidden />
            </button>
            <button type="button" className={styles.secondary} onClick={scrollToContact}>
              Ver demo
            </button>
          </div>
        </div>
        <img
          src={dashboardImage}
          alt="Dashboard de analytics de EcuNexo"
          width={1280}
          height={720}
          decoding="async"
          fetchPriority="high"
        />
      </section>

      <section className={styles.section} id="modulos">
        <h2>
          Módulos <span>Potentes</span>
        </h2>
        <p className={styles.subtitle}>
          Todo lo que necesitas para gestionar tu negocio en una sola plataforma
        </p>
        <div className={styles.grid3}>
          {moduleItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={`${styles.icon} ${toneClassName[item.tone]}`}>
                <i className="bx bx-grid-alt" aria-hidden />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="servicios">
        <h2>
          Servicios <span>Profesionales</span>
        </h2>
        <p className={styles.subtitle}>Nos comprometemos con el éxito de tu negocio</p>
        <div className={styles.grid4}>
          {serviceItems.map((item) => (
            <article key={item.title} className={`${styles.card} ${styles.center}`}>
              <span className={styles.icon}>
                <i className="bx bx-check-shield" aria-hidden />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.ctaBanner}>
          <h3>¿Listo para transformar tu negocio?</h3>
          <p>Únete a las empresas ecuatorianas que ya confían en EcuNexo</p>
          <button type="button" className={styles.lightButton} onClick={scrollToContact}>
            Solicitar demo gratuita
          </button>
        </div>
      </section>

      <section className={styles.section} id="recomendaciones">
        <h2>
          Recomendaciones <span>Inteligentes</span>
        </h2>
        <p className={styles.subtitle}>
          Escenarios donde nuestro sistema con enfoque Web3 genera mayor impacto.
        </p>
        <div className={styles.recommendationGrid}>
          {recommendations.map((item: RecommendationItem) => (
            <article key={item.title} className={styles.recommendationCard}>
              <span className={styles.recommendationIcon}>
                <i className="bx bx-bulb" aria-hidden />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="sobre">
        <h2>
          Quiénes <span>Somos</span>
        </h2>
        <p className={styles.subtitle}>
          Somos una empresa tecnológica ecuatoriana con sede en Guayaquil, enfocada en revolucionar
          la gestión empresarial.
        </p>
        <div className={styles.grid3}>
          <article className={styles.card}>
            <span className={styles.icon}>
              <i className="bx bx-target-lock" aria-hidden />
            </span>
            <h3>Nuestra Misión</h3>
            <p>
              Democratizar el acceso a tecnología empresarial de vanguardia para negocios de todos
              los tamaños.
            </p>
          </article>
          <article className={styles.card}>
            <span className={styles.icon}>
              <i className="bx bx-show-alt" aria-hidden />
            </span>
            <h3>Nuestra Visión</h3>
            <p>Ser la plataforma líder en gestión empresarial integral en la región.</p>
          </article>
          <article className={styles.card}>
            <span className={styles.icon}>
              <i className="bx bx-diamond" aria-hidden />
            </span>
            <h3>Nuestros Valores</h3>
            <p>
              Innovación constante, transparencia y compromiso absoluto con el éxito de nuestros
              clientes.
            </p>
          </article>
        </div>
        <div className={styles.aboutSplit}>
          <div>
            {reasons.map((item, index) => (
              <div key={item.title} className={styles.reason}>
                <span>{index + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <img
            src={techImage}
            alt="Tecnología e integración empresarial EcuNexo"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contacto">
        <h2>
          Contáctanos <span>Hoy</span>
        </h2>
        <p className={styles.subtitle}>
          Estamos listos para ayudarte a comenzar tu transformación digital
        </p>
        <div className={styles.contactGrid}>
          <ContactForm
            control={control}
            handleSubmit={handleSubmit}
            onSubmitValid={onSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            submitState={submitState}
          />
          <aside className={styles.info}>
            <h3>Información de contacto</h3>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <i className="bx bx-map" aria-hidden />
              </span>
              <p>
                <strong>Oficina principal</strong>
                <br />
                Guayaquil, Ecuador
              </p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <i className="bx bx-envelope" aria-hidden />
              </span>
              <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:galvarado@ecunexo.com">galvarado@ecunexo.com</a>
              </p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>
                <i className="bx bx-phone" aria-hidden />
              </span>
              <p>
                <strong>Teléfono</strong>
                <br />
                <a href="tel:+593960889143">096 088 9143</a>
              </p>
            </div>
            <div className={styles.infoCard}>
              <h4>Horario de atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
            </div>
            <div className={styles.helpCard}>
              <h4>¿Tienes dudas?</h4>
              <p>
                Agenda una videollamada gratuita con nuestro equipo técnico. El botón descarga un
                archivo de calendario: ábrelo y, en Outlook, confirma con <strong>Sí</strong> o{' '}
                <strong>Guardar en el calendario</strong> para añadir el evento.
              </p>
              <button
                type="button"
                className={styles.lightButton}
                onClick={downloadReunionCalendarInvite}
              >
                Agendar reunión
              </button>
              <a
                href={buildGoogleCalendarReunionUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.helpCardCalendarLink}
              >
                O añadir en Google Calendar
              </a>
            </div>
          </aside>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <p className={styles.logo}>
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="EcuNexo"
                className={styles.logoImage}
                width={156}
                height={40}
              />
            </p>
            <p>Transformando la gestión empresarial en Ecuador con tecnología de vanguardia.</p>
          </div>
          <div className={styles.footerCol}>
            <h4>Producto</h4>
            <a href="#modulos">Módulos</a>
            <a href="#servicios">Servicios</a>
            <a href="#recomendaciones">Recomendaciones</a>
            <a href="#contacto">Demo</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Empresa</h4>
            <a href="#sobre">Quiénes somos</a>
            <a href="#contacto">Contacto</a>
            <a href="mailto:galvarado@ecunexo.com">Email</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <div className={styles.footerCol}>
            <h4>Contacto rápido</h4>
            <div className={styles.socials}>
              <a href="mailto:galvarado@ecunexo.com" aria-label="Email">
                <i className="bx bx-envelope" aria-hidden />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bx bxl-whatsapp" aria-hidden />
              </a>
              <a href="tel:+593960889143" aria-label="Teléfono">
                <i className="bx bx-phone" aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} EcuNexo. Todos los derechos reservados. Hecho en Guayaquil,
          Ecuador.
        </p>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className={styles.whatsappFloat}
      >
        <i className="bx bxl-whatsapp" aria-hidden />
      </a>
    </div>
  )
}
