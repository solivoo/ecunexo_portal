import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from 'glubox'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import 'boxicons/css/boxicons.min.css'
import 'glubox/style.css'
import 'glubox/themes/index.css'
import './index.css'
import { App } from './App'

document.documentElement.setAttribute('data-theme', 'commerce')
document.documentElement.setAttribute('data-mode', 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
