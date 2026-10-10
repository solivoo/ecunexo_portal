import { useState, type ReactElement } from 'react'
import { navLinks } from '../data/landingContent'
import { Logo } from './Logo'
import styles from './LandingPage.module.css'

interface HeaderProps {
  readonly isDarkMode: boolean
  readonly onToggleTheme: () => void
  readonly onRequestDemo: () => void
}

export function Header({ isDarkMode, onToggleTheme, onRequestDemo }: HeaderProps): ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = (): void => setIsMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="#inicio" className={styles.logoLink} onClick={closeMenu}>
          <Logo />
        </a>

        <nav
          id="main-nav"
          aria-label="Principal"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className={styles.navCta}
            onClick={() => {
              closeMenu()
              onRequestDemo()
            }}
          >
            Solicitar demo
          </button>
        </nav>

        <div className={styles.headerActions}>
          <button
            className={styles.iconButton}
            type="button"
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            onClick={onToggleTheme}
          >
            <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} aria-hidden />
          </button>
          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`} aria-hidden />
          </button>
        </div>
      </div>
    </header>
  )
}
