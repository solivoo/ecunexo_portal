import { useState, type ReactElement } from 'react'
import logoDark from '../../../assets/solo_logo_ecunexo_dark.svg'
import logoLight from '../../../assets/solo_logo_ecunexo_light.svg'
import {
  dashboardImageUrl,
  moduleItems,
  recommendations,
  reasons,
  serviceItems,
  techImageUrl,
} from '../data/figmaLandingContent'
import { useContactForm } from '../../../hooks/useContactForm'
import styles from './FigmaLandingPage.module.css'

const toneClassName = {
  blue: styles.toneBlue,
  sky: styles.toneSky,
  slate: styles.toneSlate,
  emerald: styles.toneEmerald,
}

export function FigmaLandingPage(): ReactElement {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const { register, handleSubmit, errors, isSubmitting, submitState, onSubmit } = useContactForm()
  const whatsappLink = 'https://wa.me/593999999999?text=Hola%20EcuNexo,%20quiero%20mas%20informacion.'

  return (
    <div className={`${styles.page} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.logo}>
            <picture>
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Logo de ecunexo"
                className={styles.logoImage}
              />
            </picture>            
          </p>
          <nav>
            <a href="#">Inicio</a>
            <a href="#modulos">Módulos</a>
            <a href="#servicios">Servicios</a>
            <a href="#sobre">Quiénes Somos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <button
            className={styles.themeToggle}
            type="button"
            aria-label="Cambiar tema"
            onClick={() => setIsDarkMode((currentValue) => !currentValue)}
          >
            <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} />
          </button>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.badge}><i className="bx bx-bolt-circle" />Tecnología Web3 · Ecuador</span>
          <h1>Gestión de Inventario <span>Inteligente</span></h1>
          <p>Sistema multitenancy con bodegas, facturación y comercio electrónico. Comienza tu transformación digital en Guayaquil.</p>
          <div className={styles.actions}><button>Comenzar Ahora <i className="bx bx-right-arrow-alt" /></button><button className={styles.secondary}>Ver Demo</button></div>
        </div>
        <img src={dashboardImageUrl} alt="Dashboard de analytics" />
      </section>

      <section className={styles.section} id="modulos">
        <h2>Módulos <span>Potentes</span></h2>
        <p className={styles.subtitle}>Todo lo que necesitas para gestionar tu negocio en una sola plataforma</p>
        <div className={styles.grid3}>
          {moduleItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <span className={`${styles.icon} ${toneClassName[item.tone]}`}><i className="bx bx-grid-alt" /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="servicios">
        <h2>Servicios <span>Profesionales</span></h2>
        <p className={styles.subtitle}>Nos comprometemos con el éxito de tu negocio</p>
        <div className={styles.grid4}>
          {serviceItems.map((item) => (
            <article key={item.title} className={`${styles.card} ${styles.center}`}>
              <span className={styles.icon}><i className="bx bx-check-shield" /></span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className={styles.ctaBanner}>
          <h3>¿Listo para transformar tu negocio?</h3>
          <p>Únete a las empresas ecuatorianas que ya confían en ecunexo</p>
          <button className={styles.lightButton}>Solicitar Demo Gratuita</button>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Recomendaciones <span>Inteligentes</span></h2>
        <p className={styles.subtitle}>
          Escenarios donde nuestro sistema con enfoque Web3 genera mayor impacto.
        </p>
        <div className={styles.recommendationGrid}>
          {recommendations.map((item: RecommendationItem) => (
            <article key={item.title} className={styles.recommendationCard}>
              <span className={styles.recommendationIcon}>
                <i className="bx bx-bulb" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="sobre">
        <h2>Quiénes <span>Somos</span></h2>
        <p className={styles.subtitle}>Somos una empresa tecnológica ecuatoriana con sede en Guayaquil, enfocada en revolucionar la gestión empresarial.</p>
        <div className={styles.grid3}>
          <article className={styles.card}><span className={styles.icon}><i className="bx bx-target-lock" /></span><h3>Nuestra Misión</h3><p>Democratizar el acceso a tecnología empresarial de vanguardia para negocios de todos los tamaños.</p></article>
          <article className={styles.card}><span className={styles.icon}><i className="bx bx-show-alt" /></span><h3>Nuestra Visión</h3><p>Ser la plataforma líder en gestión empresarial integral en la región.</p></article>
          <article className={styles.card}><span className={styles.icon}><i className="bx bx-diamond" /></span><h3>Nuestros Valores</h3><p>Innovación constante, transparencia y compromiso absoluto con el éxito de nuestros clientes.</p></article>
        </div>
        <div className={styles.aboutSplit}>
          <div>{reasons.map((item, index) => <div key={item.title} className={styles.reason}><span>{index + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></div>)}</div>
          <img src={techImageUrl} alt="Tecnología moderna" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.contact}`} id="contacto">
        <h2>Contáctanos <span>Hoy</span></h2>
        <p className={styles.subtitle}>Estamos listos para ayudarte a comenzar tu transformación digital</p>
        <div className={styles.contactGrid}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>Envíanos un mensaje</h3>
            <label>
              Nombre Completo
              <input
                placeholder="Juan Pérez"
                {...register('name', { required: 'El nombre es obligatorio' })}
              />
              {errors.name ? <small className={styles.errorText}>{errors.name.message}</small> : null}
            </label>
            <label>
              Email
              <input
                placeholder="juan@empresa.com"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Ingresa un email válido',
                  },
                })}
              />
              {errors.email ? <small className={styles.errorText}>{errors.email.message}</small> : null}
            </label>
            <label>
              Empresa
              <input placeholder="Mi Empresa S.A." {...register('company')} />
            </label>
            <label>
              Mensaje
              <textarea
                rows={5}
                placeholder="Cuéntanos sobre tu proyecto..."
                {...register('message', { required: 'El mensaje es obligatorio' })}
              />
              {errors.message ? (
                <small className={styles.errorText}>{errors.message.message}</small>
              ) : null}
            </label>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'} <i className="bx bx-send" />
            </button>
            {submitState === 'success' ? (
              <p className={styles.successText}>Mensaje enviado correctamente.</p>
            ) : null}
            {submitState === 'error' ? (
              <p className={styles.errorText}>No se pudo enviar el mensaje. Intenta de nuevo.</p>
            ) : null}
          </form>
          <aside className={styles.info}>
            <h3>Información de Contacto</h3>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}><i className="bx bx-map" /></span>
              <p><strong>Oficina Principal</strong><br />Guayaquil, Ecuador</p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}><i className="bx bx-envelope" /></span>
              <p><strong>Email</strong><br />contacto@ecunexo.com</p>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoIcon}><i className="bx bx-phone" /></span>
              <p><strong>Teléfono</strong><br />+593 4 XXX-XXXX</p>
            </div>
            <div className={styles.infoCard}>
              <h4>Horario de Atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 9:00 AM - 1:00 PM</p>
            </div>
            <div className={styles.helpCard}>
              <h4>¿Tienes dudas?</h4>
              <p>Agenda una videollamada gratuita con nuestro equipo técnico</p>
              <button type="button" className={styles.lightButton}>Agendar Reunión</button>
            </div>
          </aside>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <p className={styles.logo}>
              <picture>
                <img
                  src={isDarkMode ? logoDark : logoLight}
                  alt="Logo de ecunexo"
                  className={styles.logoImage}
                />
              </picture>              
            </p>
            <p>Transformando la gestión empresarial en Ecuador con tecnología de vanguardia.</p>
          </div>
          <div className={styles.footerCol}>
            <h4>Producto</h4>
            <a href="#modulos">Módulos</a>
            <a href="#servicios">Servicios</a>
            <a href="#">Precios</a>
            <a href="#">Roadmap</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Empresa</h4>
            <a href="#sobre">Quiénes Somos</a>
            <a href="#">Blog</a>
            <a href="#">Carreras</a>
            <a href="#contacto">Contacto</a>
          </div>
          <div className={styles.footerCol}>
            <h4>Síguenos</h4>
            <div className={styles.socials}>
              <a href="#" aria-label="LinkedIn"><i className="bx bxl-linkedin" /></a>
              <a href="#" aria-label="X"><i className="bx bxl-twitter" /></a>
              <a href="#" aria-label="Instagram"><i className="bx bxl-instagram" /></a>
              <a href="#" aria-label="Facebook"><i className="bx bxl-facebook" /></a>
            </div>
          </div>
        </div>
        <p className={styles.footerCopy}>
          © 2026 ecunexo. Todos los derechos reservados. Hecho con 💙 en Guayaquil, Ecuador.
        </p>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className={styles.whatsappFloat}
      >
        <i className="bx bxl-whatsapp" />
      </a>
    </div>
  )
}
