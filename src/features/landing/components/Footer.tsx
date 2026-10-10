import type { ReactElement } from 'react'
import { contactInfo, navLinks, whatsappLink } from '../data/landingContent'
import { Logo } from './Logo'
import styles from './LandingPage.module.css'

export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <Logo />
          <p>Gestión empresarial y facturación electrónica para Ecuador.</p>
        </div>
        <div className={styles.footerCol}>
          <h4>Explora</h4>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.footerCol}>
          <h4>Contacto</h4>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
          <span>{contactInfo.city}</span>
        </div>
        <div className={styles.footerCol}>
          <h4>Escríbenos</h4>
          <div className={styles.socials}>
            <a href={`mailto:${contactInfo.email}`} aria-label="Email">
              <i className="bx bx-envelope" aria-hidden />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="bx bxl-whatsapp" aria-hidden />
            </a>
            <a href={contactInfo.phoneHref} aria-label="Teléfono">
              <i className="bx bx-phone" aria-hidden />
            </a>
          </div>
        </div>
      </div>
      <p className={styles.footerCopy}>
        © {new Date().getFullYear()} EcuNexo. Todos los derechos reservados.
      </p>
    </footer>
  )
}
