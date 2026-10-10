import type { ReactElement } from 'react'
import type { useContactForm } from '../../../hooks/useContactForm'
import {
  buildGoogleCalendarReunionUrl,
  downloadReunionCalendarInvite,
} from '../../../utils/reunionCalendar'
import { contactInfo } from '../data/landingContent'
import { ContactForm } from './ContactForm'
import styles from './LandingPage.module.css'

interface ContactSectionProps {
  readonly form: ReturnType<typeof useContactForm>
}

export function ContactSection({ form }: ContactSectionProps): ReactElement {
  return (
    <section className={`${styles.section} ${styles.contact}`} id="contacto" aria-labelledby="contact-title">
      <p className={styles.eyebrow}>Contacto</p>
      <h2 id="contact-title">
        Conversemos sobre <span>tu negocio</span>
      </h2>
      <p className={styles.subtitle}>
        Cuéntanos cómo trabajas y te mostramos EcuNexo con ejemplos de tu propia operación.
      </p>
      <div className={styles.contactGrid}>
        <ContactForm
          control={form.control}
          handleSubmit={form.handleSubmit}
          onSubmitValid={form.onSubmit}
          errors={form.errors}
          isSubmitting={form.isSubmitting}
          submitState={form.submitState}
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
              {contactInfo.city}
            </p>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoIcon}>
              <i className="bx bx-envelope" aria-hidden />
            </span>
            <p>
              <strong>Email</strong>
              <br />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoIcon}>
              <i className="bx bx-phone" aria-hidden />
            </span>
            <p>
              <strong>Teléfono</strong>
              <br />
              <a href={contactInfo.phoneHref}>{contactInfo.phoneLabel}</a>
            </p>
          </div>
          <div className={styles.infoCard}>
            <h4>Horario de atención</h4>
            <p>Lunes a viernes: 9:00 a 18:00</p>
            <p>Sábados: 9:00 a 13:00</p>
          </div>
          <div className={styles.helpCard}>
            <h4>¿Prefieres una videollamada?</h4>
            <p>
              Agenda una reunión gratuita con nuestro equipo. El botón descarga una invitación de
              calendario: ábrela y, en Outlook, confirma con <strong>Guardar en el calendario</strong>.
            </p>
            <button type="button" className={styles.lightButton} onClick={downloadReunionCalendarInvite}>
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
  )
}
