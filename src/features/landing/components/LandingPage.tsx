import { useEffect, useState, type ReactElement } from 'react'
import { useContactForm } from '../../../hooks/useContactForm'
import { whatsappLink } from '../data/landingContent'
import { AboutSection } from './AboutSection'
import { ContactSection } from './ContactSection'
import { FaqSection } from './FaqSection'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { ModulesSection } from './ModulesSection'
import { SolutionsSection } from './SolutionsSection'
import { SriSection } from './SriSection'
import styles from './LandingPage.module.css'

export function LandingPage(): ReactElement {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const contactForm = useContactForm()
  const { selectTopic } = contactForm

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const requestDemo = (): void => {
    selectTopic('demo')
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`${styles.page} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((current) => !current)}
        onRequestDemo={requestDemo}
      />
      <main>
        <Hero onRequestDemo={requestDemo} />
        <ModulesSection />
        <SriSection />
        <SolutionsSection onRequestDemo={requestDemo} />
        <AboutSection />
        <FaqSection />
        <ContactSection form={contactForm} />
      </main>
      <Footer />
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
